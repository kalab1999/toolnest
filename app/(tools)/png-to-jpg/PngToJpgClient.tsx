"use client";

import { useState } from "react";
import { FileImage, Download, Loader2 } from "lucide-react";
import ToolLayout from "@/app/components/ToolLayout"; 
import { toolContents } from "@/app/lib/tool-content";
import FileUploader from "@/app/components/FileUploader";

export default function PngToJpg() {
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

            // Fill background white for JPG (transparent PNG parts become white)
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.drawImage(img, 0, 0);
            const jpgData = canvas.toDataURL("image/jpeg", 0.9);
            setResult(jpgData);
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
        link.download = file ? file.name.replace(/\.[^/.]+$/, "") + ".jpg" : "converted.jpg";
        link.click();
    };

    return (
        <ToolLayout
            content={toolContents["png-to-jpg"]}
            title="PNG to JPG Converter"
            description="Convert your PNG images to high-quality JPG format instantly."
            icon={FileImage}
            instructions={[
                "Upload your PNG image using the box above.",
                "Click the 'Convert to JPG' button to start the process.",
                "Once finished, click 'Download JPG' to save your new image.",
                "Your files are processed locally in your browser for maximum privacy."
            ]}
        >
            <div className="flex flex-col items-center gap-8">
                <FileUploader
                    onFileSelect={setFile}
                    accept="image/png"
                    label="Select PNG Image"
                />

                {file && !result && (
                    <button
                        onClick={handleConvert}
                        disabled={converting}
                        className="w-full md:w-auto bg-primary hover:bg-primary-hover text-white px-10 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                    >
                        {converting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Converting...
                            </>
                        ) : (
                            "Convert to JPG"
                        )}
                    </button>
                )}

                {result && (
                    <div className="w-full flex flex-col items-center gap-6 animate-in zoom-in-95 duration-300">
                        <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100 flex items-center gap-4 w-full">
                            <div className="w-16 h-16 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500">
                                <FileImage className="w-8 h-8" />
                            </div>
                            <div className="flex-grow">
                                <p className="font-bold text-neutral-900">Conversion Complete!</p>
                                <p className="text-sm text-neutral-500">Your JPG image is ready for download.</p>
                            </div>
                            <button
                                onClick={handleDownload}
                                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors"
                            >
                                <Download className="w-5 h-5" />
                                Download JPG
                            </button>
                        </div>

                        <div className="w-full aspect-auto max-h-[400px] flex justify-center bg-neutral-100 rounded-2xl overflow-hidden border border-neutral-200">
                            <img src={result} alt="Converted result" className="object-contain" />
                        </div>

                        <button
                            onClick={() => { setResult(null); setFile(null); }}
                            className="text-neutral-500 text-sm hover:underline"
                        >
                            Convert another image
                        </button>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
