"use client";

import { useState, useMemo } from "react";
import { Ruler, ArrowLeftRight, ChevronDown, Weight, Droplets, Maximize, Zap, Clock, HardDrive, Info } from "lucide-react";
import ToolLayout from "@/app/components/ToolLayout";

// Metadata is handled in a separate layout or sibling server component if needed, 
// for now, we'll remove it from the client-side file to avoid issues.

const units = {
    // ... existing units object
    length: {
        icon: Ruler,
        data: {
            meters: 1,
            kilometers: 0.001,
            centimeters: 100,
            millimeters: 1000,
            inches: 39.3701,
            feet: 3.28084,
            yards: 1.09361,
            miles: 0.000621371,
        }
    },
    weight: {
        icon: Weight,
        data: {
            kilograms: 1,
            grams: 1000,
            milligrams: 1000000,
            pounds: 2.20462,
            ounces: 35.274,
            tons: 0.001,
        }
    },
    volume: {
        icon: Droplets,
        data: {
            liters: 1,
            milliliters: 1000,
            gallons: 0.264172,
            cups: 4.22675,
            quarts: 1.05669,
            pints: 2.11338,
        }
    },
    area: {
        icon: Maximize,
        data: {
            "sq meters": 1,
            hectares: 0.0001,
            "sq feet": 10.7639,
            acres: 0.000247105,
            "sq kilometers": 0.000001,
        }
    },
    speed: {
        icon: Zap,
        data: {
            "km/h": 1,
            "m/s": 0.277778,
            mph: 0.621371,
            knots: 0.539957,
            mach: 0.000816,
        }
    },
    time: {
        icon: Clock,
        data: {
            seconds: 1,
            minutes: 1 / 60,
            hours: 1 / 3600,
            days: 1 / 86400,
            weeks: 1 / 604800,
            years: 1 / 31536000,
        }
    },
    data: {
        icon: HardDrive,
        data: {
            bytes: 1,
            kilobytes: 1 / 1024,
            megabytes: 1 / (1024 ** 2),
            gigabytes: 1 / (1024 ** 3),
            terabytes: 1 / (1024 ** 4),
            petabytes: 1 / (1024 ** 5),
        }
    },
    temperature: {
        icon: Info,
        data: {
            celsius: "C",
            fahrenheit: "F",
            kelvin: "K",
        }
    }
};

type CategoryKey = keyof typeof units;

export default function UnitConverter() {
    const [category, setCategory] = useState<CategoryKey>("length");
    const [fromUnit, setFromUnit] = useState(Object.keys(units.length.data)[0]);
    const [toUnit, setToUnit] = useState(Object.keys(units.length.data)[1]);
    const [value, setValue] = useState<string>("1");

    const convertValue = (val: string, from: string, to: string, cat: CategoryKey) => {
        const num = parseFloat(val);
        if (isNaN(num)) return 0;

        if (cat === "temperature") {
            if (from === to) return num;
            let celsius = num;
            if (from === "fahrenheit") celsius = (num - 32) * 5 / 9;
            if (from === "kelvin") celsius = num - 273.15;

            if (to === "fahrenheit") return (celsius * 9 / 5) + 32;
            if (to === "kelvin") return celsius + 273.15;
            return celsius;
        }

        const categoryData = units[cat].data as Record<string, number>;
        const baseValue = num / categoryData[from];
        return baseValue * categoryData[to];
    };

    const result = useMemo(() => {
        return convertValue(value, fromUnit, toUnit, category);
    }, [value, fromUnit, toUnit, category]);

    const handleCategoryChange = (cat: CategoryKey) => {
        setCategory(cat);
        const unitList = Object.keys(units[cat].data);
        setFromUnit(unitList[0]);
        setToUnit(unitList[1] || unitList[0]);
    };

    const swapUnits = () => {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
    };

    const formatResult = (val: number) => {
        if (Math.abs(val) < 0.000001 && val !== 0) {
            return val.toExponential(6);
        }
        return val.toLocaleString(undefined, { maximumFractionDigits: 6 });
    };

    const ActiveIcon = units[category].icon;

    return (
        <ToolLayout
            title="Unit Converter"
            description="Professional-grade conversion for length, weight, volume, data, and more."
            icon={Ruler}
            instructions={[
                "Choose a category from the tabs below to start converting.",
                "Enter the value you wish to convert in the 'From' field.",
                "Select your source and target units from the dropdown menus.",
                "Use the swap button to quickly flip units."
            ]}
        >
            <div className="max-w-4xl mx-auto py-8">
                {/* Category Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 bg-neutral-100 p-1.5 rounded-[1.5rem] mb-12 shadow-inner group">
                    {(Object.keys(units) as CategoryKey[]).map((cat) => {
                        const Icon = units[cat].icon;
                        return (
                            <button
                                key={cat}
                                onClick={() => handleCategoryChange(cat)}
                                className={`
                  flex flex-col items-center justify-center py-3 px-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all
                  ${category === cat
                                        ? "bg-white text-primary shadow-sm scale-100"
                                        : "text-neutral-400 hover:text-neutral-600 hover:bg-white/50 active:scale-95"}
                `}
                            >
                                <Icon className={`w-5 h-5 mb-1.5 ${category === cat ? "text-primary" : "text-neutral-300"}`} />
                                <span className="truncate w-full text-center">{cat}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start h-full">
                    {/* Input Side */}
                    <div className="bg-white p-10 rounded-[2.5rem] border border-neutral-200/60 shadow-soft space-y-8 animate-fade-in-up">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                <ActiveIcon className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-neutral-900 capitalize">{category} Conversion</h2>
                                <p className="text-sm text-neutral-400">Enter value to convert</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] ml-2">From</label>
                                <div className="relative group">
                                    <input
                                        type="number"
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                        className="w-full bg-neutral-50 border border-neutral-100 rounded-[1.5rem] px-6 py-6 text-3xl font-bold text-neutral-900 focus:outline-none focus:border-primary/30 focus:bg-white transition-all"
                                        placeholder="0.00"
                                    />
                                    <div className="absolute top-1/2 -translate-y-1/2 right-4">
                                        <select
                                            value={fromUnit}
                                            onChange={(e) => setFromUnit(e.target.value)}
                                            className="bg-white border border-neutral-200 rounded-xl px-4 py-2 text-sm font-bold text-neutral-600 appearance-none pr-8 cursor-pointer focus:outline-none focus:border-primary transition-all shadow-sm"
                                        >
                                            {Object.keys(units[category].data).map(u => (
                                                <option key={u} value={u} className="capitalize">{u}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-neutral-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center -my-2 relative z-10">
                                <button
                                    onClick={swapUnits}
                                    className="w-12 h-12 bg-white border border-neutral-100 rounded-2xl flex items-center justify-center text-neutral-400 hover:text-primary hover:scale-110 hover:rotate-180 transition-all shadow-md group active:scale-95"
                                >
                                    <ArrowLeftRight className="w-5 h-5 group-hover:scale-110" />
                                </button>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] ml-2">To</label>
                                <div className="relative">
                                    <div className="w-full bg-primary/5 border border-primary/10 rounded-[1.5rem] px-6 py-6 text-3xl font-bold text-primary min-h-[82px] flex items-center">
                                        {formatResult(result)}
                                    </div>
                                    <div className="absolute top-1/2 -translate-y-1/2 right-4">
                                        <select
                                            value={toUnit}
                                            onChange={(e) => setToUnit(e.target.value)}
                                            className="bg-white border border-neutral-200 rounded-xl px-4 py-2 text-sm font-bold text-neutral-600 appearance-none pr-8 cursor-pointer focus:outline-none focus:border-primary transition-all shadow-sm"
                                        >
                                            {Object.keys(units[category].data).map(u => (
                                                <option key={u} value={u} className="capitalize">{u}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-neutral-400 pointer-events-none" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 ml-2 py-1">
                                    <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Equivalent to:</span>
                                    <span className="text-xs font-mono font-bold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-md">
                                        {value || "0"} {fromUnit}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Details Side */}
                    <div className="space-y-8 animate-fade-in-up [animation-delay:100ms]">
                        <div className="bg-white p-8 rounded-[2rem] border border-neutral-200/60 shadow-soft">
                            <h4 className="font-bold text-neutral-900 mb-6 flex items-center gap-2">
                                <Info className="w-4 h-4 text-primary" />
                                Quick Tips
                            </h4>
                            <ul className="space-y-4">
                                <li className="flex gap-4 items-start">
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                                    <p className="text-sm text-neutral-500">Select any measurement category from the top tabs to switch modes.</p>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                                    <p className="text-sm text-neutral-500">Use the swap icon to instantly flip the 'From' and 'To' units.</p>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                                    <p className="text-sm text-neutral-500">Conversions happen in real-time as you type or change units.</p>
                                </li>
                            </ul>
                        </div>

                        <div className="ad-placeholder h-24 !m-0 rounded-2xl opacity-60">
                            Banner Support Space
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
