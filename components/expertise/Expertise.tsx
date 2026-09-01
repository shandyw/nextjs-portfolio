"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { ExpertiseIntroArt } from "@/components/expertise/ExpertiseIntroArt";
import { ExpertiseMobileScene } from "@/components/expertise/ExpertiseMobileScene";
import {
  ExpertiseScene,
  expertiseItems,
} from "@/components/expertise/ExpertiseScene";
import {
  getGsap,
  getScrollTrigger,
  prepareDrawPaths,
} from "@/lib/animation/utils";

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export function Expertise() {
  const rootRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    let cancelled = false;
    let context: { revert: () => void } | null = null;
    let media: {
      add: (query: string, callback: () => void) => unknown;
      revert: () => void;
    } | null = null;

    async function init() {
      const [gsap, ScrollTrigger] = await Promise.all([
        getGsap(),
        getScrollTrigger(),
      ]);

      if (cancelled || !gsap || !ScrollTrigger || !rootRef.current) return;

      gsap.registerPlugin(ScrollTrigger);
      const section = rootRef.current;

      context = gsap.context(() => {
        media = gsap.matchMedia();

        const setupHorizontalScene = (isDesktop: boolean) => {
          const line = section.querySelector<SVGGeometryElement>(
            "[data-expertise-line]",
          );
          if (!line) return;

          const wavePaths = Array.from(
            section.querySelectorAll<SVGGeometryElement>(
              "[data-expertise-wave]",
            ),
          );
          prepareDrawPaths([line, ...wavePaths]);

          const steps = Array.from(
            section.querySelectorAll<HTMLElement>("[data-expertise-step]"),
          );
          const nodes = Array.from(
            section.querySelectorAll<HTMLElement>("[data-expertise-node]"),
          );
          const items = Array.from(
            section.querySelectorAll<HTMLElement>("[data-expertise-item]"),
          );
          const vines = Array.from(
            section.querySelectorAll<HTMLElement>("[data-expertise-vine]"),
          ).sort(
            (a, b) =>
              Number(a.dataset.expertiseVine) - Number(b.dataset.expertiseVine),
          );
          const accents = Array.from(
            section.querySelectorAll<HTMLElement>("[data-expertise-accent]"),
          );
          const headlineLines = Array.from(
            section.querySelectorAll<HTMLElement>(
              "[data-expertise-headline-line]",
            ),
          );
          const rules = Array.from(
            section.querySelectorAll<HTMLElement>("[data-expertise-cta-rule]"),
          );

          gsap.set("[data-expertise-eyebrow], [data-expertise-copy]", {
            autoAlpha: 0,
            y: 16,
          });
          gsap.set(headlineLines, { yPercent: 110 });
          gsap.set("[data-expertise-intro-art]", { autoAlpha: 0, scale: 0.85 });
          gsap.set([...steps, ...nodes], { autoAlpha: 0, scale: 0 });
          gsap.set(items, { autoAlpha: 0, y: 12 });
          gsap.set(vines, {
            autoAlpha: 0,
            clipPath: "inset(100% 0 0 0)",
          });
          gsap.set(accents, { autoAlpha: 0, scale: 0 });
          gsap.set(rules, { scaleX: 0, transformOrigin: "center" });

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: isDesktop ? "top top" : "top 75%",
              end: isDesktop ? "+=200%" : undefined,
              pin: isDesktop,
              scrub: isDesktop ? 0.7 : undefined,
              once: !isDesktop,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          timeline
            .to(
              "[data-expertise-eyebrow]",
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.025,
              },
              0,
            )
            .to(
              headlineLines,
              {
                yPercent: 0,
                duration: 0.045,
                stagger: 0.012,
                ease: "power2.out",
              },
              0.012,
            )
            .to(
              "[data-expertise-copy]",
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.035,
              },
              0.04,
            )
            .to(
              "[data-expertise-intro-art]",
              {
                autoAlpha: 1,
                scale: 1,
                duration: 0.035,
                stagger: 0.008,
              },
              0.045,
            )
            .to(
              wavePaths,
              {
                strokeDashoffset: 0,
                duration: 0.035,
                stagger: 0.006,
                ease: "none",
              },
              0.045,
            )
            .to(
              line,
              {
                strokeDashoffset: 0,
                duration: 0.78,
                ease: "none",
              },
              0.08,
            );

          const arrivals = [0.11, 0.24, 0.37, 0.5, 0.63, 0.76];

          arrivals.forEach((arrival, index) => {
            timeline
              .to(
                nodes[index],
                {
                  autoAlpha: 1,
                  scale: 1,
                  duration: 0.025,
                  ease: "back.out(1.8)",
                },
                arrival,
              )
              .to(
                steps[index],
                {
                  autoAlpha: 1,
                  scale: 1,
                  duration: 0.055,
                  ease: "power2.out",
                },
                arrival + 0.012,
              );

            timeline.to(
              items[index],
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.045,
                ease: "power2.out",
              },
              arrival + 0.04,
            );
          });

          const vineArrivals = [
            arrivals[0],
            arrivals[1],
            arrivals[2],
            arrivals[4],
            arrivals[5],
          ];

          vines.forEach((vine, index) => {
            timeline.to(
              vine,
              {
                autoAlpha: 1,
                clipPath: "inset(0% 0 0 0)",
                duration: 0.065,
                ease: "power1.out",
              },
              vineArrivals[index] + 0.055,
            );
          });

          timeline
            .to(
              accents,
              {
                autoAlpha: 1,
                scale: 1,
                duration: 0.04,
                stagger: 0.012,
                ease: "back.out(1.5)",
              },
              0.86,
            )
            .to(rules, { scaleX: 1, duration: 0.035 }, 0.92);
        };

        media.add("(min-width: 1280px)", () => setupHorizontalScene(true));
        media.add("(min-width: 768px) and (max-width: 1279px)", () =>
          setupHorizontalScene(false),
        );

        media.add("(max-width: 767px)", () => {
          const scene = section.querySelector<HTMLElement>(
            "[data-expertise-mobile-scene]",
          );
          const line = section.querySelector<SVGGeometryElement>(
            "[data-mobile-expertise-line]",
          );
          if (!scene || !line) return;

          const steps = Array.from(
            scene.querySelectorAll<HTMLElement>("[data-mobile-expertise-step]"),
          );
          const nodes = Array.from(
            scene.querySelectorAll<HTMLElement>("[data-mobile-expertise-node]"),
          );
          const items = Array.from(
            scene.querySelectorAll<HTMLElement>("[data-mobile-expertise-item]"),
          );
          const vines = Array.from(
            scene.querySelectorAll<HTMLElement>("[data-mobile-expertise-vine]"),
          ).sort(
            (a, b) =>
              Number(a.dataset.mobileExpertiseVine) -
              Number(b.dataset.mobileExpertiseVine),
          );
          const accents = Array.from(
            scene.querySelectorAll<HTMLElement>(
              "[data-mobile-expertise-accent]",
            ),
          );
          const introTargets = [
            section.querySelector("[data-expertise-eyebrow]"),
            section.querySelector("[data-expertise-headline]"),
            section.querySelector("[data-expertise-copy]"),
            ...Array.from(
              section.querySelectorAll("[data-expertise-intro-art]"),
            ),
          ].filter((target): target is Element => target !== null);
          const rules = Array.from(
            section.querySelectorAll<HTMLElement>("[data-expertise-cta-rule]"),
          );

          prepareDrawPaths([line]);
          gsap.set(introTargets, { autoAlpha: 0, y: 12 });
          gsap.set([...steps, ...nodes], { autoAlpha: 0, scale: 0 });
          gsap.set(items, { autoAlpha: 0, y: 12 });
          gsap.set(vines, {
            autoAlpha: 0,
            clipPath: "inset(100% 0 0 0)",
          });
          gsap.set(accents, { autoAlpha: 0, scale: 0 });
          gsap.set(rules, { scaleX: 0, transformOrigin: "center" });

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              once: true,
              invalidateOnRefresh: true,
            },
          });

          timeline
            .to(
              introTargets,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.08,
                stagger: 0.01,
                ease: "power2.out",
              },
              0,
            )
            .to(
              line,
              {
                strokeDashoffset: 0,
                duration: 0.78,
                ease: "none",
              },
              0.08,
            );

          const arrivals = [0.11, 0.24, 0.37, 0.5, 0.63, 0.76];

          arrivals.forEach((arrival, index) => {
            timeline
              .to(
                nodes[index],
                {
                  autoAlpha: 1,
                  scale: 1,
                  duration: 0.025,
                  ease: "back.out(1.8)",
                },
                arrival,
              )
              .to(
                steps[index],
                {
                  autoAlpha: 1,
                  scale: 1,
                  duration: 0.055,
                  ease: "power2.out",
                },
                arrival + 0.012,
              )
              .to(
                items[index],
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.045,
                  ease: "power2.out",
                },
                arrival + 0.04,
              );
          });

          const vineArrivals = [
            arrivals[0],
            arrivals[1],
            arrivals[2],
            arrivals[4],
            arrivals[5],
          ];

          vines.forEach((vine, index) => {
            timeline.to(
              vine,
              {
                autoAlpha: 1,
                clipPath: "inset(0% 0 0 0)",
                duration: 0.065,
                ease: "power1.out",
              },
              vineArrivals[index] + 0.055,
            );
          });

          timeline
            .to(
              accents,
              {
                autoAlpha: 1,
                scale: 1,
                duration: 0.04,
                stagger: 0.012,
                ease: "back.out(1.5)",
              },
              0.86,
            )
            .to(rules, { scaleX: 1, duration: 0.035 }, 0.92);
        });
      }, section);
    }

    void init();

    return () => {
      cancelled = true;
      media?.revert();
      context?.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="expertise"
      aria-labelledby="expertise-heading"
      className="relative isolate flex flex-col overflow-hidden bg-white text-text xl:h-[100vh] xl:h-[100svh]"
    >
      <div className="container grid flex-1 grid-cols-1 gap-0 px-gutter pb-24 pt-xl md:gap-xl md:pb-lg xl:grid-cols-[minmax(17rem,0.62fr)_minmax(0,1.38fr)] xl:pb-28 xl:pt-2xl">
        <div className="relative z-10 w-full self-center md:max-w-none xl:max-w-[26rem]">
          <p
            data-expertise-eyebrow
            className="lg:pt-xl mb-md font-label text-label-sm font-bold uppercase text-primary flex items-center gap-sm"
          >
            My expertise
            <span
              className="block h-px w-24 bg-primary sm:w-40"
              aria-hidden="true"
            />
          </p>

          <h2
            id="expertise-heading"
            data-expertise-headline
            className="max-w-[11ch] font-display font-extrabold md:max-w-none xl:max-w-[11ch] mt-0"
          >
            <span className="block overflow-hidden">
              <span data-expertise-headline-line className="block">
                Six expertise.
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-expertise-headline-line className="block">
                One connected approach.
              </span>
            </span>
          </h2>

          <div className="md:grid md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-xl xl:block">
            <div
              data-expertise-copy
              className="mt-md max-w-none space-y-2 font-body text-[clamp(1rem,1.35vw,1.25rem)] leading-[1.65] text-text xl:max-w-[29rem]"
            >
              <p>Each area strengthens the next.</p>
              <p>
                Together they create thoughtful, high-performance digital
                experiences.
              </p>
            </div>

            <ExpertiseIntroArt />
          </div>
        </div>

        <div
          data-expertise-animation
          className="relative mx-auto hidden aspect-[2020/900] h-auto w-[86%] max-w-[72rem] md:block xl:mx-0 xl:aspect-auto xl:h-full xl:w-full xl:max-w-none"
        >
          <ExpertiseScene />
        </div>

        <div className="relative block md:hidden">
          <ExpertiseMobileScene />
        </div>

        <ol className="sr-only lg:hidden">
          {expertiseItems.map((item) => (
            <li key={item.number}>
              <strong>
                {item.number} {item.title}:
              </strong>{" "}
              {item.copy}
            </li>
          ))}
        </ol>
      </div>

      <div
        data-expertise-cta
        className="z-40 mb-lg flex items-center justify-center gap-sm md:gap-md px-gutter md:mb-xl xl:absolute xl:inset-x-gutter xl:bottom-xl xl:mb-0 xl:px-0"
      >
        <span
          data-expertise-cta-rule
          aria-hidden="true"
          className="h-px max-w-52 flex-1 bg-text/55"
        />
        <a
          href="#contact"
          className="group/arrow inline-flex items-center gap-sm font-label text-label-sm font-bold uppercase tracking-[0.06em] text-primary no-underline transition-colors hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:text-label-md"
        >
          <span aria-hidden="true">•</span>
          <span>Let&apos;s build something great together</span>
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-200 group-hover/arrow:translate-x-1"
          >
            →
          </span>
        </a>
        <span
          data-expertise-cta-rule
          aria-hidden="true"
          className="h-px max-w-52 flex-1 bg-text/55"
        />
      </div>
    </section>
  );
}

export default Expertise;
