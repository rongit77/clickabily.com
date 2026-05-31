"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const navLinks = [
  { label: "Work", href: "#selected-ventures" },
  { label: "Contact", href: "#contact" },
];

type LogoProps = {
  size?: "header" | "footer";
  priority?: boolean;
  className?: string;
};

export function Logo({ size = "header", priority = false, className = "" }: LogoProps) {
  const sizeClass =
    size === "header"
      ? "h-11 w-auto drop-shadow-[0_0_18px_rgba(139,92,246,0.35)] sm:h-12 lg:h-14"
      : "h-9 w-auto opacity-90 sm:h-10";

  return (
    <Image
      src="/clickabily-logo.png"
      alt="Clickabily"
      width={582}
      height={178}
      priority={priority}
      className={`${sizeClass} ${className}`.trim()}
    />
  );
}

export function SiteHeader() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.header
      initial={reduceMotion ? undefined : { opacity: 0, y: -12 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-[#8B5CF6]/15 bg-[#07070A]/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3.5 sm:px-8 sm:py-4 lg:px-10">
        <a
          href="#"
          className="group relative shrink-0 transition-transform duration-200 hover:scale-[1.02]"
        >
          <span className="pointer-events-none absolute -inset-3 rounded-2xl bg-[radial-gradient(circle,rgba(139,92,246,0.18),transparent_70%)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          <Logo size="header" priority />
        </a>

        <nav className="flex items-center gap-2 sm:gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-[#D4D4D8] transition-colors hover:bg-[#8B5CF6]/10 hover:text-[#F5F5F5] sm:px-4"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="hidden rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] px-4 py-1.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] sm:inline-block"
          >
            Partner With Us
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
