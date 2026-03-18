"use client";

import Link from "next/link";
import { Search, Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { toolsData } from "@/app/lib/tools";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search logic
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      const results: any[] = [];
      toolsData.forEach((section) => {
        section.items.forEach((item) => {
          if (
            item.name.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)
          ) {
            results.push({
              name: item.name,
              href: item.href,
              category: section.category,
              icon: item.icon,
              description: item.description,
            });
          }
        });
      });
      setSearchResults(results.slice(0, 6));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Tools", href: "/all-tools" },
    { name: "PDF Tools", href: "/pdf-tools", hasDropdown: true, categoryName: "PDF Tools" },
    { name: "Image Tools", href: "/image-tools", hasDropdown: true, categoryName: "Image Tools" },
    { name: "Converters", href: "/converters", hasDropdown: true, categoryName: "Converter Tools" },
    { name: "Utilities", href: "/utilities", hasDropdown: true, categoryName: "Utilities" },
    { name: "Internet Tools", href: "/internet-tools", hasDropdown: true, categoryName: "Internet Tools" },
    { name: "About", href: "/about" },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setSearchQuery("");
    setOpenMobileDropdown(null);
  };

  const getToolsForCategory = (categoryName: string) => {
    return toolsData.find(s => s.category === categoryName)?.items || [];
  };

  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "py-2 bg-white border-b border-neutral-200 shadow-sm" 
          : "py-4 bg-white border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between gap-8">
        {/* Logo Area */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">
            TN
          </div>
          <span className="text-xl font-bold text-neutral-900 tracking-tight hidden sm:block">
            Tool<span className="text-primary">Nest</span>
          </span>
        </Link>

        {/* Search Bar - Desktop */}
        <div className="hidden lg:flex flex-grow max-w-md relative group" ref={searchContainerRef}>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search for tools..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            className="w-full bg-neutral-100 border border-transparent focus:bg-white focus:border-primary/30 py-2.5 pl-11 pr-4 rounded-xl text-sm outline-none transition-all focus:shadow-sm"
          />
          
          {/* Desktop Search Results Dropdown */}
          {isSearchFocused && searchQuery.trim() !== "" && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
              {searchResults.length > 0 ? (
                <div className="py-2 max-h-[400px] overflow-y-auto">
                  {searchResults.map(tool => (
                    <Link 
                      key={tool.name} 
                      href={tool.href}
                      onClick={() => {
                        setSearchQuery("");
                        setIsSearchFocused(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <tool.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-neutral-900 leading-tight">{tool.name}</p>
                        <p className="text-[10px] text-neutral-500 line-clamp-1 mt-0.5">{tool.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-sm text-neutral-500">
                  No tools found for "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            
            if (link.hasDropdown && link.categoryName) {
              const categoryTools = getToolsForCategory(link.categoryName);
              
              // Only render dropdown if there are tools
              if (categoryTools.length === 0) return null;

              // Determine grid columns based on number of tools
              const gridCols = categoryTools.length > 6 ? 'grid-cols-2' : 'grid-cols-1';
              const dropdownWidth = categoryTools.length > 6 ? 'w-[650px]' : 'w-[320px]';

              return (
                <div key={link.name} className="relative group/nav">
                  <button
                    className={`flex items-center gap-1 text-[13px] font-semibold px-2 xl:px-3 py-2 rounded-lg transition-all ${
                      isActive 
                        ? "text-primary bg-primary/5" 
                        : "text-neutral-600 hover:text-primary hover:bg-neutral-50"
                    }`}
                  >
                    {link.name}
                    <ChevronDown className="w-3 h-3 group-hover/nav:rotate-180 transition-transform" />
                  </button>
                  
                  {/* Mega Menu Dropdown */}
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 ${dropdownWidth} z-50`}>
                    <div className={`bg-white rounded-2xl shadow-xl border border-neutral-100 p-4 xl:p-6 grid ${gridCols} gap-x-6 gap-y-2`}>
                      {categoryTools.map(tool => (
                        <Link
                          key={tool.name}
                          href={tool.href}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-50 transition-colors group/item"
                        >
                          <div className="w-8 h-8 xl:w-10 xl:h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                            <tool.icon className="w-4 h-4 xl:w-5 xl:h-5" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs xl:text-sm font-bold text-neutral-900 group-hover/item:text-primary transition-colors truncate">{tool.name}</p>
                            <p className="text-[9px] xl:text-[10px] text-neutral-500 line-clamp-1">{tool.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[13px] font-semibold px-2 xl:px-3 py-2 rounded-lg transition-all ${
                  isActive 
                    ? "text-primary bg-primary/5" 
                    : "text-neutral-600 hover:text-primary hover:bg-neutral-50"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2">
          {/* Mobile Search Icon */}
          <button 
             className="lg:hidden p-2 text-neutral-500 hover:text-primary"
             onClick={() => setIsMenuOpen(true)}
          >
             <Search className="w-5 h-5" />
          </button>
          <button 
            className="lg:hidden p-2 text-neutral-700 hover:text-primary transition-all"
            onClick={() => {
               setIsMenuOpen(!isMenuOpen);
               if (!isMenuOpen) {
                  setSearchQuery("");
                  setOpenMobileDropdown(null);
               }
            }}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation & Search */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-b border-neutral-200 absolute top-full left-0 w-full shadow-2xl animate-in slide-in-from-top duration-300 origin-top overflow-y-auto max-h-[85vh]">
          <div className="p-4 border-b border-neutral-100 relative">
             <Search className="absolute left-7 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
             <input 
               type="text"
               placeholder="Search tools..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full bg-neutral-100 border-none rounded-xl py-3 pl-11 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
               autoFocus={false}
             />
             
             {/* Mobile Search Results */}
             {searchQuery.trim() !== "" && (
               <div className="mt-2 bg-white border border-neutral-100 rounded-xl overflow-hidden shadow-sm">
                 {searchResults.length > 0 ? (
                   <div className="py-2">
                     {searchResults.map(tool => (
                       <Link 
                         key={tool.name} 
                         href={tool.href}
                         onClick={handleLinkClick}
                         className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors border-b border-neutral-50 last:border-0"
                       >
                         <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                           <tool.icon className="w-4 h-4" />
                         </div>
                         <div>
                           <p className="text-sm font-bold text-neutral-900 leading-tight">{tool.name}</p>
                           <p className="text-[10px] text-neutral-500 line-clamp-1 mt-0.5">{tool.description}</p>
                         </div>
                       </Link>
                     ))}
                   </div>
                 ) : (
                   <div className="p-6 text-center text-sm text-neutral-500">
                     No tools found for "{searchQuery}"
                   </div>
                 )}
               </div>
             )}
          </div>
          
          {/* Hide Links if searching */}
          {searchQuery.trim() === "" && (
            <nav className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                
                if (link.hasDropdown && link.categoryName) {
                  const categoryTools = getToolsForCategory(link.categoryName);
                  if (categoryTools.length === 0) return null;

                  const isDropdownOpen = openMobileDropdown === link.name;

                  return (
                    <div key={link.name} className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => setOpenMobileDropdown(isDropdownOpen ? null : link.name)}
                          className={`flex-grow flex items-center justify-between p-3.5 rounded-xl text-sm font-bold transition-all ${
                            isActive || isDropdownOpen
                              ? "bg-primary/5 text-primary" 
                              : "text-neutral-700 hover:bg-neutral-50"
                          }`}
                        >
                          {link.name}
                          <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                        </button>
                      </div>

                      {/* Mobile Category Tools Submenu */}
                      {isDropdownOpen && (
                        <div className="ml-4 pl-4 border-l-2 border-primary/10 my-2 space-y-1">
                          {categoryTools.map(tool => (
                            <Link
                              key={tool.name}
                              href={tool.href}
                              onClick={handleLinkClick}
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-50 transition-colors"
                            >
                              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <tool.icon className="w-4 h-4" />
                              </div>
                              <p className="text-sm font-semibold text-neutral-700">{tool.name}</p>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center justify-between p-3.5 rounded-xl text-sm font-bold transition-all ${
                      isActive 
                        ? "bg-primary/5 text-primary" 
                        : "text-neutral-700 hover:bg-neutral-50"
                    }`}
                    onClick={handleLinkClick}
                  >
                    {link.name}
                    <ArrowRight className={`w-4 h-4 ${isActive ? "opacity-100" : "opacity-0"}`} />
                  </Link>
                );
              })}
            </nav>
          )}
        </div>
      )}
    </header>
  );
}
