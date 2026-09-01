import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

/**
 * 404 Not Found Page
 *
 * Custom 404 error page that:
 * - Follows the design system
 * - Uses semantic markup
 * - Provides clear navigation back to the site
 * - Is fully keyboard accessible
 * - Respects reduced motion
 *
 * Server-rendered for performance.
 */

export default function NotFound() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <Section className="w-full">
          <Container>
            <div className="max-w-copy mx-auto text-center">
              <h1 className="text-display text-primary mb-md">404</h1>
              <h2 className="text-text mb-md">Page Not Found</h2>
              <p className="text-body-lg text-text/80 mb-lg">
                The page you&apos;re looking for doesn&apos;t exist or has been
                moved.
              </p>

              <div className="flex gap-md justify-center flex-wrap">
                <Link href="/" className="button btn-primary">
                  Go Home
                </Link>
                <Link href="/#portfolio" className="button btn-secondary">
                  View Portfolio
                </Link>
              </div>

              <div className="mt-2xl pt-2xl border-t border-text/10">
                <p className="text-label-sm text-text/60 mb-md">
                  Still lost? Try one of these:
                </p>
                <ul className="list-none p-0 m-0 space-y-sm text-label-md">
                  <li>
                    <Link href="/blog" className="text-primary hover:underline">
                      Read the Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#contact"
                      className="text-primary hover:underline"
                    >
                      Get in Touch
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://github.com"
                      className="text-primary hover:underline"
                    >
                      Check out My GitHub
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </Section>
      </div>
    </div>
  );
}
