"use client";

import { useEffect, useRef } from "react";
import {
  getGsap,
  prefersReducedMotion,
  prepareDrawPaths,
} from "@/lib/animation/utils";
import BotanicalLine from "./BotanicalLine";
import CircleCoral from "./CircleCoral";
import CircleText from "./CircleText";
import DotGrid from "./DotGrid";
import { HeroPortrait } from "./HeroPortrait";
import LineFlourish from "./LineFlourish";
import ScrollArrow from "./ScrollArrow";
import ShapePinkArch from "./ShapePinkArch";
import ShapeYellowArch from "./ShapeYellowArch";
import Starburst from "./Starburst";
import StripeBlock from "./StripeBlock";

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cancelled = false;
    let context: { revert: () => void } | null = null;

    async function init() {
      const gsap = await getGsap();
      if (cancelled || !rootRef.current) return;

      const root = rootRef.current;
      const reveal = () => {
        root
          .querySelectorAll<HTMLElement>("[data-hero-reveal]")
          .forEach((element) => {
            element.style.opacity = "1";
            element.style.visibility = "visible";
            element.style.transform = "none";
          });
        root
          .querySelectorAll<SVGPathElement>("#hero-portrait path")
          .forEach((path) => {
            path.style.strokeDashoffset = "0";
          });
        root
          .querySelectorAll<SVGPathElement>("#hero-portrait #lip-fills path")
          .forEach((path) => {
            path.style.fill = "#FF5E6C";
          });
      };

      if (!gsap || prefersReducedMotion()) {
        reveal();
        return;
      }

      context = gsap.context(() => {
        const select = <T extends Element>(selector: string) =>
          Array.from(root.querySelectorAll<T>(selector));
        const paths = (groupId: string) =>
          prepareDrawPaths(
            select<SVGPathElement>(`#hero-portrait #${groupId} path`),
          );
        const lipFills = select<SVGPathElement>(
          "#hero-portrait #lip-fills path",
        );
        gsap.set(lipFills, { fill: "rgb(255 94 108 / 0)" });
        const master = gsap.timeline({ defaults: { ease: "power3.out" } });
        master.addLabel("start", 0);

        const portrait = gsap.timeline();
        portrait
          .to(
            paths("silhouette"),
            {
              strokeDashoffset: 0,
              duration: 1.1,
              stagger: 0.006,
              ease: "power1.out",
            },
            0,
          )
          .to(
            paths("face-contours"),
            {
              strokeDashoffset: 0,
              duration: 1,
              stagger: 0.007,
              ease: "power1.out",
            },
            0,
          )
          .to(
            paths("face-details"),
            {
              strokeDashoffset: 0,
              duration: 0.8,
              stagger: 0.006,
              ease: "power1.out",
            },
            0.12,
          )
          .to(
            lipFills,
            {
              fill: "#FF5E6C",
              duration: 0.35,
              stagger: 0.06,
              ease: "power2.out",
            },
            0.95,
          )
          .to(
            paths("hair-top"),
            {
              strokeDashoffset: 0,
              duration: 1.3,
              stagger: 0.006,
              ease: "power1.out",
            },
            0.15,
          )
          .to(
            paths("hair-left"),
            {
              strokeDashoffset: 0,
              duration: 1.35,
              stagger: 0.006,
              ease: "power1.out",
            },
            0.2,
          )
          .to(
            paths("hair-right"),
            {
              strokeDashoffset: 0,
              duration: 1.35,
              stagger: 0.006,
              ease: "power1.out",
            },
            0.24,
          )
          .to(
            paths("blouse"),
            {
              strokeDashoffset: 0,
              duration: 1.05,
              stagger: 0.006,
              ease: "power1.out",
            },
            0.42,
          )
          .to(
            paths("decorative-left"),
            {
              strokeDashoffset: 0,
              duration: 1,
              stagger: 0.005,
              ease: "power1.out",
            },
            0.48,
          )
          .to(
            paths("decorative-right"),
            {
              strokeDashoffset: 0,
              duration: 1,
              stagger: 0.005,
              ease: "power1.out",
            },
            0.5,
          )
          .to(
            paths("supporting-lines"),
            { strokeDashoffset: 0, duration: 1.1, ease: "power1.out" },
            0.54,
          );

        const botanicalPaths = prepareDrawPaths(
          select<SVGPathElement>("[data-hero-botanical] path"),
        );
        const botanicalElement = select<SVGSVGElement>(
          "[data-hero-botanical]",
        )[0];
        const botanical = gsap
          .timeline()
          .fromTo(
            botanicalElement,
            {
              clipPath: "inset(100% 0 0 0)",
              scaleY: 0.2,
              y: 20,
              transformOrigin: "bottom center",
            },
            {
              clipPath: "inset(0% 0 0 0)",
              scaleY: 1,
              y: 0,
              duration: 1.15,
              ease: "power2.out",
            },
          )
          .to(
            botanicalPaths,
            {
              strokeDashoffset: 0,
              duration: 1.05,
              stagger: 0.035,
              ease: "power1.out",
            },
            0,
          );
        const flourishPaths = prepareDrawPaths(
          select<SVGPathElement>("[data-hero-flourish] path"),
        );
        const flourish = gsap.timeline().to(flourishPaths, {
          strokeDashoffset: 0,
          duration: 0.95,
          ease: "power1.out",
        });

        master
          .from(
            "[data-hero-eyebrow]",
            { autoAlpha: 0, y: 10, duration: 0.45 },
            "start",
          )
          .from(
            "[data-hero-headline-line]",
            { yPercent: 110, duration: 0.8, stagger: 0.09 },
            "start+=0.08",
          )
          .fromTo(
            "[data-hero-underline]",
            { clipPath: "inset(0 100% 0 0)" },
            {
              clipPath: "inset(0 0% 0 0)",
              duration: 0.8,
              ease: "power2.out",
            },
            "start+=1.25",
          )
          .from(
            "[data-hero-coral]",
            {
              autoAlpha: 0,
              scale: 0.05,
              duration: 0.9,
              ease: "power3.out",
              transformOrigin: "center",
            },
            "start+=0.18",
          )
          .add(portrait, "start+=0.30")
          .from(
            "[data-hero-organic-shape]",
            {
              autoAlpha: 0,
              scale: 0.85,
              y: 12,
              duration: 0.78,
              stagger: 0.06,
              transformOrigin: "center",
            },
            "start+=0.35",
          )
          .add(botanical, "start+=2.75")
          .fromTo(
            "[data-hero-dot-grid] [data-dot-grid-point]",
            {
              autoAlpha: 0,
              scale: 0,
              y: 14,
              transformOrigin: "center",
            },
            {
              autoAlpha: 1,
              scale: 1,
              y: 0,
              duration: 0.42,
              ease: "back.out(3)",
              stagger: {
                each: 0.025,
                grid: [10, 12],
                from: 108,
              },
            },
            "start+=1.80",
          )
          .from(
            "[data-hero-stripes]",
            { clipPath: "inset(0 100% 0 0)", duration: 0.7 },
            "start+=0.70",
          )
          .add(flourish, "start+=0.78")
          .from(
            "[data-hero-copy]",
            { autoAlpha: 0, y: 14, duration: 0.6 },
            "start+=0.90",
          )
          .fromTo(
            "#hero-portrait #polka-dots .dot",
            { autoAlpha: 0, scale: 0, transformOrigin: "center" },
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.38,
              stagger: 0.02,
              ease: "power2.out",
            },
            "start+=1.00",
          )
          .fromTo(
            "[data-hero-cta]",
            { autoAlpha: 0, y: 10 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.08,
              clearProps: "opacity,visibility,transform",
            },
            "start+=1.03",
          )
          .from(
            "[data-hero-scroll]",
            { autoAlpha: 0, y: 8, duration: 0.45 },
            "start+=1.30",
          )
          .from(
            "[data-hero-circle-text]",
            {
              autoAlpha: 0,
              scale: 0.65,
              duration: 0.6,
              transformOrigin: "center",
            },
            "start+=1.45",
          )
          .from(
            "[data-hero-starburst]",
            {
              autoAlpha: 0,
              x: 56,
              scale: 0.6,
              rotation: 55,
              duration: 0.72,
              transformOrigin: "center",
            },
            "start+=4.00",
          );

        gsap.to("[data-hero-scroll-arrow]", {
          y: 6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          duration: 1.6,
          delay: 1.8,
        });

        gsap.to("[data-hero-circle-text]", {
          rotation: 360,
          repeat: -1,
          duration: 12,
          ease: "none",
          transformOrigin: "center",
          delay: 2.05,
        });
      }, root);
    }

    void init();

    return () => {
      cancelled = true;
      context?.revert();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={rootRef}
      aria-labelledby="hero-heading"
      className="relative isolate flex h-[calc(100svh-6rem)] flex-col overflow-hidden bg-background sm:h-auto sm:min-h-[calc(100svh-6rem)] md:block md:h-[50vh] md:h-[50svh] md:min-h-[50vh] md:min-h-[50svh] lg:h-[70vh] lg:h-[70svh] lg:min-h-[70vh] lg:min-h-[70svh] xl:h-auto xl:min-h-[calc(100svh-6rem)]"
    >
      <CircleText
        data-hero-circle-text
        data-hero-reveal
        className="pointer-events-none absolute right-4 top-[15%] z-[60] hidden h-24 w-24 text-text sm:bottom-[20%] sm:right-8 sm:top-0 sm:h-32 sm:w-32 md:bottom-auto md:left-[31%] md:right-auto md:top-[18%] md:block md:h-48 md:w-48 xl:left-[32%] xl:h-52 xl:w-52"
      />
      <div className="container relative z-20 px-gutter pt-8 md:flex md:min-h-[50vh] md:min-h-[50svh] md:items-center md:py-16 md:pb-16 md:pt-0 xl:min-h-[calc(100svh-6rem)]">
        <div className="relative z-20 max-w-[41rem] md:w-[43%]">
          <div
            className="hero-eyebrow mb-md flex items-center gap-4 font-label text-label-sm font-bold uppercase text-text"
            data-hero-eyebrow
            data-hero-reveal
          >
            <span>HELLO, I&apos;M SHANDY</span>
            <span className="h-px w-24 bg-text sm:w-40" aria-hidden="true" />
          </div>

          <h1
            id="hero-heading"
            className="mb-md font-display text-[clamp(3rem,7.1vw,7.5rem)] font-extrabold leading-[0.8] tracking-[-0.055em]"
          >
            <span className="block overflow-hidden pb-[0.08em]">
              <span
                className="hero-line block"
                data-hero-headline-line
                data-hero-reveal
              >
                I build
              </span>
            </span>

            <span className="block overflow-visible pb-[0.08em]">
              <span className="underline-text relative inline-block text-text">
                better
                <svg
                  data-hero-underline
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1576 141"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute left-0 top-[92%] h-[0.13em] w-full overflow-visible text-primary"
                >
                  <path
                    d="M153.58 20.56c54.61 7.77 11.57 2.06 114.89 15.59 13.33 1.74 90.26 10.48 91.36 10.58 134.57 12.96 190.69 18.5 388.54 25.15 129.22 1.29 93.08 1.1 154.55.57 81.39-.71 59.62-.04 125.55-4.57 63.95-4.4 45.79-3.03 63.95-4.82 122.74-12.1 74.45-6.7 196.81-22.16.11-.01 87.68-12.88 144.71-23.82l59.43-11.39c1.85-.35 3.34 1.62 4.26 2.89 5.62 7.81 7.57 23.36 5.18 27.51 24.07-1.73 36.84-3.04 53.78-2.26 2.94.14 5.88.72 8.79 1.14 7.63 2.7 13.25 29.31 8.37 33.57a11.5 11.5 0 0 1-6.34 3.04 61.01 61.01 0 0 1-21.5 10.23c-4.78 1.12-7.26 1.09-26.8 2.32-26.15 1.64-20.08 2.59-70.36 10.41-124.17 19.35-260.96 36.26-386.48 42.12-203.77 9.49-418.63-.99-621.76-19.77C188.84 102.05 36.15 75.18 30.07 74.7a10.51 10.51 0 0 1-4.75-1.64c-1.91-1.23-3.06-3.52-4.14-5.42-5.56-9.8-6.47-22.79-4.73-27.16-2.45-1.29-4.88-2.65-7.33-3.91C4.2 34.06-2.72 12.7 1.11 4.47c.85-1.32 1.61-2.4 2.71-3.52C4.57.19 5.83 0 6.95 0c7.42 0 128.62 17.94 146.63 20.56Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span
                className="hero-line block whitespace-nowrap"
                data-hero-headline-line
                data-hero-reveal
              >
                websites<span className="text-primary">.</span>
              </span>
            </span>
          </h1>

          <span className="mb-md block h-0.5 w-14 bg-text" aria-hidden="true" />

          <p
            className="hero-copy mb-md max-w-[32rem] font-serif text-[clamp(1rem,1.35vw,1.25rem)] leading-[1.65] text-text md:mb-lg"
            data-hero-copy
            data-hero-reveal
          >
            I build accessible, high-performance websites and applications that
            are fast, scalable, and user-focused.
          </p>

          <div className="hero-ctas flex flex-wrap items-center gap-6 sm:gap-12">
            <a
              href="/portfolio"
              className="group/arrow btn-primary rounded-none uppercase inline-flex min-h-14 items-center gap-8 bg-primary px-6 font-label text-label-sm text-text no-underline hover:bg-text hover:text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              data-hero-cta
              data-hero-reveal
            >
              VIEW MY WORK
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 group-hover/arrow:translate-x-1"
              >
                →
              </span>
            </a>
            <a
              href="#about"
              className="hidden lg:block border-b border-text pb-1 font-label text-label-sm font-bold text-text no-underline hover:text-primary transition-colors duration-fast hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary uppercase"
              data-hero-cta
              data-hero-reveal
            >
              ABOUT ME
            </a>
          </div>
        </div>

        <div
          className="hero-scroll absolute bottom-5 left-gutter hidden items-start gap-2 font-label text-[0.7rem] font-bold tracking-[0.2em] text-text xl:flex"
          aria-hidden="true"
          data-hero-scroll
          data-hero-reveal
        >
          <span data-hero-scroll-arrow>
            <ScrollArrow className="scroll-arrow h-14 w-3" />
          </span>
          <span className="mt-1 [writing-mode:vertical-rl]">SCROLL</span>
        </div>
      </div>

      <div className="pointer-events-none relative z-10 mx-auto mt-8 min-h-0 w-full flex-1 overflow-hidden sm:h-[43rem] sm:flex-none md:absolute md:inset-y-0 md:right-0 md:mt-0 md:h-full md:w-[60%]">
        <CircleCoral
          data-hero-coral
          className="shape-coral absolute left-[36%] top-[9%] h-64 w-64 text-primary sm:h-80 sm:w-80 md:left-[16%] md:top-[8%] md:h-72 md:w-72 xl:h-80 xl:w-80"
        />
        <ShapeYellowArch
          data-hero-organic-shape
          className="hero-decoration shape-yellow absolute -right-[9rem] top-[25%] h-[22rem] w-[25rem] text-accent sm:-right-16 sm:h-[28rem] sm:w-[32rem] md:-right-[5%] md:top-[29%] md:h-[34rem] md:w-[38rem]"
        />
        <ShapePinkArch
          data-hero-organic-shape
          className="hero-decoration shape-pink absolute -bottom-32 -right-20 hidden h-80 w-80 rotate-[-10deg] text-surface sm:h-96 sm:w-96 md:-bottom-40 md:-right-20 md:block md:h-[32rem] md:w-[32rem]"
        />
        <DotGrid
          data-hero-dot-grid
          className="hero-decoration dot-grid absolute right-[5%] top-[7%] h-24 w-24 text-text md:right-[3%] md:top-[9%] md:h-28 md:w-36 xl:h-32 xl:w-40"
        />
        <Starburst
          data-hero-starburst
          className="starburst absolute left-[10%] top-[7%] h-8 w-8 text-text sm:h-20 sm:w-20 md:left-[5%] md:top-[7%] md:h-16 md:w-16"
        />
        <BotanicalLine
          data-hero-botanical
          className="hero-decoration botanical absolute bottom-5 left-[3%] z-20 h-16 w-9 text-text sm:left-[12%] sm:h-80 md:bottom-[-3%] md:left-[1%] md:h-[22rem] md:w-40 xl:h-[24rem] xl:w-44"
        />
        <LineFlourish
          data-hero-flourish
          className="hero-decoration line-flourish absolute bottom-[3%] right-[-5%] z-20 hidden h-40 w-72 text-text md:bottom-[1%] md:right-[-2%] md:block md:h-48 md:w-[27rem]"
        />
        <StripeBlock
          data-hero-stripes
          className="hero-decoration stripe-block absolute bottom-0 left-[2%] h-10 w-20 text-primary sm:left-[8%] sm:h-52 sm:w-72 md:bottom-[-3%] md:left-[3%] md:h-44 md:w-64 xl:h-52 xl:w-72"
        />

        <HeroPortrait className="absolute -bottom-4 left-1/2 z-10 h-full w-auto max-w-[92vw] -translate-x-1/2 text-text sm:bottom-2 md:bottom-0 md:left-[50%] md:!h-[50vh] md:!h-[50svh] md:!w-auto md:max-w-none xl:bottom-[-3%] xl:!h-auto xl:!w-[min(38vw,62rem)]" />
      </div>
    </section>
  );
}

export default Hero;
