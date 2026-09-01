import type { SVGProps } from "react";

export function AboutStarburst(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      data-about-starburst=""
      data-random-key="coral-starburst"
      viewBox="0 0 180 180"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        data-about-draw
        stroke="#FFAAAB"
        strokeWidth="2.2"
        strokeLinecap="round"
        d="M90 12v156M12 90h156M34 34l112 112m0-112L34 146M90 38l12 40 40 12-40 12-12 40-12-40-40-12 40-12 12-40Z"
      />
    </svg>
  );
}
