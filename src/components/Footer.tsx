import Link from "next/link";
import { CONTACT } from "@/src/data/contact";

const NAV_LINKS = [
  { href: "/sluzby",  label: "Služby" },
  { href: "/cenik",   label: "Ceník" },
  { href: "/skoleni", label: "Školení" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export default function Footer() {
  return (
    <footer className="bg-ink text-surface">
      <div className="max-w-[1400px] mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 items-start">
        {/* Brand + contact */}
        <div>
          <Link href="/">
            <span className="font-bold text-[1.05rem] tracking-tight text-surface">
              Autoškola POHL
            </span>
          </Link>
          <p className="text-[0.875rem] text-surface/50 mt-3 leading-[1.65] max-w-[320px]">
            Akreditované školící středisko řidičů PZ v Dobrušce. Výcvik skupin
            AM až CE od roku 2018.
          </p>
          <div className="flex flex-col gap-1.5 mt-6 text-[0.875rem]">
            <a
              href={CONTACT.phone1Href}
              className="text-surface/70 hover:text-surface transition-colors duration-200"
            >
              {CONTACT.phone1}
            </a>
            <a
              href={CONTACT.phone2Href}
              className="text-surface/70 hover:text-surface transition-colors duration-200"
            >
              {CONTACT.phone2}
            </a>
            <a
              href={CONTACT.emailHref}
              className="text-surface/70 hover:text-surface transition-colors duration-200"
            >
              {CONTACT.email}
            </a>
            <span className="text-surface/40 mt-1">
              {CONTACT.address}, {CONTACT.city}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3" aria-label="Footer navigace">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-[0.875rem] text-surface/60 hover:text-surface transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-surface/10">
        <div className="max-w-[1400px] mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[0.75rem] text-surface/30">
          <span>© {new Date().getFullYear()} {CONTACT.companyName} · IČ: {CONTACT.ico}</span>
          <span>{CONTACT.companyAddress}</span>
        </div>
      </div>
    </footer>
  );
}
