"use client";

import { useState, useRef } from "react";
import { QrCode, Download, Copy, Check, Share2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import ToolLayout from "@/app/components/ToolLayout"; 
import { toolContents } from "@/app/lib/tool-content";

export default function QrCodeGenerator() {
    const [text, setText] = useState("https://alltoolkit.com");
    const size = 256;
    const [fgColor, setFgColor] = useState("#000000");
    const [bgColor, setBgColor] = useState("#ffffff");
    const [copied, setCopied] = useState(false);
    const qrRef = useRef<HTMLDivElement>(null);

    const handleDownload = () => {
        const svg = qrRef.current?.querySelector("svg");
        if (!svg) return;

        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
            canvas.width = size;
            canvas.height = size;
            ctx?.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL("image/png");
            const downloadLink = document.createElement("a");
            downloadLink.download = "qrcode-alltoolkit.png";
            downloadLink.href = pngFile;
            downloadLink.click();
        };

        img.src = "data:image/svg+xml;base64," + btoa(svgData);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ToolLayout
            content={toolContents["qr-code-generator"]}
            title="QR Code Generator"
            description="Create custom QR codes for your websites, social media, or any text instantly."
            icon={QrCode}
            instructions={[
                "Enter the URL or text you want to encode in the input box.",
                "Adjust the size and colors of your QR code if needed.",
                "The QR code will update automatically as you type.",
                "Click 'Download PNG' to save your QR code locally."
            ]}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-8">
                {/* Controls */}
                <div className="space-y-8">
                    <div className="space-y-3">
                        <label className="text-sm font-bold text-neutral-900">Input URL or Text</label>
                        <div className="relative">
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-4 h-32 text-neutral-900 focus:outline-none focus:border-primary transition-colors resize-none"
                                placeholder="Enter link or text here..."
                            />
                            <button
                                onClick={handleCopy}
                                className="absolute right-3 bottom-3 p-2 bg-white border border-neutral-200 rounded-lg text-neutral-500 hover:text-primary transition-all shadow-sm"
                                title="Copy text"
                            >
                                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-neutral-900">FG Color</label>
                            <div className="flex items-center gap-3 bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2">
                                <input
                                    type="color"
                                    value={fgColor}
                                    onChange={(e) => setFgColor(e.target.value)}
                                    className="w-8 h-8 rounded cursor-pointer"
                                />
                                <span className="text-xs font-mono uppercase text-neutral-500">{fgColor}</span>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-neutral-900">BG Color</label>
                            <div className="flex items-center gap-3 bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2">
                                <input
                                    type="color"
                                    value={bgColor}
                                    onChange={(e) => setBgColor(e.target.value)}
                                    className="w-8 h-8 rounded cursor-pointer"
                                />
                                <span className="text-xs font-mono uppercase text-neutral-500">{bgColor}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div className="flex flex-col items-center justify-center p-8 bg-neutral-50 rounded-3xl border border-neutral-200 border-dashed">
                    <div ref={qrRef} className="bg-white p-6 rounded-2xl shadow-xl shadow-neutral-200/50 mb-8 animate-in zoom-in-90 duration-300">
                        <QRCodeSVG
                            value={text}
                            size={size}
                            fgColor={fgColor}
                            bgColor={bgColor}
                            level="H"
                            includeMargin={true}
                        />
                    </div>

                    <div className="flex gap-4 w-full max-w-xs">
                        <button
                            onClick={handleDownload}
                            className="flex-grow bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                        >
                            <Download className="w-5 h-5" />
                            Download PNG
                        </button>
                        <button
                            className="p-3 bg-white border border-neutral-200 rounded-xl text-neutral-600 hover:text-primary transition-all"
                            title="Share"
                        >
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                    <p className="mt-6 text-xs text-neutral-400 text-center">
                        Scan with your smartphone camera to test the QR code.
                    </p>
                </div>
            </div>
        </ToolLayout>
    );
}
