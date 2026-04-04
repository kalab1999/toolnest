"use client";

import { useState } from "react";
import { LucideIcon, ArrowRight, ChevronDown } from "lucide-react";

export interface FAQ {
  question: string;
  answer: string;
}

export interface ToolContentData {
  whatIsIt: string;
  howItWorks: string;
  benefits: { title: string; description: string }[];
  whenToUse: string;
  faqs: FAQ[];
  conclusion: string;
}

interface ToolLayoutProps {
  title: string;
  description: string;
  icon: LucideIcon;
  children: React.ReactNode;
  instructions?: string[];
  content?: ToolContentData;
}

function FAQItem({ faq }: { faq: FAQ }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-neutral-200 rounded-xl overflow-hidden mb-3 bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left bg-neutral-50/50 hover:bg-neutral-50 transition-colors"
      >
        <span className="font-bold text-neutral-900 text-sm">{faq.question}</span>
        <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="p-5 text-neutral-600 text-sm leading-relaxed border-t border-neutral-100">
          {faq.answer}
        </div>
      </div>
    </div>
  );
}

export default function ToolLayout({
  title,
  description,
  icon: Icon,
  children,
  instructions = [],
  content,
}: ToolLayoutProps) {
  return (
    <div className="bg-neutral-50/50 min-h-screen pb-24 relative overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 pt-24 pb-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Tool Area */}
          <div className="flex-grow space-y-6 animate-fade-in-up">
            
            {/* Header Card */}
            <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-inner shrink-0 rotate-3 group-hover:rotate-0 transition-transform">
                  <Icon className="w-7 h-7" />
                </div>
                <div className="text-center md:text-left">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1">
                    <h1 className="text-xl md:text-3xl font-bold text-neutral-900 tracking-tight">{title}</h1>
                  </div>
                  <p className="text-neutral-500 text-sm max-w-2xl leading-relaxed mt-2">{description}</p>
                </div>
              </div>
            </div>

            {/* Contextual Ad Top */}
            <div className="w-full h-[90px] bg-white/40 border border-neutral-200 rounded-2xl flex items-center justify-center overflow-hidden">
                {/* AdSense Placement: Above Tool */}
                <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest text-center">
                  Advertisement
                  <div className="w-[728px] max-w-full h-[90px] bg-neutral-100 mt-1 flex items-center justify-center rounded-lg">Ad Slot 728x90</div>
                </div>
            </div>

            {/* Tool Surface (The core functional app) */}
            <div className="bg-white p-6 md:p-8 rounded-xl border border-neutral-200 shadow-xl min-h-[300px]">
              {children}
            </div>

            {/* AdSense Placement: Below Tool */}
            <div className="w-full min-h-[100px] bg-white/40 border border-neutral-200 rounded-2xl flex items-center justify-center overflow-hidden py-4">
                <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest text-center w-full">
                  Advertisement
                  <div className="w-[90%] max-w-[970px] h-[90px] lg:h-[250px] mx-auto bg-neutral-100 mt-2 flex items-center justify-center rounded-lg">Ad Slot 970x250</div>
                </div>
            </div>

            {/* Legacy Instructions (fallback) */}
            {!content && instructions && instructions.length > 0 && (
              <div className="bg-white p-8 rounded-xl border border-neutral-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-5 bg-primary rounded-full"></div>
                  <h2 className="text-lg font-bold text-neutral-900 tracking-tight">How to Use</h2>
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
            )}

            {/* Rich Content Sections for AdSense (600-1000 words logic) */}
            {content && (
              <article className="prose prose-neutral max-w-none space-y-12 bg-white p-6 md:p-10 rounded-xl border border-neutral-200 shadow-sm mt-8">
                
                {/* What is it */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1.5 h-6 bg-primary rounded-full mt-1"></div>
                    <h2 className="text-2xl font-black text-neutral-900 tracking-tight m-0">What is this Tool?</h2>
                  </div>
                  <p className="text-neutral-600 text-base leading-loose whitespace-pre-line">{content.whatIsIt}</p>
                </section>

                {/* How it works */}
                <section className="bg-neutral-50 -mx-6 md:-mx-10 px-6 md:px-10 py-8 border-y border-neutral-100">
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-2xl font-black text-neutral-900 tracking-tight m-0">How it Works</h2>
                  </div>
                  <p className="text-neutral-600 text-base leading-loose whitespace-pre-line mb-6">{content.howItWorks}</p>
                  
                  {instructions && instructions.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                      {instructions.map((instruction, index) => (
                        <div key={index} className="flex gap-4 items-start bg-white p-4 rounded-xl shadow-sm border border-neutral-100">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-sm font-black text-primary">
                            {index + 1}
                          </div>
                          <p className="text-neutral-700 text-sm leading-relaxed m-0 mt-1.5">
                            {instruction}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </section>

                {/* AdSense Placement: Mid-content */}
                <div className="my-8 w-full h-[250px] bg-neutral-50 border border-neutral-200 rounded-2xl flex items-center justify-center overflow-hidden">
                    <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest text-center">
                      Advertisement
                      <div className="w-[300px] h-[250px] bg-neutral-100 mt-1 flex items-center justify-center rounded-lg">Ad Slot 300x250</div>
                    </div>
                </div>

                {/* Benefits */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-2xl font-black text-neutral-900 tracking-tight m-0">Key Benefits</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {content.benefits.map((benefit, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0"></div>
                        <div>
                          <h3 className="font-bold text-neutral-900 text-lg mb-2 mt-0">{benefit.title}</h3>
                          <p className="text-neutral-600 text-sm leading-relaxed m-0">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* When to use */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-2xl font-black text-neutral-900 tracking-tight m-0">When to Use It</h2>
                  </div>
                  <p className="text-neutral-600 text-base leading-loose whitespace-pre-line">{content.whenToUse}</p>
                </section>

                {/* FAQ */}
                <section className="bg-neutral-50 -mx-6 md:-mx-10 px-6 md:px-10 py-8 border-y border-neutral-100">
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-2xl font-black text-neutral-900 tracking-tight m-0">Frequently Asked Questions</h2>
                  </div>
                  <div className="max-w-3xl">
                    {content.faqs.map((faq, i) => (
                      <FAQItem key={i} faq={faq} />
                    ))}
                  </div>
                </section>

                {/* Conclusion */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-2xl font-black text-neutral-900 tracking-tight m-0">Conclusion</h2>
                  </div>
                  <p className="text-neutral-600 text-base leading-loose whitespace-pre-line">{content.conclusion}</p>
                </section>

              </article>
            )}

            {/* AdSense Placement: Bottom */}
            <div className="w-full h-[90px] bg-white/40 border border-neutral-200 rounded-2xl flex items-center justify-center overflow-hidden">
                <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest text-center">
                  Advertisement
                  <div className="w-[728px] max-w-full h-[90px] bg-neutral-100 mt-1 flex items-center justify-center rounded-lg">Ad Slot 728x90 Bottom</div>
                </div>
            </div>

          </div>

          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0 space-y-6 animate-fade-in-up [animation-delay:200ms]">
            <div className="sticky top-24 space-y-6">
              
              {/* Sidebar Ad 1 */}
              <div className="w-full h-[300px] bg-white border border-neutral-200 rounded-2xl flex items-center justify-center overflow-hidden shadow-sm">
                <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest text-center">
                  Advertisement
                  <div className="w-[300px] h-[250px] bg-neutral-50 mt-1 flex items-center justify-center rounded-lg">Sidebar Ad 300x250</div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm group">
                <h3 className="text-sm font-black text-neutral-900 mb-4 flex items-center justify-between uppercase tracking-widest">
                  Related Tools
                  <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                </h3>
                <div className="space-y-3">
                    <a href="/compress-pdf" className="flex items-center gap-3 p-2 hover:bg-neutral-50 rounded-lg transition-colors border border-transparent hover:border-neutral-100">
                      <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">📄</div>
                      <div>
                        <p className="text-sm font-bold text-neutral-900">Compress PDF</p>
                        <p className="text-[10px] text-neutral-500 line-clamp-1">Reduce PDF file size easily.</p>
                      </div>
                    </a>
                    <a href="/image-compressor" className="flex items-center gap-3 p-2 hover:bg-neutral-50 rounded-lg transition-colors border border-transparent hover:border-neutral-100">
                      <div className="w-8 h-8 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">🖼️</div>
                      <div>
                        <p className="text-sm font-bold text-neutral-900">Image Compressor</p>
                        <p className="text-[10px] text-neutral-500 line-clamp-1">Compress images without losing quality.</p>
                      </div>
                    </a>
                    <a href="/qr-code-generator" className="flex items-center gap-3 p-2 hover:bg-neutral-50 rounded-lg transition-colors border border-transparent hover:border-neutral-100">
                      <div className="w-8 h-8 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">📱</div>
                      <div>
                        <p className="text-sm font-bold text-neutral-900">QR Code Generator</p>
                        <p className="text-[10px] text-neutral-500 line-clamp-1">Create custom QR codes instantly.</p>
                      </div>
                    </a>
                </div>
              </div>

               {/* Sidebar Ad 2 */}
               <div className="w-full h-[600px] bg-white border border-neutral-200 rounded-2xl flex items-center justify-center overflow-hidden shadow-sm hidden lg:flex">
                <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest text-center">
                  Advertisement
                  <div className="w-[300px] h-[600px] bg-neutral-50 mt-1 flex items-center justify-center rounded-lg">Sidebar Ad 300x600</div>
                </div>
              </div>

            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
