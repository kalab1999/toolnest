import Link from "next/link";
import { Mail, Github, Twitter, Info, ShieldCheck, MailQuestion, ArrowRight, Zap } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const categories = [
    { name: "PDF Tools",       href: "/pdf-tools" },
    { name: "Image Tools",     href: "/image-tools" },
    { name: "Converters",      href: "/converters" },
    { name: "Utilities",       href: "/utilities" },
    { name: "Text Tools",      href: "/text-tools" },
    { name: "Internet Tools",  href: "/internet-tools" },
  ];

  const resources = [
    { name: "About ToolNest",  icon: Info,        href: "/about" },
    { name: "Privacy Policy",  icon: ShieldCheck, href: "/privacy-policy" },
    { name: "Support Center",  icon: MailQuestion,href: "/contact" },
  ];

  return (
    <footer className="relative bg-neutral-950 pt-20 pb-10 overflow-hidden">

      {/* Top gradient bar */}
      <div className="absolute top-0 left-0 w-full h-px"
           style={{ background: "linear-gradient(to right, transparent, #2563eb 30%, #3b82f6 70%, transparent)" }} />

      {/* Subtle mesh gradient */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none"
           style={{
             background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(37,99,235,0.12) 0%, transparent 70%)"
           }} />

      <div className="container mx-auto px-4 relative z-10">

        {/* Footer Ad Banner */}
        <div className="max-w-4xl mx-auto mb-16 hidden sm:block">
          <div className="w-full h-[90px] ad-placeholder rounded-2xl" />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-base shadow-lg shadow-primary/30 transition-all group-hover:scale-110"
                   style={{ background: "linear-gradient(135deg, #1d4ed8, #3b82f6)" }}>
                TN
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                Tool<span className="text-primary">Nest</span>
              </span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
              Free, lightning-fast, and professional-grade online utilities. No registration required — just instant results.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: Github,  href: "https://github.com",  label: "GitHub" },
                { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                { icon: Mail,    href: "/contact",            label: "Contact" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-primary/20 hover:border-primary/30 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-black text-sm mb-6 flex items-center gap-2 uppercase tracking-widest">
              <span className="w-5 h-px bg-primary inline-block" />
              Categories
            </h3>
            <ul className="space-y-3">
              {categories.map(({ name, href }) => (
                <li key={name}>
                  <Link
                    href={href}
                    className="text-neutral-400 hover:text-white text-sm flex items-center gap-2 group transition-all"
                  >
                    <ArrowRight className="w-3 h-3 text-primary/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-black text-sm mb-6 flex items-center gap-2 uppercase tracking-widest">
              <span className="w-5 h-px bg-primary inline-block" />
              Resources
            </h3>
            <ul className="space-y-3">
              {resources.map(({ name, icon: Icon, href }) => (
                <li key={name}>
                  <Link
                    href={href}
                    className="text-neutral-400 hover:text-white text-sm flex items-center gap-3 group transition-all"
                  >
                    <Icon className="w-4 h-4 text-neutral-500 group-hover:text-primary transition-colors shrink-0" />
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stats / Feature card */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-white font-black text-sm uppercase tracking-widest">ToolNest Stats</span>
              </div>
              {[
                { value: "937K+", label: "Happy Users" },
                { value: "50+",   label: "Free Tools" },
                { value: "100%",  label: "Privacy Safe" },
              ].map(({ value, label }) => (
                <div key={label} className="flex items-baseline gap-3">
                  <span className="text-2xl font-black text-white">{value}</span>
                  <span className="text-xs text-neutral-500">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/5 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <p className="text-neutral-500 text-sm">
              © {currentYear} <span className="text-white font-bold">ToolNest</span>. All rights reserved.
            </p>
            <span className="hidden sm:block text-neutral-700">·</span>
            <Link
              href="https://www.akirdigitalsolutions.com/"
              target="_blank"
              className="text-neutral-500 hover:text-primary text-xs font-semibold transition-colors"
            >
              Powered by Akir Digital Solutions
            </Link>
          </div>
          <div className="flex gap-6">
            {[
              { name: "Terms",   href: "/terms" },
              { name: "Cookies", href: "/cookies" },
              { name: "Security",href: "/security" },
            ].map(({ name, href }) => (
              <Link key={name} href={href} className="text-neutral-500 hover:text-white text-sm transition-colors">{name}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
