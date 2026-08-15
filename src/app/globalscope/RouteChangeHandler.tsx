"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Resets scroll, body overflow, and scrollbar state on every client navigation. */
export function RouteChangeHandler() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "";
    document.documentElement.classList.remove("hide-scrollbar");
    document.getElementById("scrollbar-hide-style")?.remove();
  }, [pathname]);

  return null;
}
