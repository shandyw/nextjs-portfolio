import { AboutGraphic } from "@/components/about/AboutGraphic";
import { AboutLightbulb } from "@/components/about/AboutLightbulb";
import { AboutStarburst } from "@/components/about/AboutStarburst";
import { LaptopGraphic } from "@/components/about/LaptopGraphic";

const asset = (name: string) => `/graphics/about/${name}.svg`;

export function AboutIllustration() {
  return (
    <div
      data-about-illustration
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 left-1/2 top-auto z-20 aspect-[1456/1528] h-1/2 -translate-x-1/2 bg-text opacity-100 before:absolute before:inset-y-0 before:left-1/2 before:-z-10 before:w-screen before:-translate-x-1/2 before:bg-text md:bottom-auto md:left-auto md:right-0 md:top-1/2 md:z-0 md:h-auto md:w-[52%] md:translate-x-0 md:-translate-y-1/2 md:bg-transparent md:before:hidden"
    >
      <div
        data-about-laptop
        className="absolute z-10"
        style={{ left: "4.5%", top: "41%", width: "83.5%" }}
      >
        <LaptopGraphic className="h-auto w-full" />
      </div>

      <AboutGraphic
        src={asset("vine-1")}
        randomKey="vine-one"
        kind="vine"
        className="z-20 origin-bottom"
        style={{
          left: "54.33%",
          top: "11.65%",
          width: "31.66%",
          height: "62.3%",
        }}
      />
      <AboutGraphic
        src={asset("vine-2")}
        randomKey="vine-two"
        kind="vine"
        className="z-20 origin-bottom"
        style={{ left: "28.5%", top: "8.64%", width: "16%", height: "41.36%" }}
      />
      <AboutGraphic
        src={asset("vine-3")}
        randomKey="vine-three"
        kind="vine"
        className="z-20 origin-bottom"
        style={{
          left: "48.83%",
          top: "4.06%",
          width: "20.47%",
          height: "48.82%",
        }}
      />

      <AboutLightbulb
        className="absolute z-30"
        style={{
          left: "42.38%",
          top: "11.78%",
          width: "8.86%",
          height: "9.75%",
        }}
      />
      <AboutStarburst
        className="absolute z-30"
        style={{
          left: "22.53%",
          top: "8.97%",
          width: "5.98%",
          height: "5.69%",
        }}
      />
      <AboutGraphic
        src={asset("accent-starburst-yellow")}
        randomKey="yellow-starburst"
        effect="starburst"
        className="z-30"
        style={{
          left: "77%",
          top: "44.24%",
          width: "4.53%",
          height: "4.32%",
        }}
      />

      <AboutGraphic
        src={asset("logo-html")}
        randomKey="html-logo"
        className="z-30"
        style={{
          left: "30.08%",
          top: "36.13%",
          width: "5.84%",
          height: "6.22%",
        }}
      />
      <AboutGraphic
        src={asset("logo-wp")}
        randomKey="wordpress-logo"
        className="z-30"
        style={{
          left: "48.21%",
          top: "25.07%",
          width: "5.98%",
          height: "5.69%",
        }}
      />
      <AboutGraphic
        src={asset("logo-js")}
        randomKey="javascript-logo"
        className="z-30"
        style={{
          left: "61%",
          top: "31%",
          width: "5.84%",
          height: "6.28%",
        }}
      />
      <AboutGraphic
        src={asset("logo-react")}
        randomKey="react-logo"
        className="z-30"
        style={{
          left: "66%",
          top: "18%",
          width: "7.35%",
          height: "6.15%",
        }}
      />
      <AboutGraphic
        src={asset("logo-css")}
        randomKey="css-logo"
        className="z-30"
        style={{
          left: "74.93%",
          top: "53.27%",
          width: "6.11%",
          height: "6.74%",
        }}
      />

      <AboutGraphic
        src={asset("dot-coral")}
        randomKey="coral-dot"
        className="z-30"
        style={{
          left: "44.51%",
          top: "38.35%",
          width: "0.69%",
          height: "0.65%",
        }}
      />
      <AboutGraphic
        src={asset("dot-pink")}
        randomKey="pink-dot"
        className="z-30"
        style={{
          left: "80.16%",
          top: "33.84%",
          width: "1.1%",
          height: "1.05%",
        }}
      />
      <AboutGraphic
        src={asset("dot-yellow")}
        randomKey="yellow-dot"
        className="z-30"
        style={{
          left: "72.94%",
          top: "11.78%",
          width: "0.82%",
          height: "0.79%",
        }}
      />
    </div>
  );
}
