"use client";

import {
  type MouseEvent as ReactMouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { Icon } from "iconvaultkit/react";

/**
 * Navigation Component
 *
 * Accessible primary navigation that works with:
 * - Keyboard (Tab, Enter, Escape)
 * - Mouse (hover, click)
 * - Touch (tap, focus)
 * - Screen readers (aria-current, semantic nav)
 *
 * Desktop behavior:
 * - Menu button opens a black side panel with title, blurb, contact info, and socials
 * - Panel slides out from the right
 *
 * Mobile behavior:
 * - Menu button opens the main navigation menu
 * - Escape key to close
 * - Focus management
 *
 * All list items and links are keyboard accessible.
 */

type NavItem = {
  href?: string;
  label: string;
  children?: Array<{ href: string; label: string }>;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/#hero", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#expertise", label: "Expertise" },
  {
    label: "Portfolio",
    children: [
      { href: "/portfolio", label: "View Portfolio" },
      { href: "/#portfolio", label: "Featured Work" },
    ],
  },
  { href: "/#contact", label: "Contact" },
];

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/shandyward",
    icon: "mingcute:linkedin-fill",
  },
  {
    label: "GitHub",
    href: "https://github.com/shandyward",
    icon: "mingcute:github-fill",
  },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [isMobilePortfolioOpen, setIsMobilePortfolioOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelButtonRef = useRef<HTMLButtonElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const portfolioRef = useRef<HTMLLIElement>(null);
  const portfolioButtonRef = useRef<HTMLButtonElement>(null);

  // Close menu on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (isPortfolioOpen) {
          setIsPortfolioOpen(false);
          portfolioButtonRef.current?.focus();
        }
        if (isMenuOpen) {
          if (isMobilePortfolioOpen) {
            setIsMobilePortfolioOpen(false);
            return;
          }
          setIsMenuOpen(false);
          mobileButtonRef.current?.focus();
        }
        if (isPanelOpen) {
          setIsPanelOpen(false);
          panelButtonRef.current?.focus();
        }
      }

      if (e.key === "Tab" && isPanelOpen && panelRef.current) {
        const focusable = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }

    if (!isMenuOpen && !isPanelOpen && !isPortfolioOpen) return;

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen, isMobilePortfolioOpen, isPanelOpen, isPortfolioOpen]);

  useEffect(() => {
    if (!isPortfolioOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!portfolioRef.current?.contains(event.target as Node)) {
        setIsPortfolioOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isPortfolioOpen]);

  useEffect(() => {
    if (isPanelOpen) {
      panelRef.current?.removeAttribute("inert");
    } else {
      panelRef.current?.setAttribute("inert", "");
    }
  }, [isPanelOpen]);

  useEffect(() => {
    if (!isPanelOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("button")?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isPanelOpen]);

  // Close menu when navigation occurs
  const handleNavigation = () => {
    setIsMenuOpen(false);
    setIsMobilePortfolioOpen(false);
    setIsPortfolioOpen(false);
  };

  const handleDropdownNavigation = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    handleNavigation();

    if (!href.startsWith("/#") || window.location.pathname !== "/") return;

    const target = document.getElementById(href.slice(2));
    if (!target) return;

    event.preventDefault();
    window.history.pushState(null, "", href);
    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  };

  return (
    <>
      <nav className="sticky top-0 z-nav bg-background border-b border-text/10">
        <div className="container px-gutter">
          <div className="flex items-center justify-between py-md">
            {/* Logo/Home Link */}
            <Link
              href="/"
              className="text-title-lg text-display text-text no-underline font-extrabold transition-colors"
            >
              &#123;SW&#125;
            </Link>

            {/* Desktop Navigation (hidden on mobile) */}
            <ul className="hidden md:flex gap-lg items-center list-none p-0 m-0">
              {NAV_ITEMS.map((item) => {
                if (item.children) {
                  return (
                    <li
                      key={item.label}
                      ref={portfolioRef}
                      className="relative"
                      onMouseEnter={() => setIsPortfolioOpen(true)}
                      onMouseLeave={() => {
                        if (
                          !portfolioRef.current?.contains(
                            document.activeElement,
                          )
                        ) {
                          setIsPortfolioOpen(false);
                        }
                      }}
                      onBlur={(event) => {
                        if (
                          !event.currentTarget.contains(
                            event.relatedTarget as Node | null,
                          )
                        ) {
                          setIsPortfolioOpen(false);
                        }
                      }}
                    >
                      <button
                        ref={portfolioButtonRef}
                        type="button"
                        aria-expanded={isPortfolioOpen}
                        aria-controls="portfolio-dropdown"
                        onClick={() => setIsPortfolioOpen((isOpen) => !isOpen)}
                        onFocus={() => setIsPortfolioOpen(true)}
                        className={`inline-flex items-center gap-2 font-label text-label-md font-bold transition-colors duration-fast focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${
                          isPortfolioOpen
                            ? "text-primary"
                            : "text-text hover:text-primary"
                        }`}
                      >
                        <span>{item.label}</span>
                        <span
                          aria-hidden="true"
                          className={`h-1.5 w-1.5 border-b border-r border-current transition-transform duration-fast ease-editorial ${
                            isPortfolioOpen
                              ? "-translate-y-px rotate-[225deg]"
                              : "-translate-y-0.5 rotate-45"
                          }`}
                        />
                      </button>

                      <div
                        id="portfolio-dropdown"
                        aria-hidden={!isPortfolioOpen}
                        className={`absolute left-0 top-full z-panel w-60 pt-sm transition-[opacity,transform] duration-fast ease-editorial ${
                          isPortfolioOpen
                            ? "pointer-events-auto translate-y-0 opacity-100"
                            : "pointer-events-none -translate-y-1 opacity-0"
                        }`}
                      >
                        <ul className="m-0 list-none rounded-subtle bg-background px-md py-sm shadow-editorial">
                          {item.children.map((child, index) => (
                            <li
                              key={child.href}
                              className={
                                index > 0
                                  ? "border-t border-text/10"
                                  : undefined
                              }
                            >
                              <Link
                                href={child.href}
                                tabIndex={isPortfolioOpen ? 0 : -1}
                                onClick={(event) =>
                                  handleDropdownNavigation(event, child.href)
                                }
                                className="block py-[1.125rem] font-label text-label-md font-bold text-text no-underline transition-[color,transform] duration-fast ease-editorial hover:translate-x-1 hover:text-primary focus-visible:translate-x-1 focus-visible:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  );
                }

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href ?? "/"}
                      className="text-label-md no-underline font-label font-bold text-text hover:text-primary hover:underline transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Desktop Menu Button (hidden on mobile) */}
            <button
              ref={panelButtonRef}
              className="hidden md:flex items-center justify-center w-12 h-12 p-0"
              onClick={() => setIsPanelOpen(!isPanelOpen)}
              aria-expanded={isPanelOpen}
              aria-controls="info-panel"
              aria-label={isPanelOpen ? "Close info panel" : "Open info panel"}
            >
              <span className="sr-only">
                {isPanelOpen ? "Close panel" : "Open panel"}
              </span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {isPanelOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {/* Mobile Menu Button */}
            <button
              ref={mobileButtonRef}
              className="md:hidden flex items-center justify-center w-12 h-12 p-0"
              onClick={() => {
                setIsMenuOpen((isOpen) => !isOpen);
                if (isMenuOpen) setIsMobilePortfolioOpen(false);
              }}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={
                isMenuOpen ? "Close navigation menu" : "Open navigation menu"
              }
            >
              <span className="sr-only">
                {isMenuOpen ? "Close menu" : "Open menu"}
              </span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <ul
              id="mobile-menu"
              className="md:hidden flex flex-col gap-sm py-md list-none p-0 m-0 border-t border-text/10"
            >
              {NAV_ITEMS.map((item) => {
                if (item.children) {
                  return (
                    <li key={item.label}>
                      <button
                        type="button"
                        aria-expanded={isMobilePortfolioOpen}
                        aria-controls="mobile-portfolio-links"
                        onClick={() =>
                          setIsMobilePortfolioOpen((isOpen) => !isOpen)
                        }
                        className={`flex min-h-12 w-full items-center justify-between py-sm text-left font-label text-label-md font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                          isMobilePortfolioOpen ? "text-primary" : "text-text"
                        }`}
                      >
                        <span>{item.label}</span>
                        <span
                          aria-hidden="true"
                          className={`mr-1 h-2 w-2 border-b border-r border-current transition-transform duration-fast ease-editorial ${
                            isMobilePortfolioOpen
                              ? "-translate-y-px rotate-[225deg]"
                              : "-translate-y-0.5 rotate-45"
                          }`}
                        />
                      </button>

                      {isMobilePortfolioOpen && (
                        <ul
                          id="mobile-portfolio-links"
                          className="m-0 ml-sm list-none border-l border-text/10 py-xs pl-md"
                        >
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="block min-h-12 py-sm font-label text-label-md font-bold text-text transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                onClick={(event) =>
                                  handleDropdownNavigation(event, child.href)
                                }
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                }

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href ?? "/"}
                      className="block text-label-md font-label font-bold text-text hover:text-primary transition-colors py-sm"
                      onClick={handleNavigation}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </nav>

      {/* Desktop Info Panel - Slides in from right */}
      {isPanelOpen && (
        <div
          className="hidden md:block fixed inset-0 z-overlay bg-black/20"
          onClick={() => setIsPanelOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        ref={panelRef}
        id="info-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="info-panel-title"
        aria-hidden={!isPanelOpen}
        className={`fixed right-0 top-0 bottom-0 z-panel w-80 bg-text text-background transition-transform duration-300 ease-editorial overflow-y-auto hidden md:flex flex-col p-lg gap-lg ${
          isPanelOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          onClick={() => setIsPanelOpen(false)}
          className="text-white absolute top-md right-md w-12 h-12 flex items-center justify-center hover:opacity-75 transition-opacity"
          aria-label="Close panel"
        >
          <Icon icon="clarity:close-line" className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="pt-lg">
          {/* Title */}
          <h2
            id="info-panel-title"
            className="font-label font-bold text-white mb-md"
          >
            Shandy Ward
          </h2>

          {/* Blurb */}
          <p className="text-body-md font-serif leading-relaxed text-white mb-lg">
            Senior web developer specializing in Wordpress, Next.js, React,
            TypeScript, and high-performance web experiences.
          </p>
          <p>
            <a
              href="/Shandy_Ward_CV.pdf"
              className="group/arrow border border-white text-white hover:bg-white inline-flex min-h-14 items-center gap-8 px-6 font-label text-label-sm no-underline hover:text-text"
              target="_blank"
              rel="noreferrer"
            >
              Download CV
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 group-hover/arrow:translate-x-1 group-hover/arrow:-translate-y-1"
              >
                ↗
              </span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>

          {/* Divider */}
          <div className="w-12 h-1 bg-accent mb-lg" />

          {/* Contact Info */}
          <div className="mb-lg">
            <div className="flex flex-col gap-sm text-label-sm font-serif text-white">
              <a
                href="mailto:shandy@shandyward.com"
                className="hover:text-white/80 transition-colors"
              >
                shandy@shandyward.com
              </a>
            </div>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-label-md font-label font-bold text-white mb-md">
              I&apos;m online
            </h3>
            <ul className="flex gap-md list-none p-0 m-0">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex text-white justify-center transition-all hover:text-white/80"
                    aria-label={social.label}
                  >
                    <Icon icon={social.icon} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
