import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts, BlogPost } from "@/app/lib/blog-data";
import { Calendar, Clock, User, ArrowLeft, ArrowRight } from "lucide-react";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Blog Post Not Found" };

  return {
    title: `${post.title} | AllToolkit Blog`,
    description: post.excerpt,
  };
}

// Generate static params for the blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Calculate generic related posts (just picking 2 other posts)
  const relatedPosts = blogPosts.filter(p => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="bg-neutral-50/50 min-h-screen pb-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 pt-28 pb-10 max-w-4xl">
        
        {/* Back Link */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-primary transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
        
        {/* Header */}
        <header className="mb-12 text-center md:text-left space-y-6">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-bold text-neutral-500 uppercase tracking-widest">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-primary" /> {post.date}</span>
            <span className="w-1 h-1 rounded-full bg-neutral-300"></span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> {post.readTime}</span>
            <span className="w-1 h-1 rounded-full bg-neutral-300"></span>
            <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-primary" /> {post.author}</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight leading-tight">
            {post.title}
          </h1>
          <p className="text-lg md:text-xl text-neutral-500 max-w-3xl leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        {/* Hero Image / Gradient */}
        <div className="w-full h-64 md:h-96 bg-neutral-100 rounded-3xl mb-16 relative overflow-hidden shadow-xl shadow-primary/5">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/90 to-purple-600/90"></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <span className="text-white/20 font-black text-6xl md:text-8xl uppercase -rotate-6">{post.slug.split('-')[0]}</span>
          </div>
        </div>

        {/* AdSense Top Article */}
        <div className="w-full h-[90px] bg-white/40 border border-neutral-200 rounded-2xl flex items-center justify-center overflow-hidden mb-12">
            <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest text-center">
              Advertisement
              <div className="w-[728px] max-w-full h-[90px] bg-neutral-100 mt-1 flex items-center justify-center rounded-lg">Article Top Ad 728x90</div>
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Main Content */}
            <article className="lg:w-2/3 prose prose-neutral prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
              {post.content.map((block, index) => {
                switch(block.type) {
                  case "h2":
                    return <h2 key={index} className="text-3xl mt-12 mb-6 text-neutral-900">{block.text}</h2>;
                  case "h3":
                    return <h3 key={index} className="text-2xl mt-8 mb-4 text-neutral-900">{block.text}</h3>;
                  case "p":
                    return <p key={index} className="text-neutral-600 leading-loose mb-6">{block.text}</p>;
                  case "ul":
                    return (
                      <ul key={index} className="space-y-3 my-6 pl-6 text-neutral-600">
                        {block.items?.map((item, i) => (
                          <li key={i} className="leading-relaxed pl-2 relative before:absolute before:left-[-1.5rem] before:top-2.5 before:w-1.5 before:h-1.5 before:bg-primary before:rounded-full">
                            {item}
                          </li>
                        ))}
                      </ul>
                    );
                  case "quote":
                    return (
                      <blockquote key={index} className="border-l-4 border-primary pl-6 py-2 my-10 italic text-xl text-neutral-800 bg-primary/5 rounded-r-xl font-medium">
                        "{block.text}"
                      </blockquote>
                    );
                  default:
                    return null;
                }
              })}
            </article>

            {/* Sidebar Sticky */}
            <aside className="lg:w-1/3">
              <div className="sticky top-28 space-y-8">
                
                {/* Sidebar Ad 300x250 */}
                <div className="w-full h-[250px] bg-white border border-neutral-200 rounded-2xl flex items-center justify-center overflow-hidden shadow-sm">
                    <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest text-center">
                      Advertisement
                      <div className="w-[300px] h-[250px] bg-neutral-50 mt-1 flex items-center justify-center rounded-lg">Sidebar Ad 300x250</div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
                  <h3 className="text-sm font-black text-neutral-900 uppercase tracking-widest mb-6">Related Reads</h3>
                  <div className="space-y-6">
                    {relatedPosts.map(rp => (
                      <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group block">
                        <h4 className="font-bold text-neutral-900 mb-2 group-hover:text-primary transition-colors leading-tight">
                          {rp.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs font-bold text-neutral-400">
                          <Clock className="w-3.5 h-3.5" /> {rp.readTime}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-2xl text-white text-center shadow-xl shadow-primary/20">
                    <h3 className="text-xl font-black mb-3">Ready to optimize your workflow?</h3>
                    <p className="text-sm text-white/80 mb-6">Explore our suite of 50+ free tools today.</p>
                    <Link href="/all-tools" className="inline-block w-full bg-white text-blue-600 font-black px-6 py-3 rounded-xl hover:scale-105 transition-transform shadow-lg">
                      Explore All Tools
                    </Link>
                </div>
              </div>
            </aside>
        </div>

        {/* AdSense Bottom Article */}
        <div className="w-full max-w-3xl mx-auto h-[90px] bg-white/40 border border-neutral-200 rounded-2xl flex items-center justify-center overflow-hidden mt-20">
            <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest text-center w-full">
              Advertisement
              <div className="w-full max-w-[728px] h-[90px] bg-neutral-100 mt-1 flex text-center items-center justify-center rounded-lg mx-auto">Article Bottom Ad 728x90</div>
            </div>
        </div>

      </div>
    </div>
  );
}
