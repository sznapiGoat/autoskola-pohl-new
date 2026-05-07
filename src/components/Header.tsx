"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Menu } from "lucide-react";
import { cn } from "@/src/lib/cn";
import { CONTACT } from "@/src/data/contact";
import MobileNav from "@/src/components/MobileNav";

const NAV_LINKS = [
  { href: "/sluzby",  label: "Služby" },
  { href: "/cenik",   label: "Ceník" },
  { href: "/skoleni", label: "Školení" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 h-[62px] transition-shadow duration-300",
          "bg-bg/95 backdrop-blur-sm border-b border-border",
          scrolled && "shadow-[0_1px_12px_rgba(0,0,0,0.06)]"
        )}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between gap-6">
          <Link href="/" className="shrink-0">
            <span className="font-bold text-[1.05rem] tracking-tight text-ink">
              Autoškola POHL
            </span>
          </Link>

          <nav
            className="hidden md:flex items-center gap-7 text-[0.875rem] font-medium text-ink-2"
            aria-label="Hlavní navigace"
          >
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="hover:text-accent transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={CONTACT.phone1Href}
              className="hidden sm:flex items-center gap-2 bg-ink text-surface text-[0.8125rem] font-medium px-5 py-2.5 shrink-0 hover:bg-accent hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] transition-all duration-200"
            >
              <Phone size={13} strokeWidth={2.5} />
              {CONTACT.phone1}
            </a>

            <Link
              href="/kontakt#form"
              className="hidden sm:flex items-center bg-accent text-surface text-[0.8125rem] font-medium px-5 py-2.5 shrink-0 hover:bg-accent-deep hover:-translate-y-0.5 hover:shadow-[var(--shadow-cobalt)] transition-all duration-200"
            >
              Přihlásit se
            </Link>

            <button
              type="button"
              className="md:hidden text-ink-2 hover:text-ink transition-colors duration-200 p-1"
              onClick={() => setMobileOpen(true)}
              aria-label="Otevřít menu"
              aria-expanded={mobileOpen ? "true" : "false"}
              aria-controls="mobile-nav"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
