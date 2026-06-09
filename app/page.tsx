import Image from "next/image";
import Link from "next/link";
import { Phone, CalendarDays } from "lucide-react";
import { CONTACT } from "@/src/data/contact";
import { SCHEDULE_2026 } from "@/src/data/schedule";
import HeroSection from "@/src/components/HeroSection";
import InfiniteMarquee from "@/src/components/InfiniteMarquee";
import PricingPreview from "@/src/components/PricingPreview";
import ServicesBento from "@/src/components/ServicesBento";
import { RevealOnScroll } from "@/src/components/RevealOnScroll";
import { cn } from "@/src/lib/cn";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* ─── Services ─────────────────────────────────────────────────────────── */}
      <section className="relative py-28 bg-surface">
        <div className="max-w-[1400px] mx-auto px-6">
          <RevealOnScroll>
            <div className="flex items-end justify-between gap-6 mb-12">
              <h2 className="text-[clamp(2rem,3.5vw,2.75rem)] font-black leading-[1.1] tracking-tight text-ink">
                Kurzy a služby
              </h2>
              <Link
                href="/sluzby"
                className="hidden sm:flex items-center gap-1.5 text-[0.8125rem] font-medium text-ink-3 hover:text-accent transition-colors duration-200 shrink-0"
              >
                Více o službách →
              </Link>
            </div>
          </RevealOnScroll>

          <ServicesBento />

          <div className="mt-6 flex sm:hidden">
            <Link
              href="/sluzby"
              className="flex items-center gap-1.5 text-[0.8125rem] font-medium text-ink-3 hover:text-accent transition-colors duration-200"
            >
              Více o službách →
            </Link>
          </div>
        </div>

        <div className="divider-tr absolute bottom-0 left-0 right-0 h-16 bg-bg" aria-hidden="true" />
      </section>

      {/* ─── Pricing Preview ──────────────────────────────────────────────────── */}
      <section className="relative py-28 bg-bg overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <RevealOnScroll>
            <h2 className="text-[clamp(2rem,3.5vw,2.75rem)] font-black leading-[1.1] tracking-tight text-ink mb-3">
              Jasná cena od začátku
            </h2>
            <p className="text-[0.9375rem] text-ink-3 mb-12">Bez skrytých poplatků — vše zahrnuto v ceně kurzu.</p>
          </RevealOnScroll>
          <PricingPreview />
        </div>

        <div className="divider-bl absolute bottom-0 left-0 right-0 h-16 bg-surface" aria-hidden="true" />
      </section>

      {/* ─── Testimonials ─────────────────────────────────────────────────────── */}
      <section className="py-28 bg-surface overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 mb-12">
          <RevealOnScroll>
            <h2 className="text-[clamp(2rem,3.5vw,2.75rem)] font-black leading-[1.1] tracking-tight text-ink">
              Co říkají absolventi
            </h2>
          </RevealOnScroll>
        </div>
        <InfiniteMarquee />
      </section>

      {/* ─── About strip ──────────────────────────────────────────────────────── */}
      <section className="relative py-28 bg-bg">
        <div className="divider-br absolute top-0 left-0 right-0 h-16 bg-surface" aria-hidden="true" />
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <RevealOnScroll>
              <div className="overflow-hidden">
                <Image
                  src="/images/bas-peperzak-tyhpK_QelPo-unsplash.jpg"
                  alt="Instruktor s žákem na cvičišti"
                  width={660}
                  height={440}
                  className="object-cover w-full aspect-[3/2]"
                />
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.15}>
              <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-black leading-[1.1] tracking-tight text-ink mb-6">
                V Dobrušce<br />od roku 2018
              </h2>
              <p className="text-[1rem] leading-[1.65] text-ink-2 mb-4">
                Vedeme kurzy všech skupin, termíny jízd domlouváme podle vás.
                Nejsme velká fabrika — každý žák má prostor se to pořádně naučit.
              </p>
              <p className="text-[0.875rem] text-ink-3">
                Přihlaste se e-mailem nebo telefonicky. Zahájení kdykoli.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ─── Upcoming CPC dates ───────────────────────────────────────────────── */}
      <section className="relative py-28 bg-surface">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-16 items-start">
            <RevealOnScroll>
              <p className="flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-accent mb-3">
                <CalendarDays size={14} strokeWidth={2.5} />
                Profesní školení CPC
              </p>
              <h2 className="text-[clamp(2rem,3.5vw,2.75rem)] font-black leading-[1.1] tracking-tight text-ink mb-4">
                Nejbližší termíny 2026
              </h2>
              <p className="text-[0.9375rem] leading-[1.65] text-ink-2 mb-6">
                Povinné každoroční školení pro řidiče skupin C, CE, D a DE.
                Rezervujte si místo včas — kapacita je omezená.
              </p>
              <Link
                href="/skoleni"
                className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-ink-3 hover:text-accent transition-colors duration-200"
              >
                Všechny termíny a podrobnosti →
              </Link>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <div className="border border-border bg-bg">
                {SCHEDULE_2026.map((d, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex items-center justify-between gap-4 px-6 py-5",
                      i < SCHEDULE_2026.length - 1 && "border-b border-border"
                    )}
                  >
                    <div>
                      <div className="font-semibold text-ink">{d.date}</div>
                      <div className="text-[0.8125rem] text-ink-3 mt-0.5">Začátek {d.time}</div>
                    </div>
                    <span
                      className={cn(
                        "text-[0.8125rem] font-medium shrink-0",
                        d.available ? "text-accent" : "text-ink-3"
                      )}
                    >
                      {d.seats}
                    </span>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </div>

        <div className="divider-tr absolute bottom-0 left-0 right-0 h-16 bg-accent" aria-hidden="true" />
      </section>

      {/* ─── CTA strip ────────────────────────────────────────────────────────── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-accent" aria-hidden="true" />
        <div className="dot-mesh absolute inset-0 opacity-10" aria-hidden="true" />
        <div className="relative max-w-[1400px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <RevealOnScroll>
            <h2 className="text-[1.5rem] font-black text-surface mb-1">
              Zájem o kurz?
            </h2>
            <p className="text-surface/70 text-[0.9375rem]">
              Zavolejte nebo napište — ozveme se.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1} className="flex flex-wrap gap-3 shrink-0">
            <a
              href={CONTACT.phone1Href}
              className="flex items-center gap-2 bg-surface text-ink text-[0.8125rem] font-medium uppercase tracking-[0.06em] px-8 py-4 hover:bg-bg hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] transition-all duration-200"
            >
              <Phone size={13} strokeWidth={2.5} />
              {CONTACT.phone1}
            </a>
            <Link
              href="/kontakt#form"
              className="flex items-center gap-2 border border-surface/40 text-surface text-[0.8125rem] font-medium uppercase tracking-[0.06em] px-8 py-4 hover:bg-surface/15 hover:-translate-y-0.5 transition-all duration-200"
            >
              Přihlásit se
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
