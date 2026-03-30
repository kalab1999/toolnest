"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Search, Zap, Shield, Star, TrendingUp, Users } from "lucide-react";
import { toolsData } from "@/app/lib/tools";

// Map each category slug to a CSS class for the icon background
const categoryIconClass: Record<string, string> = {
  "pdf-tools":   "icon-pdf",
  "image-tools": "icon-image",
  "converters":  "icon-converter",
  "utilities":   "icon-utilities",
  "text-tools":  "icon-text",
  "internet-tools": "icon-internet",
};

// Hand-picked popular tools (name + href)
const popularTools = [
  { name: "Compress PDF",       slug: "pdf-tools",       href: "/compress-pdf",       iconClass: "icon-pdf" },
  { name: "JPG to PNG",         slug: "image-tools",     href: "/jpg-to-png",         iconClass: "icon-image" },
  { name: "QR Code Generator",  slug: "utilities",       href: "/qr-code-generator",  iconClass: "icon-utilities" },
  { name: "Password Generator", slug: "utilities",       href: "/password-generator", iconClass: "icon-utilities" },
  { name: "Unit Converter",     slug: "converters",      href: "/unit-converter",     iconClass: "icon-converter" },
  { name: "Word Counter",       slug: "utilities",       href: "/word-counter",       iconClass: "icon-utilities" },
];

// Resolve icon component from toolsData for a given href
function getIcon(href: string) {
  for (const section of toolsData) {
    const found = section.items.find(i => i.href === href);
    if (found) return found.icon;
  }
  return null;
}

// ─── Hero search (self-contained) ───────────────────────────────────────────
function HeroSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim()) {
      const q = query.toLowerCase();
      const res: any[] = [];
      toolsData.forEach(section => {
        section.items.forEach(item => {
          if (item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)) {
            res.push({ ...item, category: section.category, slug: section.slug });
          }
        });
      });
      setResults(res.slice(0, 8));
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setFocused(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative w-full max-w-2xl mx-auto">
      <div className={`hero-search flex items-center gap-3 px-5 py-4 ${focused ? "" : ""}`}>
        <Search className={`w-5 h-5 shrink-0 transition-colors ${focused ? "text-primary" : "text-neutral-400"}`} />
        <input
          type="text"
          placeholder="Search 50+ free tools — e.g. Compress PDF, QR Code…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          className="flex-1 bg-transparent text-neutral-900 placeholder-neutral-400 text-base outline-none font-medium"
        />
        {query && (
          <button
            onClick={() => { setQuery(""); setResults([]); }}
            className="text-neutral-400 hover:text-neutral-600 text-xs font-bold transition-colors"
          >✕</button>
        )}
        {!query && (
          <span className="hidden sm:flex items-center gap-1 text-[10px] font-bold text-neutral-400 bg-neutral-100 border border-neutral-200 rounded-md px-2 py-1 shrink-0">
            ⌘K
          </span>
        )}
      </div>

      {focused && query.trim() && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden z-30"
             style={{ animation: "slide-down 0.15s ease-out" }}>
          {results.length > 0 ? (
            <div className="py-2 max-h-[380px] overflow-y-auto">
              <div className="px-5 py-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest border-b border-neutral-50">
                {results.length} tools found
              </div>
              {results.map(tool => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    onClick={() => { setQuery(""); setFocused(false); }}
                    className="flex items-center gap-4 px-5 py-3.5 hover:bg-neutral-50 transition-colors group/row"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white ${categoryIconClass[tool.slug] || "icon-utilities"} group-hover/row:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-neutral-900 group-hover/row:text-primary transition-colors">{tool.name}</p>
                      <p className="text-[11px] text-neutral-400 line-clamp-1">{tool.description}</p>
                    </div>
                    <span className="text-[9px] font-bold text-neutral-400 bg-neutral-100 rounded-md px-2 py-1 shrink-0">{tool.category}</span>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="w-14 h-14 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6 text-neutral-300" />
              </div>
              <p className="text-sm font-bold text-neutral-700">No tools found</p>
              <p className="text-xs text-neutral-400 mt-1">Try "compress", "convert", "generator"…</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="relative overflow-hidden">

      {/* ── Hero Section ─────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background orbs */}
        <div className="orb w-[700px] h-[700px] opacity-[0.07] top-[-200px] right-[-200px]"
             style={{ background: "radial-gradient(circle, #3b82f6, #1d4ed8)" }} />
        <div className="orb w-[500px] h-[500px] opacity-[0.05] bottom-[-100px] left-[-150px]"
             style={{ background: "radial-gradient(circle, #6366f1, #8b5cf6)", animationDelay: "2s" }} />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 -z-10"
             style={{
               backgroundImage: "radial-gradient(circle at 1px 1px, rgba(37,99,235,0.06) 1px, transparent 0)",
               backgroundSize: "40px 40px"
             }} />

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-green-500" style={{ animation: "pulse-ring 2s infinite" }} />
            937,205+ Users Worldwide · 100% Free
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] mb-6 animate-fade-in-up"
              style={{ animationDelay: "60ms" }}>
            Your Free Online
            <br />
            <span className="gradient-text">Toolkit, Reimagined.</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg md:text-xl text-neutral-500 mb-10 leading-relaxed max-w-2xl mx-auto animate-fade-in-up font-medium"
             style={{ animationDelay: "120ms" }}>
            50+ powerful tools for PDFs, images, conversions &amp; more.
            No sign-up. No watermarks. Just results.
          </p>

          {/* Hero Search */}
          <div className="animate-fade-in-up mb-8" style={{ animationDelay: "180ms" }}>
            <HeroSearch />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-14 animate-fade-in-up" style={{ animationDelay: "240ms" }}>
            <Link href="/all-tools" className="premium-button text-base !py-3.5 !px-8">
              Explore All Tools
            </Link>
            <Link href="/about" className="bg-white border border-neutral-200 text-neutral-800 px-8 py-3.5 rounded-xl font-bold text-base hover:bg-neutral-50 hover:border-neutral-300 hover:shadow-md transition-all">
              About ToolNest
            </Link>
          </div>

          {/* Trust Chips */}
          <div className="flex flex-wrap justify-center gap-6 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            {[
              { icon: Zap, label: "Lightning Fast", color: "text-amber-500" },
              { icon: Shield, label: "Privacy First", color: "text-green-500" },
              { icon: Users, label: "937K+ Users", color: "text-blue-500" },
            ].map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex items-center gap-2 text-neutral-500 text-sm font-semibold">
                <Icon className={`w-4 h-4 ${color}`} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ad Banner ────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 max-w-4xl mb-16">
        <div className="ad-placeholder h-20 rounded-2xl opacity-50" />
      </div>

      {/* ── Popular Tools ─────────────────────────────────────────────────── */}
      <section className="px-4 mb-24">
        <div className="container mx-auto">
          {/* Section header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700">
                <TrendingUp className="w-3.5 h-3.5" />
                <span className="text-xs font-black uppercase tracking-widest">Popular</span>
              </div>
              <h2 className="text-2xl font-black text-neutral-900 tracking-tight">Most Used Tools</h2>
            </div>
            <Link href="/all-tools" className="text-primary text-xs font-bold flex items-center gap-2 hover:gap-3 transition-all uppercase tracking-wider">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularTools.map((tool) => {
              const Icon = getIcon(tool.href);
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="glass-card p-5 flex flex-col items-center text-center gap-3 group"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white ${tool.iconClass} group-hover:scale-110 transition-transform duration-300`}>
                    {Icon && <Icon className="w-6 h-6" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-900 group-hover:text-primary transition-colors leading-tight">{tool.name}</p>
                  </div>
                  <span className="tag-popular">
                    <Star className="w-2.5 h-2.5" />
                    Popular
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Categories & Tool Cards ───────────────────────────────────────── */}
      <div className="container mx-auto px-4 relative z-10 pb-32">
        <div className="flex items-center gap-5 mb-14">
          <h2 className="text-xs font-black text-primary uppercase tracking-[0.3em] whitespace-nowrap">Browse by Category</h2>
          <div className="h-px bg-neutral-200/70 flex-grow" />
        </div>

        {toolsData.map((section, idx) => {
          const iconClass = categoryIconClass[section.slug] || "icon-utilities";

          return (
            <div key={section.category} className="mb-24 animate-fade-in-up" style={{ animationDelay: `${(idx + 3) * 80}ms` }}>
              {/* Category header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white ${iconClass} shrink-0 mt-0.5`}>
                    {section.items[0]?.icon && React.createElement(section.items[0].icon, { className: "w-5 h-5" })}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-black text-neutral-900 tracking-tight">{section.category}</h3>
                      <span className="text-[10px] font-bold text-neutral-400 bg-neutral-100 rounded-full px-2 py-0.5">
                        {section.items.length} tool{section.items.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-500">{section.description}</p>
                  </div>
                </div>
                <Link
                  href={`/${section.slug}`}
                  className="text-primary text-[11px] font-bold flex items-center gap-2 hover:gap-3 transition-all uppercase tracking-wider shrink-0"
                >
                  View All <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Tool cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {section.items.map((tool, idx2) => (
                  <React.Fragment key={tool.name}>
                    <Link
                      href={tool.href}
                      className="glass-card p-6 flex flex-col h-full group relative overflow-hidden cursor-pointer active:scale-[0.98]"
                    >
                      {/* Subtle hover gradient bg */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"
                           style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.02) 0%, rgba(59,130,246,0.05) 100%)" }} />

                      {/* Icon */}
                      <div className={`w-13 h-13 w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-5 ${iconClass} group-hover:scale-110 transition-transform duration-300 relative`}>
                        <tool.icon className="w-7 h-7" />
                      </div>

                      {/* Content */}
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-base font-black text-neutral-900 group-hover:text-primary transition-colors leading-tight">
                          {tool.name}
                        </h4>
                      </div>
                      <p className="text-sm text-neutral-500 mb-5 flex-grow leading-relaxed">
                        {tool.description}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                        <span className="tag-free">Free</span>
                        <div className="flex items-center gap-1.5 text-primary text-sm font-bold group-hover:translate-x-1 transition-transform">
                          Open Tool <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </Link>

                    {/* Ad slot every 5th tool */}
                    {(idx2 + 1) === 5 && (
                      <div className="glass-card flex flex-col h-full overflow-hidden ad-placeholder border-dashed min-h-[260px] border-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Horizontal ad break */}
              <div className="ad-placeholder w-full h-24 mt-10 rounded-2xl" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
