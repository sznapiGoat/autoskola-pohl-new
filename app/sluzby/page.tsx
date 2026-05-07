import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/src/components/Breadcrumb";
import { SERVICES, RETURN_SCENARIOS } from "@/src/data/services";
import { CONTACT } from "@/src/data/contact";

export const metadata: Metadata = {
  title: "Služby",
  description:
    "Výcvik všech skupin řidičského oprávnění, vrácení řidičského průkazu, profesní školení CPC a referentské školení v Dobrušce.",
};

const CARD_IMAGES: Record<number, { src: string; alt: string }> = {
  0: {
    src: "/images/the-ride-academy-bejtrIu6kgM-unsplash.jpg",
    alt: "Motocykly s L tabulkami na cvičišti",
  },
  2: {
    src: "/images/ucebna.jpg",
    alt: "Učebna pro profesní školení CPC",
  },
};

export default function SluzbyPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-24">
      <Breadcrumb crumbs={[{ label: "Domů", href: "/" }, { label: "Služby" }]} />

      <div className="mt-10 mb-14">
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-ink-3 mb-3">
          Naše služby
        </p>
        <h1 className="text-[clamp(2.25rem,4.5vw,3.25rem)] font-bold text-ink mb-5 tracking-tight leading-[1.1]">
          Co nabízíme
        </h1>
      </div>

      {/* Services grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 border border-border mb-20">
        {SERVICES.map((s, i) => {
          const img = CARD_IMAGES[i];
          return (
            <div
              key={i}
              className={[
                "bg-surface hover:bg-bg transition-colors duration-200",
                i % 2 === 0 ? "md:border-r border-border" : "",
                i < 2 ? "border-b border-border" : "",
              ].join(" ")}
            >
              {img && (
                <div className="overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={600}
                    height={300}
                    className="object-cover w-full aspect-[2/1]"
                  />
                </div>
              )}
              <div className="p-8 md:p-10">
                <h2 className="text-[1.0625rem] font-semibold text-ink mb-3">{s.title}</h2>
                <p className="text-[0.9375rem] leading-[1.65] text-ink-2 mb-5">{s.desc}</p>
                <p className="text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-accent">
                  {s.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* License return deep-dive */}
      <section className="border-t border-border pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-start">
          <div>
            <p className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-ink-3 mb-3">
              Specializovaná služba
            </p>
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.2] tracking-tight text-ink mb-8">
              Přišli jste o řidičský průkaz?
            </h2>
            <p className="text-[1.0625rem] leading-[1.65] text-ink-2 mb-5">
              Pomůžeme vám s přezkoušením z odborné způsobilosti bez ohledu
              na důvod odnětí. Zkouška je náročná — cvičné jízdy předem
              doporučujeme.
            </p>
            <p className="text-[0.9375rem] leading-[1.65] text-ink-2 mb-5">
              Zkouška se skládá ze tří částí: test z pravidel provozu, test
              z ovládání vozidla (skupiny C, CE, D, DE) a praktická jízda.
              Máte nárok na jednu opravnou zkoušku.
            </p>
            <p className="text-[0.875rem] text-ink-3">
              Dopravně psychologické vyšetření zprostředkujeme.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {RETURN_SCENARIOS.map((sc, i) => (
              <div
                key={i}
                className="border border-border bg-surface p-6 hover:border-accent/40 transition-colors duration-200"
              >
                <h3 className="font-semibold text-ink mb-2">{sc.title}</h3>
                <p className="text-[0.875rem] leading-[1.65] text-ink-2 mb-3">{sc.desc}</p>
                <p className="text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-accent">
                  {sc.fee}
                </p>
              </div>
            ))}

            <div className="border border-border bg-bg px-6 py-4 text-[0.8125rem] text-ink-3 leading-[1.85]">
              <strong className="font-medium text-ink-2">Poplatky za zkoušku (MÚ)</strong>
              <br />AM, A, B, BE: PPV 100 Kč + PJ 400 Kč
              <br />C, CE, D, DE, T: PPV 100 Kč + OÚV 200 Kč + PJ 500 Kč
              <br />
              <span className="text-[0.75rem]">
                Ceny bez DPH. Platné od 01.07.2006 dle §39a zákona č. 247/2000 Sb.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-20 border-t border-border pt-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-[1.25rem] font-semibold text-ink mb-1">
              Máte zájem o některou ze služeb?
            </h2>
            <p className="text-[0.9375rem] text-ink-2">
              Kontaktujte nás a domluvíme termín.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Link
              href="/kontakt#form"
              className="bg-ink text-surface text-[0.8125rem] font-medium uppercase tracking-[0.06em] px-10 py-4 hover:bg-accent hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] transition-all duration-200"
            >
              Přihlásit se
            </Link>
            <a
              href={CONTACT.phone1Href}
              className="text-[0.875rem] font-medium text-ink-2 hover:text-accent transition-colors duration-200"
            >
              {CONTACT.phone1}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
