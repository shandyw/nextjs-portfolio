import React from "react";

/**
 * Section Component
 *
 * Semantic section wrapper that:
 * - Provides consistent vertical spacing
 * - Supports semantic landmark identification
 * - Optionally sets background color
 * - Flexible for future variants
 *
 * Used to structure major page regions like hero, features, testimonials, etc.
 */

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  bg?: "background" | "white";
  py?: "md" | "lg" | "xl" | "2xl";
}

export function Section({
  children,
  id,
  className = "",
  bg = "background",
  py = "lg",
}: SectionProps) {
  const bgClass = bg === "white" ? "bg-white" : "bg-background";
  const pyClass = {
    md: "py-lg md:py-md",
    lg: "py-lg",
    xl: "py-lg md:py-xl",
    "2xl": "py-lg md:py-2xl",
  }[py];

  return (
    <section id={id} className={`${bgClass} ${pyClass} ${className}`}>
      {children}
    </section>
  );
}
