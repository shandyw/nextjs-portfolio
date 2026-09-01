import { ImageResponse } from "next/og";

export const alt = "Shandy Ward — Senior Web Developer & Designer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#FFF5D7",
          color: "#151515",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            background: "#FEB300",
            borderRadius: "999px 999px 0 0",
            bottom: "-190px",
            height: "520px",
            position: "absolute",
            right: "-90px",
            width: "560px",
          }}
        />
        <div
          style={{
            background: "#FFAAAB",
            borderRadius: "50%",
            height: "260px",
            position: "absolute",
            right: "120px",
            top: "-95px",
            width: "260px",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "auto",
            maxWidth: "820px",
            position: "relative",
          }}
        >
          <div
            style={{
              color: "#FF5E6C",
              fontSize: "28px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              marginBottom: "28px",
              textTransform: "uppercase",
            }}
          >
            Senior Web Developer & Designer
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "86px",
              fontWeight: 800,
              letterSpacing: "-0.055em",
              lineHeight: 0.9,
            }}
          >
            <span>Shandy Ward</span>
            <span style={{ color: "#FF5E6C" }}>builds better</span>
            <span>websites.</span>
          </div>
          <div
            style={{
              fontSize: "25px",
              lineHeight: 1.4,
              marginTop: "34px",
              maxWidth: "700px",
            }}
          >
            Accessible, high-performance websites and applications that are
            fast, scalable, and user-focused.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
