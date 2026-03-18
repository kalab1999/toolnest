import Link from "next/link";
import { Mail, Github, Twitter, Info, ShieldCheck, MailQuestion, ArrowRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 pt-24 pb-12 relative overflow-hidden">
      {/* Decorative Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Footer Ad Banner */}
        <div className="max-w-4xl mx-auto mb-16 hidden sm:block">
          <div className="w-full h-[90px] ad-placeholder rounded-xl"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-20">
          {/* Brand Section */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
                TN
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                Tool<span className="text-primary">Nest</span>
              </span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
              Empowering users with free, lightning-fast, and professional-grade online utilities. No registration, just results.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold mb-8 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              Tools Categories
            </h3>
            <ul className="space-y-4">
              {["Image Tools", "Converters", "Utilities", "Text Tools", "Internet Tools"].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase().replace(" ", "-")}`} 
                    className="text-neutral-400 hover:text-white hover:translate-x-1 transition-all flex items-center gap-2 group text-sm"
                  >
                    <ArrowRight className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-bold mb-8 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              Resources
            </h3>
            <ul className="space-y-4">
              {[
                { name: "About ToolNest", icon: Info, href: "/about" },
                { name: "Privacy Policy", icon: ShieldCheck, href: "/privacy-policy" },
                { name: "Support Center", icon: MailQuestion, href: "/contact" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-neutral-400 hover:text-white transition-colors flex items-center gap-3 text-sm group">
                    <link.icon className="w-4 h-4 text-neutral-500 group-hover:text-primary transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Branding Credit */}
        <div className="flex justify-center mb-10">
          <Link 
            href="https://www.akirdigitalsolutions.com/" 
            target="_blank"
            className="text-xs font-bold text-neutral-500 hover:text-primary transition-colors uppercase tracking-[0.3em] flex items-center gap-3 group"
          >
            <span className="w-8 h-px bg-neutral-800 group-hover:bg-primary/30 transition-all"></span>
            Powered by Akir Digital Solutions
            <span className="w-8 h-px bg-neutral-800 group-hover:bg-primary/30 transition-all"></span>
          </Link>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-neutral-500 text-sm font-medium">
            © {currentYear} <span className="text-white font-bold">ToolNest</span>. Built for precision.
          </p>
          <div className="flex gap-8">
            <Link href="/terms" className="text-neutral-500 hover:text-white transition-colors text-sm">Terms</Link>
            <Link href="/cookies" className="text-neutral-500 hover:text-white transition-colors text-sm">Cookies</Link>
            <Link href="/security" className="text-neutral-500 hover:text-white transition-colors text-sm">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
