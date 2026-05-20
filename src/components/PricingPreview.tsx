"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PRICE_PREVIEW } from "@/src/data/pricing";
import { ArrowRight } from "lucide-react";

export default function PricingPreview() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-4">
        {PRICE_PREVIEW.map((item, i) =>
          item.featured ? (
            <motion.div
              key={i}
              className="relative bg-accent p-7 flex flex-col gap-3 overflow-hidden"
              whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 24 } }}
            >
              {/* Corner badge */}
              <div className="absolute top-0 right-0 bg-surface text-accent text-[0.5rem] font-black uppercase tracking-[0.18em] px-3 py-1.5">
                NEJŽÁDANĚJŠÍ
              </div>

              <div className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-white/60 pt-5">
                {item.sub}
              </div>
              <div className="text-[1.25rem] font-black tracking-tight text-white">
                {item.label}
              </div>
              <div className="text-[2rem] font-black text-white mt-auto leading-none">
                {item.price.toLocaleString("cs-CZ")} Kč
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={i}
              className="bg-surface border border-ink/[0.07] p-7 flex flex-col gap-3"
              whileHover={{ scale: 1.025, y: -3, transition: { type: "spring", stiffness: 300, damping: 24 } }}
            >
              <div className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-ink-3">
                {item.sub}
              </div>
              <div className="text-[1.0625rem] font-bold text-ink">
                {item.label}
              </div>
              <div className="text-[1.5rem] font-black text-accent mt-auto leading-none">
                {item.price.toLocaleString("cs-CZ")} Kč
              </div>
            </motion.div>
          )
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
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
