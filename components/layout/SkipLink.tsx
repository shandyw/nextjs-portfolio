/**
 * Skip to Content Link
 *
 * Accessible navigation aid for keyboard users.
 * Allows users to bypass navigation and jump directly to main content.
 *
 * Should be the first focusable element in the document.
 * Invisible by default, visible on focus (see globals.css).
 */

export function SkipLink() {
  return (
    <a href="#main-content" className="skip-to-content">
      Skip to main content
    </a>
  );
}
