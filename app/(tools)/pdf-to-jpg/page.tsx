"use client";

import { useState } from "react";
import { FileImage, Download, Loader2, CheckCircle2, UploadCloud } from "lucide-react";
import ToolLayout from "@/app/components/ToolLayout";
import { useDropzone } from "react-dropzone";

export default function PDFtoJPG() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<string>("");
  const [images, setImages] = useState<{ name: string; dataUrl: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
    onDrop: (accepted) => {
      if (accepted[0]) {
        setFile(accepted[0]);
        setImages([]);
        setError(null);
      }
    },
  });

  const handleConvert = async () => {
    if (!file) return;

    setIsProcessing(true);
    setImages([]);
    setError(null);

    try {
      // ✅ Correct import
      const pdfjs = await import("pdfjs-dist");

      // ✅ Stable worker (VERY IMPORTANT)
      pdfjs.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs";

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;

      const totalPages = pdf.numPages;
      const rendered: { name: string; dataUrl: string }[] = [];

      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        setProgress(`Rendering page ${pageNum} of ${totalPages}...`);

        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 2 });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) throw new Error("Canvas error");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport,
          canvas,
        }).promise;

        const dataUrl = canvas.toDataURL("image/jpeg", 0.9);

        rendered.push({
          name: `page_${String(pageNum).padStart(3, "0")}.jpg`,
          dataUrl,
        });
      }

      setImages(rendered);
    } catch (err) {
      console.error(err);
      setError("Failed to convert PDF. Try another file.");
    } finally {
      setIsProcessing(false);
      setProgress("");
    }
  };

  const downloadAll = async () => {
    if (images.length === 0) return;

    if (images.length === 1) {
      const a = document.createElement("a");
      a.href = images[0].dataUrl;
      a.download = images[0].name;
      a.click();
      return;
    }

    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();

    for (const img of images) {
      const base64 = img.dataUrl.split(",")[1];
      zip.file(img.name, base64, { base64: true });
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(zipBlob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "images.zip";
    a.click();

    URL.revokeObjectURL(url);
  };

  const downloadSingle = (img: { name: string; dataUrl: string }) => {
    const a = document.createElement("a");
    a.href = img.dataUrl;
    a.download = img.name;
    a.click();
  };

  const reset = () => {
    setFile(null);
    setImages([]);
    setError(null);
  };

  return (
    <ToolLayout
      title="PDF to JPG"
      description="Convert every page of your PDF into high-quality JPG images."
      icon={FileImage}
      instructions={[
        "Upload your PDF file",
        "Click convert",
        "Download images",
      ]}
    >
      <div className="w-full max-w-3xl mx-auto space-y-6">

        {images.length === 0 && (
          <>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer
              ${isDragActive ? "border-primary bg-primary/5" : "border-neutral-200 hover:border-primary/50"}
              ${file ? "bg-neutral-50 border-solid" : ""}`}
            >
              <input {...getInputProps()} />

              {file ? (
                <div>
                  <FileImage className="mx-auto mb-2" />
                  <p>{file.name}</p>
                </div>
              ) : (
                <div>
                  <UploadCloud className="mx-auto mb-2" />
                  <p>Select PDF file</p>
                </div>
              )}
            </div>

            {error && <p className="text-red-500">{error}</p>}

            {file && !isProcessing && (
              <button onClick={handleConvert} className="premium-button">
                Convert to JPG
              </button>
            )}

            {isProcessing && (
              <div>
                <Loader2 className="animate-spin" />
                <p>{progress}</p>
              </div>
            )}
          </>
        )}

        {images.length > 0 && (
          <div>
            <p>{images.length} pages converted</p>

            <button onClick={downloadAll}>Download All</button>
            <button onClick={reset}>Reset</button>

            <div className="grid grid-cols-2 gap-4">
              {images.map((img, i) => (
                <div key={i}>
                  <img src={img.dataUrl} />
                  <button onClick={() => downloadSingle(img)}>
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </ToolLayout>
  );
}
