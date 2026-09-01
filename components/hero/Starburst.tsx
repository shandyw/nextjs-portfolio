import type { SVGProps } from "react";

export function Starburst({
  className = "",
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 180 180"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M90 12v156" />
      <path d="M12 90h156" />
      <path d="M34 34l112 112" />
      <path d="M146 34 34 146" />
      <path d="M90 38l12 40 40 12-40 12-12 40-12-40-40-12 40-12 12-40Z" />
    </svg>
  );
}

export default Starburst;
