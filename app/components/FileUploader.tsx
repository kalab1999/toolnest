"use client";

import { Upload, X, FileImage } from "lucide-react";
import { useState, useRef } from "react";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  accept: string;
  label: string;
}

export default function FileUploader({ onFileSelect, accept, label }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    setSelectedFile(file);
    onFileSelect(file);
  };

  const clearSelection = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      {!selectedFile ? (
        <div className="flex flex-col gap-3">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`
              relative w-full h-32 flex flex-col items-center justify-center border-2 border-dashed rounded-2xl cursor-pointer transition-all
              ${isDragging ? "border-primary bg-primary/5 scale-[1.01]" : "border-neutral-200 hover:border-primary/50 hover:bg-neutral-50"}
            `}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInput}
              accept={accept}
              className="hidden"
            />
            <div className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center mb-2 text-neutral-400">
              <Upload className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900 mb-0.5">{label}</h3>
            <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-black">Click or Drag Image</p>
          </div>
          
          <div className="ad-placeholder h-16 min-h-[64px] opacity-40 border-dashed border border-neutral-200 rounded-2xl flex items-center justify-center text-[9px] font-black text-neutral-400 uppercase tracking-widest">
            Sponsorship slot
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="relative w-full p-4 border border-neutral-200 rounded-2xl bg-neutral-50 flex items-center gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <FileImage className="w-5 h-5" />
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-sm font-bold text-neutral-900 truncate">{selectedFile.name}</p>
              <p className="text-[10px] text-neutral-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <button 
              onClick={clearSelection}
              className="p-2 hover:bg-neutral-200 rounded-lg text-neutral-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="ad-placeholder h-16 min-h-[64px] opacity-20 border-dashed border border-neutral-200 rounded-2xl flex items-center justify-center text-[9px] font-black text-neutral-400 uppercase tracking-widest">
            Ad Space
          </div>
        </div>
      )}
    </div>
  );
}
