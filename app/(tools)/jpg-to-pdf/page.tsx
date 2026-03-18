"use client";

import { useState, useCallback } from "react";
import { Image as ImageIcon, Download, Loader2, CheckCircle2, File, UploadCloud } from "lucide-react";
import ToolLayout from "@/app/components/ToolLayout";
import { useDropzone } from "react-dropzone";

export default function JPGtoPDF() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ blob: Blob; name: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((accepted: File[]) => {
    setFiles((prev) => [...prev, ...accepted]);
    setResult(null);
    setError(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"] },
    multiple: true,
    onDrop,
  });

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleConvert = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setError(null);

    try {
      const { PDFDocument } = await import("pdf-lib");
      const pdfDoc = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const isJpeg = file.type === "image/jpeg";
        const isPng = file.type === "image/png";

        let image;
        if (isJpeg) {
          image = await pdfDoc.embedJpg(arrayBuffer);
        } else if (isPng) {
          image = await pdfDoc.embedPng(arrayBuffer);
        } else {
          continue; // Skip unsupported types
        }

        const { width, height } = image;
        // Create a page matching the exact image dimensions
        const page = pdfDoc.addPage([width, height]);
        page.drawImage(image, { x: 0, y: 0, width, height });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      setResult({ blob, name: "converted.pdf" });
    } catch (err) {
      console.error(err);
      setError("Failed to convert images. Please ensure all files are valid JPG or PNG images.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const url = URL.createObjectURL(result.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = result.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setFiles([]);
    setResult(null);
    setError(null);
  };

  return (
    <ToolLayout
      title="JPG to PDF"
      description="Convert JPG or PNG images to a PDF document instantly."
      icon={ImageIcon}
      instructions={[
        "Upload one or more JPG or PNG images.",
        "Each image will become a full page in the PDF.",
        "Click 'Convert to PDF' to generate your document.",
        "Download the resulting PDF.",
      ]}
    >
      <div className="w-full max-w-3xl mx-auto space-y-6">
        {!result && (
          <>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300
                ${isDragActive ? "border-primary bg-primary/5 scale-[1.02]" : "border-neutral-200 hover:border-primary/50 hover:bg-neutral-50"}
                ${files.length > 0 ? "bg-neutral-50 border-solid border-neutral-200" : ""}
              `}
            >
              <input {...getInputProps()} />
              {files.length === 0 ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <UploadCloud className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-xl font-bold text-neutral-900">Select Images</p>
                  <p className="text-neutral-500 text-sm">JPG or PNG — drop them here or click</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <div className="flex flex-wrap justify-center gap-3">
                    {files.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-neutral-200 shadow-sm group">
                        <File className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-sm font-medium text-neutral-700 max-w-[120px] truncate">{f.name}</span>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                          className="text-neutral-300 hover:text-red-500 transition-colors text-xs font-bold ml-1"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  <p className="text-neutral-400 text-xs underline decoration-dotted">Click here or drag to add more images</p>
                </div>
              )}
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 border border-red-100 rounded-xl p-4 text-sm font-medium">
                {error}
              </div>
            )}

            {files.length > 0 && !isProcessing && (
              <div className="flex justify-center">
                <button
                  onClick={handleConvert}
                  className="premium-button text-lg px-12 py-4 shadow-xl hover:shadow-2xl shadow-primary/20 flex items-center gap-3"
                >
                  <ImageIcon className="w-5 h-5" />
                  Convert to PDF
                </button>
              </div>
            )}

            {isProcessing && (
              <div className="border border-neutral-200 rounded-2xl p-12 text-center bg-white flex flex-col items-center gap-4">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <p className="font-bold text-neutral-900">Converting images...</p>
                <p className="text-sm text-neutral-500">Embedding {files.length} image{files.length > 1 ? "s" : ""} into PDF.</p>
              </div>
            )}
          </>
        )}

        {result && (
          <div className="border border-neutral-200 rounded-2xl p-10 text-center bg-white flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900 mb-1">Conversion Complete!</p>
              <p className="text-sm text-neutral-500">
                {files.length} image{files.length > 1 ? "s" : ""} converted into a single PDF.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleDownload}
                className="premium-button flex items-center gap-2 px-8 py-3"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
              <button
                onClick={reset}
                className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-6 py-3 rounded-xl font-bold transition-colors text-sm"
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
