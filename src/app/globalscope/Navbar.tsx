"use client";

import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GrydInLogo } from "./GrydInLogo";
import { SearchDialog } from "./SearchDialog";

export const NAVBAR_TOP_OFFSET = 0;

const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "SERVICES", href: "/services" },
  { label: "SOLUTIONS", href: "/solutions" },
  { label: "PROJECTS", href: "/projects" },
  { label: "ABOUT", href: "/about" },
  { label: "BLOG", href: "/blog" },
  { label: "CONTACT", href: "/contact" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-50 w-full bg-navy/70 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-[70px] flex items-center justify-between gap-4">
          {/* Logo */}
          <GrydInLogo variant="navbar" theme="dark" />

          {/* Desktop Navigation (lg:flex for 7 links) */}
          <nav
            className="hidden lg:flex items-center gap-5 xl:gap-7"
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
                  aria-current={isActive ? "page" : undefined}
                  className={`text-[12px] xl:text-[13px] font-bold uppercase tracking-wider transition-colors duration-150 relative py-1 ${
                    isActive
                      ? "text-teal-glow after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-teal-glow"
                      : "text-slate-200 hover:text-teal-glow"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right CTA and Search */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Button */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="p-2 text-slate-200 hover:text-teal-glow transition-colors rounded-full flex items-center gap-1.5 cursor-pointer"
              aria-label="Search site"
              title="Search (Ctrl+K)"
            >
              <Search size={18} strokeWidth={2.2} />
              <kbd className="hidden xl:inline-block text-[10px] text-slate-300 bg-white/10 border border-white/15 px-1.5 py-0.5 rounded font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Desktop "GET IN TOUCH" Button */}
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center justify-center bg-teal hover:bg-teal-dark text-white text-[12px] xl:text-[13px] font-bold uppercase tracking-wider px-5 py-2.5 rounded-md transition-all shadow-sm hover:shadow active:scale-[0.98]"
            >
              GET IN TOUCH
            </Link>

            {/* Mobile Menu Button (< lg) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Open menu"
              className="lg:hidden p-2 text-slate-200 hover:text-teal-glow transition-colors"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {menuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[70px] bottom-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col justify-start">
            <div className="glass bg-navy/95 border-b border-white/10 px-6 py-6 shadow-xl flex flex-col gap-4">
              <nav className="flex flex-col gap-2.5">
                {NAV_LINKS.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setMenuOpen(false)}
                      className={`py-2 text-sm font-bold uppercase tracking-wider transition-colors ${
                        isActive ? "text-teal-glow" : "text-slate-200 hover:text-teal-glow"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="pt-3 border-t border-white/10 flex flex-col gap-3">
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center bg-teal hover:bg-teal-dark text-white py-2.5 rounded-md text-xs font-bold uppercase tracking-wider"
                >
                  GET IN TOUCH
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <SearchDialog isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Navbar;
