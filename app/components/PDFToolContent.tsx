"use client";

import React, { useState, useCallback } from "react";
import { UploadCloud, File, CheckCircle2, Loader2, Download } from "lucide-react";
import { useDropzone } from "react-dropzone";

interface PDFToolContentProps {
  actionLabel: string;
  onAction?: (files: File[]) => Promise<File[] | void>;
  multiple?: boolean;
}

export default function PDFToolContent({ 
  actionLabel, 
  onAction,
  multiple = true
}: PDFToolContentProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [processedFiles, setProcessedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (!multiple && acceptedFiles.length > 1) {
      setFiles([acceptedFiles[0]]);
    } else {
      setFiles(prev => [...prev, ...acceptedFiles]);
    }
    setProcessedFiles([]);
    setIsDone(false);
  }, [multiple]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    multiple
  });

  const handleAction = async () => {
    if (files.length === 0) return;
    
    setIsProcessing(true);
    
    try {
      if (onAction) {
        const result = await onAction(files);
        if (result && result.length > 0) {
          setProcessedFiles(result);
        } else {
          setProcessedFiles(files);
        }
      } else {
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 2000));
        setProcessedFiles(files);
      }
      setIsDone(true);
    } catch (error) {
      console.error("Action error:", error);
      alert("An error occurred during processing.");
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setFiles([]);
    setProcessedFiles([]);
    setIsDone(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      {/* Upload Area */}
      {!isProcessing && !isDone && (
        <div 
          {...getRootProps()} 
          className={`
            border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300
            ${isDragActive ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-neutral-200 hover:border-primary/50 hover:bg-neutral-50'}
            ${files.length > 0 ? 'bg-neutral-50 border-solid border-neutral-200' : ''}
          `}
        >
          <input {...getInputProps()} />
          
          {files.length === 0 ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-2">
                <UploadCloud className="w-10 h-10" />
              </div>
              <div>
                <p className="text-xl font-bold text-neutral-900 mb-2">
                  Select PDF file{multiple ? 's' : ''}
                </p>
                <p className="text-neutral-500 text-sm">
                  or drop PDF{multiple ? 's' : ''} here
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="flex flex-wrap justify-center gap-4">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl border border-neutral-200 shadow-sm">
                    <File className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium text-neutral-700 max-w-[150px] truncate">
                      {f.name}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-neutral-500 text-sm hover:text-primary transition-colors underline decoration-dotted underline-offset-4">
                Click here or drag to add more files
              </p>
            </div>
          )}
        </div>
      )}

      {/* Processing State */}
      {isProcessing && (
        <div className="border border-neutral-200 rounded-2xl p-16 text-center bg-white shadow-sm flex flex-col items-center justify-center space-y-6 animate-in fade-in zoom-in duration-300">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <div>
            <p className="text-xl font-bold text-neutral-900 mb-2">Processing your task...</p>
            <p className="text-neutral-500 text-sm">This usually takes just a few seconds.</p>
          </div>
        </div>
      )}

      {/* Success State */}
      {isDone && !isProcessing && (
        <div className="border border-neutral-200 rounded-2xl p-12 text-center bg-white shadow-sm flex flex-col items-center justify-center space-y-8 animate-in fade-in zoom-in duration-300">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <p className="text-2xl font-bold text-neutral-900 mb-2">Task Complete!</p>
            <p className="text-neutral-500 text-sm">Your files have been successfully processed.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm justify-center">
            <button 
              onClick={() => {
                processedFiles.forEach((file) => {
                  const url = URL.createObjectURL(file);
                  const a = document.createElement('a');
                  a.href = url;
                  // If it's the exact same array as files, it's mocked, use processed_ prefix. If it has a custom name from our processing, keep it.
                  a.download = processedFiles === files ? `processed_${file.name}` : file.name;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                });
              }}
              className="premium-button flex items-center justify-center gap-2 flex-1"
            >
              <Download className="w-4 h-4" />
              Download Result
            </button>
            <button 
              onClick={reset}
              className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-6 py-3 rounded-xl font-bold transition-colors text-sm flex items-center justify-center"
            >
              Start Over
            </button>
          </div>
        </div>
      )}

      {/* Action Button */}
      {files.length > 0 && !isProcessing && !isDone && (
        <div className="flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <button 
            onClick={handleAction}
            className="premium-button text-lg px-12 py-4 shadow-xl hover:shadow-2xl shadow-primary/20 flex items-center gap-3 group"
          >
            {actionLabel}
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <span className="text-xs">→</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
