"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PRICE_PREVIEW } from "@/src/data/pricing";
import { ArrowRight } from "lucide-react";

export default function PricingPreview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {PRICE_PREVIEW.map((item, i) => (
        <motion.div
          key={i}
          className="glass-card gradient-border rounded-sm p-7 flex flex-col gap-3 cursor-default"
          whileHover={{ scale: 1.035, y: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
        >
          <div className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-ink-3">{item.sub}</div>
          <div className="text-[1.125rem] font-bold text-ink">{item.label}</div>
          <div className="text-[1.5rem] font-bold text-accent mt-auto">{item.price}</div>
        </motion.div>
      ))}
      <motion.div
        className="sm:col-span-2 lg:col-span-4"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Link
          href="/cenik"
          className="inline-flex items-center gap-2 text-[0.875rem] font-medium text-ink-3 hover:text-accent transition-colors duration-200"
        >
          Kompletní ceník včetně CPC a referentských jízd
          <ArrowRight size={14} />
        </Link>
      </motion.div>
    </div>
  );
}
