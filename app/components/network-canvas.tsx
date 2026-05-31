"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";

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

const HERO_FLOW = [
  "traffic",
  "intent",
  "attention",
  "core",
  "data",
  "revenue",
  "ai",
  "core",
  "signal",
  "bid",
  "affiliate",
  "monetize",
  "scale",
  "revenue",
  "traffic",
  "bid",
  "signal",
  "attention",
];

const CHAIN_FLOW = ["traffic", "intent", "attention", "data", "revenue"];

function dist(ax: number, ay: number, bx: number, by: number) {
  return Math.hypot(ax - bx, ay - by);
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function edgeExists(edges: Edge[], a: string, b: string) {
  return edges.some(
    (e) => (e.from === a && e.to === b) || (e.from === b && e.to === a),
  );
}

function validateFlowPath(path: string[], edges: Edge[]): string[] {
  if (path.length < 2) return path;
  const valid: string[] = [path[0]];
  for (let i = 1; i < path.length; i++) {
    const prev = valid[valid.length - 1];
    const next = path[i];
    if (edgeExists(edges, prev, next)) {
      valid.push(next);
    }
  }
  return valid.length > 1 ? valid : path;
}

function getFlowPath(nodes: Node[], edges: Edge[], customPath?: string[]): string[] {
  if (customPath?.length) {
    return validateFlowPath(
      customPath.filter((id) => nodes.some((n) => n.id === id)),
      edges,
    );
  }

  const ids = new Set(nodes.map((n) => n.id));
  const isChain = nodes.every((n) => Math.abs(n.y - nodes[0].y) < 0.08);
  if (isChain) {
    return [...nodes].sort((a, b) => a.x - b.x).map((n) => n.id);
  }

  const hub = nodes.find(
    (n) =>
      n.type === "hub" &&
      nodes.filter((x) => x.type === "hub").length === 1 &&
      Math.abs(n.x - 0.5) < 0.15 &&
      Math.abs(n.y - 0.5) < 0.15,
  );

  if (hub && edges.every((e) => e.from === hub.id || e.to === hub.id)) {
    const spokes = nodes
      .filter((n) => n.id !== hub.id)
      .sort(
        (a, b) =>
          Math.atan2(a.y - hub.y, a.x - hub.x) -
          Math.atan2(b.y - hub.y, b.x - hub.x),
      );
    return spokes.flatMap((s) => [hub.id, s.id]);
  }

  if (nodes.length === HERO_NODES.length) {
    return validateFlowPath(
      HERO_FLOW.filter((id) => ids.has(id)),
      edges,
    );
  }

  // Fallback: greedy walk along edges
  const adjacency = new Map<string, string[]>();
  edges.forEach(({ from, to }) => {
    if (!ids.has(from) || !ids.has(to)) return;
    adjacency.set(from, [...(adjacency.get(from) ?? []), to]);
    adjacency.set(to, [...(adjacency.get(to) ?? []), from]);
  });

  const start = nodes.find((n) => n.type === "hub")?.id ?? nodes[0].id;
  const path: string[] = [start];
  const visited = new Set([start]);

  while (path.length < nodes.length) {
    const current = path[path.length - 1];
    const neighbors = adjacency.get(current) ?? [];
    const next =
      neighbors.find((n) => !visited.has(n)) ??
      neighbors.find((n) => n !== path[path.length - 2]) ??
      neighbors[0];
    if (!next) break;
    path.push(next);
    visited.add(next);
  }

  return path.length > 1 ? validateFlowPath(path, edges) : nodes.map((n) => n.id);
}

function useFlowAnimation(path: string[], reduceMotion: boolean, segmentMs = 1400) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduceMotion || path.length < 2) return;

    let frame = 0;
    let segmentStart = performance.now();

    const tick = (now: number) => {
      const elapsed = now - segmentStart;
      const t = Math.min(elapsed / segmentMs, 1);
      setProgress(easeInOutCubic(t));

      if (t >= 1) {
        setStep((s) => (s + 1) % path.length);
        segmentStart = now;
        setProgress(0);
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [path, reduceMotion, segmentMs]);

  const fromId = path[step] ?? path[0];
  const toId = path[(step + 1) % path.length] ?? path[1];

  return { step, progress, fromId, toId, activeNodeId: fromId };
}

type NetworkCanvasProps = {
  reduceMotion: boolean;
  className?: string;
  height?: string;
  nodes?: Node[];
  edges?: Edge[];
  flowPath?: string[];
  interactive?: boolean;
};

export function NetworkCanvas({
  reduceMotion,
  className = "",
  height = "min-h-[320px] sm:min-h-[420px]",
  nodes = HERO_NODES,
  edges = HERO_EDGES,
  flowPath: customFlowPath,
  interactive = true,
}: NetworkCanvasProps) {
  const uid = useId().replace(/:/g, "");
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 800, h: 400 });
  const [hovered, setHovered] = useState<string | null>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  const flowPath = useMemo(
    () => getFlowPath(nodes, edges, customFlowPath),
    [nodes, edges, customFlowPath],
  );

  const { progress, fromId, toId, activeNodeId } = useFlowAnimation(
    flowPath,
    reduceMotion,
  );

  const effectiveProgress = reduceMotion ? 0 : progress;
  const effectiveFromId = reduceMotion ? flowPath[0] : fromId;
  const effectiveToId = reduceMotion ? flowPath[1] ?? flowPath[0] : toId;
  const effectiveActiveId = reduceMotion ? flowPath[0] : activeNodeId;

  const focusId = hovered ?? effectiveActiveId;

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 26 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 26 });
  const parallaxX = useTransform(springX, [0, 1], [-8, 8]);
  const parallaxY = useTransform(springY, [0, 1], [-5, 5]);

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
      if (reduceMotion || !interactive || hovered) {
        return { ...node, px: baseX, py: baseY, pull: 0 };
      }
      const d = dist(mouse.x, mouse.y, node.x, node.y);
      const pull = Math.max(0, 1 - d * 2.4) * 10;
      const angle = Math.atan2(node.y - mouse.y, node.x - mouse.x);
      return {
        ...node,
        px: baseX + Math.cos(angle) * pull,
        py: baseY + Math.sin(angle) * pull,
        pull,
      };
    });
  }, [nodes, size, mouse, hovered, reduceMotion, interactive]);

  const posMap = useMemo(
    () => Object.fromEntries(positions.map((p) => [p.id, p])),
    [positions],
  );

  const flowEdgeKey = `${effectiveFromId}-${effectiveToId}`;
  const flowEdgeKeyRev = `${effectiveToId}-${effectiveFromId}`;

  const activeEdges = useMemo(() => {
    if (hovered) {
      const set = new Set<string>();
      edges.forEach((e) => {
        if (e.from === hovered || e.to === hovered) {
          set.add(`${e.from}-${e.to}`);
        }
      });
      return set;
    }
    return new Set([flowEdgeKey]);
  }, [hovered, edges, flowEdgeKey]);

  const fromPos = posMap[effectiveFromId];
  const toPos = posMap[effectiveToId];
  const runnerX =
    fromPos && toPos
      ? fromPos.px + (toPos.px - fromPos.px) * effectiveProgress
      : 0;
  const runnerY =
    fromPos && toPos
      ? fromPos.py + (toPos.py - fromPos.py) * effectiveProgress
      : 0;

  const edgeGradId = `edgeGrad-${uid}`;
  const glowId = `glow-${uid}`;
  const runnerGradId = `runnerGrad-${uid}`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        setHovered(null);
        setMouse({ x: 0.5, y: 0.5 });
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
            <linearGradient id={edgeGradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#A855F7" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.4" />
            </linearGradient>
            <radialGradient id={runnerGradId}>
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="1" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
            </radialGradient>
            <filter id={glowId}>
              <feGaussianBlur stdDeviation="3" result="blur" />
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
            const isFlowEdge =
              !hovered &&
              (key === flowEdgeKey || key === flowEdgeKeyRev);
            const isConnected = hovered
              ? activeEdges.has(key)
              : isFlowEdge;
            const dimmed = hovered ? !isConnected : !isFlowEdge;

            return (
              <line
                key={key}
                x1={a.px}
                y1={a.py}
                x2={b.px}
                y2={b.py}
                stroke={`url(#${edgeGradId})`}
                strokeWidth={isFlowEdge && !hovered ? 2.2 : isConnected && hovered ? 2 : 1}
                strokeOpacity={dimmed ? 0.1 : isFlowEdge ? 0.95 : isConnected ? 0.85 : 0.28}
                strokeLinecap="round"
                className="transition-[stroke-opacity,stroke-width] duration-200"
              />
            );
          })}

          {/* Flow trail */}
          {!reduceMotion && fromPos && toPos && (
            <>
              {[0.12, 0.06].map((offset) => {
                const trailProgress = Math.max(0, effectiveProgress - offset);
                const tx = fromPos.px + (toPos.px - fromPos.px) * trailProgress;
                const ty = fromPos.py + (toPos.py - fromPos.py) * trailProgress;
                return (
                  <circle
                    key={offset}
                    cx={tx}
                    cy={ty}
                    r={4 - offset * 20}
                    fill={`url(#${runnerGradId})`}
                    opacity={0.5 - offset}
                  />
                );
              })}
              <circle
                cx={runnerX}
                cy={runnerY}
                r={6}
                fill="#22D3EE"
                filter={`url(#${glowId})`}
              />
              <circle cx={runnerX} cy={runnerY} r={2.5} fill="#F5F5F5" />
            </>
          )}
        </svg>

        {positions.map((node) => (
          <NetworkNode
            key={node.id}
            node={node}
            isHovered={hovered === node.id}
            isFlowActive={!hovered && focusId === node.id}
            isFlowTarget={!hovered && effectiveToId === node.id}
            reduceMotion={reduceMotion}
            onEnter={() => setHovered(node.id)}
            onLeave={() => setHovered((current) => (current === node.id ? null : current))}
          />
        ))}
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
        Live network
      </div>
    </div>
  );
}

function NetworkNode({
  node,
  isHovered,
  isFlowActive,
  isFlowTarget,
  reduceMotion,
  onEnter,
  onLeave,
}: {
  node: { id: string; px: number; py: number; label: string; type: "hub" | "node"; pull: number };
  isHovered: boolean;
  isFlowActive: boolean;
  isFlowTarget: boolean;
  reduceMotion: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const isHub = node.type === "hub";
  const showLabel = isHovered || isFlowActive;

  return (
    <button
      type="button"
      aria-label={node.label}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      className="group absolute flex -translate-x-1/2 -translate-y-1/2 cursor-crosshair items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#22D3EE]"
      style={{ left: node.px, top: node.py, width: 44, height: 44 }}
    >
      <span
        className={`absolute rounded-full border transition-all duration-200 ${
          isFlowActive
            ? "h-11 w-11 border-[#22D3EE]/80 bg-[#22D3EE]/15 opacity-100"
            : isFlowTarget
              ? "h-8 w-8 border-[#A855F7]/60 bg-[#A855F7]/10 opacity-100"
              : isHovered
                ? "h-10 w-10 border-[#22D3EE]/70 bg-[#22D3EE]/10 opacity-100"
                : "h-6 w-6 border-[#8B5CF6]/0 opacity-0 group-hover:border-[#8B5CF6]/50 group-hover:bg-[#8B5CF6]/10 group-hover:opacity-100"
        }`}
      />

      <span
        className={`absolute rounded-full blur-md transition-all duration-200 ${
          isHub ? "bg-[#8B5CF6]" : "bg-[#A855F7]"
        } ${
          isFlowActive
            ? "h-9 w-9 opacity-90"
            : isFlowTarget
              ? "h-6 w-6 opacity-55"
              : isHovered
                ? "h-8 w-8 opacity-80"
                : "h-5 w-5 opacity-40 group-hover:h-6 group-hover:w-6 group-hover:opacity-60"
        }`}
      />

      <span
        className={`relative rounded-full border shadow-[0_0_20px_rgba(168,85,247,0.9)] transition-transform duration-200 ${
          isHub
            ? "h-3.5 w-3.5 border-[#22D3EE]/60 bg-[#8B5CF6]"
            : "h-2.5 w-2.5 border-[#A855F7]/50 bg-[#C4B5FD]"
        } ${isFlowActive ? "scale-150" : isFlowTarget ? "scale-125" : isHovered ? "scale-125" : "group-hover:scale-110"} ${
          isFlowActive && !reduceMotion ? "animate-pulse" : ""
        }`}
      />

      {!reduceMotion && isFlowActive && (
        <span className="absolute h-10 w-10 animate-ping rounded-full border border-[#22D3EE]/50 opacity-40" />
      )}

      <span
        className={`pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2 whitespace-nowrap rounded-md border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider transition-all duration-150 ${
          showLabel
            ? "-translate-y-8 border-[#22D3EE]/60 bg-[#0D0D14] text-[#F5F5F5] shadow-[0_0_20px_rgba(34,211,238,0.25)] opacity-100"
            : isFlowTarget
              ? "-translate-y-7 border-[#A855F7]/40 bg-[#0D0D14]/90 text-[#E9D5FF] opacity-70"
              : "-translate-y-6 border-[#8B5CF6]/30 bg-[#0D0D14]/80 text-[#C4B5FD] opacity-0 group-hover:-translate-y-8 group-hover:border-[#8B5CF6]/50 group-hover:opacity-100"
        }`}
      >
        {node.label}
      </span>
    </button>
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

export { CHAIN_FLOW };

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
