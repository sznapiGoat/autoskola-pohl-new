import type { Metadata } from "next";
import Image from "next/image";
import { Mail } from "lucide-react";
import Breadcrumb from "@/src/components/Breadcrumb";
import { SCHEDULE_2026 } from "@/src/data/schedule";
import { CONTACT } from "@/src/data/contact";
import { cn } from "@/src/lib/cn";

export const metadata: Metadata = {
  title: "Profesní školení CPC",
  description:
    "Termíny povinného profesního školení CPC pro řidiče skupin C, CE, D, DE v Dobrušce. 4 termíny v roce 2026, začátek v 7:00.",
};

export default function SkoleniPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-24">
      <Breadcrumb crumbs={[{ label: "Domů", href: "/" }, { label: "Profesní školení CPC" }]} />

      <div className="mt-10 mb-12 overflow-hidden">
        <Image
          src="/images/ucebna.jpg"
          alt="Učebna pro profesní školení CPC v Dobrušce"
          width={1400}
          height={420}
          priority
          className="object-cover w-full aspect-[16/5]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-start">
        {/* Left: info */}
        <div>
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-accent mb-3">
            Profesní školení CPC
          </p>
          <h1 className="text-[clamp(2.25rem,4.5vw,3.25rem)] font-bold text-ink mb-6 tracking-tight leading-[1.1]">
            Termíny 2026
          </h1>
          <p className="text-[1rem] leading-[1.65] text-ink-2 mb-5">
            Povinné každoroční školení pro řidiče skupin C, CE, D, DE.
            Každé školení trvá 7 hodin. Za 5 let musíte absolvovat všech
            35 hodin — pokud pátý rok promeškáte, jsou předchozí školení
            neplatná a musíte začít znovu.
          </p>
          <div className="flex flex-col gap-2 text-[0.875rem] text-ink-3">
            <p>Místo konání: {CONTACT.address}, {CONTACT.city}</p>
            <p>
              Přihlášení:{" "}
              <a href={CONTACT.emailHref} className="text-accent hover:underline">
                {CONTACT.email}
              </a>{" "}
              nebo{" "}
              <a href={CONTACT.phone1Href} className="text-accent hover:underline">
                {CONTACT.phone1}
              </a>
            </p>
            <p className="text-[0.8125rem] text-ink-3/60 mt-2">
              Online přihlašování dočasně nedostupné — kontaktujte nás e-mailem.
            </p>
          </div>
        </div>

        {/* Right: schedule */}
        <div>
          <div className="border border-border">
            {SCHEDULE_2026.map((d, i) => (
              <div
                key={i}
                className={cn(
                  "flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-6 py-5",
                  i < SCHEDULE_2026.length - 1 && "border-b border-border"
                )}
              >
                <div>
                  <div className="font-semibold text-ink">{d.date}</div>
                  <div className="text-[0.8125rem] text-ink-3 mt-0.5">Začátek {d.time}</div>
                </div>
                <div
                  className={cn(
                    "text-[0.8125rem] font-medium",
                    d.available ? "text-accent" : "text-ink-3"
                  )}
                >
                  {d.seats}
                </div>
              </div>
            ))}
          </div>

          <a
            href={CONTACT.emailSubjectTraining}
            className="mt-4 flex items-center justify-center gap-2 bg-accent text-surface text-[0.8125rem] font-medium uppercase tracking-[0.06em] px-8 py-4 hover:bg-accent-deep hover:-translate-y-0.5 hover:shadow-[var(--shadow-cobalt)] transition-all duration-200"
          >
            <Mail size={14} strokeWidth={2.5} />
            Přihlásit se na školení
          </a>
        </div>
      </div>
    </div>
  );
}
