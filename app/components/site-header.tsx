"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const navLinks = [
  { label: "Work", href: "#selected-ventures" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.header
      initial={reduceMotion ? undefined : { opacity: 0, y: -12 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-[#8B5CF6]/15 bg-[#07070A]/75 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 sm:px-8 lg:px-10">
        <a href="#" className="group relative shrink-0">
          <Image
            src="/clickabily-logo.jpg"
            alt="Clickabily"
            width={1024}
            height={682}
            priority
            className="h-8 w-auto transition-opacity duration-200 group-hover:opacity-90 sm:h-9"
          />
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

export function HeroLogo() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="relative w-fit"
    >
      <div className="pointer-events-none absolute -inset-8 bg-[radial-gradient(circle,rgba(139,92,246,0.22),transparent_70%)]" />
      <Image
        src="/clickabily-logo.jpg"
        alt="Clickabily"
        width={1024}
        height={682}
        priority
        className="relative h-14 w-auto sm:h-16 lg:h-20"
      />
    </motion.div>
  );
}
