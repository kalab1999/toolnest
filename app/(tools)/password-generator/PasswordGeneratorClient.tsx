"use client";

import { useState, useCallback, useEffect } from "react";
import { Lock, Copy, Check, RefreshCw, ShieldCheck, ShieldAlert } from "lucide-react";
import ToolLayout from "@/app/components/ToolLayout"; 
import { toolContents } from "@/app/lib/tool-content";

export default function PasswordGenerator() {
    const [password, setPassword] = useState("");
    const [length, setLength] = useState(16);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [copied, setCopied] = useState(false);

    // Generate on mount and when settings change
    useEffect(() => {
        const lowercase = "abcdefghijklmnopqrstuvwxyz";
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";
        const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

        let chars = lowercase;
        if (includeUppercase) chars += uppercase;
        if (includeNumbers) chars += numbers;
        if (includeSymbols) chars += symbols;

        let generatedPassword = "";
        for (let i = 0; i < length; i++) {
            generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setPassword(generatedPassword);
    }, [length, includeUppercase, includeNumbers, includeSymbols]);

    const generatePassword = () => {
        // Force a new generation with current settings
        const lowercase = "abcdefghijklmnopqrstuvwxyz";
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";
        const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

        let chars = lowercase;
        if (includeUppercase) chars += uppercase;
        if (includeNumbers) chars += numbers;
        if (includeSymbols) chars += symbols;

        let generatedPassword = "";
        for (let i = 0; i < length; i++) {
            generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setPassword(generatedPassword);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getStrength = () => {
        let score = 0;
        if (length > 12) score++;
        if (length > 20) score++;
        if (includeUppercase) score++;
        if (includeNumbers) score++;
        if (includeSymbols) score++;

        if (score <= 2) return { label: "Weak", color: "text-red-500", bg: "bg-red-500", icon: ShieldAlert };
        if (score <= 4) return { label: "Medium", color: "text-yellow-500", bg: "bg-yellow-500", icon: ShieldCheck };
        return { label: "Strong", color: "text-green-500", bg: "bg-green-500", icon: ShieldCheck };
    };

    const strength = getStrength();

    return (
        <ToolLayout
            content={toolContents["password-generator"]}
            title="Password Generator"
            description="Create secure, random passwords to keep your online accounts safe."
            icon={Lock}
            instructions={[
                "Choose the length of your password using the slider.",
                "Select the character types you want to include (Uppercase, Numbers, Symbols).",
                "The password will be generated automatically as you change settings.",
                "Click the copy button to copy it to your clipboard."
            ]}
        >
            <div className="max-w-2xl mx-auto py-8">
                {/* Result Area */}
                <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-8 mb-8 relative group overflow-hidden shadow-sm">
                    <div className="absolute top-0 left-0 h-1 transition-all duration-500" style={{ width: `${(length / 50) * 100}%`, backgroundColor: strength.color.replace('text', 'var') }}></div>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex-grow min-w-0">
                            <span className="text-neutral-900 font-mono text-2xl md:text-3xl break-all">
                                {password}
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={generatePassword}
                                className="p-3 bg-white border border-neutral-200 hover:border-primary/20 rounded-xl text-neutral-400 hover:text-primary transition-all transform active:rotate-180 duration-500 shadow-sm"
                                title="Generate New"
                            >
                                <RefreshCw className="w-6 h-6" />
                            </button>
                            <button
                                onClick={handleCopy}
                                className="p-3 bg-primary hover:bg-primary-hover rounded-xl text-white transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
                                title="Copy Password"
                            >
                                {copied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
                                <span className="text-sm font-bold hidden sm:inline">{copied ? "Copied!" : "Copy"}</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Strength Indicator */}
                <div className={`flex items-center gap-2 mb-12 font-bold ${strength.color}`}>
                    <strength.icon className="w-5 h-5" />
                    <span>Security Strength: {strength.label}</span>
                </div>

                {/* Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-bold text-neutral-900">Password Length</label>
                                <span className="text-sm font-bold text-primary px-3 py-1 bg-primary/10 rounded-lg">{length}</span>
                            </div>
                            <input
                                type="range"
                                min="6"
                                max="50"
                                value={length}
                                onChange={(e) => setLength(parseInt(e.target.value))}
                                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-sm font-bold text-neutral-900 block mb-2">Options</label>
                        {[
                            { label: "Include Uppercase", state: includeUppercase, setter: setIncludeUppercase },
                            { label: "Include Numbers", state: includeNumbers, setter: setIncludeNumbers },
                            { label: "Include Symbols", state: includeSymbols, setter: setIncludeSymbols }
                        ].map((opt) => (
                            <label key={opt.label} className="flex items-center justify-between p-4 bg-neutral-50 border border-neutral-100 rounded-xl cursor-pointer hover:bg-neutral-100 transition-all">
                                <span className="text-sm font-medium text-neutral-700">{opt.label}</span>
                                <input
                                    type="checkbox"
                                    checked={opt.state}
                                    onChange={(e) => opt.setter(e.target.checked)}
                                    className="w-5 h-5 rounded border-neutral-300 text-primary focus:ring-primary"
                                />
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
