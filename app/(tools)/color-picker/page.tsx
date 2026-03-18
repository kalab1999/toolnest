"use client";

import { useState, useRef, useEffect } from "react";
import { Pipette, Copy, Check, Upload, Image as ImageIcon, Palette } from "lucide-react";
import ToolLayout from "@/app/components/ToolLayout";

export default function ColorPicker() {
  const [color, setColor] = useState("#2563eb");
  const [mode, setMode] = useState<"palette" | "image">("palette");
  const [image, setImage] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const hexToHsl = (hex: string) => {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: h = 0;
      }
      h /= 6;
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setMode("image");
      };
      reader.readAsDataURL(file);
    }
  };

  const drawImageToCanvas = () => {
    if (canvasRef.current && imageRef.current && image) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (ctx) {
        const img = imageRef.current;
        canvas.width = img.clientWidth;
        canvas.height = img.clientHeight;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    }
  };

  useEffect(() => {
    if (mode === "image" && image) {
      const timer = setTimeout(drawImageToCanvas, 100);
      window.addEventListener("resize", drawImageToCanvas);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("resize", drawImageToCanvas);
      };
    }
  }, [mode, image]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor(e.clientX - rect.left);
      const y = Math.floor(e.clientY - rect.top);
      
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        const hex = "#" + [pixel[0], pixel[1], pixel[2]].map(x => x.toString(16).padStart(2, "0")).join("");
        setColor(hex);
      }
    }
  };

  return (
    <ToolLayout
      title="Color Picker"
      description="Pick, convert, and explore colors from a palette or uploaded images instantly."
      icon={Pipette}
      instructions={[
        "Use 'Palette' to select colors using the slider.",
        "Switch to 'Image' to pick colors from your own photos.",
        "Copy HEX, RGB, or HSL codes with a single click."
      ]}
    >
      <div className="max-w-4xl mx-auto py-4">
        {/* Mode Toggle */}
        <div className="flex justify-center mb-8">
            <div className="bg-neutral-100 p-1 rounded-2xl flex gap-1 shadow-inner border border-neutral-200/50">
                <button 
                    onClick={() => setMode("palette")}
                    className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-bold transition-all ${mode === "palette" ? "bg-white text-primary shadow-sm" : "text-neutral-500 hover:text-neutral-700"}`}
                >
                    <Palette className="w-3.5 h-3.5" /> Palette
                </button>
                <button 
                    onClick={() => setMode("image")}
                    className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-bold transition-all ${mode === "image" ? "bg-white text-primary shadow-sm" : "text-neutral-500 hover:text-neutral-700"}`}
                >
                    <ImageIcon className="w-3.5 h-3.5" /> From Image
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Stage Area */}
            <div className="space-y-6">
                {mode === "palette" ? (
                    <div className="bg-white p-8 rounded-[2rem] border border-neutral-200/60 shadow-soft flex flex-col items-center">
                        <div className="relative group">
                            <input 
                                type="color" 
                                value={color} 
                                onChange={(e) => setColor(e.target.value)}
                                className="w-48 h-48 rounded-[2.5rem] cursor-pointer appearance-none border-0 p-0 overflow-hidden shadow-2xl shadow-primary/20 transition-transform active:scale-95"
                            />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:bg-black/5 rounded-[2.5rem] transition-all">
                                <Pipette className="w-12 h-12 text-white drop-shadow-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                        <p className="mt-6 text-neutral-400 text-[10px] font-bold uppercase tracking-widest">System Picker</p>
                    </div>
                ) : (
                    <div className="bg-white p-4 rounded-[2rem] border border-neutral-200/60 shadow-soft min-h-[300px] flex flex-col items-center justify-center relative overflow-hidden">
                        {!image ? (
                            <label className="flex flex-col items-center gap-3 cursor-pointer group">
                                <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                                    <Upload className="w-8 h-8" />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-bold text-neutral-900">Upload Image</p>
                                    <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-black">Click to start</p>
                                </div>
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                            </label>
                        ) : (
                            <div className="relative w-full h-full flex items-center justify-center group cursor-crosshair">
                                <img 
                                    ref={imageRef}
                                    src={image} 
                                    className="max-w-full max-h-[400px] rounded-xl shadow-lg"
                                    alt="Upload"
                                    onLoad={drawImageToCanvas}
                                />
                                <canvas 
                                    ref={canvasRef}
                                    onClick={handleCanvasClick}
                                    className="absolute inset-0 w-full h-full opacity-0 pointer-events-auto"
                                />
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <label className="bg-white/90 backdrop-blur-md p-2 rounded-lg shadow-lg border border-white/20 cursor-pointer flex items-center gap-2 text-[10px] font-bold text-neutral-900 hover:bg-white transition-colors">
                                        <Upload className="w-3 h-3" /> Change
                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Swatches Section */}
                <div className="bg-neutral-50/50 p-6 rounded-[1.5rem] border border-neutral-100">
                    <h3 className="text-[9px] font-black text-neutral-400 uppercase tracking-widest mb-4">Popular Palette</h3>
                    <div className="flex flex-wrap gap-2.5">
                        {["#2563eb", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4", "#f43f5e", "#14b8a6", "#3f3f46"].map((c) => (
                            <button 
                                key={c}
                                onClick={() => setColor(c)}
                                className={`w-9 h-9 rounded-lg border-2 transition-all hover:scale-110 active:scale-90 ${color === c ? 'border-primary shadow-lg scale-110' : 'border-white shadow-sm hover:border-neutral-200'}`}
                                style={{ backgroundColor: c }}
                                title={c}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Color Details Column */}
            <div className="space-y-6 lg:sticky lg:top-24">
                <div className="bg-white p-8 rounded-[2rem] border border-neutral-200/60 shadow-soft">
                    <div className="flex items-center gap-4 mb-8">
                        <div 
                            className="w-12 h-12 rounded-xl border border-neutral-100 shadow-inner shrink-0" 
                            style={{ backgroundColor: color }}
                        />
                        <div>
                            <h2 className="text-lg font-bold text-neutral-900 tracking-tight leading-tight">Active Color</h2>
                            <p className="text-neutral-400 font-mono text-xs uppercase tracking-wider">{color}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {[
                            { label: "HEX", value: color.toUpperCase() },
                            { label: "RGB", value: hexToRgb(color) },
                            { label: "HSL", value: hexToHsl(color) }
                        ].map((item) => (
                            <div key={item.label} className="flex flex-col gap-1.5">
                                <label className="text-[9px] font-black text-neutral-400 uppercase tracking-[0.2em]">{item.label}</label>
                                <div className="flex items-center gap-3 bg-neutral-50 border border-neutral-100 rounded-xl px-4 py-3 group hover:border-primary/20 transition-colors">
                                    <span className="font-mono text-base font-bold text-neutral-900 flex-grow truncate">{item.value}</span>
                                    <button 
                                        onClick={() => handleCopy(item.value, item.label)}
                                        className="p-2 bg-white border border-neutral-100 rounded-lg text-neutral-500 hover:text-primary transition-all shadow-sm flex items-center gap-2 group-hover:scale-105"
                                    >
                                        {copied === item.label ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </ToolLayout>
  );
}
