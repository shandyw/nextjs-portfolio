import type { SVGProps } from "react";

export function BotanicalLine({
  className = "",
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 420"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M116 404c4-78 7-160 5-242-1-49-7-94-17-135" />
      <path d="M119 321c-34-27-57-58-70-93 35 8 58 29 70 63" />
      <path d="M121 285c36-22 62-51 78-87-36 3-62 23-77 59" />
      <path d="M119 222c-26-21-44-47-53-78 29 7 49 25 56 55" />
      <path d="M116 178c30-18 51-42 64-71-31 4-51 22-62 50" />
      <path d="M108 108c-21-15-36-34-44-57 23 5 38 18 47 40" />
    </svg>
  );
}

export default BotanicalLine;
