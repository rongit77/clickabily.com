import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#07070A",
          borderRadius: 40,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 40,
            background:
              "radial-gradient(circle at 25% 20%, rgba(139,92,246,0.35), transparent 55%)",
          }}
        />
        <svg
          width="120"
          height="120"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 16c0-3.5 2.5-6.5 6-7.2"
            stroke="#8B5CF6"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <path
            d="M11 22.5c2.8 2 6.5 2.2 9.5 0.5"
            stroke="#A855F7"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <path
            d="M22 10.5 26 16l-4 5.5"
            stroke="#22D3EE"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="16" r="2.75" fill="#8B5CF6" />
          <circle cx="16" cy="22" r="2.25" fill="#A855F7" />
          <circle cx="24" cy="16" r="2.75" fill="#22D3EE" />
          <circle cx="16" cy="16" r="1.25" fill="#F5F5F5" opacity="0.9" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
