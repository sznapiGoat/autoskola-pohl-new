"use client";

import { TESTIMONIALS } from "@/src/data/testimonials";
import { Star } from "lucide-react";

function TestimonialCard({ quote, name, detail }: { quote: string; name: string; detail: string }) {
  return (
    <div className="glass-card gradient-border shrink-0 w-[340px] md:w-[400px] mx-4 p-7 flex flex-col gap-4 rounded-sm select-none">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={13} className="fill-accent text-accent" />
        ))}
      </div>
      <p className="text-[0.9rem] leading-[1.7] text-ink-2 flex-1">{quote}</p>
      <div className="border-t border-border/60 pt-4">
        <div className="text-[0.875rem] font-semibold text-ink">{name}</div>
        <div className="text-[0.75rem] text-ink-3 mt-0.5 uppercase tracking-[0.08em]">{detail}</div>
      </div>
    </div>
  );
}

const doubled = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

export default function InfiniteMarquee() {
  return (
    <div className="overflow-hidden py-2" aria-label="Reference absolventů">
      <div className="animate-marquee flex items-stretch w-max">
        {doubled.map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
      </div>
    </div>
  );
}
