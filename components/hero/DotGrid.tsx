import type { SVGProps } from "react";

export function DotGrid({ className = "", ...props }: SVGProps<SVGSVGElement>) {
  const columns = 12;
  const rows = 10;

  return (
    <svg
      {...props}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 260 220"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="currentColor">
        {Array.from({ length: rows * columns }, (_, index) => {
          const column = index % columns;
          const row = Math.floor(index / columns);

          return (
            <circle
              key={`${row}-${column}`}
              data-dot-grid-point
              cx={4 + column * 22}
              cy={4 + row * 22}
              r={3}
            />
          );
        })}
      </g>
    </svg>
  );
}

export default DotGrid;
