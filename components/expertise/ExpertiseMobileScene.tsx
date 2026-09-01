import Image from "next/image";
import { expertiseItems } from "@/components/expertise/ExpertiseScene";

const mobilePositions = [
  { step: "left-[34%] top-[5%]", copy: "left-[61%] top-[6%] w-[37%]" },
  { step: "left-[56%] top-[25%]", copy: "left-[1%] top-[23%] w-[42%]" },
  { step: "left-[28%] top-[40%]", copy: "left-[62%] top-[38%] w-[47%]" },
  { step: "left-[47%] top-[61%]", copy: "left-[2%] top-[55%]" },
  { step: "left-[34%] top-[73%]", copy: "left-[58%] top-[71%] w-[34%]" },
  { step: "left-[37%] top-[85%]", copy: "left-[0%] top-[81%] w-[33%]" },
] as const;

const nodePositions = [
  "left-[31%] top-[8%]",
  "left-[54%] top-[29%]",
  "left-[42%] top-[43%]",
  "left-[48%] top-[60%]",
  "left-[48%] top-[74%]",
  "left-[35%] top-[87%]",
] as const;

const vines = [
  { file: 1, className: "left-[23%] top-[1%] w-[10.4%] rotate-[90deg]" },
  { file: 2, className: "left-[44%] top-[16%] w-[11.2%]" },
  { file: 4, className: "left-[52%] top-[53%] w-[10.4%]" },
  { file: 5, className: "left-[47%] top-[70%] w-[8.4%] rotate-[-177deg]" },
  { file: 6, className: "left-[41%] top-[96%] w-[11.2%] rotate-[118deg]" },
] as const;

export function ExpertiseMobileScene() {
  return (
    <div
      data-expertise-mobile-scene
      aria-hidden="true"
      className="relative mx-auto aspect-[600/1300] w-full max-w-[42rem]"
    >
      <div className="absolute inset-0">
        <svg
          className="absolute inset-0 h-full w-full overflow-visible"
          viewBox="0 0 600 1900"
          preserveAspectRatio="none"
          fill="none"
          focusable="false"
        >
          <path
            data-mobile-expertise-line
            d="M180 70C205 170 212 250 220 323C223 414 276 459 320 520C382 608 302 714 270 820C251 925 409 986 376 1097C360 1149 329 1165 300 1165C222 1258 259 1345 300 1422C334 1512 243 1577 225 1652C204 1755 262 1835 355 1882"
            stroke="#151515"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {expertiseItems.map((item, index) => (
          <div key={item.number}>
            <div
              data-mobile-expertise-step={index + 1}
              className={`absolute z-20 w-[16.8%] ${mobilePositions[index].step}`}
            >
              <Image
                src={`/graphics/expertise/step${index + 1}.svg`}
                alt=""
                width={261}
                height={259}
                className="h-auto w-full"
              />
            </div>

            <Image
              data-mobile-expertise-node={index + 1}
              src={`/graphics/expertise/node-${index + 1}.svg`}
              alt=""
              width={43}
              height={43}
              className={`absolute z-30 h-auto w-[4.4%] ${nodePositions[index]}`}
            />

            <article
              data-mobile-expertise-item={index + 1}
              className={`absolute z-30 w-[29%] ${mobilePositions[index].copy}`}
            >
            <span className="block font-display text-[clamp(1.4rem,6vw,2.25rem)] font-extrabold leading-none text-primary">
                {item.number}
              </span>
            <h3 className="mt-1 font-label-sm text-[1.2rem] font-extrabold uppercase leading-tight">
                {item.title}
              </h3>
            <p className="mt-2 font-body text-sm leading-[1.25] text-text/80">
                {item.copy}
              </p>
            </article>
          </div>
        ))}

      {vines.map((vine) => (
        <div
          key={vine.file}
          data-mobile-expertise-vine={vine.file}
            className={`absolute z-10 ${vine.className}`}
          >
            <Image
              src={`/graphics/expertise/vine-${vine.file}.svg`}
              alt=""
              width={220}
              height={265}
              className="h-auto w-full"
            />
          </div>
        ))}

        <Image
          data-mobile-expertise-accent
          src="/graphics/expertise/starburst-1.svg"
          alt=""
          width={106}
          height={106}
          className="absolute left-[47%] top-[2%] z-10 h-auto w-[8.8%]"
        />
        <Image
          data-mobile-expertise-accent
          src="/graphics/expertise/starburst-2.svg"
          alt=""
          width={77}
          height={77}
          className="absolute left-[35%] top-[35%] z-10 h-auto w-[6.4%]"
        />
        <Image
          data-mobile-expertise-accent
          src="/graphics/expertise/starburst-3.svg"
          alt=""
          width={88}
          height={88}
          className="absolute left-[72%] top-[62%] z-10 h-auto w-[7.2%]"
        />
        <Image
          data-mobile-expertise-accent
          src="/graphics/expertise/pink-dot.svg"
          alt=""
          width={46}
          height={45}
          className="absolute left-[78%] bottom-[6%] z-10 h-auto w-[4.8%]"
        />
        <Image
          data-mobile-expertise-accent
          src="/graphics/expertise/yellow-dot.svg"
          alt=""
          width={47}
          height={48}
          className="absolute left-[58%] top-[98%] z-10 h-auto w-[4.8%]"
        />
      </div>
    </div>
  );
}
