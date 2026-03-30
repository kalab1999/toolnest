"use client";

import Link from "next/link";
import { Search, Menu, X, ArrowRight, ChevronDown, Command } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { toolsData } from "@/app/lib/tools";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ctrl+K / Cmd+K to open search
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchFocused(true);
      }
      if (e.key === "Escape") {
        setIsSearchFocused(false);
        setSearchQuery("");
        searchInputRef.current?.blur();
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
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
      setSearchResults(results.slice(0, 7));
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
          ? "py-2 glass-header shadow-sm"
          : "py-3 bg-white/90 backdrop-blur-sm border-b border-neutral-100"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-base shadow-lg shadow-primary/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-primary/50"
               style={{ background: "linear-gradient(135deg, #1d4ed8, #3b82f6)" }}>
            TN
          </div>
          <span className="text-xl font-black text-neutral-900 tracking-tight hidden sm:block">
            Tool<span className="text-primary">Nest</span>
          </span>
        </Link>

        {/* Search Bar - Desktop */}
        <div className="hidden lg:flex flex-grow max-w-lg relative" ref={searchContainerRef}>
          <div className={`w-full relative transition-all duration-300 ${isSearchFocused ? 'hero-search' : 'bg-neutral-100 rounded-xl border border-transparent hover:border-neutral-200'}`}>
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${isSearchFocused ? 'text-primary' : 'text-neutral-400'}`} />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search tools…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              className="w-full bg-transparent py-2.5 pl-11 pr-24 rounded-xl text-sm outline-none text-neutral-900 placeholder-neutral-400"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 text-[10px] text-neutral-400 font-semibold bg-white border border-neutral-200 rounded-md px-1.5 py-0.5 select-none">
              <Command className="w-2.5 h-2.5" />K
            </div>
          </div>

          {/* Desktop Search Results Dropdown */}
          {isSearchFocused && searchQuery.trim() !== "" && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-neutral-100/80 overflow-hidden z-50"
                 style={{ animation: "slide-down 0.18s ease-out" }}>
              {searchResults.length > 0 ? (
                <div className="py-2 max-h-[420px] overflow-y-auto">
                  <div className="px-4 py-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest border-b border-neutral-50">
                    {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} found
                  </div>
                  {searchResults.map(tool => (
                    <Link
                      key={tool.name}
                      href={tool.href}
                      onClick={() => { setSearchQuery(""); setIsSearchFocused(false); }}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors group/result"
                    >
                      <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover/result:bg-primary group-hover/result:text-white transition-all">
                        <tool.icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-neutral-900 group-hover/result:text-primary transition-colors">{tool.name}</p>
                        <p className="text-[10px] text-neutral-400 line-clamp-1 mt-0.5">{tool.description}</p>
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-300 bg-neutral-100 px-2 py-1 rounded-md shrink-0">
                        {tool.category}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Search className="w-5 h-5 text-neutral-400" />
                  </div>
                  <p className="text-sm font-semibold text-neutral-700">No results for "{searchQuery}"</p>
                  <p className="text-xs text-neutral-400 mt-1">Try a different keyword</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

            if (link.hasDropdown && link.categoryName) {
              const categoryTools = getToolsForCategory(link.categoryName);
              if (categoryTools.length === 0) return null;

              const gridCols = categoryTools.length > 6 ? 'grid-cols-2' : 'grid-cols-1';
              const dropdownWidth = categoryTools.length > 6 ? 'w-[620px]' : 'w-[300px]';

              return (
                <div key={link.name} className="relative group/nav">
                  <button
                    className={`flex items-center gap-1 text-[13px] font-semibold px-3 py-2 rounded-lg transition-all ${
                      isActive
                        ? "text-primary bg-primary/8"
                        : "text-neutral-600 hover:text-primary hover:bg-neutral-50"
                    }`}
                  >
                    {link.name}
                    <ChevronDown className="w-3 h-3 group-hover/nav:rotate-180 transition-transform duration-200" />
                  </button>

                  {/* Mega Menu Dropdown */}
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-200 ${dropdownWidth} z-50`}>
                    <div className={`bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-neutral-100 p-3 grid ${gridCols} gap-1`}>
                      {categoryTools.map(tool => (
                        <Link
                          key={tool.name}
                          href={tool.href}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-50 transition-all group/item"
                        >
                          <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover/item:bg-primary group-hover/item:text-white group-hover/item:scale-110 transition-all duration-200">
                            <tool.icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-neutral-900 group-hover/item:text-primary transition-colors truncate">{tool.name}</p>
                            <p className="text-[10px] text-neutral-400 line-clamp-1 mt-0.5">{tool.description}</p>
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
                className={`text-[13px] font-semibold px-3 py-2 rounded-lg transition-all ${
                  isActive
                    ? "text-primary bg-primary/8"
                    : "text-neutral-600 hover:text-primary hover:bg-neutral-50"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Controls */}
        <div className="flex items-center gap-1 lg:hidden">
          <button
            className="p-2 text-neutral-500 hover:text-primary hover:bg-neutral-50 rounded-lg transition-all"
            onClick={() => { setIsMenuOpen(true); setTimeout(() => searchInputRef.current?.focus(), 100); }}
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            className="p-2 text-neutral-700 hover:text-primary hover:bg-neutral-50 rounded-lg transition-all"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              if (!isMenuOpen) { setSearchQuery(""); setOpenMobileDropdown(null); }
            }}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-neutral-100 absolute top-full left-0 w-full shadow-2xl overflow-y-auto max-h-[88vh]"
             style={{ animation: "slide-down 0.2s ease-out" }}>

          {/* Mobile Search */}
          <div className="p-4 border-b border-neutral-100">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search tools…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-100 rounded-xl py-3 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                autoFocus={false}
              />
            </div>

            {searchQuery.trim() !== "" && (
              <div className="mt-3 bg-white border border-neutral-100 rounded-xl overflow-hidden shadow-sm">
                {searchResults.length > 0 ? (
                  <div className="py-1">
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
                          <p className="text-sm font-bold text-neutral-900">{tool.name}</p>
                          <p className="text-[10px] text-neutral-400 line-clamp-1 mt-0.5">{tool.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-5 text-center text-sm text-neutral-400">No tools found for "{searchQuery}"</div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Nav Links */}
          {searchQuery.trim() === "" && (
            <nav className="flex flex-col p-3 gap-0.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

                if (link.hasDropdown && link.categoryName) {
                  const categoryTools = getToolsForCategory(link.categoryName);
                  if (categoryTools.length === 0) return null;
                  const isDropdownOpen = openMobileDropdown === link.name;

                  return (
                    <div key={link.name} className="flex flex-col">
                      <button
                        onClick={() => setOpenMobileDropdown(isDropdownOpen ? null : link.name)}
                        className={`flex items-center justify-between p-3.5 rounded-xl text-sm font-bold transition-all ${
                          isActive || isDropdownOpen
                            ? "bg-primary/8 text-primary"
                            : "text-neutral-700 hover:bg-neutral-50"
                        }`}
                      >
                        {link.name}
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                      </button>

                      {isDropdownOpen && (
                        <div className="ml-4 pl-4 border-l-2 border-primary/15 my-1 space-y-0.5">
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
                        ? "bg-primary/8 text-primary"
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
