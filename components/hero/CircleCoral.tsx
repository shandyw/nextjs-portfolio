import type { SVGProps } from "react";

export function CircleCoral({
  className = "",
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 400"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="200" cy="200" r="200" fill="currentColor" />
    </svg>
  );
}

export default CircleCoral;
