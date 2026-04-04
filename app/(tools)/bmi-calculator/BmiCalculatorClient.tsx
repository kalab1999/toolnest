
"use client";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "BMI Calculator Online Free | Check Your Body Mass Index",
    description: "Use our free BMI calculator to check your body mass index instantly. Fast, accurate, and easy to use for everyone.",
};

import { useState } from "react";
import {
    Ruler,
    RotateCcw,
    Info,
    Scale
} from "lucide-react";
import ToolLayout from "@/app/components/ToolLayout"; 
import { toolContents } from "@/app/lib/tool-content";

type UnitType = "metric" | "imperial";

export default function BmiCalculator() {
    const [unit, setUnit] = useState<UnitType>("metric");
    const [weight, setWeight] = useState<string>("");
    const [height, setHeight] = useState<string>("");
    const [result, setResult] = useState<{ bmi: number; category: string } | null>(null);

    const calculateBMI = () => {
        const w = parseFloat(weight);
        const h = parseFloat(height);

        if (isNaN(w) || isNaN(h) || h === 0) return;

        let bmiValue = 0;
        if (unit === "metric") {
            const heightInMeters = h / 100;
            bmiValue = w / (heightInMeters * heightInMeters);
        } else {
            bmiValue = (w / (h * h)) * 703;
        }

        const roundedBmi = Math.round(bmiValue * 10) / 10;

        let cat = "";
        if (roundedBmi < 18.5) cat = "Underweight";
        else if (roundedBmi < 25) cat = "Normal weight";
        else if (roundedBmi < 30) cat = "Overweight";
        else cat = "Obese";

        setResult({ bmi: roundedBmi, category: cat });
    };

    const resetFields = () => {
        setWeight("");
        setHeight("");
        setResult(null);
    };

    const getCategoryColor = (cat: string) => {
        switch (cat) {
            case "Underweight": return "text-blue-500 bg-blue-50";
            case "Normal weight": return "text-green-500 bg-green-50";
            case "Overweight": return "text-orange-500 bg-orange-50";
            case "Obese": return "text-red-500 bg-red-50";
            default: return "text-primary bg-primary/5";
        }
    };

    return (
        <ToolLayout
            content={toolContents["bmi-calculator"]}
            title="BMI Calculator"
            description="Calculate your Body Mass Index (BMI) to understand your weight category based on height."
            icon={Ruler}
            instructions={[
                "Choose your preferred measurement unit (Metric or Imperial).",
                "Enter your accurate height and weight in the fields provided.",
                "Click 'Calculate BMI' to see your result and health category.",
                "Use the result as a general health guide; consult a pro for detailed analysis."
            ]}
        >
            <div className="max-w-2xl mx-auto py-4">
                {/* Unit Toggle */}
                <div className="flex justify-center mb-10">
                    <div className="bg-neutral-100 p-1.5 rounded-2xl flex gap-1 shadow-inner border border-neutral-200/50">
                        <button
                            onClick={() => { setUnit("metric"); setResult(null); }}
                            className={`flex items-center gap-2 px-8 py-2.5 rounded-xl text-xs font-black transition-all uppercase tracking-widest ${unit === "metric" ? "bg-white text-primary shadow-sm" : "text-neutral-400 hover:text-neutral-600"}`}
                        >
                            Metric (kg/cm)
                        </button>
                        <button
                            onClick={() => { setUnit("imperial"); setResult(null); }}
                            className={`flex items-center gap-2 px-8 py-2.5 rounded-xl text-xs font-black transition-all uppercase tracking-widest ${unit === "imperial" ? "bg-white text-primary shadow-sm" : "text-neutral-400 hover:text-neutral-600"}`}
                        >
                            Imperial (lb/in)
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Input Section */}
                    <div className="bg-white p-8 rounded-3xl border border-neutral-200/60 shadow-soft space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">
                                    Weight ({unit === "metric" ? "kg" : "lbs"})
                                </label>
                                <div className="relative group">
                                    <Scale className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-300 group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="number"
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                        placeholder={`e.g. ${unit === "metric" ? "70" : "154"}`}
                                        className="w-full pl-11 pr-4 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl text-lg font-bold focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-neutral-300"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">
                                    Height ({unit === "metric" ? "cm" : "in"})
                                </label>
                                <div className="relative group">
                                    <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-300 group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="number"
                                        value={height}
                                        onChange={(e) => setHeight(e.target.value)}
                                        placeholder={`e.g. ${unit === "metric" ? "175" : "69"}`}
                                        className="w-full pl-11 pr-4 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl text-lg font-bold focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-neutral-300"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={calculateBMI}
                                disabled={!weight || !height}
                                className="flex-grow bg-primary hover:bg-primary-hover disabled:opacity-50 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary/20 text-sm flex items-center justify-center gap-2"
                            >
                                Calculate BMI
                            </button>
                            <button
                                onClick={resetFields}
                                className="p-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 rounded-2xl transition-colors"
                                title="Reset Content"
                            >
                                <RotateCcw className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Result Section */}
                    <div className="space-y-6">
                        {result ? (
                            <div className="bg-white p-8 rounded-3xl border border-neutral-200/60 shadow-soft animate-in zoom-in-95 duration-500">
                                <div className="text-center">
                                    <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-4">Your BMI Result</p>
                                    <div className="text-6xl font-black text-neutral-900 tracking-tighter mb-2">
                                        {result.bmi}
                                    </div>
                                    <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${getCategoryColor(result.category)}`}>
                                        {result.category}
                                    </div>
                                </div>

                                <div className="mt-8 pt-8 border-t border-neutral-100 flex justify-center">
                                    <div className="text-center">
                                        <p className="text-[9px] font-black text-neutral-400 uppercase mb-1">Normal Range</p>
                                        <p className="text-xs font-bold text-neutral-600">18.5 – 24.9</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-neutral-50/50 border-2 border-dashed border-neutral-200 rounded-3xl p-8 flex flex-col items-center justify-center h-full min-h-[300px] text-center opacity-60">
                                <Info className="w-8 h-8 text-neutral-300 mb-4" />
                                <p className="text-sm font-bold text-neutral-400">Enter your details to calculate<br />your Body Mass Index</p>
                            </div>
                        )}

                        {/* BMI Reference Table */}
                        <div className="bg-white/50 p-6 rounded-2xl border border-neutral-100 italic text-[10px] text-neutral-400 leading-relaxed">
                            Note: BMI is a useful measure of overweight and obesity. It is calculated from your height and weight. BMI is an estimate of body fat and a good gauge of your risk for diseases that can occur with more body fat.
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
