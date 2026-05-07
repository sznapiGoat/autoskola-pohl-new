"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

const GROUPS = [
  {
    id: "a",
    label: "Skupiny A",
    description: "Motocykly",
    items: [
      { code: "AM",  name: "Moped / skútr",        age: 15, practice: 13, theory: 9,  price: 26000 },
      { code: "A1",  name: "Motocykl do 125 cc",   age: 16, practice: 13, theory: 9,  price: 26000 },
      { code: "A2",  name: "Motocykl do 35 kW",    age: 18, practice: 13, theory: 9,  price: 26000 },
      { code: "A",   name: "Motocykl neomezený",   age: 24, practice: 13, theory: 9,  price: 26000 },
    ],
    note: "Rozšiřující výcvik A1→A2 nebo A2→A: 8 700 Kč (s 2 roky praxe) nebo 10 000 Kč (bez praxe).",
  },
  {
    id: "b",
    label: "Skupina B",
    description: "Osobní automobil",
    items: [
      { code: "B", name: "Osobní automobil do 3 500 kg", age: 18, practice: 28, theory: 11, price: 28000 },
    ],
    note: "Skupina B automaticky zahrnuje AM (skútr 125 cc automat) + B1 (čtyřkolka) dle zákona č. 247/2000 Sb.",
  },
  {
    id: "be",
    label: "Skupiny BE / B96",
    description: "Osobní auto + přívěs",
    items: [
      { code: "BE",  name: "Osobní auto + přívěs",              age: 18, practice: 8, theory: 6, price: 10000 },
      { code: "B96", name: "Osobní auto + přívěs do 4 250 kg",  age: 18, practice: 2, theory: 0, price: 5199  },
    ],
    note: null,
  },
  {
    id: "c",
    label: "Skupiny C / CE",
    description: "Nákladní automobil",
    items: [
      { code: "C",  name: "Nákladní automobil",          age: 21, practice: 18, theory: 11, price: 26000 },
      { code: "CE", name: "Nákladní auto + přívěs",      age: 21, practice: 8,  theory: 6,  price: 18000 },
    ],
    note: null,
  },
] as const;

export default function PricingAccordion() {
  const [selected, setSelected] = useState<string>("b");
  const group = GROUPS.find((g) => g.id === selected) ?? GROUPS[1];

  return (
    <div className="w-full">
      {/* Tab row */}
      <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Skupiny řidičského oprávnění">
        {GROUPS.map((g) => {
          const active = g.id === selected;
          return (
            <button
              key={g.id}
              role="tab"
              aria-selected={active}
              onClick={() => setSelected(g.id)}
              className={[
                "px-5 py-2.5 text-sm font-medium uppercase tracking-[0.05em] border transition-colors duration-200 cursor-pointer",
                active
                  ? "bg-accent text-surface border-accent"
                  : "bg-transparent text-ink-2 border-border hover:border-accent hover:text-ink",
              ].join(" ")}
            >
              {g.label}
            </button>
          );
        })}
      </div>

      {/* Content panel */}
      <div
        role="tabpanel"
        className="border border-border bg-surface p-8 md:p-12"
        key={selected}
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
        <div className="space-y-0">
          {group.items.map((item, i) => (
            <div
              key={item.code}
              className={[
                "flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5",
                i < group.items.length - 1 ? "border-b border-border" : "",
              ].join(" ")}
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
                <div className="text-[0.75rem] text-ink-3 mt-1 uppercase tracking-[0.08em]">cena kurzu</div>
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
            href="mailto:autoskola.pohl@seznam.cz"
            className="inline-flex items-center gap-2 bg-ink text-surface text-sm font-medium uppercase tracking-[0.06em] px-10 py-4 hover:bg-accent transition-colors duration-200"
          >
            <Mail size={14} strokeWidth={2.5} />
            Přihlásit se e-mailem
          </a>
          <a
            href="tel:+420602441636"
            className="text-sm font-medium text-ink-2 hover:text-accent transition-colors duration-200"
          >
            nebo zavolat +420 602 441 636
          </a>
        </div>
      </div>
    </div>
  );
}
