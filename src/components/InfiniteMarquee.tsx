"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { TESTIMONIALS } from "@/src/data/testimonials";
import { Star, Quote } from "lucide-react";

function TestimonialCard({ quote, name, detail }: { quote: string; name: string; detail: string }) {
  return (
    <div className="shrink-0 w-[340px] md:w-[380px] mx-3 bg-surface border border-ink/[0.07] p-7 flex flex-col gap-5 select-none">
      <Quote size={26} className="text-accent/25 shrink-0" strokeWidth={1.5} />

      <p className="text-[0.9rem] leading-[1.72] text-ink-2 flex-1">{quote}</p>

      <div className="border-t border-ink/[0.06] pt-5">
        <div className="flex gap-0.5 mb-2.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={11} className="fill-accent text-accent" />
          ))}
        </div>
        <div className="text-[0.875rem] font-bold text-ink">{name}</div>
        <div className="text-[0.6875rem] font-medium text-ink-3 mt-0.5 uppercase tracking-[0.1em]">
          {detail}
        </div>
      </div>
    </div>
  );
}

const ITEMS = [
  ...TESTIMONIALS,
  ...TESTIMONIALS,
  ...TESTIMONIALS,
  ...TESTIMONIALS,
];

export default function InfiniteMarquee() {
  const [paused, setPaused] = useState(false);
  const x = useMotionValue(0);
  const innerRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((_, delta) => {
    if (paused) return;
    const el = innerRef.current;
    if (!el) return;
    const halfWidth = el.scrollWidth / 2;
    const current = x.get();
    const next = current - (delta / 1000) * 56;
    x.set(next <= -halfWidth ? 0 : next);
  });

  return (
    <div
      className="overflow-hidden py-2"
      aria-label="Reference absolventů"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div ref={innerRef} className="flex items-stretch w-max" style={{ x }}>
        {ITEMS.map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
      </motion.div>
    </div>
  );
}
