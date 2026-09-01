import type { CSSProperties } from "react";
import Image from "next/image";

type AboutGraphicProps = {
  src: string;
  className: string;
  effect?: "starburst";
  kind?: "object" | "vine";
  randomKey: string;
  style?: CSSProperties;
};

export function AboutGraphic({
  src,
  className,
  effect,
  kind = "object",
  randomKey,
  style,
}: AboutGraphicProps) {
  return (
    <div
      data-about-object={kind === "object" && !effect ? "" : undefined}
      data-about-starburst={effect === "starburst" ? "" : undefined}
      data-about-vine={kind === "vine" ? "" : undefined}
      data-random-key={randomKey}
      className={`absolute ${className}`}
      style={style}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="(min-width: 768px) 14vw, 24vw"
        className="object-contain"
      />
    </div>
  );
}
