import Link from "next/link";
import { blogPosts } from "@/app/lib/blog-data";
import { ArrowRight, Calendar, Clock, BookOpen } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AllToolkit Blog | Tips, Guides, and Digital Productivity",
  description: "Read our latest articles on image compression, PDF management, file conversion, and mastering digital tools for productivity.",
};

export default function BlogIndex() {
  return (
    <div className="bg-neutral-50/50 min-h-screen pb-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 pt-32 pb-10 max-w-6xl">
        <div className="mb-16 text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-widest mb-2 animate-fade-in-up">
            <BookOpen className="w-4 h-4" /> The AllToolkit Journal
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-neutral-900 tracking-tight leading-tight">
            Work Smarter, <br/><span className="gradient-text">Not Harder.</span>
          </h1>
          <p className="text-neutral-500 text-base md:text-lg">
            Discover actionable guides, deep dives into digital formats, and expert tips to supercharge your online productivity.
          </p>
        </div>

        {/* AdSense Top */}
        <div className="w-full max-w-4xl mx-auto h-[90px] bg-white/40 border border-neutral-200 rounded-2xl flex items-center justify-center overflow-hidden mb-16">
            <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest text-center">
              Advertisement
              <div className="w-[728px] max-w-full h-[90px] bg-neutral-100 mt-1 flex items-center justify-center rounded-lg">Top Board Ad 728x90</div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="bg-white rounded-2xl border border-neutral-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group cursor-pointer">
              {/* Image Placeholder (Wait, we can use a generic gradient since we don't have actual images uploaded) */}
              <div className="h-48 w-full bg-neutral-100 relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 opacity-80 group-hover:scale-105 transition-transform duration-500"></div>
                 <div className="absolute inset-0 flex items-center justify-center text-white/40 font-black text-4xl uppercase opacity-20 -rotate-12">{post.slug.split('-')[0]}</div>
                 <div className="absolute bottom-3 left-3 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-white text-xs font-bold shadow-sm">
                   Article
                 </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs font-bold text-neutral-400 mb-3">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                </div>
                <h2 className="text-xl font-bold text-neutral-900 leading-tight mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-neutral-500 line-clamp-3 mb-6 flex-grow leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="mt-auto pt-4 border-t border-neutral-100 flex items-center text-sm font-bold text-primary group-hover:gap-2 transition-all">
                  Read Article <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
