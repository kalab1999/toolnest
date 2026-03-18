"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { toolsData } from "@/app/lib/tools";

export default function Home() {
  return (
    <div className="pb-32 relative overflow-hidden">
      {/* Premium Background Accents */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -z-10 -translate-x-1/2 animate-pulse [animation-delay:1000ms]"></div>
      
      {/* Trust Section */}
      <div className="w-full bg-white border-b border-neutral-100 py-16 px-4 mt-16 relative">
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-600 text-xs font-bold uppercase tracking-widest mb-6 border border-green-500/20">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Globally Trusted
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-900 mb-4 tracking-tight">
            Trusted by over <span className="text-primary">937,205</span> users worldwide.
          </h2>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            More than 937,205 users use our free online tools to manage and convert their documents quickly and securely.
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-20 pb-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-neutral-900 mb-6 tracking-tight leading-[1.2] animate-fade-in-up">
            Free Online Tools for <br className="hidden md:block" />
            <span className="text-primary tracking-normal">
              Images, Converters & Utilities
            </span>
          </h1>
          
          <p className="text-lg text-neutral-500 mb-10 leading-relaxed max-w-2xl mx-auto animate-fade-in-up [animation-delay:100ms]">
            ToolNest provides fast, simple, and powerful tools to help you work with images, text, and conversions instantly. Every tool you need in one place.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up [animation-delay:200ms]">
            <Link href="/all-tools" className="premium-button text-base !py-3.5 !px-8">
              Explore All Tools
            </Link>
            <Link href="/about" className="bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-200 px-8 py-3.5 rounded-xl font-bold transition-all shadow-sm hover:shadow-md text-base">
              Learn More
            </Link>
          </div>

          {/* Hero Ad Placement */}
          <div className="mt-12 max-w-2xl mx-auto animate-fade-in-up [animation-delay:250ms]">
            <div className="ad-placeholder h-20 opacity-40 border-dashed border border-neutral-200 rounded-2xl flex items-center justify-center text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
              Sponsorship Placement
            </div>
          </div>
          
          {/* Trust Factors */}
          <div className="mt-16 flex flex-wrap justify-center gap-10 opacity-30 grayscale animate-fade-in-up [animation-delay:300ms]">
             <div className="text-[10px] font-black text-neutral-900 uppercase tracking-widest">100% SECURE</div>
             <div className="text-[10px] font-black text-neutral-900 uppercase tracking-widest">OPEN SOURCE</div>
             <div className="text-[10px] font-black text-neutral-900 uppercase tracking-widest">PRIVACY FIRST</div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center gap-6 mb-12">
          <h2 className="text-[11px] font-black text-primary uppercase tracking-[0.3em] whitespace-nowrap">Browse Categories</h2>
          <div className="h-px bg-neutral-200/60 flex-grow"></div>
        </div>

        {toolsData.map((section, idx) => (
          <div key={section.category} className="mb-20 animate-fade-in-up" style={{ animationDelay: `${(idx + 4) * 100}ms` }}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 tracking-tight mb-1.5">{section.category}</h3>
                <p className="text-neutral-500 text-xs max-w-sm">{section.description}</p>
              </div>
              <Link href={`/${section.slug}`} className="text-primary text-[11px] font-bold flex items-center gap-2 hover:gap-3 transition-all uppercase tracking-wider">
                View All {section.category} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {section.items.map((tool, idx2) => (
                <React.Fragment key={tool.name}>
                  <Link 
                    href={tool.href}
                    className="glass-card p-6 flex flex-col h-full group relative overflow-hidden bg-white hover:border-primary cursor-pointer active:scale-95 transition-all"
                  >
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-white group-hover:-translate-y-1 transition-all duration-300">
                      <tool.icon className="w-7 h-7" />
                    </div>
                    <h4 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-primary transition-colors">{tool.name}</h4>
                    <p className="text-sm text-neutral-500 mb-6 flex-grow leading-relaxed">
                      {tool.description}
                    </p>
                    <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold group-hover:translate-x-1 transition-transform">
                      Open Tool <ArrowRight className="w-4 h-4 text-primary" />
                    </div>
                  </Link>
                  {/* Square Ad Placement Every 5 Tools */}
                  {(idx2 + 1) === 5 && (
                    <div className="glass-card p-0 flex flex-col h-full overflow-hidden ad-placeholder border-dashed min-h-[250px]">
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
            
            {/* Horizontal Ad Break */}
            <div className="ad-placeholder w-full h-24 mt-12 rounded-xl"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
