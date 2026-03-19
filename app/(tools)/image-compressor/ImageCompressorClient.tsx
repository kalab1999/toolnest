"use client";

import { useState } from "react";
import { Minimize2, Download, Loader2 } from "lucide-react";
import ToolLayout from "@/app/components/ToolLayout";
import FileUploader from "@/app/components/FileUploader";

const QUALITY = 0.5;

export default function ImageCompressor() {
    const [file, setFile] = useState<File | null>(null);
    const [converting, setConverting] = useState(false);
    const [result, setResult] = useState<{ data: string; size: number } | null>(null);

    const handleCompress = async () => {
        if (!file) return;

        setConverting(true);
        setResult(null);

        try {
            const img = new Image();
            const url = URL.createObjectURL(file);

            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
                img.src = url;
            });

            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");

            if (!ctx) throw new Error("Could not create canvas context");
            ctx.drawImage(img, 0, 0);

            const compressedData = canvas.toDataURL("image/jpeg", QUALITY);

            // Calculate resulting size
            const base64Length = compressedData.split(",")[1].length;
            const fileSizeInBytes = base64Length * (3 / 4) - (compressedData.endsWith("==") ? 2 : compressedData.endsWith("=") ? 1 : 0);

            setResult({ data: compressedData, size: fileSizeInBytes });
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Compression failed:", error);
            alert("Failed to compress image.");
        } finally {
            setConverting(false);
        }
    };

    const handleDownload = () => {
        if (!result) return;
        const link = document.createElement("a");
        link.href = result.data;
        link.download = file ? `compressed_${file.name.replace(/\.[^/.]+$/, "")}.jpg` : "compressed.jpg";
        link.click();
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    return (
        <ToolLayout
            title="Image Compressor"
            description="Reduce image file size instantly while maintaining visual quality."
            icon={Minimize2}
            instructions={[
                "Upload your image (JPG, PNG or WebP) using the box above.",
                "Click 'Compress Image' to process at 50% quality.",
                "Compare sizes and download your optimized image."
            ]}
        >
            <div className="flex flex-col items-center gap-6">
                <FileUploader
                    onFileSelect={setFile}
                    accept="image/*"
                    label="Select Image"
                />

                {file && !result && (
                    <div className="w-full max-sm space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <button
                            onClick={handleCompress}
                            disabled={converting}
                            className="w-full bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 text-sm shadow-lg shadow-primary/20"
                        >
                            {converting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                "Compress Image"
                            )}
                        </button>
                    </div>
                )}


                {result && (
                    <div className="w-full flex flex-col items-center gap-5 animate-in zoom-in-95 duration-300">
                        <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-100 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                            <div className="text-center md:text-left">
                                <p className="text-[9px] text-neutral-500 uppercase tracking-widest font-black mb-1">Original</p>
                                <p className="text-lg font-bold text-neutral-900">{file ? formatSize(file.size) : "0 KB"}</p>
                            </div>
                            <div className="text-center md:text-left border-y md:border-y-0 md:border-x border-neutral-200 py-3 md:py-0 md:px-5">
                                <p className="text-[9px] text-neutral-500 uppercase tracking-widest font-black mb-1">Optimized</p>
                                <p className="text-lg font-bold text-green-500">{formatSize(result.size)}</p>
                            </div>
                            <div className="text-center md:text-left">
                                <p className="text-[9px] text-neutral-500 uppercase tracking-widest font-black mb-1">Savings</p>
                                <p className="text-lg font-bold text-primary">
                                    {file ? Math.round((1 - result.size / file.size) * 100) : 0}% Smaller
                                </p>
                            </div>
                        </div>

                        <div className="ad-placeholder h-16 w-full opacity-30 border-dashed border border-neutral-200 rounded-2xl flex items-center justify-center text-[8px] font-black text-neutral-400 uppercase tracking-widest">
                            Conversion sponsorship
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-4 w-full">
                            <button
                                onClick={handleDownload}
                                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors text-sm shadow-lg shadow-green-500/20"
                            >
                                <Download className="w-4 h-4" />
                                Download Result
                            </button>

                            <button
                                onClick={() => { setResult(null); setFile(null); }}
                                className="text-neutral-400 text-[11px] font-bold uppercase tracking-widest hover:text-primary transition-colors"
                            >
                                Process New Image
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
