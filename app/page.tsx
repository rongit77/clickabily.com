import type { Metadata } from "next";
import ClickabilyHome from "@/app/components/clickabily-home";

export const metadata: Metadata = {
  title: "Clickabily | Digital Growth Infrastructure",
  description:
    "Clickabily is a digital infrastructure company building growth systems, media buying engines, monetization layers, affiliate platforms, and AI operations.",
  openGraph: {
    title: "Clickabily | Building What The Internet Runs On",
    description:
      "Traffic, monetization, infrastructure, and intelligence for the modern digital economy.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clickabily | Digital Growth Infrastructure",
    description:
      "The operating layer behind modern internet businesses.",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Clickabily",
  description:
    "Digital infrastructure company operating across AdTech, media buying, growth systems, affiliate, monetization, AI, and digital products.",
  url: "https://clickabily.com",
  sameAs: ["https://www.linkedin.com"],
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
