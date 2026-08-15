"use client";

import { useEffect } from "react";

const ALLOW_COPY_SELECTOR = "[data-allow-copy], input, textarea, select";

const isAllowedTarget = (target: EventTarget | null) => {
  if (!(target instanceof Element)) return false;
  return !!target.closest(ALLOW_COPY_SELECTOR);
};

export const ContentProtection = () => {
  useEffect(() => {
    const blockClipboard = (event: ClipboardEvent) => {
      if (!isAllowedTarget(event.target)) {
        event.preventDefault();
      }
    };

    const blockSelect = (event: Event) => {
      if (!isAllowedTarget(event.target)) {
        event.preventDefault();
      }
    };

    const blockContextMenu = (event: MouseEvent) => {
      if (event.target instanceof HTMLImageElement) {
        event.preventDefault();
      }
    };

    const blockDragStart = (event: DragEvent) => {
      if (event.target instanceof HTMLImageElement) {
        event.preventDefault();
      }
    };

    document.addEventListener("copy", blockClipboard);
    document.addEventListener("cut", blockClipboard);
    document.addEventListener("selectstart", blockSelect);
    document.addEventListener("contextmenu", blockContextMenu);
    document.addEventListener("dragstart", blockDragStart);

    return () => {
      document.removeEventListener("copy", blockClipboard);
      document.removeEventListener("cut", blockClipboard);
      document.removeEventListener("selectstart", blockSelect);
      document.removeEventListener("contextmenu", blockContextMenu);
      document.removeEventListener("dragstart", blockDragStart);
    };
  }, []);

  return null;
};
