import type { Metadata } from "next";
import ClickabilyHome from "@/app/components/clickabily-home";

export const metadata: Metadata = {
  title: "Clickabily | Digital Growth Infrastructure",
  description:
    "Clickabily builds traffic systems, buys media, runs offers, and ships products online.",
  openGraph: {
    title: "Clickabily | Building What The Internet Runs On",
    description:
      "Traffic, monetization, infrastructure, and intelligence.",
    type: "website",
    images: [{ url: "/clickabily-logo.png", width: 582, height: 178, alt: "Clickabily" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clickabily | Digital Growth Infrastructure",
    description: "Traffic, media, monetization, ops.",
    images: ["/clickabily-logo.png"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Clickabily",
  description:
    "Traffic, media buying, monetization, affiliate, and digital products.",
  url: "https://clickabily.com",
  logo: "https://clickabily.com/clickabily-logo.png",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <ClickabilyHome />
    </>
  );
}
