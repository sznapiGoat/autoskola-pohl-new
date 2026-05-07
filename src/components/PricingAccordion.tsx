"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail } from "lucide-react";
import { GROUPS, type GroupId } from "@/src/data/pricing";
import { CONTACT } from "@/src/data/contact";
import { cn } from "@/src/lib/cn";

export default function PricingAccordion() {
  const [selected, setSelected] = useState<GroupId>("b");
  const group = GROUPS.find((g) => g.id === selected) ?? GROUPS[1];

  return (
    <div className="w-full">
      {/* Tab row */}
      <div
        className="flex flex-wrap gap-2 mb-8"
        role="tablist"
        aria-label="Skupiny řidičského oprávnění"
      >
        {GROUPS.map((g) => {
          const active = g.id === selected;
          return (
            <button
              key={g.id}
              role="tab"
              aria-selected={active}
              onClick={() => setSelected(g.id as GroupId)}
              className={cn(
                "px-5 py-2.5 text-sm font-medium uppercase tracking-[0.05em] border transition-colors duration-200 cursor-pointer",
                active
                  ? "bg-accent text-surface border-accent"
                  : "bg-transparent text-ink-2 border-border hover:border-accent hover:text-ink"
              )}
            >
              {g.label}
            </button>
          );
        })}
      </div>

      {/* Content panel */}
      <div role="tabpanel" className="border border-border bg-surface p-8 md:p-12">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Panel header */}
            <div className="mb-8 pb-6 border-b border-border">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-3 mb-1">
                {group.description}
              </p>
              <h3 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold text-ink">
                {group.label}
              </h3>
            </div>

            {/* Items */}
            <div>
              {group.items.map((item, i) => (
                <div
                  key={item.code}
                  className={cn(
                    "flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5",
                    i < group.items.length - 1 && "border-b border-border"
                  )}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span className="text-[1.1875rem] font-bold text-ink font-mono tracking-tight">
                        {item.code}
                      </span>
                      <span className="text-ink-2 text-[0.9375rem]">{item.name}</span>
                    </div>
                    <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2 text-[0.8125rem] text-ink-3">
                      <span>Min. věk {item.age} let</span>
                      <span>{item.practice} h praxe</span>
                      {item.theory > 0 && <span>{item.theory} h teorie</span>}
                    </div>
                  </div>
                  <div className="sm:text-right shrink-0">
                    <div className="text-[1.875rem] font-bold text-ink tabular-nums leading-none">
                      {item.price.toLocaleString("cs-CZ")}&nbsp;Kč
                    </div>
                    <div className="text-[0.75rem] text-ink-3 mt-1 uppercase tracking-[0.08em]">
                      cena kurzu
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Note */}
            {group.note && (
              <p className="text-[0.8125rem] text-ink-3 mt-6 pt-6 border-t border-border leading-[1.65]">
                {group.note}
              </p>
            )}

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <a
                href={CONTACT.emailHref}
                className="inline-flex items-center gap-2 bg-ink text-surface text-sm font-medium uppercase tracking-[0.06em] px-10 py-4 hover:bg-accent transition-colors duration-200"
              >
                <Mail size={14} strokeWidth={2.5} />
                Přihlásit se e-mailem
              </a>
              <a
                href={CONTACT.phone1Href}
                className="text-sm font-medium text-ink-2 hover:text-accent transition-colors duration-200"
              >
                nebo zavolat {CONTACT.phone1}
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
