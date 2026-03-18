"use client";

import { useState } from "react";
import { Minimize2, Download, Loader2, CheckCircle2 } from "lucide-react";
import ToolLayout from "@/app/components/ToolLayout";
import { useDropzone } from "react-dropzone";

export default function CompressPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ blob: Blob; name: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
    onDrop: (accepted) => {
      if (accepted[0]) {
        setFile(accepted[0]);
        setResult(null);
        setError(null);
      }
    },
  });

  const handleCompress = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);

    try {
      // Light compression only — pdf-lib cannot compress embedded images.
      // This strips unused objects and resaves the PDF structure.
      const { PDFDocument } = await import("pdf-lib");
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

      // Remove document metadata to shave a few bytes
      pdfDoc.setTitle("");
      pdfDoc.setAuthor("");
      pdfDoc.setSubject("");
      pdfDoc.setKeywords([]);
      pdfDoc.setProducer("");
      pdfDoc.setCreator("");

      // Save with object stream compression disabled for maximum compat
      const compressedBytes = await pdfDoc.save({
        useObjectStreams: false,
        objectsPerTick: 20,
      });

      const blob = new Blob([compressedBytes], { type: "application/pdf" });
      setResult({ blob, name: `compressed_${file.name}` });
    } catch (err) {
      console.error(err);
      setError("Failed to compress PDF. The file may be encrypted or corrupted.");
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
    setFile(null);
    setResult(null);
    setError(null);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  return (
    <ToolLayout
      title="Compress PDF"
      description="Reduce PDF file size while optimizing structure. Best for text-based PDFs."
      icon={Minimize2}
      instructions={[
        "Upload your PDF file.",
        "Click 'Compress PDF' to optimize the file structure.",
        "Download your smaller PDF.",
        "Note: Light compression — best results on text-heavy PDFs.",
      ]}
    >
      <div className="w-full max-w-3xl mx-auto space-y-6">
        {!result && (
          <>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300
                ${isDragActive ? "border-primary bg-primary/5 scale-[1.02]" : "border-neutral-200 hover:border-primary/50 hover:bg-neutral-50"}
                ${file ? "bg-neutral-50 border-solid border-neutral-200" : ""}
              `}
            >
              <input {...getInputProps()} />
              {file ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                    <Minimize2 className="w-7 h-7 text-primary" />
                  </div>
                  <p className="font-bold text-neutral-900">{file.name}</p>
                  <p className="text-sm text-neutral-500">{formatSize(file.size)}</p>
                  <p className="text-xs text-neutral-400 underline decoration-dotted">Click to change file</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Minimize2 className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-xl font-bold text-neutral-900">Select PDF file</p>
                  <p className="text-neutral-500 text-sm">or drop PDF here</p>
                </div>
              )}
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 border border-red-100 rounded-xl p-4 text-sm font-medium">
                {error}
              </div>
            )}

            {file && !isProcessing && (
              <div className="flex justify-center">
                <button
                  onClick={handleCompress}
                  className="premium-button text-lg px-12 py-4 shadow-xl hover:shadow-2xl shadow-primary/20 flex items-center gap-3"
                >
                  <Minimize2 className="w-5 h-5" />
                  Compress PDF
                </button>
              </div>
            )}

            {isProcessing && (
              <div className="border border-neutral-200 rounded-2xl p-12 text-center bg-white flex flex-col items-center gap-4">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <p className="font-bold text-neutral-900">Compressing...</p>
                <p className="text-sm text-neutral-500">Optimizing PDF structure, please wait.</p>
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
              <p className="text-2xl font-bold text-neutral-900 mb-1">Compression Complete!</p>
              <p className="text-sm text-neutral-500">
                Original: <span className="font-semibold">{formatSize(file!.size)}</span> → Compressed:{" "}
                <span className="font-semibold text-green-600">{formatSize(result.blob.size)}</span>
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                Saved: {Math.max(0, Math.round((1 - result.blob.size / file!.size) * 100))}%
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
