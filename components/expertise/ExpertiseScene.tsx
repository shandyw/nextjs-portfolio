import Image from "next/image";

const expertiseItems = [
  {
    number: "01",
    title: "Strategy",
    copy: "Aligning goals with user needs and business outcomes.",
  },
  {
    number: "02",
    title: "Web Design",
    copy: "Creating clean, engaging interfaces that communicate and convert.",
  },
  {
    number: "03",
    title: "Development",
    copy: "Building fast, scalable solutions with clean, maintainable code.",
  },
  {
    number: "04",
    title: "Accessibility",
    copy: "Designing inclusive experiences for everyone, every time.",
  },
  {
    number: "05",
    title: "Performance",
    copy: "Optimizing speed, stability and Core Web Vitals.",
  },
  {
    number: "06",
    title: "Support",
    copy: "Reliable maintenance, updates, and ongoing partnership.",
  },
] as const;

const positions = [
  {
    step: "left-[2%] top-[41%] xl:left-[1%] xl:top-[36%]",
    copy: "left-[3%] top-[15%] w-[20%] xl:w-[14%]",
  },
  { step: "left-[18%] top-[54%] xl:top-[50%]", copy: "left-[20%] top-[75%] xl:top-[71%] w-[20%]" },
  {
    step: "left-[38%] top-[30%] xl:left-[36%] xl:top-[29%]",
    copy: "left-[37%] top-[1%] xl:top-[8%] w-[21%] xl:w-[14%]",
  },
  { step: "left-[53%] top-[54%] xl:top-[53%]", copy: "left-[55%] top-[76%] xl:top-[74%] w-[20%]" },
  { step: "left-[70%] top-[29%] xl:top-[27%]", copy: "left-[72%] top-[3%] xl:top-[7%] w-[20%]" },
  { step: "left-[86%] top-[60%] xl:top-[55%]", copy: "left-[88%] top-[81%] xl:top-[77%]  w-[20%]" },
] as const;

type SceneAssetProps = {
  className: string;
  height: number;
  marker?: string;
  src: string;
  vineOrder?: number;
  width: number;
};

function SceneAsset({
  className,
  height,
  marker,
  src,
  vineOrder,
  width,
}: SceneAssetProps) {
  return (
    <div
      data-expertise-accent={marker === "accent" ? "" : undefined}
      data-expertise-vine={marker === "vine" ? vineOrder : undefined}
      className={`absolute ${className}`}
    >
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        className="h-auto w-full"
      />
    </div>
  );
}

export function ExpertiseScene() {
  return (
    <div
      data-expertise-scene
      aria-hidden="true"
      className="relative h-full min-h-[32rem] w-full"
    >
      <svg
        className="absolute left-0 top-[39%] h-auto w-full overflow-visible"
        viewBox="0 0 2020 305"
        fill="none"
        focusable="false"
      >
        <path
          data-expertise-line
          stroke="#151515"
          strokeWidth="4.975418"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          d="M6 298.083588C103.518188 278.181915 195.065887 245.344147 288.603729 245.344147C365.225159 249.324478 406.02359 207.530975 479.65979 164.742386C553.295959 121.953781 612.00592 121.953781 666.735474 143.845627C728.430664 168.722717 771.219299 200.565399 837.889893 192.604721C909.535889 184.644043 951.329407 122.948868 1012.02948 64.238937C1069.744385 9.509338 1126.464111-6.411987 1184.178955 17.470001C1234.928223 38.36676 1241.893799 100.061951 1249.854492 158.771881C1259.805298 234.398224 1311.549683 254.299896 1376.230103 232.408066C1436.930176 212.506393 1472.753174 159.766968 1528.477905 128.919373C1579.227173 101.057037 1635.946899 106.032455 1682.71582 130.909531C1730.479858 156.781708 1753.366821 205.540802 1804.115967 235.393311C1853.870239 265.245819 1909.594849 266.240906 1954.373657 247.33432C1986.216309 233.403137 2004.127808 222.45723 2013.083618 213.501465"
        />
      </svg>

      {expertiseItems.map((item, index) => (
        <div key={item.number}>
          <div
            data-expertise-step={index + 1}
            className={`absolute z-20 w-[12%] xl:w-[15%] ${positions[index].step}`}
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
            data-expertise-node={index + 1}
            src={`/graphics/expertise/node-${index + 1}.svg`}
            alt=""
            width={43}
            height={43}
            className={`absolute z-30 h-auto w-[2.5%] ${
              [
                "left-[8%] top-[58%] xl:top-[54%]",
                "left-[20.5%] top-[52%] xl:top-[49%]",
                "left-[47%] top-[45%] xl:top-[44%]",
                "left-[62.5%] top-[55%] xl:top-[52%]",
                "left-[76.5%] top-[46%] xl:top-[44%]",
                "left-[92%] top-[58%] xl:top-[54%]",
              ][index]
            }`}
          />

          <article
            data-expertise-item={index + 1}
            className={`absolute z-30 w-[14%] ${positions[index].copy}`}
          >
            <span className="block font-display text-[clamp(1.3rem,2vw,2.4rem)] font-extrabold leading-none text-primary">
              {item.number}
            </span>
            <h3 className="mt-1 font-label text-[1rem] font-extrabold uppercase leading-tight xl:text-[clamp(0.72rem,1vw,1rem)]">
              {item.title}
            </h3>
            <p className="mt-2 font-body text-[0.8rem] leading-[1.45] text-text/80 xl:text-[0.85rem]">
              {item.copy}
            </p>
          </article>
        </div>
      ))}

      <SceneAsset
        marker="vine"
        vineOrder={1}
        src="/graphics/expertise/vine-1.svg"
        width={168}
        height={225}
        className="left-[-6%] top-[59%] xl:left-[-8%] xl:top-[54%] z-10 w-[10%] xl:w-[13%]"
      />
      <SceneAsset
        marker="vine"
        vineOrder={2}
        src="/graphics/expertise/vine-2.svg"
        width={173}
        height={271}
        className="left-[26.5%] top-[26%] xl:left-[15.5%] xl:top-[18%] z-10 w-[10%] xl:w-[13%]"
      />
      <SceneAsset
        marker="vine"
        vineOrder={4}
        src="/graphics/expertise/vine-4.svg"
        width={167}
        height={252}
        className="left-[62%] top-[21%] xl:left-[59%] xl:top-[20%] z-10 w-[8.5%] xl:w-[11%]"
      />
      <SceneAsset
        marker="vine"
        vineOrder={5}
        src="/graphics/expertise/vine-5.svg"
        width={164}
        height={233}
        className="right-[13%] top-[52%] xl:top-[49%] z-10 w-[9%] xl:w-[12%]"
      />
      <SceneAsset
        marker="vine"
        vineOrder={6}
        src="/graphics/expertise/vine-6.svg"
        width={178}
        height={265}
        className="right-[-6%] xl:right-[-7%] top-[42%] xl:top-[39%] z-10 w-[9%] xl:w-[12%]"
      />

      <SceneAsset
        marker="accent"
        src="/graphics/expertise/starburst-1.svg"
        width={106}
        height={106}
        className="left-[3%] top-[66%] z-10 w-[6%]"
      />
      <SceneAsset
        marker="accent"
        src="/graphics/expertise/starburst-2.svg"
        width={77}
        height={77}
        className="left-[39%] top-[59%] z-10 w-[4%]"
      />
      <SceneAsset
        marker="accent"
        src="/graphics/expertise/starburst-3.svg"
        width={88}
        height={88}
        className="right-[8%] top-[35%] z-10 w-[5%]"
      />
      <SceneAsset
        marker="accent"
        src="/graphics/expertise/yellow-dot.svg"
        width={47}
        height={48}
        className="right-[1%] top-[23%] z-10 w-[2.7%]"
      />
      <SceneAsset
        marker="accent"
        src="/graphics/expertise/pink-dot.svg"
        width={46}
        height={45}
        className="right-[50%] top-[67%] z-10 w-[2.7%]"
      />
    </div>
  );
}

export { expertiseItems };
