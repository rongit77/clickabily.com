"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function CursorGlow({ reduceMotion }: { reduceMotion: boolean }) {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 60, damping: 22 });
  const springY = useSpring(y, { stiffness: 60, damping: 22 });

  useEffect(() => {
    if (reduceMotion) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [reduceMotion, x, y]);

  if (reduceMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden
    >
      <motion.div
        className="absolute h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.12)_0%,transparent_70%)]"
        style={{ left: springX, top: springY }}
      />
      <motion.div
        className="absolute h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.06)_0%,transparent_70%)]"
        style={{ left: springX, top: springY }}
      />
    </motion.div>
  );
}
