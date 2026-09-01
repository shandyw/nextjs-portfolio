import type { SVGProps } from "react";

export function StripeBlock({
  className = "",
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 340 220"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern
          id="stripe-block-s"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect width="9" height="24" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="340" height="220" fill="url(#stripe-block-s)" />
    </svg>
  );
}

export default StripeBlock;
