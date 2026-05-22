"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Car, RotateCcw, BookOpen, Users } from "lucide-react";
import { SERVICES } from "@/src/data/services";

const ICONS = { Car, RotateCcw, BookOpen, Users };

// Asymmetric bento: [2col, 1col] / [1col, 2col]
const BENTO_SPANS = [
  "col-span-1 md:col-span-2",
  "col-span-1",
  "col-span-1",
  "col-span-1 md:col-span-2",
] as const;

export default function ServicesBento() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
    >
      {SERVICES.map((s, i) => {
        const Icon = ICONS[s.iconName as keyof typeof ICONS];
        const isDark = s.featured;

        return (
          <motion.div
            key={s.title}
            className={[
              BENTO_SPANS[i],
              "relative flex flex-col gap-5 p-7 md:p-9",
              isDark ? "bg-ink" : "bg-surface border border-ink/[0.07]",
            ].join(" ")}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            whileHover={{
              scale: 1.015,
              transition: { type: "spring", stiffness: 300, damping: 24 },
            }}
          >
            {/* Icon pill */}
            <div
              className={[
                "inline-flex items-center justify-center w-10 h-10 shrink-0",
                isDark ? "bg-white/10" : "bg-accent/10",
              ].join(" ")}
            >
              <Icon size={18} className="text-accent" strokeWidth={1.75} />
            </div>

            {/* Text */}
            <div className="flex-1">
              <h3
                className={[
                  "font-bold tracking-tight mb-3",
                  isDark ? "text-[1.15rem] text-white" : "text-[1.0625rem] text-ink",
                ].join(" ")}
              >
                {s.title}
              </h3>
              <p
                className={[
                  "text-[0.9375rem] leading-[1.65]",
                  isDark ? "text-white/65" : "text-ink-2",
                ].join(" ")}
              >
                {s.desc}
              </p>
            </div>

            {/* Detail badge */}
            <div className="mt-auto">
              <span
                className={[
                  "inline-flex text-[0.625rem] font-semibold uppercase tracking-[0.14em] px-2.5 py-1",
                  isDark ? "bg-white/10 text-white/75" : "bg-accent/10 text-accent",
                ].join(" ")}
              >
                {s.detail}
              </span>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
