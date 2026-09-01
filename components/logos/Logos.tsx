"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef } from "react";
import { getGsap, getScrollTrigger } from "@/lib/animation/utils";

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const logos = [
  { src: "/graphics/logos/1-apache.png", alt: "Apache" },
  { src: "/graphics/logos/2-shipstation.png", alt: "ShipStation" },
  { src: "/graphics/logos/3-apex.png", alt: "Apex Fintech Solutions" },
  { src: "/graphics/logos/4-buspatrol.png", alt: "BusPatrol" },
  { src: "/graphics/logos/5-snap.png", alt: "Snap Mobile" },
  { src: "/graphics/logos/6-netspend.png", alt: "Netspend" },
  { src: "/graphics/logos/7-knot.png", alt: "The Knot" },
  { src: "/graphics/logos/8-pokerpower.png", alt: "Poker Power" },
  { src: "/graphics/logos/9-vio.png", alt: "VIO Medspa" },
  { src: "/graphics/logos/10-waystar.png", alt: "Waystar" },
] as const;

export function Logos() {
  const sectionRef = useRef<HTMLElement>(null);

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
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        });

        timeline
          .from("[data-logo-heading]", {
            autoAlpha: 0,
            y: 18,
            duration: 0.5,
            ease: "power2.out",
          })
          .from(
            "[data-logo-item]",
            {
              autoAlpha: 0,
              scale: 0.25,
              transformOrigin: "center",
              duration: 0.55,
              stagger: 0.08,
              ease: "back.out(1.6)",
            },
            "-=0.2",
          );
      }, sectionRef.current);
    }

    void initAnimation();
    return () => {
      cancelled = true;
      context?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="logos"
      aria-labelledby="logos-heading"
      className="relative isolate overflow-hidden bg-background py-xl text-text lg:py-2xl"
    >
      <div className="container relative z-10 px-gutter">
        <header id="logos-heading" data-logo-heading className="mb-md md:mb-xl">
          <p className="mb-sm flex items-center gap-sm font-label text-label-sm font-bold uppercase tracking-[0.06em] text-text">
            Clients I&apos;ve worked with
            <span aria-hidden="true" className="h-px w-24 bg-text" />
          </p>
        </header>

        <ul className="m-0 grid list-none grid-cols-2 gap-x-lg gap-y-lg p-0 sm:grid-cols-3 md:gap-x-xl lg:grid-cols-5 lg:gap-y-2xl">
          {logos.map((logo) => (
            <li
              key={logo.src}
              data-logo-item
              className="flex min-h-24 items-center justify-center sm:min-h-28 lg:min-h-32"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={172}
                height={76}
                className="h-auto w-full max-w-[10.75rem] object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
