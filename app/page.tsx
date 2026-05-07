import Image from "next/image";
import Link from "next/link";
import { Phone, ChevronRight } from "lucide-react";
import { SERVICES } from "@/src/data/services";
import { TESTIMONIALS } from "@/src/data/testimonials";
import { CONTACT } from "@/src/data/contact";

export default function HomePage() {
  return (
    <>
      {/* ─── Hero ────────────────────────────────────────────────────────────── */}
      <section className="min-h-[calc(100svh-62px)] flex items-center bg-gradient-to-br from-bg via-bg to-[oklch(95%_0.008_252)]">
        <div className="max-w-[1400px] mx-auto px-6 py-28 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: copy */}
            <div className="max-w-[680px]">
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-accent mb-6">
                Akreditované školící středisko řidičů PZ · Dobruška
              </p>
              <h1 className="text-[clamp(2.75rem,5.5vw,4.5rem)] font-bold leading-[1.04] tracking-tight mb-6 text-ink">
                Řidičský průkaz<br />
                bez průtahů.{" "}
                <span className="text-accent">Jasná cena.</span>
              </h1>
              <p className="text-[1.0625rem] leading-[1.65] text-ink-2 max-w-[520px] mb-3">
                Výcvik skupin AM, A1, A2, A, B, BE, B96, C a CE. Profesní školení
                CPC, referentské školení a specializovaná pomoc s vrácením
                řidičského průkazu.
              </p>
              <p className="text-[0.875rem] text-ink-3 mb-10">
                Přihlaste se e-mailem nebo telefonicky. Zkoušky individuálně dle
                termínu.
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <Link
                  href="/kontakt#form"
                  className="bg-ink text-surface text-[0.8125rem] font-medium uppercase tracking-[0.06em] px-12 py-4 hover:bg-accent hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] transition-all duration-200"
                >
                  Přihlásit se
                </Link>
                <Link
                  href="/cenik"
                  className="text-[0.875rem] font-medium text-ink hover:text-accent transition-colors duration-200 flex items-center gap-1.5"
                >
                  Zobrazit ceník
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right: photo */}
            <div className="hidden lg:block overflow-hidden">
              <Image
                src="/images/orkun-azap-_c7haaSAcIg-unsplash.jpg"
                alt="Výuka jízdy s instruktorem"
                width={660}
                height={440}
                priority
                className="object-cover w-full aspect-[3/2]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Services teaser ─────────────────────────────────────────────────── */}
      <section className="py-28 border-t border-border bg-surface">
        <div className="max-w-[1400px] mx-auto px-6">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-ink-3 mb-3">
            Co nabízíme
          </p>
          <div className="flex items-end justify-between gap-6 mb-14">
            <h2 className="text-[clamp(2rem,3.5vw,2.75rem)] font-semibold leading-[1.2] tracking-tight text-ink">
              Čtyři způsoby, jak vám pomůžeme
            </h2>
            <Link
              href="/sluzby"
              className="hidden sm:flex items-center gap-1.5 text-[0.8125rem] font-medium text-ink-3 hover:text-accent transition-colors duration-200 shrink-0"
            >
              Více o službách <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border border-border">
            {SERVICES.map((s, i) => (
              <div
                key={i}
                className={[
                  "bg-surface p-8 md:p-10 hover:bg-bg transition-colors duration-200",
                  i % 2 === 0 ? "md:border-r border-border" : "",
                  i < 2 ? "border-b border-border" : "",
                ].join(" ")}
              >
                <h3 className="text-[1.0625rem] font-semibold text-ink mb-3">{s.title}</h3>
                <p className="text-[0.9375rem] leading-[1.65] text-ink-2 mb-5">{s.desc}</p>
                <p className="text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-accent">
                  {s.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex sm:hidden">
            <Link
              href="/sluzby"
              className="flex items-center gap-1.5 text-[0.8125rem] font-medium text-ink-3 hover:text-accent transition-colors duration-200"
            >
              Více o službách <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ────────────────────────────────────────────────────── */}
      <section className="py-28 border-t border-border bg-surface">
        <div className="max-w-[1400px] mx-auto px-6">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-ink-3 mb-3">
            Reference
          </p>
          <h2 className="text-[clamp(2rem,3.5vw,2.75rem)] font-semibold leading-[1.2] tracking-tight text-ink mb-14">
            Co říkají absolventi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="border border-border bg-bg p-8 flex flex-col gap-6 hover:border-accent/40 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift-sm)] transition-all duration-200"
              >
                <span className="text-[2rem] leading-none text-accent/30 font-serif select-none">
                  &ldquo;
                </span>
                <p className="text-[0.9375rem] leading-[1.7] text-ink-2 -mt-4 flex-1">
                  {t.quote}
                </p>
                <div className="border-t border-border pt-5">
                  <div className="text-[0.875rem] font-semibold text-ink">{t.name}</div>
                  <div className="text-[0.75rem] text-ink-3 mt-0.5 uppercase tracking-[0.08em]">
                    {t.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── About / instruktor strip ────────────────────────────────────────── */}
      <section className="py-28 border-t border-border bg-bg">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="overflow-hidden">
              <Image
                src="/images/bas-peperzak-tyhpK_QelPo-unsplash.jpg"
                alt="Instruktor s žákem na cvičišti"
                width={660}
                height={440}
                className="object-cover w-full aspect-[3/2]"
              />
            </div>
            <div>
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-ink-3 mb-3">
                Proč s námi
              </p>
              <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.2] tracking-tight text-ink mb-6">
                Zkušení instruktoři,<br />individuální přístup
              </h2>
              <p className="text-[1rem] leading-[1.65] text-ink-2 mb-4">
                V Dobrušce vyučujeme řidiče od roku 1990. Každý kurz
                přizpůsobíme vašemu tempu — žádný spěch, žádný nátlak.
                Jízdy domlouváme individuálně dle termínu.
              </p>
              <p className="text-[0.875rem] text-ink-3">
                Přihlaste se e-mailem nebo telefonicky. Zahájení kdykoli.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA strip ───────────────────────────────────────────────────────── */}
      <section className="py-20 bg-accent">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-[1.5rem] font-bold text-surface mb-1">
              Připraveni začít?
            </h2>
            <p className="text-surface/70 text-[0.9375rem]">
              Zavolejte nám nebo pošlete zprávu — odpovíme do 24 hodin.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
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
          </div>
        </div>
      </section>
    </>
  );
}
