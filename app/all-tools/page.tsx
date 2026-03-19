"use client";

import Link from "next/link";
import Script from "next/script"; // <-- import Script for AdSense
import { toolsData } from "@/app/lib/tools";

export default function AllTools() {
  return (
    <div className="pb-20 bg-neutral-50/30 min-h-screen">

      {/* Load Google AdSense library */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2422025830935555"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <section className="pt-20 pb-12 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary/5 blur-3xl -z-10 rounded-full"></div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4 tracking-tight">
            Full Tool <span className="text-primary italic">Directory</span>
          </h1>
          <p className="text-neutral-500 max-w-xl mx-auto text-sm leading-relaxed opacity-80">
            Everything you need for image processing, data conversion, and internet utilities in one place. Fast, simple, and free.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {toolsData.map((section, idx) => (
          <div
            key={section.category}
            className="mb-16 animate-fade-in-up"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-lg font-bold text-neutral-900 tracking-tight">{section.category}</h2>
              <div className="h-px bg-neutral-200/60 flex-grow"></div>
              <span className="text-[9px] font-black text-neutral-400 uppercase tracking-[0.2em] bg-white border border-neutral-100 px-2.5 py-0.5 rounded-full">
                {section.items.length} Tools
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.items.map((tool) => (
                <Link
                  key={tool.name}
                  href={tool.href}
                  className="glass-card p-6 flex items-center gap-6 group relative overflow-hidden"
                >
                  <div className="w-12 h-12 bg-neutral-100/50 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:rotate-6 transition-all duration-500 shadow-inner shrink-0">
                    <tool.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 group-hover:text-primary transition-colors mb-0.5">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-neutral-500 line-clamp-1 leading-relaxed">{tool.description}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* In-Directory Ad Break */}
            <div className="my-6 text-center">
              <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-2422025830935555" // your AdSense client ID
                data-ad-slot="YOUR_AD_UNIT_ID"           // replace with your Ad Unit ID
                data-ad-format="auto"
                data-full-width-responsive="true"
              ></ins>
              <Script
                id={`ads-init-${idx}`} // unique ID for each section
                dangerouslySetInnerHTML={{
                  __html: `(adsbygoogle = window.adsbygoogle || []).push({});`,
                }}
                strategy="afterInteractive"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
