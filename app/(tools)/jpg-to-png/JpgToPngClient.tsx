"use client";

import { useState } from "react";
import { FileImage, Download, Loader2 } from "lucide-react";
import ToolLayout from "@/app/components/ToolLayout"; 
import { toolContents } from "@/app/lib/tool-content";
import FileUploader from "@/app/components/FileUploader";

export default function JpgToPng() {
    const [file, setFile] = useState<File | null>(null);
    const [converting, setConverting] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const handleConvert = async () => {
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
            const pngData = canvas.toDataURL("image/png");
            setResult(pngData);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Conversion failed:", error);
            alert("Failed to convert image. Please try again.");
        } finally {
            setConverting(false);
        }
    };

    const handleDownload = () => {
        if (!result) return;
        const link = document.createElement("a");
        link.href = result;
        link.download = file ? file.name.replace(/\.[^/.]+$/, "") + ".png" : "converted.png";
        link.click();
    };

    return (
        <ToolLayout
            content={toolContents["jpg-to-png"]}
            title="JPG to PNG Converter"
            description="Convert your JPG images to high-quality PNG format instantly."
            icon={FileImage}
            instructions={[
                "Upload your JPG image using the box above.",
                "Click the 'Convert to PNG' button to start the process.",
                "Once finished, click 'Download PNG' to save your new image.",
                "Your files are processed locally in your browser for maximum privacy."
            ]}
        >
            <div className="flex flex-col items-center gap-6">
                <FileUploader
                    onFileSelect={setFile}
                    accept="image/jpeg,image/jpg"
                    label="Select JPG"
                />

                {file && !result && (
                    <button
                        onClick={handleConvert}
                        disabled={converting}
                        className="w-full md:w-auto bg-primary hover:bg-primary-hover text-white px-10 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 text-sm shadow-lg shadow-primary/20"
                    >
                        {converting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            "Convert to PNG"
                        )}
                    </button>
                )}

                {result && (
                    <div className="w-full flex flex-col items-center gap-5 animate-in zoom-in-95 duration-300">
                        <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100 flex flex-col md:flex-row items-center gap-4 w-full">
                            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500 shrink-0">
                                <FileImage className="w-6 h-6" />
                            </div>
                            <div className="flex-grow text-center md:text-left">
                                <p className="text-sm font-bold text-neutral-900 leading-tight">Conversion Ready!</p>
                                <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mt-0.5">Privacy Guaranteed &middot; No Watermark</p>
                            </div>
                            <button
                                onClick={handleDownload}
                                className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors text-sm shadow-lg shadow-green-500/20"
                            >
                                <Download className="w-4 h-4" />
                                Download PNG
                            </button>
                        </div>

                        <div className="w-full flex justify-center bg-neutral-100 rounded-2xl overflow-hidden border border-neutral-200 p-4">
                            <img src={result} alt="Converted result" className="rounded-lg shadow-sm max-h-[300px] object-contain" />
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-6">
                            <div className="ad-placeholder h-12 w-48 opacity-30 text-[8px]">Partner Promo</div>
                            <button
                                onClick={() => { setResult(null); setFile(null); }}
                                className="text-neutral-400 dark:text-neutral-500 text-[11px] font-black uppercase tracking-[0.2em] hover:text-primary transition-colors"
                            >
                                Start New Conversion
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
