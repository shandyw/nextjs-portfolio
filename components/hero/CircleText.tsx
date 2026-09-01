import type { SVGProps } from "react";

const CIRCLE_TEXT = "SENIOR WEB DEVELOPER       •       CREATIVE       •       INNOVATIVE       •       ";

export function CircleText({
  className = "",
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      role="img"
      aria-label="Senior Web Developer, Creative"
    >
      <defs>
        <path
          id="hero-circle-text-path"
          d="M100 100m-76 0a76 76 0 1 1 152 0a76 76 0 1 1-152 0"
        />
      </defs>
      <text
        fill="currentColor"
        textLength="455"
        lengthAdjust="spacing"
        className="font-label text-[12px] font-bold uppercase tracking-[0.13em]"
      >
        <textPath href="#hero-circle-text-path" startOffset="1%">
          {CIRCLE_TEXT}
        </textPath>
      </text>
      <circle cx="100" cy="100" r="3.5" fill="currentColor" aria-hidden="true" />
    </svg>
  );
}

export default CircleText;
