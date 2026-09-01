"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface PortfolioGalleryProps {
  images: string[];
  title: string;
}

export function PortfolioGallery({ images, title }: PortfolioGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbnailStripRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const hasNavigation = images.length > 1;

  useEffect(() => {
    const strip = thumbnailStripRef.current;
    const thumbnail = thumbnailRefs.current[activeIndex];
    if (!strip || !thumbnail) return;

    const stripBounds = strip.getBoundingClientRect();
    const thumbnailBounds = thumbnail.getBoundingClientRect();
    const left =
      strip.scrollLeft +
      thumbnailBounds.left -
      stripBounds.left -
      (strip.clientWidth - thumbnailBounds.width) / 2;
    strip.scrollTo({
      left,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }, [activeIndex]);

  const showSlide = (index: number) => {
    setActiveIndex((index + images.length) % images.length);
  };

  return (
    <div aria-label={`${title} image gallery`}>
      <div className="relative min-h-[12rem] w-full aspect-[16/9] overflow-hidden rounded-subtle bg-white shadow-editorial sm:min-h-[16rem] lg:min-h-[20rem]">
        <Image
          key={images[activeIndex]}
          src={images[activeIndex]}
          alt={`${title} project image ${activeIndex + 1} of ${images.length}`}
          fill
          priority={activeIndex === 0}
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-contain"
        />
      </div>

      {hasNavigation && (
        <div className="mt-md grid grid-cols-[2.75rem_minmax(0,1fr)_2.75rem] items-center gap-sm">
          <button
            type="button"
            onClick={() => showSlide(activeIndex - 1)}
            aria-label="Show previous project image"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-text/10 bg-white p-0 text-title-lg shadow-editorial transition-colors hover:bg-primary hover:text-white"
          >
            <span aria-hidden="true">‹</span>
          </button>

          <div
            ref={thumbnailStripRef}
            onWheel={(event) => {
              const strip = thumbnailStripRef.current;
              if (!strip || Math.abs(event.deltaX) > Math.abs(event.deltaY))
                return;

              event.preventDefault();
              strip.scrollLeft += event.deltaY;
            }}
            className="relative flex min-w-0 snap-x snap-mandatory justify-start gap-sm overflow-x-auto overscroll-x-contain px-xs py-sm"
            aria-label="Select a project image"
          >
            {images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                ref={(element) => {
                  thumbnailRefs.current[index] = element;
                }}
                type="button"
                onClick={() => showSlide(index)}
                aria-label={`Show project image ${index + 1}`}
                aria-current={activeIndex === index ? "true" : undefined}
                className={`relative h-[3.375rem] w-24 shrink-0 snap-center overflow-hidden rounded-subtle border-2 bg-white p-0 transition-[border-color,box-shadow,opacity] sm:h-[3.9375rem] sm:w-28 ${
                  activeIndex === index
                    ? "border-primary opacity-100 shadow-[0_0_0_3px_rgb(255_94_108_/_0.22)]"
                    : "border-transparent opacity-60 hover:border-primary/45 hover:opacity-100"
                }`}
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => showSlide(activeIndex + 1)}
            aria-label="Show next project image"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-text/10 bg-white p-0 text-title-lg shadow-editorial transition-colors hover:bg-primary hover:text-white"
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      )}
    </div>
  );
}
