"use client";

import { useState } from "react";
import { AlignLeft, Copy, Trash2, CheckCircle2 } from "lucide-react";
import ToolLayout from "@/app/components/ToolLayout";

export default function RemoveExtraSpaces() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    setText(prev => {
      // Remove leading/trailing spaces and replace multiple spaces with single space
      // while preserving line breaks.
      return prev
        .split("\n")
        .map(line => line.trim().replace(/\s+/g, " "))
        .join("\n");
    });
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
      title="Remove Extra Spaces"
      description="Clean up your text by removing redundant white spaces while keeping line breaks."
      icon={AlignLeft}
      instructions={[
        "Type or paste your text into the box below.",
        "Click 'Remove Extra Spaces' to tidy up the formatting.",
        "This tool replaces multiple spaces with a single space and trims line edges.",
        "Your original paragraph structure and line breaks will be preserved."
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
            <AlignLeft className="w-5 h-5" />
            Remove Extra Spaces
          </button>
          
          <button
            onClick={handleCopy}
            disabled={!text}
            className={`flex-grow md:flex-none px-8 py-4 ${
              copied ? "bg-green-500 text-white" : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
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
