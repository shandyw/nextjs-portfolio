import type { SVGProps } from "react";

export function ShapeYellowArch({
  className = "",
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 420"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0 420V205C0 92 92 0 205 0h90c113 0 205 92 205 205v215H0Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default ShapeYellowArch;
