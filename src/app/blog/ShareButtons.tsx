"use client";

import React, { useState } from "react";
import { Linkedin, Twitter, Link as LinkIcon, Check, Mail } from "lucide-react";

export interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const fullUrl = typeof window !== "undefined" ? window.location.href : url;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-bold uppercase tracking-wider text-ink-muted mr-1">
        Share
      </span>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="w-8 h-8 rounded-full bg-surface-soft border border-surface-line flex items-center justify-center text-ink-muted hover:text-[#0077b5] hover:border-[#0077b5] transition-colors"
      >
        <Linkedin className="w-4 h-4" />
      </a>

      {/* X / Twitter */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className="w-8 h-8 rounded-full bg-surface-soft border border-surface-line flex items-center justify-center text-ink-muted hover:text-black hover:border-black transition-colors"
      >
        <Twitter className="w-4 h-4" />
      </a>

      {/* Email */}
      <a
        href={`mailto:?subject=${encodedTitle}&body=Check%20out%20this%20article%20from%20GrydIn:%20${encodedUrl}`}
        aria-label="Share via Email"
        className="w-8 h-8 rounded-full bg-surface-soft border border-surface-line flex items-center justify-center text-ink-muted hover:text-teal hover:border-teal transition-colors"
      >
        <Mail className="w-4 h-4" />
      </a>

      {/* Copy link */}
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy link to clipboard"
        className="w-8 h-8 rounded-full bg-surface-soft border border-surface-line flex items-center justify-center text-ink-muted hover:text-teal hover:border-teal transition-colors cursor-pointer"
      >
        {copied ? (
          <Check className="w-4 h-4 text-emerald-600" />
        ) : (
          <LinkIcon className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
