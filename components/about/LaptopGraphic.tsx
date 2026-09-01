import type { SVGProps } from "react";

export function LaptopGraphic(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 1536 1024"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id="laptop-trace-reveal">
          <rect data-laptop-reveal x="0" y="0" width="1536" height="1024" />
        </clipPath>
      </defs>
      <g className="md:hidden" fill="#151515">
        <path d="M152 113L177 99L798 267L829 291L848 310L941 603L1419 733L1429 744V761L1419 774L1052 879L1032 883H997L965 878L686 785L355 681L334 672L326 665L152 134Z" />
      </g>
      <image
        href="/graphics/about/laptop-traced.svg"
        width="1536"
        height="1024"
        clipPath="url(#laptop-trace-reveal)"
      />
    </svg>
  );
}

export default LaptopGraphic;
