"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[calc(100svh-62px)] flex items-center justify-start overflow-hidden"
    >
      {/* Parallax background image */}
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: imgY }} aria-hidden="true">
        <Image
          src="/images/orkun-azap-_c7haaSAcIg-unsplash.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center scale-110"
        />
      </motion.div>

      {/* Sharp gradient — heavy on left, dissolves right */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/60 to-black/10"
        aria-hidden="true"
      />

      {/* Raw typographic content — no glass card */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-24 w-full">
        <div className="w-full max-w-[640px]">

          {/* Eyebrow with accent left-bar */}
          <motion.div className="flex items-center gap-3 mb-7" {...fadeUp(0.2)}>
            <div className="w-px h-8 bg-accent shrink-0" />
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-white/65">
              Dobruška
            </p>
          </motion.div>

          {/* H1 — font-black, compact leading, accent on key word */}
          <motion.h1
            className="text-[clamp(2.75rem,6vw,5.5rem)] font-black leading-[0.93] tracking-tight text-white mb-8"
            {...fadeUp(0.32)}
          >
            TVOJE SVOBODA<br />
            <span className="text-accent">ZAČÍNÁ</span> U VOLANTU
          </motion.h1>

          {/* Sub */}
          <motion.p
            className="text-[1.0625rem] leading-[1.72] text-white/75 mb-10 max-w-[480px]"
            {...fadeUp(0.46)}
          >
            Autoškola Pohl: Naučíme tě víc než jen značky.{" "}
            Naučíme tě řídit s jistotou a v klidu.
          </motion.p>

          {/* CTA — spring entrance, micro-interaction hover */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.64, type: "spring", stiffness: 280, damping: 20 }}
          >
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 340, damping: 22 }}
            >
              <Link
                href="/kontakt#form"
                className="inline-flex items-center bg-accent text-surface text-[0.875rem] font-bold tracking-[0.04em] px-10 py-4"
              >
                Chci začít jezdit
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/45"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={22} strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      {/* Skew divider */}
      <div className="divider-tr absolute bottom-0 left-0 right-0 h-16 bg-surface" aria-hidden="true" />
    </section>
  );
}
