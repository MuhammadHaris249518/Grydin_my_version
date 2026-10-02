"use client";

import { useEffect, useRef, useState } from "react";

/** True only on desktop-width screens with WebGL, no reduced-motion and no data-saver. */
export function useCanRender3D() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 1024px)");
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const check = () => {
      let gl = false;
      try {
        const c = document.createElement("canvas");
        gl = !!(c.getContext("webgl2") || c.getContext("webgl"));
      } catch {
        gl = false;
      }
      setOk(gl && wide.matches && !reduce.matches && !conn?.saveData);
    };
    check();
    reduce.addEventListener("change", check);
    wide.addEventListener("change", check);
    return () => {
      reduce.removeEventListener("change", check);
      wide.removeEventListener("change", check);
    };
  }, []);
  return ok;
}

/** Tracks whether an element is near the viewport so scenes can pause when off screen. */
export function useVisible<T extends Element>(rootMargin = "200px") {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return { ref, visible };
}
