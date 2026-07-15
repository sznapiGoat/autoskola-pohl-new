import type { Metadata } from "next";
import Breadcrumb from "@/src/components/Breadcrumb";
import { CONTACT } from "@/src/data/contact";

export const metadata: Metadata = {
  title: "Ochrana osobních údajů",
  description:
    "Zásady zpracování osobních údajů Autoškoly Pohl s.r.o. — jaké údaje zpracováváme, za jakým účelem a jaká máte práva.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-[1.125rem] font-bold text-ink mb-3">{title}</h2>
      <div className="text-[0.9375rem] leading-[1.7] text-ink-2 flex flex-col gap-3">
        {children}
      </div>
    </section>
  );
}

export default function OchranaOsobnichUdajuPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-24">
      <Breadcrumb
        crumbs={[{ label: "Domů", href: "/" }, { label: "Ochrana osobních údajů" }]}
      />

      <div className="mt-10 mb-14">
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-ink-3 mb-3">
          GDPR
        </p>
        <h1 className="text-[clamp(2.25rem,4.5vw,3.25rem)] font-black text-ink mb-5 tracking-tight leading-[1.1]">
          Ochrana osobních údajů
        </h1>
        <p className="text-[0.9375rem] text-ink-2 leading-[1.65] max-w-[560px]">
          Zásady zpracování osobních údajů podle nařízení Evropského parlamentu
          a Rady (EU) 2016/679 (GDPR).
        </p>
      </div>

      <div className="max-w-[720px]">
        <Section title="Správce osobních údajů">
          <p>
            {CONTACT.companyName}, se sídlem {CONTACT.companyAddress}, IČ:{" "}
            {CONTACT.ico}{" "}(dále jen „správce&ldquo;).
          </p>
          <p>
            Kontakt:{" "}
            <a href={CONTACT.emailHref} className="text-accent hover:underline">
              {CONTACT.email}
            </a>
            , tel.{" "}
            <a href={CONTACT.phone1Href} className="text-accent hover:underline">
              {CONTACT.phone1}
            </a>
            .
          </p>
        </Section>

        <Section title="Jaké údaje zpracováváme">
          <p>
            Prostřednictvím kontaktního formuláře na tomto webu zpracováváme
            údaje, které nám sami sdělíte: jméno a příjmení, e-mailovou adresu,
            telefonní číslo (pokud jej uvedete) a obsah vaší zprávy.
          </p>
        </Section>

        <Section title="Účel a právní základ zpracování">
          <p>
            Údaje zpracováváme výhradně za účelem vyřízení vaší poptávky nebo
            dotazu a související komunikace. Právním základem je provedení
            opatření před uzavřením smlouvy na vaši žádost a náš oprávněný
            zájem na zodpovězení dotazů (čl. 6 odst. 1 písm. b) a f) GDPR).
          </p>
          <p>
            Údaje žáků přihlášených do kurzu dále zpracováváme v rozsahu a po
            dobu, kterou vyžaduje zákon č. 247/2000 Sb., o získávání a
            zdokonalování odborné způsobilosti k řízení motorových vozidel.
          </p>
        </Section>

        <Section title="Doba uložení">
          <p>
            Zprávy z kontaktního formuláře uchováváme po dobu nezbytnou k
            vyřízení poptávky, nejdéle 12 měsíců od poslední komunikace.
            Dokumentaci výuky a výcviku uchováváme po dobu stanovenou zákonem.
          </p>
        </Section>

        <Section title="Předávání údajů">
          <p>
            Údaje nepředáváme třetím stranám pro marketingové účely. Pro
            technické zajištění odeslání formuláře využíváme zpracovatele
            (poskytovatel e-mailové služby); údaje mohou být předány orgánům
            veřejné správy, pokud to vyžaduje zákon.
          </p>
        </Section>

        <Section title="Vaše práva">
          <p>
            Máte právo na přístup ke svým údajům, jejich opravu či výmaz,
            omezení zpracování, přenositelnost a právo vznést námitku proti
            zpracování. Máte rovněž právo podat stížnost u Úřadu pro ochranu
            osobních údajů (www.uoou.cz).
          </p>
          <p>
            Pro uplatnění svých práv nás kontaktujte na{" "}
            <a href={CONTACT.emailHref} className="text-accent hover:underline">
              {CONTACT.email}
            </a>
            .
          </p>
        </Section>

        <Section title="Cookies">
          <p>
            Tento web nepoužívá analytické ani marketingové cookies. Vložená
            mapa Google může po interakci ukládat vlastní technické soubory
            cookie společnosti Google.
          </p>
        </Section>
      </div>
    </div>
  );
}
