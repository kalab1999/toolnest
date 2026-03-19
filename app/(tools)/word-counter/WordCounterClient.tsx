"use client";

import { useState, useMemo } from "react";
import { Type, Copy, Trash2, Check } from "lucide-react";
import ToolLayout from "@/app/components/ToolLayout";

export default function WordCounter() {
    const [text, setText] = useState("");
    const [copied, setCopied] = useState(false);

    const stats = useMemo(() => {
        const trimmed = text.trim();
        const words = trimmed ? trimmed.split(/\s+/).length : 0;
        const chars = text.length;
        const charsNoSpaces = text.replace(/\s/g, "").length;
        const sentences = trimmed ? trimmed.split(/[.!?]+/).filter(Boolean).length : 0;
        const lines = text ? text.split(/\n/).length : 0;

        // Reading time (average 200 words per minute)
        const readingTime = Math.ceil(words / 200);

        return { words, chars, charsNoSpaces, sentences, lines, readingTime };
    }, [text]);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleClear = () => {
        setText("");
    };

    return (
        <ToolLayout
            title="Word Counter"
            description="Count words, characters, sentences, and estimate reading time for your text."
            icon={Type}
            instructions={[
                "Type or paste your text into the input field above.",
                "The statistics will update in real-time as you type.",
                "Check the word count, character count, and other metrics below the text area.",
                "Use the copy or clear buttons to manage your text."
            ]}
        >
            <div className="space-y-8">
                {/* Editor Area */}
                <div className="relative group">
                    <div className="absolute right-4 top-4 flex gap-2 z-10">
                        <button
                            onClick={handleCopy}
                            className="p-2 bg-white border border-neutral-200 rounded-lg text-neutral-500 hover:text-primary transition-all shadow-sm"
                            title="Copy all text"
                        >
                            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                        <button
                            onClick={handleClear}
                            className="p-2 bg-white border border-neutral-200 rounded-lg text-neutral-500 hover:text-red-500 transition-all shadow-sm"
                            title="Clear text"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Start typing or paste your text here..."
                        className="w-full h-80 bg-neutral-50 border border-neutral-200 rounded-2xl p-8 pt-16 text-lg text-neutral-900 focus:outline-none focus:border-primary transition-colors resize-none leading-relaxed"
                    ></textarea>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {[
                        { label: "Words", value: stats.words },
                        { label: "Characters", value: stats.chars },
                        { label: "No Spaces", value: stats.charsNoSpaces },
                        { label: "Sentences", value: stats.sentences },
                        { label: "Lines", value: stats.lines },
                        { label: "Reading Time", value: `${stats.readingTime} min` },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-white border border-neutral-100 rounded-xl p-4 text-center shadow-sm">
                            <p className="text-2xl font-bold text-primary mb-1">{stat.value}</p>
                            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Keyword Density Simulation (Bonus) */}
                <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
                    <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
                        <Type className="w-4 h-4 text-primary" /> Character Insights
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        <div className="px-3 py-1 bg-white rounded-full border border-neutral-200 text-xs text-neutral-600">
                            Average Word Length: <span className="font-bold text-primary">{(stats.words ? stats.charsNoSpaces / stats.words : 0).toFixed(1)}</span>
                        </div>
                        <div className="px-3 py-1 bg-white rounded-full border border-neutral-200 text-xs text-neutral-600">
                            Paragraphs: <span className="font-bold text-primary">{text ? text.split(/\n\s*\n/).length : 0}</span>
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
