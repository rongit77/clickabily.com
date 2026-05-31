"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CursorGlow } from "@/app/components/cursor-glow";
import {
  CHAIN_EDGES,
  CHAIN_NODES,
  NetworkCanvas,
  OPERATING_EDGES,
  OPERATING_NODES,
} from "@/app/components/network-canvas";

const buildCards = [
  {
    title: "Growth Systems",
    description:
      "Acquisition architecture designed for scale, continuity, and measurable velocity.",
    icon: "◈",
  },
  {
    title: "Media Buying",
    description:
      "Signal-driven bidding strategies across paid channels and high-intent traffic sources.",
    icon: "◎",
  },
  {
    title: "Monetization Infrastructure",
    description:
      "Revenue layers that convert attention into resilient cashflow across digital assets.",
    icon: "◉",
  },
  {
    title: "AI Operations",
    description:
      "Intelligence workflows that automate analysis, optimization, and execution loops.",
    icon: "◇",
  },
  {
    title: "Affiliate Platforms",
    description:
      "Performance ecosystems connecting intent, offers, and publisher-grade distribution.",
    icon: "◆",
  },
  {
    title: "Digital Products",
    description:
      "Future-facing products built on traffic data, user behavior, and market opportunities.",
    icon: "▣",
  },
];

const ventures = [
  {
    name: "Betinga",
    description: "Social prediction platform.",
    tag: "Live",
  },
  {
    name: "Ad Intelligence",
    description: "Market scanning and opportunity discovery.",
    tag: "Active",
  },
  {
    name: "Affiliate Assets",
    description: "Intent-based publishing systems.",
    tag: "Scaling",
  },
  {
    name: "Future Ventures",
    description: "Experimental products and monetization models.",
    tag: "R&D",
  },
];

const methodology = ["Research", "Build", "Launch", "Optimize", "Scale"];

const principles = [
  "Attention is earned.",
  "Distribution beats assumptions.",
  "Systems outperform campaigns.",
  "Data beats opinions.",
  "Execution creates advantage.",
];

export default function ClickabilyHome() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="relative overflow-hidden bg-[#07070A] text-[#F5F5F5]">
      <CursorGlow reduceMotion={!!reduceMotion} />
      <OperatingLayer reduceMotion={!!reduceMotion} />

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center gap-10 px-6 py-24 sm:px-8 lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-[#8B5CF6]/50 bg-[#8B5CF6]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#C4B5FD]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22D3EE] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22D3EE]" />
          </span>
          Digital Infrastructure Company
        </motion.p>

        <div className="space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08 }}
            className="max-w-5xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl"
          >
            <span className="bg-gradient-to-r from-[#F5F5F5] via-[#E9D5FF] to-[#C4B5FD] bg-clip-text text-transparent">
              BUILDING WHAT THE
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#8B5CF6] via-[#A855F7] to-[#22D3EE] bg-clip-text text-transparent">
              INTERNET RUNS ON.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16 }}
            className="max-w-3xl text-lg leading-relaxed text-[#D4D4D8] sm:text-xl"
          >
            <span className="font-medium text-[#E9D5FF]">
              Traffic. Monetization. Infrastructure. Intelligence.
            </span>
            <br />
            Clickabily builds growth systems, media assets, AI-powered workflows
            and revenue infrastructure for the modern digital economy.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-4"
        >
          <a
            href="#selected-ventures"
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] px-7 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22D3EE]"
          >
            <span className="relative z-10">Explore Our Work</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
          </a>
          <a
            href="#contact"
            className="rounded-full border border-[#A855F7]/60 bg-[#FFFFFF08] px-7 py-3 text-sm font-semibold backdrop-blur-sm transition-colors hover:border-[#22D3EE] hover:text-[#22D3EE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22D3EE]"
          >
            Partner With Us
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.28 }}
        >
          <NetworkCanvas reduceMotion={!!reduceMotion} />
        </motion.div>
      </section>

      <SectionContainer id="click-economy" title="The Click Economy">
        <p className="max-w-3xl text-base leading-relaxed text-[#D4D4D8] sm:text-lg">
          Every digital business depends on a simple chain:
          <br />
          Attention becomes intent. Intent becomes action. Action becomes
          revenue.
          <br />
          <span className="text-[#E9D5FF]">
            We build the systems behind that transformation.
          </span>
        </p>
        <div className="mt-10">
          <NetworkCanvas
            reduceMotion={!!reduceMotion}
            nodes={CHAIN_NODES}
            edges={CHAIN_EDGES}
            height="min-h-[180px] sm:min-h-[220px]"
          />
        </div>
      </SectionContainer>

      <SectionContainer title="What We Build">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {buildCards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl border border-[#A855F7]/30 bg-gradient-to-b from-[#13131B] to-[#0B0B10] p-7 transition-shadow duration-300 hover:border-[#8B5CF6]/60 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#8B5CF6]/10 blur-2xl transition-all duration-500 group-hover:bg-[#8B5CF6]/25" />
              <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#8B5CF6]/40 bg-[#8B5CF6]/10 text-lg text-[#C4B5FD] transition-transform duration-300 group-hover:scale-110 group-hover:border-[#22D3EE]/50">
                {card.icon}
              </span>
              <h3 className="text-2xl font-semibold">{card.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-[#A1A1AA] transition-colors duration-300 group-hover:text-[#D4D4D8] sm:text-base">
                {card.description}
              </p>
            </motion.article>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer title="Operating Across The Internet">
        <p className="mb-8 max-w-2xl text-[#D4D4D8]">
          Nine verticals. One infrastructure layer. Hover any node to trace
          live connections back to core systems.
        </p>
        <NetworkCanvas
          reduceMotion={!!reduceMotion}
          nodes={OPERATING_NODES}
          edges={OPERATING_EDGES}
          height="min-h-[380px] sm:min-h-[480px]"
        />
      </SectionContainer>

      <SectionContainer id="selected-ventures" title="Selected Ventures">
        <div className="grid gap-5 md:grid-cols-2">
          {ventures.map((venture, index) => (
            <motion.article
              key={venture.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-[#8B5CF6]/30 bg-gradient-to-br from-[#13131B] via-[#0D0D14] to-[#09090E] p-7 transition-all duration-300 hover:border-[#22D3EE]/40 hover:shadow-[0_8px_40px_rgba(139,92,246,0.12)]"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl font-semibold text-[#F5F5F5]">
                  {venture.name}
                </h3>
                <span className="shrink-0 rounded-full border border-[#22D3EE]/40 bg-[#22D3EE]/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#22D3EE]">
                  {venture.tag}
                </span>
              </div>
              <p className="mt-3 text-base text-[#D4D4D8]">
                {venture.description}
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#8B5CF6] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="h-px flex-1 bg-gradient-to-r from-[#8B5CF6] to-transparent" />
                View venture
              </div>
            </motion.article>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer title="How We Think">
        <div className="space-y-1">
          {principles.map((statement, index) => (
            <motion.div
              key={statement}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="group border-b border-[#8B5CF6]/10 py-5 transition-colors hover:border-[#8B5CF6]/40"
            >
              <p className="text-3xl font-semibold tracking-tight text-[#52525B] transition-colors duration-300 group-hover:text-[#F5F5F5] sm:text-5xl lg:text-6xl">
                {statement}
              </p>
            </motion.div>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer title="Why Companies Work With Us">
        <p className="max-w-2xl text-lg text-[#D4D4D8]">
          Not because we advise.
          <br />
          <span className="text-xl font-medium text-[#E9D5FF]">
            Because we build.
          </span>
        </p>
        <div className="relative mt-12">
          <div className="absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[#8B5CF6]/50 to-transparent lg:block" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {methodology.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group relative rounded-2xl border border-[#A855F7]/35 bg-[#111118]/75 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#22D3EE]/50 hover:bg-[#13131B]"
              >
                <div className="absolute -top-3 left-5 hidden h-6 w-6 items-center justify-center rounded-full border border-[#8B5CF6] bg-[#07070A] lg:flex">
                  <span className="h-2 w-2 rounded-full bg-[#8B5CF6] shadow-[0_0_12px_#8B5CF6] transition-all group-hover:bg-[#22D3EE] group-hover:shadow-[0_0_12px_#22D3EE]" />
                </div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#A1A1AA]">
                  0{index + 1}
                </p>
                <p className="mt-3 text-xl font-semibold">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionContainer>

      <SectionContainer id="contact" title="Let's Build The Next Click">
        <div className="relative overflow-hidden rounded-3xl border border-[#8B5CF6]/30 bg-gradient-to-br from-[#0D0D14] to-[#07070A] p-8 sm:p-12">
          <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(139,92,246,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.06)_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="relative flex flex-col gap-6 text-lg">
            <a
              href="mailto:ron@clickabily.com"
              className="group flex w-fit items-center gap-3 transition-colors hover:text-[#22D3EE]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#8B5CF6]/40 bg-[#8B5CF6]/10 text-sm transition-colors group-hover:border-[#22D3EE]/50">
                @
              </span>
              ron@clickabily.com
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="group flex w-fit items-center gap-3 transition-colors hover:text-[#22D3EE]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#8B5CF6]/40 bg-[#8B5CF6]/10 text-xs font-bold transition-colors group-hover:border-[#22D3EE]/50">
                in
              </span>
              LinkedIn
            </a>
          </div>
        </div>
      </SectionContainer>
    </main>
  );
}

function SectionContainer({
  title,
  children,
  id,
}: {
  title: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section
      id={id}
      className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-10"
    >
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-3xl font-semibold tracking-tight sm:text-5xl"
      >
        {title}
      </motion.h2>
      {children}
    </section>
  );
}

function OperatingLayer({ reduceMotion }: { reduceMotion: boolean }) {
  const streams = [
    { label: "Traffic Pulse", top: "12%", left: "4%" },
    { label: "Bid Streams", top: "28%", right: "5%" },
    { label: "Signal Match", top: "52%", left: "2%" },
    { label: "ROI Layer", top: "72%", right: "8%" },
    { label: "Node Sync", top: "88%", left: "12%" },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(139,92,246,0.18),transparent_40%),radial-gradient(circle_at_80%_25%,rgba(168,85,247,0.1),transparent_45%),radial-gradient(circle_at_50%_85%,rgba(34,211,238,0.08),transparent_50%)]" />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(168,85,247,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.07)_1px,transparent_1px)] [background-size:72px_72px]" />

      {!reduceMotion &&
        Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`stream-${i}`}
            className="absolute h-px w-24 bg-gradient-to-r from-transparent via-[#22D3EE]/40 to-transparent"
            style={{ top: `${15 + i * 14}%`, left: "-6rem" }}
            animate={{ x: ["0vw", "110vw"] }}
            transition={{
              duration: 8 + i * 1.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 1.2,
              ease: "linear",
            }}
          />
        ))}

      {streams.map((item, index) => (
        <motion.div
          key={item.label}
          className="absolute rounded-full border border-[#8B5CF6]/35 bg-[#0F0F15]/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#D4D4D8]"
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
          }}
          animate={
            reduceMotion
              ? undefined
              : { opacity: [0.35, 0.85, 0.35], y: [0, -6, 0] }
          }
          transition={{
            duration: 2.5 + index * 0.35,
            repeat: reduceMotion ? 0 : Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#22D3EE] shadow-[0_0_8px_#22D3EE]" />
          {item.label}
        </motion.div>
      ))}
    </div>
  );
}
