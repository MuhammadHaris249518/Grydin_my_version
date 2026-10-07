"use client";

import Link from "next/link";
import { Linkedin, ArrowRight, MessageSquare } from "lucide-react";
import { SITE, SITEMAP_LINKS, SERVICE_LINKS, BLOG_LINKS } from "./site-config";
import { GrydInLogo } from "./GrydInLogo";

export const SiteFooter = () => {
  return (
    <footer className="w-full bg-ink text-white border-t border-white/10">
      {/* Final CTA Strip Above */}
      <div className="border-b border-white/10 bg-ink/80">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-white/70">
            <span className="w-2 h-2 rounded-full bg-teal-glow animate-pulse" />
            <span>Ready to eliminate manual friction from your workflows?</span>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-teal-glow hover:text-white transition-colors"
          >
            <span>Book a free process diagnosis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Main 4-Column Footer */}
      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 py-10 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Column 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4">
            <GrydInLogo variant="footer" theme="dark" />
            <p className="mt-3 sm:mt-4 text-sm leading-relaxed text-white/60 max-w-sm">
              {SITE.tagline}. High-reliability custom software, autonomous AI agents, and workflow automations shipped in under two weeks.
            </p>
            <div className="mt-4 sm:mt-6 flex items-center gap-3">
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GrydIn on LinkedIn"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-teal-glow hover:border-teal-glow/40 transition-colors"
              >
                <Linkedin size={16} />
              </a>
              <Link
                href="/contact"
                aria-label="Contact GrydIn"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-teal-glow hover:border-teal-glow/40 transition-colors"
              >
                <MessageSquare size={16} />
              </Link>
            </div>
          </div>

          {/* Column 2: Services (3 cols) */}
          <div className="lg:col-span-3">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-teal-glow mb-5">
              Services
            </p>
            <nav className="grid grid-cols-2 gap-x-3 gap-y-2 sm:flex sm:flex-col sm:gap-3">
              {SERVICE_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Newsroom (2 cols) */}
          <div className="lg:col-span-2">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-teal-glow mb-5">
              Newsroom
            </p>
            <nav className="grid grid-cols-2 gap-x-3 gap-y-2 sm:flex sm:flex-col sm:gap-3">
              {BLOG_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 4: Sitemap & Hubs (3 cols) */}
          <div className="lg:col-span-3">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-teal-glow mb-5">
              Navigation
            </p>
            <nav className="grid grid-cols-2 gap-x-3 gap-y-2 sm:flex sm:flex-col sm:gap-3">
              {SITEMAP_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Copyright Row */}
        <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
          <div>
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Fixed Scope · Zero Disruption</span>
            <span>Islamabad · Global</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
