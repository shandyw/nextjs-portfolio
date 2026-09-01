import { SkipLink } from "./SkipLink";
import { Navigation } from "./Navigation";

/**
 * Header Component
 *
 * Top-level header that includes:
 * - Skip to content link (first focusable element)
 * - Primary navigation
 *
 * Server-rendered. Navigation is a client component
 * but only becomes interactive when needed.
 */

export function Header() {
  return (
    <>
      <SkipLink />
      <Navigation />
    </>
  );
}
