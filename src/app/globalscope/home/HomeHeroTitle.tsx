"use client";

import { useEffect, useState } from "react";

const firstLine = "Empowering Your";
const secondLine = "Business with Tech";
const fullTitle = `${firstLine}\n${secondLine}`;
const lineBreak = firstLine.length;
const accentLength = "Business".length;

export function HomeHeroTitle() {
  const [typedTitle, setTypedTitle] = useState("");

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setTypedTitle(fullTitle);
      return;
    }

    let position = 0;
    let timer: number | undefined;
    const start = window.setTimeout(() => {
      timer = window.setInterval(() => {
        position += 1;
        setTypedTitle(fullTitle.slice(0, position));
        if (position >= fullTitle.length && timer !== undefined) window.clearInterval(timer);
      }, 42);
    }, 220);

    return () => {
      window.clearTimeout(start);
      if (timer !== undefined) window.clearInterval(timer);
    };
  }, []);

  const firstLineText = typedTitle.slice(0, lineBreak);
  const secondLineText = typedTitle.slice(lineBreak + 1);
  const isTyping = typedTitle.length < fullTitle.length;

  return (
    <h1
      aria-label="Empowering Your Business with Tech"
      className="text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[2.9rem] xl:text-[3.4rem]"
    >
      <span className="block min-h-[1.08em]">
        {firstLineText || "\u00a0"}
        {isTyping && typedTitle.length <= lineBreak && <span aria-hidden="true" className="home-hero-caret" />}
      </span>
      <span className="block min-h-[1.08em]">
        <span className="bg-gradient-to-r from-[#00f5d4] via-[#00c2cb] to-[#38bdf8] bg-clip-text text-transparent">
          {secondLineText.slice(0, accentLength)}
        </span>
        {secondLineText.length > accentLength && ` ${secondLineText.slice(accentLength)}`}
        {isTyping && typedTitle.length > lineBreak && <span aria-hidden="true" className="home-hero-caret" />}
      </span>
      <span className="sr-only">{fullTitle.replace("\n", " ")}</span>
    </h1>
  );
}
