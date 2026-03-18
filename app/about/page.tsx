"use client";

import { Info, ShieldCheck, Zap, Globe, Heart } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="pb-32 bg-neutral-50/30 min-h-screen relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      
      <section className="pt-20 pb-12 px-4 relative">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-primary/20 animate-fade-in-up">
            <Info className="w-7 h-7" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6 tracking-tight animate-fade-in-up">
            About <span className="text-primary italic">ToolNest</span>
          </h1>
          <p className="text-lg text-neutral-500 leading-relaxed mb-8 max-w-2xl mx-auto animate-fade-in-up [animation-delay:100ms]">
            ToolNest is a next-generation platform dedicated to high-performance online utilities. 
            We build tools that are fast, accessible, and designed for the modern digital era.
          </p>

          <div className="ad-placeholder h-16 max-w-xl mx-auto opacity-40 border-dashed border border-neutral-200 rounded-2xl flex items-center justify-center text-[9px] font-black text-neutral-400 uppercase tracking-widest animate-fade-in-up [animation-delay:150ms]">
            Sponsorship Placement
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="animate-fade-in-up [animation-delay:200ms]">
            <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-3">Our Vision</h2>
            <h3 className="text-2xl font-bold text-neutral-900 mb-6 tracking-tight leading-tight">Empowering productivity through precision tools.</h3>
            <p className="text-neutral-500 text-sm leading-relaxed mb-8 max-w-md">
              We started ToolNest with a simple idea: that powerful digital tools shouldn&apos;t be locked behind complex installs or intrusive signups. 
              Our suite of utilities is built to process data efficiently.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: Zap, title: "Zero Lag", desc: "Optimized for instant results." },
                { icon: ShieldCheck, title: "Privacy First", desc: "Local browser-only processing." },
                { icon: Globe, title: "Always Free", desc: "Committed to accessibility." },
                { icon: Heart, title: "User Centric", desc: "Clean, simple interfaces." }
              ].map((item, i) => (
                <div key={i} className="flex gap-3 group">
                  <div className="w-10 h-10 bg-white border border-neutral-100 rounded-xl flex items-center justify-center text-primary flex-shrink-0 shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900 mb-0.5">{item.title}</h4>
                    <p className="text-[11px] text-neutral-400 leading-tight">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative animate-fade-in-up [animation-delay:400ms]">
              <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full -z-10 animate-pulse"></div>
              <div className="grid grid-cols-2 gap-4 relative max-w-xs mx-auto lg:mx-0">
                <div className="aspect-square glass-card flex items-center justify-center transform rotate-3 hover:rotate-0 transition-all duration-500">
                  <Zap className="w-12 h-12 text-primary opacity-30" />
                </div>
                <div className="aspect-square glass-card flex items-center justify-center transform -rotate-6 hover:rotate-0 transition-all duration-500 mt-8">
                  <ShieldCheck className="w-12 h-12 text-primary opacity-30" />
                </div>
                <div className="aspect-square glass-card flex items-center justify-center transform -rotate-3 hover:rotate-0 transition-all duration-500 -mt-8">
                  <Globe className="w-12 h-12 text-primary opacity-30" />
                </div>
                <div className="aspect-square glass-card flex items-center justify-center transform rotate-6 hover:rotate-0 transition-all duration-500">
                  <Heart className="w-12 h-12 text-primary opacity-30" />
                </div>
              </div>
          </div>
        </div>

        <div className="bg-primary rounded-[2.5rem] p-10 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/30 animate-fade-in-up [animation-delay:500ms]">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4 tracking-tight">Ready to simplify your workflow?</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto text-sm leading-relaxed">Join thousands of users who rely on ToolNest daily for professional-grade online utilities.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/all-tools" className="bg-white text-primary hover:bg-neutral-50 px-8 py-3.5 rounded-xl font-bold transition-all shadow-xl hover:-translate-y-1 text-sm">
                Explore Directory
              </Link>
              <Link href="/contact" className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-xl font-bold transition-all backdrop-blur-md border border-white/20 hover:-translate-y-1 text-sm">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
