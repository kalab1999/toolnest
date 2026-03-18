"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { toolsData } from "@/app/lib/tools";

export default function ImageToolsPage() {
  const category = toolsData.find(c => c.slug === "image-tools");
  if (!category) return null;

  return (
    <div className="pb-20 bg-neutral-50/30 min-h-screen">
      <section className="pt-20 pb-12 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary/5 blur-3xl -z-10 rounded-full"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/5 text-primary text-[9px] font-black uppercase tracking-[0.2em] mb-4">
            Category
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-4 tracking-tight">{category.category}</h1>
          <p className="text-neutral-500 max-w-xl mx-auto text-sm leading-relaxed opacity-85">{category.description}</p>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {category.items.map((tool, idx) => (
            <Link 
              key={tool.name} 
              href={tool.href}
              className="glass-card p-8 flex flex-col h-full group animate-fade-in-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="w-12 h-12 bg-neutral-50 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white group-hover:rotate-6 transition-all duration-500 shadow-inner">
                <tool.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors">{tool.name}</h3>
              <p className="text-xs text-neutral-500 mb-6 flex-grow leading-relaxed">{tool.description}</p>
              <div className="flex items-center gap-2 text-primary text-[11px] font-bold group-hover:translate-x-1 transition-all uppercase tracking-wider">
                Launch Tool <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>

        {/* Category Ad Space */}
        <div className="mt-20 ad-placeholder h-24 bg-white/50 border border-neutral-100/60 rounded-2xl flex items-center justify-center text-[10px] font-bold text-neutral-400 uppercase tracking-widest opacity-40">
          Support These Professional Utilities
        </div>
      </div>
    </div>
  );
}
