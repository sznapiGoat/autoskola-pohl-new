import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/src/components/Breadcrumb";
import PricingAccordion from "@/src/components/PricingAccordion";

export const metadata: Metadata = {
  title: "Ceník",
  description:
    "Přehled cen výcviku pro skupiny AM, A1, A2, A, B, BE, B96, C a CE. Ceny bez skrytých poplatků, rozsah hodin a minimální věk pro každou skupinu.",
};

export default function CenikPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-24">
      <Breadcrumb crumbs={[{ label: "Domů", href: "/" }, { label: "Ceník" }]} />

      <div className="mt-10 mb-14">
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-ink-3 mb-3">
          Ceník výcviku
        </p>
        <h1 className="text-[clamp(2.25rem,4.5vw,3.25rem)] font-bold text-ink mb-5 tracking-tight leading-[1.1]">
          Ceny bez skrytých poplatků
        </h1>
        <p className="text-[0.9375rem] text-ink-2 leading-[1.65] max-w-[500px]">
          Vyberte skupinu řidičského oprávnění. Zobrazíme přesnou cenu,
          rozsah výcviku a minimální věk.
        </p>
      </div>

      <PricingAccordion />

      <div className="mt-16 border-t border-border pt-10 grid grid-cols-1 md:grid-cols-2 gap-8 text-[0.875rem] text-ink-3 leading-[1.75]">
        <div>
          <h2 className="text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-ink-2 mb-3">
            Co je zahrnuto v ceně
          </h2>
          <ul className="flex flex-col gap-1">
            <li>Výukové materiály a testové otázky</li>
            <li>Veškeré jízdní hodiny dle minimálního rozsahu</li>
            <li>Přihlášení ke zkoušce na Městském úřadě</li>
            <li>Administrativní náklady kurzu</li>
          </ul>
        </div>
        <div>
          <h2 className="text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-ink-2 mb-3">
            Co není zahrnuto
          </h2>
          <ul className="flex flex-col gap-1">
            <li>Poplatek za zkoušku na MÚ (700 Kč, platí žadatel)</li>
            <li>Případné opravné zkoušky</li>
            <li>Fotografii pro vydání průkazu</li>
          </ul>
        </div>
      </div>

      <div className="mt-14 border-t border-border pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-[1.25rem] font-semibold text-ink mb-1">
            Připraveni se přihlásit?
          </h2>
          <p className="text-[0.9375rem] text-ink-2">
            Vyplňte přihlášku a ozveme se do 24 hodin.
          </p>
        </div>
        <Link
          href="/kontakt#form"
          className="shrink-0 bg-ink text-surface text-[0.8125rem] font-medium uppercase tracking-[0.06em] px-10 py-4 hover:bg-accent hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] transition-all duration-200"
        >
          Přihlásit se
        </Link>
      </div>
    </div>
  );
}
