/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "24px",
        sm: "32px",
        lg: "48px",
        xl: "64px",
      },
      screens: {
        "2xl": "1440px",
      },
    },

    extend: {
      /**
       * Core semantic palette
       *
       * Accessibility:
       * - Use `text` for normal-size readable text.
       * - Do not use `primary` as normal-size text on `background`.
       * - Avoid white text on `primary`.
       */
      colors: {
        background: "#FFF5D7", // Ragin Beige
        surface: "#FFAAAB", // Pink Leaf
        primary: "#FF5E6C", // Coral Pink
        text: "#151515", // Deep Charcoal
        accent: "#FEB300", // Sleuthe Yellow
        white: "#FFFDF5",
      },

      /**
       * Typography
       *
       * Intended to work with Next.js font CSS variables.
       */
      fontFamily: {
        sans: ["var(--font-satoshi)", "Satoshi", "Arial", "sans-serif"],

        serif: [
          "var(--font-source-serif-4)",
          "Source Serif 4",
          "Georgia",
          "serif",
        ],

        display: ["var(--font-satoshi)", "Satoshi", "Arial", "sans-serif"],

        body: [
          "var(--font-source-serif-4)",
          "Source Serif 4",
          "Georgia",
          "serif",
        ],

        label: ["var(--font-satoshi)", "Satoshi", "Arial", "sans-serif"],
      },

      /**
       * Editorial type scale
       *
       * Display/headline sizes use clamp() so the large Swiss Pop
       * typography scales smoothly between mobile and desktop.
       */
      fontSize: {
        display: [
          "clamp(4rem, 8vw, 8rem)",
          {
            lineHeight: "0.94",
            letterSpacing: "-0.04em",
            fontWeight: "800",
          },
        ],

        "headline-lg": [
          "clamp(2.5rem, 4.5vw, 4.5rem)",
          {
            lineHeight: "1",
            letterSpacing: "-0.04em",
            fontWeight: "700",
          },
        ],

        "headline-md": [
          "clamp(2rem, 3vw, 2.6rem)",
          {
            lineHeight: "1.08",
            letterSpacing: "-0.04em",
            fontWeight: "700",
          },
        ],

        "title-lg": [
          "1.375rem",
          {
            lineHeight: "1.75rem",
            fontWeight: "700",
          },
        ],

        "body-lg": [
          "1.25rem",
          {
            lineHeight: "2rem",
            fontWeight: "400",
          },
        ],

        "body-md": [
          "1.125rem",
          {
            lineHeight: "1.75rem",
            fontWeight: "400",
          },
        ],

        "label-md": [
          "1rem",
          {
            lineHeight: "1.375rem",
            letterSpacing: "0.01em",
            fontWeight: "700",
          },
        ],

        "label-sm": [
          "0.875rem",
          {
            lineHeight: "1.25rem",
            letterSpacing: "0.02em",
            fontWeight: "700",
          },
        ],
      },

      /**
       * Shape convention
       *
       * Primary UI convention is a subtle 8px radius.
       * Large decorative circles/arcs should use rounded-full.
       */
      borderRadius: {
        subtle: "8px",
        DEFAULT: "8px",
      },

      /**
       * Elevation
       *
       * Most of the design should remain flat.
       * Use this only when an element genuinely needs elevation.
       */
      boxShadow: {
        editorial:
          "0 1px 2px rgb(21 21 21 / 0.05), 0 8px 24px rgb(21 21 21 / 0.08)",
      },

      /**
       * 8px-based spacing system
       */
      spacing: {
        base: "8px",
        xs: "4px",
        sm: "12px",
        md: "24px",
        lg: "40px",
        xl: "64px",
        "2xl": "96px",
        gutter: "24px",
        margin: "24px",
      },

      /**
       * Editorial layout widths
       */
      maxWidth: {
        editorial: "1440px",
        copy: "720px",
      },

      /**
       * Interaction timing
       *
       * GSAP handles larger page/scroll animations.
       * These values are for normal CSS interaction states.
       */
      transitionDuration: {
        fast: "150ms",
        DEFAULT: "250ms",
        slow: "500ms",
      },

      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },

      /**
       * Common layering
       */
      zIndex: {
        nav: "40",
        overlay: "50",
        panel: "60",
      },
    },
  },

  plugins: [],
};
