"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

/**
 * Error Boundary Component
 *
 * Catches unexpected errors in the application.
 * Provides helpful navigation back to the site.
 *
 * This is a client component because error boundaries require
 * "use client" in Next.js App Router.
 *
 * Does not include animations for accessibility and reliability.
 */

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error for monitoring
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <Section className="w-full">
          <Container>
            <div className="max-w-copy mx-auto text-center">
              <h1 className="text-display text-primary mb-md">Oops!</h1>
              <h2 className="text-text mb-md">Something went wrong</h2>
              <p className="text-body-lg text-text/80 mb-lg">
                An unexpected error occurred. Our team has been notified. Please
                try again or return to the homepage.
              </p>

              <div className="flex gap-md justify-center flex-wrap">
                <button onClick={reset} className="btn-primary">
                  Try Again
                </button>
                <Link href="/" className="button btn-secondary">
                  Go Home
                </Link>
              </div>

              {error.digest && (
                <p className="text-label-sm text-text/40 mt-lg">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          </Container>
        </Section>
      </div>
    </div>
  );
}
