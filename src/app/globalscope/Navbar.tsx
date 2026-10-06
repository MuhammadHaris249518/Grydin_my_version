"use client";

import { useState, useEffect } from "react";
import { Menu, X, Search, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GrydInLogo } from "./GrydInLogo";
import { SearchDialog } from "./SearchDialog";

export const NAVBAR_TOP_OFFSET = 0;

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";
  const isDarkNav = isHome;

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isHome) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isHome]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-50 w-full transition-all duration-200 ${
          isDarkNav
            ? scrolled
              ? "bg-[#030e1f]/95 backdrop-blur-md border-b border-white/10 shadow-lg"
              : "bg-[#030e1f]"
            : scrolled
            ? "bg-white/90 backdrop-blur-md border-b border-surface-line shadow-sm"
            : "bg-white border-b border-surface-line"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 h-[66px] sm:h-[68px] flex items-center justify-between gap-4">
          {/* Logo */}
          <GrydInLogo variant="navbar" theme={isDarkNav ? "dark" : "light"} />

          {/* Desktop Navigation */}
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
                  className={`text-[13px] xl:text-[14px] font-semibold transition-colors duration-150 relative py-1 ${
                    isActive
                      ? isDarkNav
                        ? "text-[#00c2cb] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#00c2cb] after:rounded-full"
                        : "text-accent after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2.5px] after:bg-accent after:rounded-full"
                      : isDarkNav
                      ? "text-slate-200 hover:text-[#00c2cb]"
                      : "text-ink hover:text-accent"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right CTA and Search */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search is shown on the home page only. */}
            {isHome && (
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="p-2 transition-colors rounded-full flex items-center gap-1.5 cursor-pointer text-ink-muted hover:text-accent"
                aria-label="Search site"
                title="Search (Ctrl+K)"
              >
                <Search size={18} strokeWidth={2.2} />
                <kbd className="hidden xl:inline-block text-xs px-1.5 py-0.5 rounded font-mono text-ink-muted bg-surface-soft border border-surface-line">
                  ⌘K
                </kbd>
              </button>
            )}

            {/* Desktop "Get In Touch" Button */}
            {isHome && (
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center gap-1.5 bg-gradient-to-r from-[#00d2df] via-[#00c2cb] to-[#0284c7] hover:from-[#00e5ff] hover:to-[#0369a1] text-white text-[12px] xl:text-[13px] font-bold px-6 py-2.5 rounded-full transition-all shadow-[0_0_20px_rgba(0,194,203,0.4)] hover:shadow-[0_0_28px_rgba(0,194,203,0.6)] active:scale-[0.98]"
              >
                <span>Get In Touch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}

            {/* Mobile Menu Button (< lg) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Open menu"
              className="lg:hidden p-2 text-ink-muted hover:text-accent transition-colors"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {menuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[70px] bottom-0 z-50 bg-ink/20 backdrop-blur-sm flex flex-col justify-start">
            <div className="bg-white border-b border-surface-line px-6 py-6 shadow-xl flex flex-col gap-4">
              <nav className="flex flex-col gap-2.5" aria-label="Mobile navigation">
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
                        isActive ? "text-accent" : "text-ink hover:text-accent"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
              {isHome && (
                <div className="pt-3 border-t border-surface-line flex flex-col gap-3">
                  <Link
                    href="/contact"
                    onClick={() => setMenuOpen(false)}
                    className="w-full text-center bg-accent hover:bg-accent-hover text-white py-2.5 rounded-md text-xs font-bold uppercase tracking-wider"
                  >
                    GET IN TOUCH
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      <SearchDialog isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Navbar;
