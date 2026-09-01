import type { Metadata, Viewport } from "next";
import { Source_Serif_4 } from "next/font/google";
import "./globals.css";

/**
 * Font configuration
 *
 * Using Next.js next/font for optimal performance:
 * - No layout shift (font-display defaults to swap)
 * - Fonts hosted on Google Fonts CDN
 * - Automatic font optimization
 *
 * NOTE: Satoshi is a premium font not available on Google Fonts.
 * To use Satoshi, self-host the font files and configure via CSS.
 * For now, using system font stack as fallback.
 * See DEVELOPMENT.md for instructions on adding Satoshi.
 */

const sourceSerif4 = Source_Serif_4({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-serif-4",
});

/**
 * Metadata
 *
 * Core site metadata with Open Graph foundation for social sharing.
 * Individual pages can override/extend these values.
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://shandyward.com"),
  title: {
    template: "%s | Shandy Ward",
    default: "Shandy Ward - Senior Web Developer & Designer",
  },
  description:
    "Senior frontend engineer specializing in Next.js, React, TypeScript, and high-performance web experiences.",
  creator: "Shandy Ward",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shandyward.com",
    title: "Shandy Ward - Senior Web Developer & Designer",
    description:
      "Senior frontend engineer specializing in Next.js, React, TypeScript, and high-performance web experiences.",
    siteName: "Shandy Ward",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@shandyward",
  },
};

/**
 * Viewport configuration
 *
 * Strict viewport controls for mobile optimization.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#FFF5D7" }],
};

/**
 * Root Layout
 *
 * Shared layout for all pages.
 * Font variables are applied via CSS custom properties.
 * Global styles in globals.css.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sourceSerif4.variable}>
      <head />
      <body>{children}</body>
    </html>
  );
}
