"use client";

import { LucideIcon, ArrowRight } from "lucide-react";

interface ToolLayoutProps {
  title: string;
  description: string;
  icon: LucideIcon;
  children: React.ReactNode;
  instructions: string[];
}

export default function ToolLayout({
  title,
  description,
  icon: Icon,
  children,
  instructions,
}: ToolLayoutProps) {
  return (
    <div className="bg-neutral-50/50 min-h-screen pb-24 relative overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 pt-24 pb-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Tool Area */}
          <div className="flex-grow space-y-6 animate-fade-in-up">
            {/* Contextual Ad Top */}
            <div className="ad-placeholder h-16 bg-white/40 border-dashed border border-neutral-200 rounded-2xl flex items-center justify-center text-[9px] font-black text-neutral-400 uppercase tracking-widest">
              Top Sponsorship slot
            </div>

            {/* Header Card */}
            <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-inner shrink-0 rotate-3 group-hover:rotate-0 transition-transform">
                  <Icon className="w-7 h-7" />
                </div>
                <div className="text-center md:text-left">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1">
                    <span className="text-[8px] font-black text-primary uppercase tracking-[0.2em] bg-primary/5 px-2 py-0.5 rounded-full">Utility</span>
                    <h1 className="text-xl md:text-2xl font-bold text-neutral-900 tracking-tight">{title}</h1>
                  </div>
                  <p className="text-neutral-500 text-xs max-w-xl leading-relaxed">{description}</p>
                </div>
              </div>
            </div>

            {/* Tool Surface */}
            <div className="bg-white p-6 md:p-8 rounded-xl border border-neutral-200 shadow-sm min-h-[300px]">
              {children}
            </div>

            {/* Tool Ad Placement */}
            <div className="ad-placeholder h-20 bg-neutral-900/5 rounded-2xl flex items-center justify-center text-[9px] font-black text-neutral-400 uppercase tracking-widest opacity-50">
              Interactive Ad Break
            </div>

            {/* User Guide */}
            <div className="bg-white p-8 rounded-xl border border-neutral-200 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-5 bg-primary rounded-full"></div>
                <h2 className="text-lg font-bold text-neutral-900 tracking-tight">Instructions</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {instructions.map((instruction, index) => (
                  <div key={index} className="flex gap-3 group">
                    <div className="flex-shrink-0 w-7 h-7 bg-neutral-50 rounded-lg flex items-center justify-center text-[10px] font-bold text-primary border border-neutral-100 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      {index + 1}
                    </div>
                    <p className="text-neutral-600 pt-1 leading-relaxed text-xs">
                      {instruction}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-72 flex-shrink-0 space-y-6 animate-fade-in-up [animation-delay:200ms]">
            <div className="sticky top-24 space-y-6">
              <div className="ad-placeholder h-[400px] !m-0 !rounded-2xl shadow-sm hover:border-primary/30 transition-colors bg-white/50 opacity-60">
                Sidebar Ad Box
              </div>
              
              <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm group">
                <h3 className="text-sm font-bold text-neutral-900 mb-3 flex items-center justify-between">
                  Quick Links
                  <ArrowRight className="w-3 h-3 text-primary group-hover:translate-x-1 transition-transform" />
                </h3>
                <div className="space-y-2">
                  <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 italic text-[10px] text-neutral-400 text-center uppercase tracking-widest font-black">
                    Sponsored Content
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
