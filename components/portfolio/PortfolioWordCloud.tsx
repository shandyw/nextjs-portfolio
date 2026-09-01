"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { getGsap, getScrollTrigger } from "@/lib/animation/utils";

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

type WordSize = "sm" | "md" | "lg" | "xl" | "2xl";
type WordTone = "text" | "primary" | "accent";

const words: Array<{ label: string; size: WordSize; tone?: WordTone }> = [
  { label: "Cross-Browser", size: "sm" },
  { label: "Responsive Design", size: "xl", tone: "primary" },
  { label: "Performance", size: "md" },
  { label: "Accessibility", size: "lg", tone: "primary" },
  { label: "WCAG", size: "md" },
  { label: "SEO", size: "xl", tone: "accent" },
  { label: "Optimization", size: "sm" },
  { label: "Animation", size: "sm" },
  { label: "Semantic Markup", size: "md" },
  { label: "UI", size: "xl" },
  { label: "UX", size: "xl", tone: "accent" },
  { label: "Design Systems", size: "lg", tone: "primary" },
  { label: "Front-End", size: "2xl", tone: "primary" },
  { label: "Gutenberg", size: "xl" },
  { label: "JavaScript", size: "2xl", tone: "primary" },
  { label: "GSAP", size: "sm" },
  { label: "WordPress", size: "2xl", tone: "primary" },
  { label: "TypeScript", size: "md" },
  { label: "HTML", size: "lg" },
  { label: "CSS", size: "xl", tone: "accent" },
  { label: "ACF", size: "xl" },
  { label: "Web Development", size: "2xl", tone: "primary" },
  { label: "Sass", size: "sm" },
  { label: "Tailwind", size: "md" },
  { label: "Theme Development", size: "lg" },
  { label: "Components", size: "md" },
  { label: "PHP", size: "xl" },
  { label: "Maintainable Code", size: "sm" },
  { label: "Plugin Development", size: "lg", tone: "primary" },
  { label: "REST API", size: "xl", tone: "accent" },
  { label: "Git", size: "md" },
  { label: "Headless CMS", size: "lg", tone: "primary" },
  { label: "APIs", size: "sm" },
  { label: "React", size: "md" },
  { label: "Next.js", size: "md" },
  { label: "Content Modeling", size: "sm" },
  { label: "Custom Post Types", size: "sm" },
  { label: "Blocks", size: "sm" },
  { label: "Debugging", size: "sm" },
];

const sizeClasses: Record<WordSize, string> = {
  sm: "text-[clamp(0.7rem,1vw,0.9rem)]",
  md: "text-[clamp(0.85rem,1.4vw,1.2rem)]",
  lg: "text-[clamp(1rem,1.8vw,1.55rem)]",
  xl: "text-[clamp(1.2rem,2.4vw,2rem)]",
  "2xl": "text-[clamp(1.45rem,3.1vw,2.65rem)]",
};

const toneClasses: Record<WordTone, string> = {
  text: "text-text font-medium",
  primary: "text-primary font-bold",
  accent: "text-accent font-extrabold",
};

export function PortfolioWordCloud() {
  const cloudRef = useRef<HTMLUListElement>(null);

  useIsomorphicLayoutEffect(() => {
    let cancelled = false;
    let context: { revert: () => void } | null = null;
    const listenerCleanups: Array<() => void> = [];

    async function initAnimation() {
      const [gsap, ScrollTrigger] = await Promise.all([
        getGsap(),
        getScrollTrigger(),
      ]);
      if (cancelled || !gsap || !ScrollTrigger || !cloudRef.current) return;

      gsap.registerPlugin(ScrollTrigger);
      const cloud = cloudRef.current;
      const wordElements = Array.from(
        cloud.querySelectorAll<HTMLElement>("[data-cloud-word]"),
      );

      context = gsap.context(() => {
        gsap.fromTo(
          wordElements,
          {
            autoAlpha: 0,
            scale: 0,
            x: () => gsap.utils.random(-180, 180),
            y: () => gsap.utils.random(-140, 140),
            transformOrigin: "center center",
          },
          {
            autoAlpha: 1,
            scale: 1,
            x: 0,
            y: 0,
            duration: () => gsap.utils.random(0.9, 1.7),
            delay: 0.15,
            stagger: 0.035,
            ease: "back.out(1.35)",
            scrollTrigger: {
              trigger: cloud,
              start: "top 85%",
              once: true,
            },
          },
        );

        wordElements.forEach((word) => {
          const replayWord = () => {
            gsap.killTweensOf(word);
            gsap.fromTo(
              word,
              {
                autoAlpha: 0,
                scale: 0.25,
                x: gsap.utils.random(-90, 90),
                y: gsap.utils.random(-70, 70),
              },
              {
                autoAlpha: 1,
                scale: 1,
                x: 0,
                y: 0,
                duration: gsap.utils.random(0.65, 1.1),
                ease: "back.out(1.6)",
              },
            );
          };

          word.addEventListener("mouseenter", replayWord);
          listenerCleanups.push(() =>
            word.removeEventListener("mouseenter", replayWord),
          );
        });
      }, cloud);
    }

    void initAnimation();
    return () => {
      cancelled = true;
      listenerCleanups.forEach((cleanup) => cleanup());
      context?.revert();
    };
  }, []);

  return (
    <ul
      ref={cloudRef}
      aria-label="Web development and design capabilities"
      className="order-2 m-0 flex min-h-[20rem] w-full max-w-[44rem] list-none flex-wrap content-center items-baseline justify-center gap-x-sm gap-y-xs overflow-hidden p-sm text-center font-label leading-none md:order-2 md:min-h-[22rem] md:justify-self-end md:p-md"
    >
      {words.map((word) => (
        <li
          key={word.label}
          data-cloud-word
          className={`inline-block cursor-default whitespace-nowrap leading-none will-change-transform ${sizeClasses[word.size]} ${toneClasses[word.tone ?? "text"]}`}
        >
          {word.label}
        </li>
      ))}
    </ul>
  );
}
