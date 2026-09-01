import type { SVGProps } from "react";

export function LineFlourish({
  className = "",
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 520 220"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M18 122c73-111 129-66 108 0-19 59 46 92 89 39 52-64 21-139 94-141 76-2 46 128 116 126 38-1 61-31 77-65" />
    </svg>
  );
}

export default LineFlourish;
