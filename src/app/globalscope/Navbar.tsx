"use client";

import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GrydInLogo } from "./GrydInLogo";

export const NAVBAR_TOP_OFFSET = 0;

const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "SERVICES", href: "/services" },
  { label: "PROJECTS", href: "/services" },
  { label: "ABOUT", href: "/about" },
  { label: "BLOG", href: "/#services" },
  { label: "CONTACT", href: "/contact" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 left-0 right-0 z-50 w-full bg-white border-b border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-[70px] flex items-center justify-between gap-4">
        {/* Logo */}
        <GrydInLogo variant="navbar" theme="light" />

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-6 lg:gap-8"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-[13px] font-bold uppercase tracking-wider transition-colors duration-150 ${
                  isActive
                    ? "text-[#0d8b99]"
                    : "text-gray-800 hover:text-[#0d8b99]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA and Search */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Search Toggle */}
          <div className="relative flex items-center">
            {searchOpen ? (
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 transition-all">
                <Search size={16} className="text-gray-500 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="bg-transparent border-none outline-none text-xs text-gray-800 w-28 sm:w-40"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-gray-400 hover:text-gray-600 ml-1 p-0.5"
                  aria-label="Close search"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="p-2 text-gray-700 hover:text-[#0d8b99] transition-colors rounded-full"
                aria-label="Search"
              >
                <Search size={18} strokeWidth={2.2} />
              </button>
            )}
          </div>

          {/* Desktop "GET IN TOUCH" Button */}
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center justify-center bg-[#0d8b99] hover:bg-[#0b7884] text-white text-[13px] font-bold uppercase tracking-wider px-5 py-2.5 rounded-md transition-all shadow-sm hover:shadow active:scale-[0.98]"
          >
            GET IN TOUCH
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
            className="md:hidden p-2 text-gray-800 hover:text-[#0d8b99] transition-colors"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[70px] bottom-0 z-50 bg-black/40 backdrop-blur-xs flex flex-col justify-start">
          <div className="bg-white border-b border-gray-200 px-6 py-6 shadow-xl flex flex-col gap-4">
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`py-2 text-sm font-bold uppercase tracking-wider ${
                      isActive ? "text-[#0d8b99]" : "text-gray-800"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="pt-2 border-t border-gray-100 flex flex-col gap-3">
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="w-full text-center bg-[#0d8b99] text-white py-2.5 rounded-md text-xs font-bold uppercase tracking-wider"
              >
                GET IN TOUCH
              </Link>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};

export default Navbar;
