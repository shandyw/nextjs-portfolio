"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { AboutIllustration } from "@/components/about/AboutIllustration";
import {
  getGsap,
  getScrollTrigger,
  prepareDrawPaths,
} from "@/lib/animation/utils";

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export function About() {
  const rootRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    let cancelled = false;
    let context: { revert: () => void } | null = null;

    async function init() {
      const [gsap, ScrollTrigger] = await Promise.all([
        getGsap(),
        getScrollTrigger(),
      ]);

      if (
        cancelled ||
        !gsap ||
        !ScrollTrigger ||
        !rootRef.current ||
        !viewportRef.current ||
        !trackRef.current
      ) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const section = rootRef.current;
      const viewport = viewportRef.current;
      const track = trackRef.current;

      context = gsap.context(() => {
        const laptopReveal = section.querySelector<SVGRectElement>(
          "[data-about-laptop] [data-laptop-reveal]",
        );
        const vines = Array.from(
          section.querySelectorAll<HTMLElement>("[data-about-vine]"),
        );
        const objects = Array.from(
          section.querySelectorAll<HTMLElement>("[data-about-object]"),
        );
        const starbursts = Array.from(
          section.querySelectorAll<HTMLElement>("[data-about-starburst]"),
        );
        const drawPaths = prepareDrawPaths(
          Array.from(
            section.querySelectorAll<SVGGeometryElement>("[data-about-draw]"),
          ),
        );
        const copyBlocks = Array.from(
          section.querySelectorAll<HTMLElement>("[data-about-copy]"),
        );
        const isTablet = () =>
          window.matchMedia("(min-width: 768px) and (max-width: 1279px)")
            .matches;
        const sectionHeight = () => (isTablet() ? "70svh" : "100svh");

        gsap.set(section, {
          height: sectionHeight,
          minHeight: sectionHeight,
          overflow: "hidden",
        });
        gsap.set(viewport, {
          height: "100%",
          minHeight: "100%",
          overflow: "hidden",
        });
        gsap.set(track, { willChange: "transform" });
        if (laptopReveal) {
          gsap.set(laptopReveal, { attr: { width: 0 } });
        }
        gsap.set(vines, {
          autoAlpha: 0,
          clipPath: "inset(100% 0% 0% 0%)",
        });
        gsap.set(objects, { autoAlpha: 0, scale: 0.2 });
        gsap.set(starbursts, {
          autoAlpha: 0,
          x: 56,
          scale: 0.6,
          rotation: 55,
          transformOrigin: "center",
        });
        const supportsTextClip =
          CSS.supports("background-clip", "text") ||
          CSS.supports("-webkit-background-clip", "text");

        if (supportsTextClip) {
          gsap.set(copyBlocks, {
            color: "transparent",
            backgroundColor: "rgb(255 253 245 / 0.14)",
            backgroundImage:
              "linear-gradient(to bottom, transparent 0%, transparent 40%, #FFFDF5 47%, #FFFDF5 55%, transparent 63%, transparent 100%)",
            backgroundPosition: "0 0",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100svh",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
          });
        }

        const isMobile = () => window.matchMedia("(max-width: 767px)").matches;
        const viewportHeight = () => viewport.clientHeight;
        const textPanelHeight = () => viewportHeight() * (isMobile() ? 0.5 : 1);
        const highlightRatio = () => (isMobile() ? 0.58 : 0.42);
        const startY = () => {
          if (isMobile()) return viewportHeight() * 0.16;

          const firstBlock = copyBlocks[0];
          if (!firstBlock) return viewportHeight() * 0.05;

          const lineHeight = Number.parseFloat(
            window.getComputedStyle(firstBlock).lineHeight,
          );
          const firstLineCenter =
            firstBlock.offsetTop +
            (Number.isFinite(lineHeight) ? lineHeight / 2 : 0);

          return (
            viewportHeight() * highlightRatio() -
            track.offsetTop -
            firstLineCenter
          );
        };
        const endY = () => {
          const lastBlock = copyBlocks.at(-1);
          if (lastBlock) {
            const lineHeight = Number.parseFloat(
              window.getComputedStyle(lastBlock).lineHeight,
            );
            const lastLineCenter =
              lastBlock.offsetTop +
              lastBlock.offsetHeight -
              (Number.isFinite(lineHeight) ? lineHeight / 2 : 0);
            const highlightCenter = textPanelHeight() * highlightRatio();

            return highlightCenter - track.offsetTop - lastLineCenter;
          }

          return -track.scrollHeight + viewportHeight() * 0.55;
        };
        const scrollDistance = () => {
          const readableBuffer = viewportHeight() * 0.15;
          const minimum = viewportHeight() * (isMobile() ? 0.9 : 1.05);

          return Math.ceil(
            Math.max(minimum, track.scrollHeight + readableBuffer),
          );
        };
        const updateHighlight = () => {
          if (!supportsTextClip) return;

          const viewportBounds = viewport.getBoundingClientRect();
          const highlightViewportHeight = textPanelHeight();
          const highlightCenter =
            viewportBounds.top + highlightViewportHeight * highlightRatio();

          copyBlocks.forEach((block) => {
            const blockTop = block.getBoundingClientRect().top;
            const backgroundTop =
              highlightCenter - blockTop - highlightViewportHeight * 0.51;

            block.style.backgroundSize = `100% ${highlightViewportHeight}px`;
            block.style.backgroundPosition = `0 ${backgroundTop}px`;
          });
        };

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${scrollDistance()}`,
            pin: true,
            pinSpacing: true,
            scrub: isMobile() ? true : 0.75,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: updateHighlight,
            onRefresh: updateHighlight,
          },
        });

        timeline
          .fromTo(
            "[data-about-label]",
            { autoAlpha: 0, y: 10 },
            { autoAlpha: 1, y: 0, duration: 0.1, ease: "none" },
            0,
          )
          .fromTo(
            track,
            { y: startY },
            {
              y: endY,
              duration: 1,
              ease: "none",
              immediateRender: true,
            },
            0,
          );

        if (laptopReveal) {
          timeline.to(
            laptopReveal,
            { attr: { width: 1536 }, duration: 0.2, ease: "none" },
            0,
          );
        }

        const hash = (value: string) => {
          let result = 2166136261;
          for (let index = 0; index < value.length; index += 1) {
            result ^= value.charCodeAt(index);
            result = Math.imul(result, 16777619);
          }
          return result >>> 0;
        };
        const randomized = <T extends Element>(items: T[]) =>
          [...items].sort(
            (a, b) =>
              hash(a.getAttribute("data-random-key") ?? "") -
              hash(b.getAttribute("data-random-key") ?? ""),
          );

        randomized(vines).forEach((vine, index) => {
          timeline.to(
            vine,
            {
              autoAlpha: 1,
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 0.26,
              ease: "power1.out",
            },
            0.22 + index * 0.055,
          );
        });

        randomized(objects).forEach((object, index) => {
          const key = object.dataset.randomKey ?? "about-object";
          const seed = hash(key);
          const direction = seed % 2 === 0 ? 1 : -1;

          timeline.fromTo(
            object,
            {
              autoAlpha: 0,
              scale: 0.2,
              x: direction * (10 + (seed % 22)),
              y: 12 + (seed % 28),
              rotation: direction * (8 + (seed % 20)),
            },
            {
              autoAlpha: 1,
              scale: 1,
              x: 0,
              y: 0,
              rotation: 0,
              duration: 0.13 + (seed % 5) * 0.012,
              ease: "back.out(1.5)",
            },
            0.36 + index * 0.022,
          );
        });

        randomized(starbursts).forEach((starburst, index) => {
          timeline.to(
            starburst,
            {
              autoAlpha: 1,
              x: 0,
              scale: 1,
              rotation: 0,
              duration: 0.16,
              ease: "power2.out",
            },
            0.48 + index * 0.055,
          );
        });

        drawPaths.forEach((path, index) => {
          timeline.to(
            path,
            { strokeDashoffset: 0, duration: 0.18, ease: "none" },
            0.4 + index * 0.025,
          );
        });

        // Keep the section pinned briefly after the track reaches its final
        // position so the last line completes its reveal before unpinning.
        timeline.to({}, { duration: 0.14 }, 1);

        timeline.eventCallback("onComplete", () => {
          gsap.set(track, { clearProps: "willChange" });
        });
      }, section);
    }

    void init();

    return () => {
      cancelled = true;
      context?.revert();
    };
  }, []);

  return (
    <section
      id="about"
      ref={rootRef}
      aria-labelledby="about-heading"
      data-about
      className="relative isolate min-h-[100vh] min-h-[100svh] bg-text text-white"
    >
      <div
        ref={viewportRef}
        data-about-viewport
        className="container relative flex min-h-[100vh] min-h-[100svh] items-start px-gutter py-xl md:py-2xl"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-[25] h-[calc(var(--spacing-xl)+var(--spacing-lg)+2.25rem)] bg-text md:right-auto md:h-[calc(var(--spacing-2xl)+var(--spacing-lg)+2.25rem)] md:w-[60%]"
        />
        <p
          id="about-heading"
          data-about-label
          className="absolute left-gutter top-[calc(var(--spacing-xl)+var(--spacing-lg))] z-30 m-0 flex items-center gap-sm bg-text py-xs pr-sm font-label text-label-sm font-bold uppercase text-white md:top-[calc(var(--spacing-2xl)+var(--spacing-lg))]"
        >
          About me
          <span
            className="block h-px w-24 bg-white sm:w-40"
            aria-hidden="true"
          />
        </p>
        <AboutIllustration />

        <div
          ref={trackRef}
          data-about-track
          className="relative z-10 mx-auto flex h-1/2 w-full max-w-none flex-col gap-xl pb-xl pt-2xl md:ml-0 md:mr-auto md:h-auto md:max-w-[52%] md:gap-2xl md:pb-2xl"
        >
          <p
            data-about-copy
            className="font-display text-[clamp(2rem,3.6vw,3.5rem)] font-bold leading-[1.03] tracking-[-0.04em]"
          >
            With over a decade of experience in web development, I specialize in
            creating digital products that are not only beautiful but also
            performant, accessible, and maintainable.
          </p>

          <p
            data-about-copy
            className="font-display text-[clamp(2rem,3.6vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.035em]"
          >
            I&apos;m passionate about the intersection of design and
            engineering, believing that great products require both discipline
            and creativity.
          </p>

          <p
            data-about-copy
            className="font-display text-[clamp(2rem,3.6vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.035em]"
          >
            When I&apos;m not building websites, you can find me traveling,
            cooking, tending to plants, or playing with my cats.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
