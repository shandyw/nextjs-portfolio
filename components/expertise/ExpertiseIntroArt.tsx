import Image from "next/image";

const waves = [
  "M31 47C67 26 98 26 133 47C168 67 199 67 235 47",
  "M30 72C67 52 99 52 134 72C168 92 199 92 235 72",
  "M30 98C67 78 99 78 134 98C168 118 199 118 235 98",
  "M31 124C67 103 98 103 133 124C168 144 199 144 235 124",
];

export function ExpertiseIntroArt() {
  return (
    <div
      aria-hidden="true"
      className="mt-md flex items-center gap-md md:mt-0 lg:gap-lg xl:mt-md"
    >
      <Image
        data-expertise-intro-art
        src="/graphics/expertise/dot-grid-pink.svg"
        alt=""
        width={260}
        height={220}
        className="h-auto w-16 sm:w-28 lg:w-32"
      />
      <svg
        data-expertise-intro-art
        viewBox="0 0 260 180"
        className="h-auto w-16 sm:w-32 lg:w-36"
        fill="none"
        focusable="false"
      >
        {waves.map((path) => (
          <path
            key={path}
            data-expertise-wave
            d={path}
            stroke="#FEB300"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transformOrigin: "left center" }}
          />
        ))}
      </svg>
    </div>
  );
}
