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

      {/* Gradient overlay — dark on left, lighter on right */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-black/10"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-24 w-full">
        {/* Glass card */}
        <motion.div
          className="w-full max-w-[600px] rounded-2xl border border-white/20 bg-white/[0.12] p-8 md:p-12 backdrop-blur-md"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Eyebrow */}
          <motion.p
            className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-white/70 mb-5"
            {...fadeUp(0.25)}
          >
            Akreditované školící středisko · Dobruška
          </motion.p>

          {/* H1 */}
          <motion.h1
            className="text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-white mb-6"
            {...fadeUp(0.35)}
          >
            TVOJE SVOBODA<br />ZAČÍNÁ U VOLANTU
          </motion.h1>

          {/* Sub */}
          <motion.p
            className="text-[1.0625rem] leading-[1.72] text-white/80 mb-10 max-w-[480px]"
            {...fadeUp(0.48)}
          >
            Autoškola Pohl: Naučíme tě víc než jen značky.{" "}
            Naučíme tě řídit s jistotou a v klidu.
          </motion.p>

          {/* CTA — bounce entrance + hover glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              delay: 0.68,
              type: "spring",
              stiffness: 280,
              damping: 18,
            }}
          >
            <motion.div
              className="inline-block"
              whileHover={{
                scale: 1.06,
                boxShadow: "0 0 32px 6px rgba(39,90,220,0.55)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 340, damping: 22 }}
            >
              <Link
                href="/kontakt#form"
                className="inline-flex items-center bg-accent text-surface text-[0.875rem] font-semibold uppercase tracking-[0.1em] px-10 py-4 rounded-sm"
              >
                CHCI ZAČÍT JEZDIT
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/50"
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

      {/* Skew divider into next section */}
      <div className="divider-tr absolute bottom-0 left-0 right-0 h-16 bg-surface" aria-hidden="true" />
    </section>
  );
}
