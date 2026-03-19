"use client";

import { useState } from "react";
import { CaseUpper, Copy, Trash2, CheckCircle2 } from "lucide-react";
import ToolLayout from "@/app/components/ToolLayout";

export default function UppercaseConverter() {
    const [text, setText] = useState("");
    const [copied, setCopied] = useState(false);

    const handleConvert = () => {
        setText(prev => prev.toUpperCase());
    };

    const handleCopy = () => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleClear = () => {
        setText("");
        setCopied(false);
    };

    const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    const charCount = text.length;

    return (
        <ToolLayout
            title="Uppercase Converter"
            description="Convert your text to all uppercase letters instantly while preserving formatting."
            icon={CaseUpper}
            instructions={[
                "Type or paste your text into the box below.",
                "Click 'Convert to Uppercase' to transform the text.",
                "Use the 'Copy Result' button to save the text to your clipboard.",
                "You can also see the word and character count below the text box."
            ]}
        >
            <div className="w-full flex flex-col gap-6">
                <div className="relative group">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Type or paste your text here..."
                        className="w-full h-80 p-6 rounded-2xl bg-white/50 backdrop-blur-sm border-2 border-primary/10 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all resize-none text-neutral-700 font-medium text-lg leading-relaxed shadow-inner"
                    />
                    <div className="absolute bottom-4 right-4 flex gap-4 text-sm text-neutral-400 font-medium">
                        <span className="bg-white px-3 py-1 rounded-full border border-neutral-100 shadow-sm">{wordCount} Words</span>
                        <span className="bg-white px-3 py-1 rounded-full border border-neutral-100 shadow-sm">{charCount} Characters</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4">
                    <button
                        onClick={handleConvert}
                        className="flex-grow md:flex-none px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95"
                    >
                        <CaseUpper className="w-5 h-5" />
                        Convert to Uppercase
                    </button>

                    <button
                        onClick={handleCopy}
                        disabled={!text}
                        className={`flex-grow md:flex-none px-8 py-4 ${copied ? "bg-green-500 text-white" : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
                            } rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {copied ? (
                            <>
                                <CheckCircle2 className="w-5 h-5" />
                                Copied!
                            </>
                        ) : (
                            <>
                                <Copy className="w-5 h-5" />
                                Copy Result
                            </>
                        )}
                    </button>

                    <button
                        onClick={handleClear}
                        disabled={!text}
                        className="flex-grow md:flex-none px-8 py-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed border border-red-100"
                    >
                        <Trash2 className="w-5 h-5" />
                        Clear
                    </button>
                </div>
            </div>
        </ToolLayout>
    );
}
