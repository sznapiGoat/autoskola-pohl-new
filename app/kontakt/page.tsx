import type { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";
import Breadcrumb from "@/src/components/Breadcrumb";
import ContactForm from "@/src/components/ContactForm";
import { CONTACT } from "@/src/data/contact";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktujte Autoškolu POHL v Dobrušce. Telefon, e-mail, adresa a kontaktní formulář.",
};

export default function KontaktPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-16">
      <Breadcrumb crumbs={[{ label: "Domů", href: "/" }, { label: "Kontakt" }]} />

      <div className="mt-10 mb-12">
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-ink-3 mb-3">
          Kontakt
        </p>
        <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold text-ink mb-4 tracking-tight">
          Napište nebo zavolejte
        </h1>
        <p className="text-[0.9375rem] text-ink-2 leading-[1.65] max-w-[480px]">
          Odpovíme do 24 hodin. Pro rychlejší odpověď doporučujeme telefon.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 items-start">
        {/* Left: contact details */}
        <div>
          <div className="flex flex-col gap-7 mb-12">
            <div className="flex gap-4 items-start">
              <Phone size={15} className="text-accent mt-0.5 shrink-0" strokeWidth={2} />
              <div>
                <a
                  href={CONTACT.phone1Href}
                  className="font-medium text-ink hover:text-accent transition-colors duration-200 block"
                >
                  {CONTACT.phone1}
                </a>
                <a
                  href={CONTACT.phone2Href}
                  className="text-[0.875rem] text-ink-3 hover:text-accent transition-colors duration-200 mt-0.5 block"
                >
                  {CONTACT.phone2}
                </a>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Mail size={15} className="text-accent mt-0.5 shrink-0" strokeWidth={2} />
              <a
                href={CONTACT.emailHref}
                className="font-medium text-ink hover:text-accent transition-colors duration-200"
              >
                {CONTACT.email}
              </a>
            </div>

            <div className="flex gap-4 items-start">
              <MapPin size={15} className="text-accent mt-0.5 shrink-0" strokeWidth={2} />
              <div>
                <div className="font-medium text-ink">{CONTACT.address}</div>
                <div className="text-[0.875rem] text-ink-3 mt-0.5">{CONTACT.city}</div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="border border-border overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2555.2!2d16.1575!3d50.2912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zS29tZW5za8OpaG8gNjg3LCBEb2JydcWha2E!5e0!3m2!1scs!2scz!4v1"
              width="100%"
              height="260"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Poloha Autoškoly POHL na mapě"
            />
          </div>

          {/* Company info */}
          <div className="mt-6 border border-border bg-surface px-6 py-5">
            <div className="text-[0.8125rem] font-semibold text-ink-2 mb-2">Fakturační údaje</div>
            <div className="text-[0.8125rem] text-ink-3 leading-[1.85]">
              {CONTACT.companyName}
              <br />{CONTACT.companyAddress}
              <br />IČ: {CONTACT.ico} · DIČ: {CONTACT.dic}
            </div>
          </div>
        </div>

        {/* Right: contact form */}
        <div id="form">
          <h2 className="text-[1.125rem] font-semibold text-ink mb-6">
            Napište nám
          </h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
