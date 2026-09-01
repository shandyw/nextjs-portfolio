"use client";

import Image from "next/image";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { getGsap, getScrollTrigger } from "@/lib/animation/utils";

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

type FormStatus = "idle" | "submitting" | "success" | "error";
type FieldName = "name" | "email" | "subject" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState("");

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
            start: "top 72%",
            once: true,
          },
        });

        timeline
          .from("[data-contact-reveal]", {
            autoAlpha: 0,
            y: 18,
            duration: 0.55,
            stagger: 0.09,
            ease: "power2.out",
          })
          .from(
            "[data-contact-corner]",
            {
              autoAlpha: 0,
              scale: 0.82,
              duration: 0.75,
              stagger: 0.12,
              ease: "power3.out",
            },
            "-=0.45",
          )
          .from(
            "[data-contact-accent]",
            {
              autoAlpha: 0,
              scale: 0.7,
              duration: 0.6,
              stagger: 0.12,
              ease: "back.out(1.4)",
            },
            "-=0.5",
          );
      }, sectionRef.current);
    }

    void initAnimation();
    return () => {
      cancelled = true;
      context?.revert();
    };
  }, []);

  const fieldClass =
    "!rounded-none !border-0 !border-b !border-text/70 !bg-transparent !px-0 py-sm font-body text-body-lg !shadow-none placeholder:text-text/40 focus-visible:!border-primary focus-visible:!shadow-none";

  const clearFieldError = (field: FieldName) => {
    setFieldErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const values = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      subject: String(formData.get("subject") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      company: String(formData.get("company") ?? "").trim(),
    };
    const errors: FieldErrors = {};

    if (!values.name) errors.name = "Please enter your name.";
    if (!values.email) {
      errors.email = "Please enter your email address.";
    } else if (!emailPattern.test(values.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!values.subject) errors.subject = "Please enter a subject.";
    if (!values.message) errors.message = "Please enter a message.";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setSubmitError("Please correct the highlighted fields.");
      setStatus("error");
      const firstInvalidField = form.querySelector<HTMLElement>(
        `[name="${Object.keys(errors)[0]}"]`,
      );
      firstInvalidField?.focus();
      return;
    }

    setFieldErrors({});
    setSubmitError("");
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await response.json()) as {
        message?: string;
        fieldErrors?: FieldErrors;
      };

      if (!response.ok) {
        setFieldErrors(result.fieldErrors ?? {});
        setSubmitError(
          result.message ?? "Your message could not be sent. Please try again.",
        );
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setSubmitError(
        "Your message could not be sent. Check your connection and try again.",
      );
      setStatus("error");
    }
  };

  const fieldStateClass = (field: FieldName) =>
    fieldErrors[field] ? "!border-primary" : "";

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-heading"
      className="relative isolate overflow-hidden bg-white py-lg md:py-xl text-text lg:py-2xl"
    >
      <Image
        data-contact-corner
        src="/graphics/contact/contact-pink-corner.svg"
        alt=""
        width={420}
        height={260}
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 -z-10 h-auto w-40 origin-top-right sm:w-56 lg:w-[26rem]"
      />
      <Image
        data-contact-corner
        src="/graphics/contact/contact-yellow-corner.svg"
        alt=""
        width={650}
        height={330}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 -z-10 h-auto w-[22rem] origin-bottom-right sm:w-[30rem] lg:w-[40rem]"
      />
      <Image
        data-contact-accent
        src="/graphics/contact/contact-coral-line.svg"
        alt=""
        width={560}
        height={360}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 -z-10 hidden h-auto w-[23rem] origin-bottom-right md:block lg:w-[35rem]"
      />
      {/* <Image
        data-contact-accent
        src="/graphics/contact/contact-dot-grid.svg"
        alt=""
        width={126}
        height={84}
        aria-hidden="true"
        className="pointer-events-none absolute right-[7%] top-[30%] -z-10 hidden h-auto w-20 md:block lg:w-28"
      /> */}

      <div className="container relative z-10 px-gutter">
        <header
          data-contact-reveal
          className="mb-md flex items-center gap-sm pt-lg"
        >
          <p className="m-0 font-label text-label-sm font-bold uppercase tracking-[0.06em] text-primary">
            Let&apos;s connect
          </p>
          <span aria-hidden="true" className="h-px w-24 bg-primary" />
        </header>

        <div className="grid gap-xl lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-2xl">
          <div
            data-contact-reveal
            className="lg:border-r lg:border-text/15 lg:pr-2xl"
          >
            <h2 id="contact-heading" className="mb-md mt-0">
              Contact Me
            </h2>
            <p className="max-w-[31rem] font-label text-body-lg leading-relaxed text-text/80 sm:text-[1.35rem]">
              Have a project in mind or want to collaborate? I&apos;d love to
              hear from you.
            </p>
          </div>

          <div data-contact-reveal>
            {status === "success" ? (
              <div
                role="status"
                aria-live="polite"
                className="flex min-h-[24rem] flex-col items-start justify-center border-y border-text/15 py-xl"
              >
                <p className="mb-sm font-label text-label-sm font-bold uppercase tracking-[0.06em] text-primary">
                  Message sent
                </p>
                <h3 className="mb-md mt-0 font-display text-headline-md">
                  Thank You!
                </h3>
                <p className="max-w-copy font-body text-body-lg text-text/75">
                  Your message has been sent successfully. I&apos;ll be in touch
                  soon.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-md border-b border-primary bg-transparent p-0 pb-xs font-label text-label-sm font-bold uppercase tracking-[0.04em] text-primary hover:border-text hover:text-text"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                noValidate
                onSubmit={handleSubmit}
                className="grid gap-md sm:grid-cols-2 sm:gap-x-lg sm:gap-y-lg lg:pt-xs"
              >
                <div className="absolute -left-[10000px]" aria-hidden="true">
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    className={`${fieldClass} ${fieldStateClass("name")}`}
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    required
                    aria-invalid={Boolean(fieldErrors.name)}
                    aria-describedby={
                      fieldErrors.name ? "name-error" : undefined
                    }
                    onChange={() => clearFieldError("name")}
                  />
                  {fieldErrors.name && (
                    <p
                      id="name-error"
                      className="mb-0 mt-xs text-label-sm text-primary"
                    >
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    className={`${fieldClass} ${fieldStateClass("email")}`}
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    required
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={
                      fieldErrors.email ? "email-error" : undefined
                    }
                    onChange={() => clearFieldError("email")}
                  />
                  {fieldErrors.email && (
                    <p
                      id="email-error"
                      className="mb-0 mt-xs text-label-sm text-primary"
                    >
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="subject">Subject</label>
                  <input
                    className={`${fieldClass} ${fieldStateClass("subject")}`}
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    aria-invalid={Boolean(fieldErrors.subject)}
                    aria-describedby={
                      fieldErrors.subject ? "subject-error" : undefined
                    }
                    onChange={() => clearFieldError("subject")}
                  />
                  {fieldErrors.subject && (
                    <p
                      id="subject-error"
                      className="mb-0 mt-xs text-label-sm text-primary"
                    >
                      {fieldErrors.subject}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message">Message</label>
                  <textarea
                    className={`${fieldClass} ${fieldStateClass("message")} min-h-24 resize-y`}
                    id="message"
                    name="message"
                    rows={3}
                    required
                    aria-invalid={Boolean(fieldErrors.message)}
                    aria-describedby={
                      fieldErrors.message ? "message-error" : undefined
                    }
                    onChange={() => clearFieldError("message")}
                  />
                  {fieldErrors.message && (
                    <p
                      id="message-error"
                      className="mb-0 mt-xs text-label-sm text-primary"
                    >
                      {fieldErrors.message}
                    </p>
                  )}
                </div>

                {submitError && (
                  <p
                    role="alert"
                    className="m-0 border-l-4 border-primary pl-sm font-label text-label-sm text-text sm:col-span-2"
                  >
                    {submitError}
                  </p>
                )}

                <div className="sm:col-span-2">
                  
               
                  
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group/arrow btn-primary inline-flex min-h-14 items-center gap-8 rounded-none bg-primary px-6 font-label text-label-sm uppercase text-text no-underline hover:bg-text hover:text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-wait disabled:opacity-60"
                  >
                    {status === "submitting" ? "Sending…" : "Send message"}
                    <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover/arrow:translate-x-1">→</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
