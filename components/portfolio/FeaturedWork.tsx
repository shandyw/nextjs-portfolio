"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { getGsap, getScrollTrigger } from "@/lib/animation/utils";
import type { PortfolioProject } from "@/types/portfolio";

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const cardGraphics = [
  "/graphics/portfolio/card-04-coral.svg",
  "/graphics/portfolio/card-02-yellow.svg",
  "/graphics/portfolio/card-03-pink.svg",
];

interface FeaturedWorkProps {
  projects: PortfolioProject[];
}

function formatPosition(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function FeaturedWork({ projects }: FeaturedWorkProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  useIsomorphicLayoutEffect(() => {
    let cancelled = false;
    let context: { revert: () => void } | null = null;

    async function initAnimation() {
      const [gsap, ScrollTrigger] = await Promise.all([
        getGsap(),
        getScrollTrigger(),
      ]);
      if (cancelled || !gsap || !ScrollTrigger || !sectionRef.current) return;

      gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 72%",
              once: true,
            },
          })
          .from("[data-portfolio-reveal]", {
            autoAlpha: 0,
            y: 18,
            duration: 0.55,
            stagger: 0.09,
            ease: "power2.out",
          })
          .from(
            "[data-portfolio-card]",
            {
              autoAlpha: 0,
              y: 28,
              scaleY: 0.92,
              transformOrigin: "bottom center",
              duration: 0.65,
              stagger: 0.08,
              ease: "back.out(1.2)",
            },
            "-=0.35",
          )
          .from(
            "[data-portfolio-shape]",
            {
              autoAlpha: 0,
              scale: 0.78,
              duration: 0.7,
              stagger: 0.1,
              ease: "power3.out",
            },
            "-=0.55",
          );
      }, sectionRef.current);
    }

    void initAnimation();
    return () => {
      cancelled = true;
      context?.revert();
    };
  }, []);

  const activateOnDesktop = (index: number) => {
    if (window.matchMedia("(min-width: 1280px)").matches) {
      setActiveIndex(index);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="relative isolate overflow-hidden bg-background py-xl text-text lg:py-2xl"
    >
      <Image
        data-portfolio-shape
        src="/graphics/portfolio/pink-corner-shape.svg"
        alt=""
        width={420}
        height={260}
        unoptimized
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 z-0 h-auto w-64 origin-top-right lg:w-96"
      />
      <svg
        data-portfolio-shape
        aria-hidden="true"
        viewBox="0 0 420 260"
        className="pointer-events-none absolute bottom-0 left-0 z-0 h-auto w-64 origin-center rotate-180 sm:w-72 lg:w-80"
      >
        <path
          d="M420 0H145C123 30 121 61 132 89C149 132 190 151 237 166C305 188 363 215 420 260V0Z"
          fill="#FFAAAB"
        />
      </svg>
      <Image
        data-portfolio-shape
        src="/graphics/portfolio/yellow-shape.svg"
        alt=""
        width={1536}
        height={1024}
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-24 -z-10 h-auto w-[30rem] origin-bottom-right lg:w-[42rem]"
      />
      <Image
        data-portfolio-shape
        src="/graphics/portfolio/pink-line.svg"
        alt=""
        width={1536}
        height={1024}
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-20 -z-10 hidden h-auto w-[36rem] md:block lg:w-[48rem]"
      />
      <Image
        data-portfolio-shape
        src="/graphics/portfolio/pink-line.svg"
        alt=""
        width={1536}
        height={1024}
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 -left-8 z-[1] hidden h-auto w-80 rotate-180 md:block lg:w-96"
      />
      <Image
        data-portfolio-shape
        src="/graphics/portfolio/pink-dot-grid.svg"
        alt=""
        width={1536}
        height={1024}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-8 left-[18%] -z-10 hidden h-16 w-24 object-contain md:block"
      />

      <div className="container relative z-10 px-gutter">
        <div className="grid items-center gap-xl lg:grid-cols-[minmax(15rem,0.58fr)_minmax(0,1.42fr)] lg:gap-xl xl:gap-2xl">
          <div
            className="max-w-md lg:max-w-sm xl:max-w-md"
            data-portfolio-reveal
          >
            <p className="mb-sm flex items-center gap-sm font-label text-label-sm font-bold uppercase tracking-[0.06em] text-text">
              Featured work
              <span aria-hidden="true" className="h-px w-20 bg-text" />
            </p>
            <h2 id="portfolio-heading" className="mt-0">
              Selected projects.
            </h2>
            <p className="max-w-[32rem] font-body text-body-lg text-text/75">
              A selection of digital experiences built with thoughtful systems,
              expressive details, and maintainable code.
            </p>
            <Link
              href="/portfolio"
              className="group/arrow mt-lg inline-flex items-center gap-sm border-b border-text pb-xs font-label text-label-sm font-bold uppercase tracking-[0.06em] text-text no-underline hover:border-text hover:text-text"
            >
              View all work
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 group-hover/arrow:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>

          {projects.length > 0 ? (
            <div
              className="flex h-auto w-full flex-col gap-sm md:h-[38rem] md:flex-row"
              role="region"
              aria-label="Featured projects"
            >
              {projects.map((project, index) => {
                const isActive = activeIndex === index;
                const projectUrl = `/portfolio/${project.slug}`;

                return (
                  <article
                    key={project.slug}
                    data-portfolio-card
                    onMouseEnter={() => activateOnDesktop(index)}
                    onFocusCapture={() => setActiveIndex(index)}
                    onClick={(event) => {
                      if (
                        !isActive &&
                        !(event.target as Element).closest("button, a")
                      ) {
                        setActiveIndex(index);
                      }
                    }}
                    className={`group relative w-full min-w-0 overflow-hidden rounded-subtle border border-text/10 bg-white shadow-editorial transition-[height,flex-grow] duration-700 ease-editorial motion-reduce:transition-none md:h-auto ${
                      isActive
                        ? "h-[34rem] flex-none md:flex-[5]"
                        : "h-20 flex-none cursor-pointer md:flex-[0.9]"
                    }`}
                  >
                    {!isActive && (
                      <div className="absolute inset-y-0 left-0 right-16 z-20 flex items-center pr-sm md:hidden">
                        <p
                          className={`m-0 w-10 shrink-0 -rotate-90 text-center font-label text-label-md font-extrabold ${
                            index % 2 === 0 ? "text-primary" : "text-accent"
                          }`}
                          aria-hidden="true"
                        >
                          {formatPosition(index)}
                        </p>
                        <button
                          type="button"
                          onClick={() => setActiveIndex(index)}
                          aria-expanded="false"
                          aria-controls={`featured-project-${project.slug}`}
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-background p-0 text-xl text-text hover:bg-primary hover:text-white"
                          aria-label={`Expand ${project.title}`}
                        >
                          <span aria-hidden="true">+</span>
                        </button>
                        <span
                          aria-hidden="true"
                          className="mx-sm h-3/4 w-px shrink-0 bg-text/10"
                        />
                        <p className="my-0 ml-0 mr-6 lg:mr-12 min-w-0 flex-1 whitespace-normal px-xs text-center font-display text-label-sm md:text-label-md font-bold leading-tight">
                          {project.title}
                        </p>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        setActiveIndex((current) =>
                          current === index ? null : index,
                        )
                      }
                      aria-expanded={isActive}
                      aria-controls={`featured-project-${project.slug}`}
                      className={`absolute z-20 h-10 w-10 items-center justify-center rounded-full border p-0 text-xl transition-all duration-300 ${
                        isActive
                          ? "right-sm top-sm flex border-primary bg-primary text-white"
                          : "hidden border-primary/35 bg-background text-text hover:bg-primary hover:text-white md:left-1/2 md:top-14 md:flex md:-translate-x-1/2"
                      }`}
                      aria-label={`${isActive ? "Collapse" : "Expand"} ${project.title}`}
                    >
                      <span aria-hidden="true">{isActive ? "−" : "+"}</span>
                    </button>

                    <p
                      className={`absolute m-0 font-label text-title-lg font-extrabold transition-all duration-300 ${
                        isActive
                          ? "left-md top-md"
                          : "hidden md:left-1/2 md:top-sm md:block md:-translate-x-1/2"
                      } ${index % 2 === 0 ? "text-primary" : "text-accent"}`}
                      aria-hidden="true"
                    >
                      {formatPosition(index)}
                    </p>

                    <div
                      id={`featured-project-${project.slug}`}
                      className={`flex h-full min-w-[17rem] flex-col p-md pt-16 transition-[opacity,visibility] duration-300 md:min-w-[22rem] ${
                        isActive
                          ? "visible opacity-100 delay-200"
                          : "invisible opacity-0 delay-0"
                      }`}
                    >
                      <div className="relative mb-md min-h-32 w-full aspect-[16/9] overflow-hidden rounded-subtle bg-surface">
                        <Image
                          src={project.thumbnail}
                          alt=""
                          fill
                          sizes="(min-width: 1280px) 40vw, 70vw"
                          className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.025] motion-reduce:transition-none"
                        />
                      </div>
                      <h3 className="mb-xs mt-0 text-title-lg">
                        {project.title}
                      </h3>
                      <p className="mb-sm font-label text-label-sm font-bold text-text/65">
                        {project.client ?? project.role ?? project.year}
                      </p>
                      <span
                        aria-hidden="true"
                        className="mb-sm block h-0.5 w-10 bg-primary"
                      />
                      <p className="line-clamp-3 font-body text-body-md text-text/75">
                        {project.excerpt}
                      </p>
                      <Link
                        href={projectUrl}
                        className="group/arrow mt-auto inline-flex w-fit items-center gap-sm border-b border-primary pb-xs font-label text-label-sm font-bold uppercase tracking-[0.04em] text-primary no-underline hover:border-text hover:text-text"
                      >
                        View project
                        <span
                          aria-hidden="true"
                          className="inline-block transition-transform duration-200 group-hover/arrow:translate-x-1"
                        >
                          →
                        </span>
                      </Link>
                    </div>

                    <div
                      aria-hidden="true"
                      className={`absolute inset-0 transition-opacity duration-300 ${
                        isActive
                          ? "pointer-events-none opacity-0"
                          : "opacity-100"
                      }`}
                    >
                      <p className="absolute left-1/2 top-1/2 m-0 hidden -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-title-lg font-bold md:block md:[writing-mode:vertical-rl] md:rotate-180">
                        {project.title}
                      </p>
                      <p
                        className={`absolute right-[2.65rem] top-1/2 z-10 m-0 -translate-y-1/2 [writing-mode:vertical-rl] rotate-180 whitespace-nowrap font-label text-label-xs font-bold capitalize md:bottom-20 md:left-1/2 md:right-auto md:top-auto md:-translate-x-1/2 md:translate-y-0 md:[writing-mode:horizontal-tb] md:rotate-0 ${
                          index % 2 === 0 ? "text-primary" : "text-accent"
                        }`}
                      >
                        {project.category}
                      </p>
                      <Image
                        src={cardGraphics[index % cardGraphics.length]}
                        alt=""
                        width={220}
                        height={320}
                        className="absolute right-[1.125rem] top-1/2 h-auto w-20 origin-center -translate-y-1/2 -rotate-90 scale-x-[-1] md:bottom-0 md:left-0 md:right-auto md:top-auto md:h-auto md:w-full md:translate-y-0 md:rotate-0 md:scale-x-100"
                      />
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="text-body-lg text-text/75">
              New work is coming soon.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
