import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Děkujeme! | Autoškola POHL",
  description: "Vaše zpráva byla úspěšně odeslána.",
  robots: { index: false, follow: false },
};

export default function DekujemePage() {
  return (
    <div className="min-h-[calc(100svh-62px)] flex items-center justify-center px-6 py-24">
      <div className="max-w-[520px] w-full text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 mb-8">
          <CheckCircle size={32} className="text-accent" strokeWidth={1.5} />
        </div>

        {/* Eyebrow */}
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-ink-3 mb-3">
          Odesláno
        </p>

        {/* Heading */}
        <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-black tracking-tight text-ink leading-[1.1] mb-4">
          Děkujeme!
        </h1>

        {/* Body */}
        <p className="text-[0.9375rem] leading-[1.7] text-ink-2 mb-10 max-w-[380px] mx-auto">
          Vaše zpráva byla úspěšně odeslána. Ozveme se vám nejpozději
          do&nbsp;24&nbsp;hodin. Pro rychlejší odpověď nás můžete
          kontaktovat telefonicky.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center bg-ink text-surface text-[0.8125rem] font-medium uppercase tracking-[0.06em] px-8 py-3.5 hover:bg-accent hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] transition-all duration-200"
          >
            Zpět na hlavní stránku
          </Link>
          <Link
            href="/cenik"
            className="inline-flex items-center border border-ink/20 text-ink-2 text-[0.8125rem] font-medium uppercase tracking-[0.06em] px-8 py-3.5 hover:border-accent hover:text-accent transition-all duration-200"
          >
            Prohlédnout ceník
          </Link>
        </div>
      </div>
    </div>
  );
}
