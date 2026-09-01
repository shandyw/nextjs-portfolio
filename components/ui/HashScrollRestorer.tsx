"use client";

import { useEffect } from "react";

export function HashScrollRestorer() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const target = document.getElementById(decodeURIComponent(hash));
    if (!target) return;

    let frame = 0;
    let stopped = false;

    const restorePosition = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (stopped || window.location.hash.slice(1) !== hash) return;

        const root = document.documentElement;
        const previousBehavior = root.style.scrollBehavior;
        root.style.scrollBehavior = "auto";
        target.scrollIntoView({ behavior: "auto", block: "start" });
        root.style.scrollBehavior = previousBehavior;
      });
    };

    restorePosition();

    // Pinned GSAP sections add their spacer heights after hydration. Reapply
    // the anchor whenever that setup changes the document height.
    const observer = new ResizeObserver(restorePosition);
    observer.observe(document.body);
    window.addEventListener("load", restorePosition);

    const stopRestoring = window.setTimeout(() => {
      stopped = true;
      observer.disconnect();
      window.removeEventListener("load", restorePosition);
    }, 2000);

    return () => {
      stopped = true;
      cancelAnimationFrame(frame);
      clearTimeout(stopRestoring);
      observer.disconnect();
      window.removeEventListener("load", restorePosition);
    };
  }, []);

  return null;
}
