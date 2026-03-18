"use client";

import { useState } from "react";
import { 
  Mail, 
  MessageSquare, 
  Zap, 
  ShieldCheck, 
  HelpCircle, 
  Send, 
  Github, 
  Twitter, 
  LifeBuoy, 
  ChevronDown,
  ChevronUp,
  Search,
  Phone,
  Linkedin
} from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "Is ToolNest really free to use?",
    answer: "Yes, 100%. ToolNest is committed to providing high-quality digital utilities completely free of charge. There are no hidden fees or premium subscriptions."
  },
  {
    question: "Do you store my uploaded images or data?",
    answer: "Most of our tools process data entirely within your browser (client-side), meaning your files never even hit our servers. For tools that require server processing, files are deleted immediately after the task is completed."
  },
  {
    question: "Can I request a new tool?",
    answer: "Absolutely! We love hearing from our users. You can use the 'Request a Tool' category in the contact form below or reach out to us on Twitter."
  },
  {
    question: "Are the conversion rates accurate?",
    answer: "Our Currency and Unit converters pull data from reliable, real-time APIs to ensure maximum precision. However, for critical financial decisions, always cross-reference with official bank rates."
  }
];

const categories = [
  {
    icon: LifeBuoy,
    title: "Technical Support",
    desc: "Experiencing an issue with a tool? Let our team help you resolve it.",
    color: "text-blue-500",
    bg: "bg-blue-50"
  },
  {
    icon: MessageSquare,
    title: "Feedback & Suggestions",
    desc: "Have ideas on how to improve ToolNest? We're all ears.",
    color: "text-purple-500",
    bg: "bg-purple-50"
  },
  {
    icon: Zap,
    title: "Request a Tool",
    desc: "Missing a specific utility? Tell us what you need and we'll build it.",
    color: "text-amber-500",
    bg: "bg-amber-50"
  }
];

export default function SupportCenter() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    // Simulate API call
    setTimeout(() => {
      setFormStatus("success");
    }, 1500);
  };

  return (
    <div className="pb-32 bg-neutral-50/30 min-h-screen relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 -translate-x-1/2 -translate-y-1/2"></div>
      
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 relative">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="w-16 h-16 bg-white border border-neutral-100 rounded-2xl flex items-center justify-center text-primary mx-auto mb-8 shadow-soft animate-fade-in-up">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 tracking-tight animate-fade-in-up">
            How can we <span className="text-primary italic">help you?</span>
          </h1>
          <p className="text-lg text-neutral-500 leading-relaxed mb-10 max-w-2xl mx-auto animate-fade-in-up [animation-delay:100ms]">
            Whether you have a question, found a bug, or want to suggest a new tool, our support team is ready to assist you.
          </p>
          
          {/* Quick Search - Aesthetic only */}
          <div className="max-w-xl mx-auto relative group animate-fade-in-up [animation-delay:200ms]">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search for answers..."
              className="w-full bg-white border border-neutral-200 rounded-2xl py-4 pl-14 pr-6 text-sm shadow-soft focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all"
            />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Support Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 animate-fade-in-up [animation-delay:300ms]">
          {categories.map((cat, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-neutral-100 shadow-soft hover:shadow-soft-xl transition-all group hover:-translate-y-1">
              <div className={`w-14 h-14 ${cat.bg} ${cat.color} rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-black/5`}>
                <cat.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3 tracking-tight">{cat.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">{cat.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* FAQ Section */}
          <div className="space-y-8 animate-fade-in-up [animation-delay:400ms]">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4 tracking-tight">Frequently Asked Questions</h2>
              <p className="text-neutral-500">Quick answers to common questions about ToolNest.</p>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-3xl border border-neutral-100 overflow-hidden transition-all shadow-sm shadow-black/5">
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors"
                  >
                    <span className="font-bold text-neutral-900 pr-4">{faq.question}</span>
                    {openFaq === i ? <ChevronUp className="w-5 h-5 text-primary" /> : <ChevronDown className="w-5 h-5 text-neutral-300" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-8 pb-8 text-neutral-500 text-sm leading-relaxed animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-10 md:p-12 rounded-[3.5rem] border border-neutral-100 shadow-soft-xl relative animate-fade-in-up [animation-delay:500ms]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10"></div>
            
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-neutral-900 mb-2 tracking-tight">Send us a message</h3>
              <p className="text-sm text-neutral-400">Usually responds within 24 hours.</p>
            </div>

            {formStatus === "success" ? (
              <div className="py-12 text-center space-y-6">
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-3xl flex items-center justify-center mx-auto shadow-sm border border-green-100">
                  <Send className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-neutral-900 mb-2">Message Sent!</h4>
                  <p className="text-neutral-500">Thank you for reaching out. We&apos;ll get back to you soon.</p>
                </div>
                <button 
                  onClick={() => setFormStatus("idle")}
                  className="text-primary font-bold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider ml-1">Full Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="John Doe"
                      className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-primary/30 focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider ml-1">Email Address</label>
                    <input 
                      required
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-primary/30 focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider ml-1">Subject</label>
                  <select 
                    required
                    className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-primary/30 focus:bg-white transition-all shadow-inner appearance-none cursor-pointer"
                  >
                    <option value="">Select a category</option>
                    <option value="support">Technical Support</option>
                    <option value="request">Tool Request</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider ml-1">Message</label>
                  <textarea 
                    required
                    rows={5}
                    placeholder="How can we help you today?"
                    className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-primary/30 focus:bg-white transition-all shadow-inner resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="w-full premium-button py-5 flex items-center justify-center gap-3 disabled:opacity-50 transition-all hover:-translate-y-1 shadow-xl hover:shadow-primary/20"
                >
                  {formStatus === "submitting" ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Social Support Section */}
        <div className="mt-32 p-12 bg-neutral-900 rounded-[3.5rem] text-center relative overflow-hidden animate-fade-in-up [animation-delay:600ms]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-0"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Prefer direct contact?</h2>
            <p className="text-neutral-400 mb-10 max-w-xl mx-auto">Follow us for updates, faster support, and to join our growing community of developers and digital creators.</p>
            
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { icon: Mail, name: "Email", handle: "kalababebe22@gmail.com", color: "hover:bg-primary" },
                { icon: Phone, name: "Phone", handle: "0991163993", color: "hover:bg-green-500" },
                { icon: Linkedin, name: "LinkedIn", handle: "Connect on LinkedIn", color: "hover:bg-blue-600" }
              ].map((item, i) => (
                <Link 
                  key={i}
                  href="#"
                  className={`flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-4 rounded-2xl text-white transition-all duration-300 hover:-translate-y-1 ${item.color} group`}
                >
                  <item.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  <div className="text-left">
                    <p className="text-xs font-bold text-neutral-400 group-hover:text-white/80 transition-colors uppercase tracking-widest">{item.name}</p>
                    <p className="font-bold text-sm tracking-tight">{item.handle}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
