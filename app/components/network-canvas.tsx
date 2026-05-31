"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Node = {
  id: string;
  x: number;
  y: number;
  label: string;
  type: "hub" | "node";
};

type Edge = { from: string; to: string };

const HERO_NODES: Node[] = [
  { id: "traffic", x: 0.12, y: 0.28, label: "Traffic", type: "hub" },
  { id: "intent", x: 0.32, y: 0.14, label: "Intent", type: "node" },
  { id: "attention", x: 0.52, y: 0.22, label: "Attention", type: "node" },
  { id: "data", x: 0.72, y: 0.38, label: "Data", type: "node" },
  { id: "revenue", x: 0.88, y: 0.18, label: "Revenue", type: "hub" },
  { id: "bid", x: 0.22, y: 0.52, label: "Bid Engine", type: "node" },
  { id: "signal", x: 0.44, y: 0.48, label: "Signals", type: "node" },
  { id: "ai", x: 0.64, y: 0.58, label: "AI Ops", type: "node" },
  { id: "affiliate", x: 0.38, y: 0.72, label: "Affiliate", type: "node" },
  { id: "monetize", x: 0.58, y: 0.78, label: "Monetize", type: "node" },
  { id: "scale", x: 0.78, y: 0.68, label: "Scale", type: "node" },
  { id: "core", x: 0.5, y: 0.42, label: "Core", type: "hub" },
];

const HERO_EDGES: Edge[] = [
  { from: "traffic", to: "intent" },
  { from: "intent", to: "attention" },
  { from: "attention", to: "data" },
  { from: "data", to: "revenue" },
  { from: "traffic", to: "bid" },
  { from: "bid", to: "signal" },
  { from: "signal", to: "core" },
  { from: "core", to: "ai" },
  { from: "ai", to: "revenue" },
  { from: "bid", to: "affiliate" },
  { from: "affiliate", to: "monetize" },
  { from: "monetize", to: "scale" },
  { from: "scale", to: "revenue" },
  { from: "attention", to: "core" },
  { from: "core", to: "data" },
  { from: "signal", to: "attention" },
];

function dist(ax: number, ay: number, bx: number, by: number) {
  return Math.hypot(ax - bx, ay - by);
}

type NetworkCanvasProps = {
  reduceMotion: boolean;
  className?: string;
  height?: string;
  nodes?: Node[];
  edges?: Edge[];
  interactive?: boolean;
};

export function NetworkCanvas({
  reduceMotion,
  className = "",
  height = "min-h-[320px] sm:min-h-[420px]",
  nodes = HERO_NODES,
  edges = HERO_EDGES,
  interactive = true,
}: NetworkCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 800, h: 400 });
  const [hovered, setHovered] = useState<string | null>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });
  const parallaxX = useTransform(springX, [0, 1], [-12, 12]);
  const parallaxY = useTransform(springY, [0, 1], [-8, 8]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver(([entry]) => {
      const { width, height: h } = entry.contentRect;
      setSize({ w: width, h });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!interactive || reduceMotion) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMouse({ x, y });
      mouseX.set(x);
      mouseY.set(y);
    },
    [interactive, reduceMotion, mouseX, mouseY],
  );

  const positions = useMemo(() => {
    return nodes.map((node) => {
      const baseX = node.x * size.w;
      const baseY = node.y * size.h;
      if (reduceMotion || !interactive) {
        return { ...node, px: baseX, py: baseY, pull: 0 };
      }
      const d = dist(mouse.x, mouse.y, node.x, node.y);
      const pull = Math.max(0, 1 - d * 2.2) * 18;
      const angle = Math.atan2(node.y - mouse.y, node.x - mouse.x);
      return {
        ...node,
        px: baseX + Math.cos(angle) * pull,
        py: baseY + Math.sin(angle) * pull,
        pull,
      };
    });
  }, [nodes, size, mouse, reduceMotion, interactive]);

  const posMap = useMemo(
    () => Object.fromEntries(positions.map((p) => [p.id, p])),
    [positions],
  );

  const activeEdges = useMemo(() => {
    if (!hovered) return new Set(edges.map((e) => `${e.from}-${e.to}`));
    const set = new Set<string>();
    edges.forEach((e) => {
      if (e.from === hovered || e.to === hovered) {
        set.add(`${e.from}-${e.to}`);
      }
    });
    return set;
  }, [hovered, edges]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        setHovered(null);
        mouseX.set(0.5);
        mouseY.set(0.5);
      }}
      className={`relative w-full overflow-hidden rounded-3xl border border-[#8B5CF6]/40 bg-[#0B0B10]/80 ${height} ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,rgba(139,92,246,0.28),transparent_50%),radial-gradient(circle_at_75%_70%,rgba(34,211,238,0.14),transparent_45%)]" />
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />

      <motion.div className="absolute inset-0" style={{ x: parallaxX, y: parallaxY }}>
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox={`0 0 ${size.w} ${size.h}`}
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#A855F7" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.4" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {edges.map((edge) => {
            const a = posMap[edge.from];
            const b = posMap[edge.to];
            if (!a || !b) return null;
            const key = `${edge.from}-${edge.to}`;
            const active = activeEdges.has(key);
            return (
              <g key={key}>
                <line
                  x1={a.px}
                  y1={a.py}
                  x2={b.px}
                  y2={b.py}
                  stroke="url(#edgeGrad)"
                  strokeWidth={active ? 1.8 : 1}
                  strokeOpacity={active ? 0.85 : hovered ? 0.15 : 0.35}
                  strokeLinecap="round"
                />
                {!reduceMotion && (
                  <SignalPulse
                    x1={a.px}
                    y1={a.py}
                    x2={b.px}
                    y2={b.py}
                    delay={(edge.from.charCodeAt(0) + edge.to.charCodeAt(0)) % 5}
                    active={active}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {positions.map((node) => {
          const isHub = node.type === "hub";
          const isHovered = hovered === node.id;
          const radius = isHub ? 7 : 5;
          return (
            <motion.button
              key={node.id}
              type="button"
              aria-label={node.label}
              onMouseEnter={() => setHovered(node.id)}
              onFocus={() => setHovered(node.id)}
              onBlur={() => setHovered(null)}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-crosshair focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#22D3EE]"
              style={{ left: node.px, top: node.py }}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      scale: isHovered ? 1.35 : 1,
                    }
              }
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <span
                className={`absolute inset-0 rounded-full blur-md ${
                  isHub ? "bg-[#8B5CF6]" : "bg-[#A855F7]"
                }`}
                style={{
                  opacity: isHovered ? 0.7 : 0.3 + node.pull * 0.02,
                  transform: `scale(${isHovered ? 2.2 : 1.6})`,
                }}
              />
              <span
                className={`relative block rounded-full border ${
                  isHub
                    ? "h-3.5 w-3.5 border-[#22D3EE]/60 bg-[#8B5CF6]"
                    : "h-2.5 w-2.5 border-[#A855F7]/50 bg-[#C4B5FD]"
                } shadow-[0_0_20px_rgba(168,85,247,0.9)]`}
              />
              {!reduceMotion && (
                <motion.span
                  className="absolute left-1/2 top-1/2 block rounded-full border border-[#22D3EE]/40"
                  style={{ width: radius * 4, height: radius * 4, x: "-50%", y: "-50%" }}
                  animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{
                    duration: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: node.x * 3,
                  }}
                />
              )}
              <motion.span
                initial={false}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? -28 : -20,
                }}
                className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap rounded-md border border-[#8B5CF6]/40 bg-[#0D0D14]/90 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[#E9D5FF]"
              >
                {node.label}
              </motion.span>
            </motion.button>
          );
        })}
      </motion.div>

      {!reduceMotion && (
        <motion.div
          className="pointer-events-none absolute h-32 w-32 rounded-full bg-[#8B5CF6]/20 blur-3xl"
          style={{
            left: `${mouse.x * 100}%`,
            top: `${mouse.y * 100}%`,
            x: "-50%",
            y: "-50%",
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        />
      )}

      <div className="pointer-events-none absolute bottom-4 left-4 rounded-full border border-[#8B5CF6]/30 bg-[#0D0D14]/80 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#A1A1AA]">
        {interactive ? "Move cursor · Hover nodes" : "Live network"}
      </div>
    </div>
  );
}

function SignalPulse({
  x1,
  y1,
  x2,
  y2,
  delay,
  active,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
  active: boolean;
}) {
  return (
    <motion.circle
      r={active ? 3.5 : 2.5}
      fill={active ? "#22D3EE" : "#A855F7"}
      filter="url(#glow)"
      cx={x1}
      cy={y1}
      animate={{
        cx: [x1, x2],
        cy: [y1, y2],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: active ? 1.8 : 2.8,
        repeat: Number.POSITIVE_INFINITY,
        delay: delay * 0.4,
        ease: "linear",
      }}
    />
  );
}

export const CHAIN_NODES: Node[] = [
  { id: "traffic", x: 0.08, y: 0.5, label: "Traffic", type: "hub" },
  { id: "intent", x: 0.28, y: 0.5, label: "Intent", type: "node" },
  { id: "attention", x: 0.48, y: 0.5, label: "Attention", type: "node" },
  { id: "data", x: 0.68, y: 0.5, label: "Data", type: "node" },
  { id: "revenue", x: 0.88, y: 0.5, label: "Revenue", type: "hub" },
];

export const CHAIN_EDGES: Edge[] = [
  { from: "traffic", to: "intent" },
  { from: "intent", to: "attention" },
  { from: "attention", to: "data" },
  { from: "data", to: "revenue" },
];

export const OPERATING_NODES: Node[] = [
  { id: "core", x: 0.5, y: 0.5, label: "Clickabily", type: "hub" },
  { id: "adtech", x: 0.5, y: 0.12, label: "AdTech", type: "node" },
  { id: "igaming", x: 0.82, y: 0.22, label: "iGaming", type: "node" },
  { id: "affiliate", x: 0.92, y: 0.5, label: "Affiliate", type: "node" },
  { id: "search", x: 0.82, y: 0.78, label: "Search", type: "node" },
  { id: "native", x: 0.5, y: 0.88, label: "Native Ads", type: "node" },
  { id: "ai", x: 0.18, y: 0.78, label: "AI", type: "node" },
  { id: "ecom", x: 0.08, y: 0.5, label: "E-commerce", type: "node" },
  { id: "pub", x: 0.18, y: 0.22, label: "Publishing", type: "node" },
  { id: "leads", x: 0.32, y: 0.08, label: "Lead Gen", type: "node" },
];

export const OPERATING_EDGES: Edge[] = OPERATING_NODES.filter((n) => n.id !== "core").map(
  (n) => ({ from: "core", to: n.id }),
);
