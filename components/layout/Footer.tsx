"use client";

import Link from "next/link";
import { useEffect, useState, type MouseEvent as ReactMouseEvent } from "react";
import { Icon } from "iconvaultkit/react";

/**
 * Footer Component
 *
 * Semantic footer with:
 * - Navigation links
 * - Landmark identification
 * - Simple, clean layout
 * - Proper heading hierarchy
 */

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrolled = window.scrollY || window.pageYOffset;
      const threshold = window.innerHeight * 0.25; // 1/4 of the viewport height

      setShowTopButton(scrolled > threshold);
    }

    // Initialize state on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleContactClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname !== "/") return;

    const contact = document.getElementById("contact");
    if (!contact) return;

    event.preventDefault();
    window.history.pushState(null, "", "/#contact");
    contact.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  };

  return (
    <footer className="bg-text border-t border-text/10">
      <div className="container px-gutter py-lg lg:py-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-lg">
          {/* About Section */}
          <div>
            <h3 className="text-title-lg font-label font-bold text-white mb-md">
              About
            </h3>
            <p className="text-body-md text-white/80">
              Senior web developer crafting high-performance, accessible web
              experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-title-lg font-label font-bold text-white mb-md">
              Explore
            </h3>
            <ul className="list-none p-0 m-0 space-y-sm">
              <li>
                <Link
                  href="/#about"
                  className="text-body-md text-white hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/#portfolio"
                  className="text-body-md text-white hover:text-primary transition-colors"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  onClick={handleContactClick}
                  className="text-body-md text-white hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social / Contact */}
          <div>
            <h3 className="text-title-lg font-label font-bold text-white mb-md">
              Connect
            </h3>
            <p className="text-body-md text-white/80">
              Interested in working together? Reach out via the{" "}
              <Link
                href="/#contact"
                onClick={handleContactClick}
                className="text-white hover:text-primary"
              >
                contact form
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-md">
          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-md">
            <p className="text-label-sm text-white/60 m-0">
              © {currentYear} Shandy Ward. All rights reserved.
            </p>
            <div className="flex gap-md">
              <a
                href="https://github.com/shandyward"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Shandy Ward on GitHub"
                className="text-label-sm text-white/60 hover:text-primary transition-colors"
              >
                <Icon icon="mingcute:github-fill" className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Shandy Ward on LinkedIn"
                className="text-label-sm text-white/60 hover:text-primary transition-colors"
              >
                <Icon icon="mingcute:linkedin-fill" className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
          ).matches;
          window.scrollTo({
            top: 0,
            behavior: reduceMotion ? "auto" : "smooth",
          });
        }}
        aria-label="Scroll to top"
        className={`scroll-top-button fixed right-4 bottom-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-background shadow-editorial transform hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-text ${
          showTopButton
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <Icon icon="mingcute:arrows-up-line" className="w-6 h-6" />
      </button>
    </footer>
  );
}
