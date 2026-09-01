"use client";

import Image from "next/image";
import {
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { getGsap, getScrollTrigger } from "@/lib/animation/utils";
import type { Testimonial } from "@/types/testimonial";

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export interface TestimonialSlide extends Testimonial {
  content: ReactNode;
}

interface TestimonialsSliderProps {
  testimonials: TestimonialSlide[];
}

function formatPosition(value: number): string {
  return String(value).padStart(2, "0");
}

export function TestimonialsSlider({ testimonials }: TestimonialsSliderProps) {
  const rootRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const quoteContentRef = useRef<HTMLDivElement>(null);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isQuoteOverflowing, setIsQuoteOverflowing] = useState(false);
  const [collapsedQuoteHeight, setCollapsedQuoteHeight] = useState(266);
  const [announcement, setAnnouncement] = useState("");
  const hasMultipleTestimonials = testimonials.length > 1;
  const activeTestimonial = testimonials[activeIndex];

  useEffect(
    () => () => {
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    },
    [],
  );

  useIsomorphicLayoutEffect(() => {
    const quote = quoteRef.current;
    const content = quoteContentRef.current;
    if (!quote || !content) return;

    setIsExpanded(false);

    const measureQuote = () => {
      const nextCollapsedHeight = window.matchMedia("(max-width: 767px)")
        .matches
        ? 150
        : window.matchMedia("(max-width: 1399px)").matches
          ? 190
          : 266;

      setCollapsedQuoteHeight(nextCollapsedHeight);
      setIsQuoteOverflowing(content.scrollHeight > nextCollapsedHeight + 1);
    };

    measureQuote();

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(measureQuote);
    resizeObserver?.observe(content);
    window.addEventListener("resize", measureQuote);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", measureQuote);
    };
  }, [activeTestimonial.slug]);

  useIsomorphicLayoutEffect(() => {
    let cancelled = false;
    let context: { revert: () => void } | null = null;

    async function initEntrance() {
      if (
        !rootRef.current ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const [gsap, ScrollTrigger] = await Promise.all([
        getGsap(),
        getScrollTrigger(),
      ]);
      if (cancelled || !gsap || !ScrollTrigger || !rootRef.current) return;

      gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 78%",
              once: true,
            },
          })
          .from("[data-testimonial-mark]", {
            autoAlpha: 0,
            scale: 0.88,
            duration: 0.35,
            ease: "power2.out",
          })
          .from(
            "[data-testimonial-reveal]",
            {
              autoAlpha: 0,
              y: 12,
              duration: 0.4,
              stagger: 0.08,
              ease: "power2.out",
            },
            "-=0.18",
          )
          .from(
            "[data-testimonial-rule]",
            {
              scaleX: 0,
              transformOrigin: "left center",
              duration: 0.35,
              ease: "power2.out",
            },
            "-=0.25",
          );
      }, rootRef.current);
    }

    void initEntrance();
    return () => {
      cancelled = true;
      context?.revert();
    };
  }, []);

  const showTestimonial = (nextIndex: number) => {
    if (nextIndex === activeIndex || isExiting) return;

    const normalizedIndex =
      (nextIndex + testimonials.length) % testimonials.length;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    setIsExpanded(false);

    if (reduceMotion) {
      setActiveIndex(normalizedIndex);
      setAnnouncement(
        `Testimonial ${normalizedIndex + 1} of ${testimonials.length}`,
      );
      return;
    }

    setIsExiting(true);
    transitionTimerRef.current = setTimeout(() => {
      setActiveIndex(normalizedIndex);
      setIsExiting(false);
      setAnnouncement(
        `Testimonial ${normalizedIndex + 1} of ${testimonials.length}`,
      );
    }, 180);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!hasMultipleTestimonials) return;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showTestimonial(activeIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showTestimonial(activeIndex + 1);
    }
  };

  return (
    <section
      ref={rootRef}
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative isolate overflow-hidden bg-white py-xl text-text lg:py-2xl"
    >
      <div className="container relative z-10 px-gutter">
        <header
          className="mb-lg flex items-center gap-sm"
          data-testimonial-reveal
        >
          <p
            id="testimonials-heading"
            className="m-0 flex items-center gap-sm font-label text-label-sm font-bold uppercase tracking-[0.06em] text-primary"
          >
            Testimonials
          </p>
          <span
            data-testimonial-rule
            aria-hidden="true"
            className="h-px w-24 bg-primary"
          />
        </header>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          onKeyDown={handleKeyDown}
          className="grid items-start gap-lg md:grid-cols-[9rem_minmax(0,1fr)] lg:grid-cols-[11rem_minmax(0,1fr)_16rem] lg:gap-xl"
        >
          <div
            data-testimonial-mark
            aria-hidden="true"
            className="relative z-10"
          >
            <Image
              src="/graphics/testimonials/quotes.svg"
              alt=""
              width={182}
              height={142}
              className="h-auto w-8 lg:w-full"
            />
          </div>

          <div className="relative min-h-[27rem] xl:min-h-[25rem] min-w-0">
            <div
              key={activeTestimonial.slug}
              role="group"
              aria-roledescription="slide"
              aria-label={`Testimonial ${activeIndex + 1} of ${testimonials.length}`}
              className={`testimonial-slide-enter transition-[opacity,transform] duration-fast ease-editorial motion-reduce:transition-none ${
                isExiting
                  ? "-translate-y-2 opacity-0"
                  : "translate-y-0 opacity-100"
              }`}
            >
              <blockquote
                ref={quoteRef}
                id={`testimonial-quote-${activeTestimonial.slug}`}
                data-testimonial-reveal
                className={`relative ps-0 m-0 max-w-[34ch] sm:w-100  border-l-0 font-body text-[clamp(1.5rem,2.6vw,2.75rem)] leading-[1.2] not-italic tracking-[-0.025em] transition-[max-height] duration-500 ease-editorial will-change-[max-height] motion-reduce:transition-none [&_p]:m-0 ${
                  isQuoteOverflowing && !isExpanded ? "overflow-hidden" : ""
                }`}
                style={{
                  minHeight: collapsedQuoteHeight,
                  maxHeight:
                    isQuoteOverflowing && isExpanded
                      ? quoteContentRef.current?.scrollHeight
                      : collapsedQuoteHeight,
                }}
              >
                <div
                  ref={quoteContentRef}
                  className={
                    isQuoteOverflowing && !isExpanded
                      ? "line-clamp-5 hyphens-none break-normal [overflow-wrap:normal] [word-break:normal]"
                      : undefined
                  }
                >
                  {activeTestimonial.content}
                </div>
              </blockquote>

              <div className="mt-sm min-h-6">
                {isQuoteOverflowing && (
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    aria-label={
                      isExpanded ? "Show less" : "Read full testimonial"
                    }
                    aria-controls={`testimonial-quote-${activeTestimonial.slug}`}
                    onClick={() => setIsExpanded((current) => !current)}
                    className="font-label ps-0 text-label-xs font-bold text-primary inline-flex items-center gap-xs transition-colors duration-fast hover:text-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {isExpanded ? "Show less" : "Read more"}
                    <span
                      aria-hidden="true"
                      className={`text-base text-label-xs leading-none transition-transform duration-500 ease-editorial motion-reduce:transition-none ${
                        isExpanded ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      ↓
                    </span>
                  </button>
                )}
              </div>

              <footer data-testimonial-reveal className="mt-lg">
                <span
                  aria-hidden="true"
                  className="mb-sm block h-0.5 w-10 bg-text"
                />
                <cite className="block font-label text-label-md font-extrabold uppercase not-italic">
                  {activeTestimonial.name}
                </cite>
                {(activeTestimonial.role || activeTestimonial.company) && (
                  <p className="mt-xs font-body text-body-md text-text/80">
                    {activeTestimonial.role}
                    {activeTestimonial.role && activeTestimonial.company && (
                      <span className="font-bold text-primary"> · </span>
                    )}
                    {activeTestimonial.companyUrl &&
                    activeTestimonial.company ? (
                      <a
                        href={activeTestimonial.companyUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {activeTestimonial.company}
                      </a>
                    ) : (
                      activeTestimonial.company
                    )}
                  </p>
                )}
              </footer>
            </div>

            {hasMultipleTestimonials && (
              <div
                data-testimonial-reveal
                className="mt-lg flex items-center gap-md font-label font-bold absolute bottom-0 right-0"
              >
                <p className="m-0 min-w-20 text-label-md" aria-hidden="true">
                  <span className="text-primary">
                    {formatPosition(activeIndex + 1)}
                  </span>{" "}
                  / {formatPosition(testimonials.length)}
                </p>
                <button
                  type="button"
                  onClick={() => showTestimonial(activeIndex - 1)}
                  className="inline-flex min-h-12 min-w-12 items-center justify-center text-2xl text-text transition-colors duration-fast hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  aria-label="Show previous testimonial"
                >
                  <span aria-hidden="true">←</span>
                </button>
                <button
                  type="button"
                  onClick={() => showTestimonial(activeIndex + 1)}
                  className="inline-flex min-h-12 min-w-12 items-center justify-center text-2xl text-text transition-colors duration-fast hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  aria-label="Show next testimonial"
                >
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            )}
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none relative hidden min-h-80 lg:block"
          >
            <Image
              src="/graphics/testimonials/dot-grid.svg"
              alt=""
              width={260}
              height={220}
              className="absolute -right-8 -top-20 h-auto w-24"
            />
            <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-accent" />
            <Image
              src="/graphics/testimonials/botanical-line.svg"
              alt=""
              width={240}
              height={420}
              className="absolute -bottom-20 right-4 z-10 h-auto w-44 rotate-[-24deg]"
            />
            <Image
              src="/graphics/testimonials/dot-yellow.svg"
              alt=""
              width={12}
              height={12}
              className="absolute right-20 top-16 h-3 w-3"
            />
          </div>
        </div>

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {announcement}
        </p>
      </div>
    </section>
  );
}
