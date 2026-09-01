import React from "react";

/**
 * Container Component
 *
 * Reusable layout primitive that provides:
 * - Consistent max-width
 * - Responsive horizontal gutters (padding)
 * - Centered layout
 *
 * Uses Tailwind container utilities configured in tailwind.config.js
 */

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
  return <div className={`container px-gutter ${className}`}>{children}</div>;
}
