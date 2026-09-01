/**
 * Animation Utilities
 *
 * Helpers for GSAP animation initialization that:
 * - Respect reduced-motion preferences
 * - Prevent server-rendering errors
 * - Provide reusable patterns for animation
 * - Handle cleanup properly
 */

/**
 * Check if user prefers reduced motion
 *
 * Should be called in a client component.
 * Returns true if user has enabled "prefers reduced motion" in OS settings.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function prepareDrawPaths(paths: SVGGeometryElement[]) {
  paths.forEach((path) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
  });

  return paths;
}

/**
 * Safely get GSAP instance
 *
 * Dynamic import ensures GSAP is only loaded in browser.
 * Returns null if user prefers reduced motion.
 *
 * Usage:
 * ```
 * const gsap = await getGsap();
 * if (!gsap) return; // User prefers reduced motion
 * ```
 */
export async function getGsap() {
  if (prefersReducedMotion()) return null;

  try {
    const gsapModule = await import("gsap");
    return gsapModule.default;
  } catch (error) {
    console.error("Failed to load GSAP:", error);
    return null;
  }
}

/**
 * Safely get GSAP ScrollTrigger plugin
 *
 * Must register plugin with GSAP before use.
 *
 * Usage:
 * ```
 * const gsap = await getGsap();
 * const ScrollTrigger = await getScrollTrigger();
 * if (gsap && ScrollTrigger) {
 *   gsap.registerPlugin(ScrollTrigger);
 * }
 * ```
 */
export async function getScrollTrigger() {
  if (prefersReducedMotion()) return null;

  try {
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    return ScrollTrigger;
  } catch (error) {
    console.error("Failed to load GSAP ScrollTrigger:", error);
    return null;
  }
}

/**
 * Initialize GSAP with ScrollTrigger
 *
 * Handles plugin registration and reduced-motion detection.
 *
 * Usage:
 * ```
 * useEffect(() => {
 *   const cleanup = await initGsapScrollTrigger();
 *   return cleanup;
 * }, []);
 * ```
 */
export async function initGsapScrollTrigger() {
  if (prefersReducedMotion()) return () => {};

  try {
    const gsapModule = await import("gsap");
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    const gsap = gsapModule.default;

    if (!gsap.plugins.hasOwnProperty("scrollTrigger")) {
      gsap.registerPlugin(ScrollTrigger);
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  } catch (error) {
    console.error("Failed to initialize GSAP ScrollTrigger:", error);
    return () => {};
  }
}

/**
 * Create a scoped GSAP context
 *
 * Ensures animations are properly grouped and cleaned up.
 *
 * Usage:
 * ```
 * const ctx = gsap.context(() => {
 *   gsap.to(".element", { duration: 1, x: 100 });
 * });
 *
 * return () => ctx.revert();
 * ```
 */
export type GsapContextType = {
  revert: () => void;
} | null;

/**
 * Create GSAP animation wrapper
 *
 * Simple wrapper for GSAP animations that respects reduced-motion
 * and ensures proper cleanup.
 *
 * Usage:
 * ```
 * createAnimation(() => {
 *   gsap.to(".element", { duration: 1, opacity: 1 });
 * });
 * ```
 */
export async function createAnimation(
  callback: (gsap: any) => void,
  skipReducedMotion = false,
) {
  if (!skipReducedMotion && prefersReducedMotion()) {
    return () => {};
  }

  try {
    const gsapModule = await import("gsap");
    const gsap = gsapModule.default;
    callback(gsap);
    return () => {
      gsap.killTweensOf("*");
    };
  } catch (error) {
    console.error("Failed to create animation:", error);
    return () => {};
  }
}
