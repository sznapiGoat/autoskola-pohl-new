import { Phone, Mail, MapPin, ChevronRight } from "lucide-react";
import PricingAccordion from "./components/PricingAccordion";

const PRICE_PREVIEW = [
  { label: "Skupina B",   sub: "Osobní automobil", price: "28 000 Kč" },
  { label: "Skupiny A",   sub: "Motocykly AM–A",   price: "26 000 Kč" },
  { label: "Skupina C",   sub: "Nákladní auto",     price: "26 000 Kč" },
  { label: "Skupina CE",  sub: "Nákl. auto + přívěs", price: "18 000 Kč" },
];

const SERVICES = [
  {
    title: "Nový řidičský průkaz",
    desc: "Výcvik skupin AM, A1, A2, A, B, BE, B96, C a CE. Individuální termíny, zkouška na Městském úřadě. Přijímáme i převody z jiných autoškol.",
    detail: "Kurzy od 5 199 Kč · AM až CE",
  },
  {
    title: "Vrácení řidičského průkazu",
    desc: "Přezkoušení z odborné způsobilosti po zákazu řízení, po dosažení 12 bodů nebo ze zdravotních důvodů. Zprostředkujeme dopravně psychologické vyšetření.",
    detail: "Zkouška 700 Kč · 3 scénáře",
  },
  {
    title: "Profesní školení CPC",
    desc: "Povinné pravidelné školení pro řidiče nákladních vozidel a autobusů. Každý rok 7 hodin, za 5 let 35 hodin v celku. Platné pro skupiny C, CE, D, DE.",
    detail: "2026: 4 termíny · Dobruška",
  },
  {
    title: "Referentské a kondiční jízdy",
    desc: "Zákonné školení zaměstnanců řídících firemní vozidla. Kondiční výcvik pro řidiče, kteří delší dobu neřídili. Přijíždíme i k vám do firmy.",
    detail: "169–194 Kč / os. · U vás nebo u nás",
  },
];

const RETURN_SCENARIOS = [
  {
    title: "Zákaz řízení",
    desc: "Přezkoušení poté, co uplynul více než 1 rok od právní moci rozsudku. Doložte rozsudek soudu nebo správní rozhodnutí a výpis z karty řidiče.",
    fee: "Zkouška MÚ: 700 Kč",
  },
  {
    title: "12 bodů",
    desc: "Přezkoušení po uplynutí 1 roku od pozbytí řidičského oprávnění. Cvičné jízdy lze zahájit den po skončení zákazu.",
    fee: "Zkouška MÚ: 700 Kč",
  },
  {
    title: "Zdravotní důvody",
    desc: "Přezkoušení po 3 letech od odnětí ŘP ze zdravotních důvodů. Nutný aktuální lékařský posudek o zdravotní způsobilosti.",
    fee: "Zkouška MÚ: 700 Kč",
  },
];

const SCHEDULE_2026 = [
  { date: "Sobota 14. 3. 2026", time: "07:00", seats: "15 volných míst",   available: true },
  { date: "Sobota 18. 4. 2026", time: "07:00", seats: "25 volných míst",  available: true },
  { date: "Sobota 23. 5. 2026", time: "07:00", seats: "Bude upřesněno",    available: false },
  { date: "Sobota 3. 10. 2026", time: "07:00", seats: "Bude upřesněno",    available: false },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg text-ink font-sans">

      {/* ─── Navigation ──────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 h-[62px] bg-bg/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between gap-6">
          <a href="/" className="shrink-0">
            <span className="font-bold text-[1.05rem] tracking-tight text-ink">
              Autoškola POHL
            </span>
          </a>

          <div className="hidden md:flex items-center gap-7 text-[0.875rem] font-medium text-ink-2">
            {[
              ["#sluzby",  "Služby"],
              ["#cenik",   "Ceník"],
              ["#skoleni", "Školení"],
              ["#vraceni", "Vrácení ŘP"],
              ["#kontakt", "Kontakt"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="hover:text-accent transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </div>

          <a
            href="tel:+420602441636"
            className="hidden sm:flex items-center gap-2 bg-ink text-surface text-[0.8125rem] font-medium px-5 py-2.5 shrink-0 hover:bg-accent transition-colors duration-200"
          >
            <Phone size={13} strokeWidth={2.5} />
            +420 602 441 636
          </a>
        </div>
      </nav>

      {/* ─── Hero ────────────────────────────────────────────────────────────── */}
      <section className="pt-[62px] min-h-[calc(100svh-0px)] flex items-center">
        <div className="max-w-[1400px] mx-auto px-6 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-16 items-center">

            {/* Left: copy */}
            <div className="max-w-[680px]">
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-accent mb-6">
                Akreditované školící středisko řidičů PZ · Dobruška
              </p>
              <h1 className="text-[clamp(2.75rem,5.5vw,4.5rem)] font-bold leading-[1.04] tracking-tight mb-6">
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
                <a
                  href="#cenik"
                  className="bg-ink text-surface text-[0.8125rem] font-medium uppercase tracking-[0.06em] px-12 py-4 hover:bg-accent transition-colors duration-200"
                >
                  Zobrazit ceník
                </a>
                <a
                  href="tel:+420602441636"
                  className="text-[0.875rem] font-medium text-ink hover:text-accent transition-colors duration-200 flex items-center gap-1.5"
                >
                  Zavolat: +420 602 441 636
                  <ChevronRight size={14} />
                </a>
              </div>
            </div>

            {/* Right: price preview cards */}
            <div className="hidden lg:flex flex-col gap-2.5">
              {PRICE_PREVIEW.map((item) => (
                <div
                  key={item.label}
                  className="border border-border bg-surface px-5 py-4 flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="text-[0.875rem] font-semibold text-ink">{item.label}</div>
                    <div className="text-[0.75rem] text-ink-3 mt-0.5">{item.sub}</div>
                  </div>
                  <div className="text-[1.25rem] font-bold text-ink tabular-nums shrink-0">
                    {item.price}
                  </div>
                </div>
              ))}
              <a
                href="#cenik"
                className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-ink-3 hover:text-accent transition-colors duration-200 text-right pr-1 mt-1"
              >
                Všechny skupiny →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Services ────────────────────────────────────────────────────────── */}
      <section id="sluzby" className="py-20 border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-ink-3 mb-3">
            Co nabízíme
          </p>
          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold text-ink mb-12">
            Čtyři způsoby, jak vám pomůžeme
          </h2>

          {/* 2×2 grid — bordered tiles, no identical heights */}
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
        </div>
      </section>

      {/* ─── Pricing ─────────────────────────────────────────────────────────── */}
      <section id="cenik" className="py-20 bg-bg border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-ink-3 mb-3">
            Ceník výcviku
          </p>
          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold text-ink mb-3">
            Ceny bez skrytých poplatků
          </h2>
          <p className="text-[0.9375rem] text-ink-2 leading-[1.65] max-w-[500px] mb-12">
            Vyberte skupinu řidičského oprávnění. Zobrazíme přesnou cenu,
            rozsah výcviku a minimální věk.
          </p>

          <PricingAccordion />
        </div>
      </section>

      {/* ─── License Return ──────────────────────────────────────────────────── */}
      <section id="vraceni" className="py-20 border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-start">

            {/* Left: explanation */}
            <div>
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-ink-3 mb-3">
                Specializovaná služba
              </p>
              <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold text-ink mb-6">
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

            {/* Right: scenario cards */}
            <div className="flex flex-col gap-3">
              {RETURN_SCENARIOS.map((sc, i) => (
                <div
                  key={i}
                  className="border border-border bg-surface p-6 hover:border-accent/40 transition-colors duration-200"
                >
                  <h3 className="font-semibold text-ink mb-2">{sc.title}</h3>
                  <p className="text-[0.875rem] leading-[1.65] text-ink-2 mb-3">
                    {sc.desc}
                  </p>
                  <p className="text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-accent">
                    {sc.fee}
                  </p>
                </div>
              ))}

              {/* Fee legend */}
              <div className="border border-border bg-bg px-6 py-4 text-[0.8125rem] text-ink-3 leading-[1.65]">
                <strong className="font-medium text-ink-2">Poplatky za zkoušku (MÚ)</strong>
                <br />AM, A, B, BE: PPV 100 Kč + PJ 400 Kč
                <br />C, CE, D, DE, T: PPV 100 Kč + OÚV 200 Kč + PJ 500 Kč
                <br />
                <span className="text-[0.75rem]">Ceny bez DPH. Platné od 01.07.2006 dle §39a zákona č. 247/2000 Sb.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Professional Training ───────────────────────────────────────────── */}
      <section id="skoleni" className="py-20 bg-ink text-surface">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-start">

            {/* Left: info */}
            <div>
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-accent mb-3">
                Profesní školení CPC
              </p>
              <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold mb-6">
                Termíny 2026
              </h2>
              <p className="text-[1rem] leading-[1.65] text-surface/70 mb-5">
                Povinné každoroční školení pro řidiče skupin C, CE, D, DE.
                Každé školení trvá 7 hodin. Za 5 let musíte absolvovat všech
                35 hodin — pokud pátý rok promeškáte, jsou předchozí školení
                neplatná a musíte začít znovu.
              </p>
              <p className="text-[0.875rem] text-surface/60 leading-[1.7]">
                Místo konání: Komenského 687, Dobruška 518 01
              </p>
              <p className="text-[0.875rem] text-surface/60 mt-1">
                Přihlášení: autoskola.pohl@seznam.cz nebo +420 602 441 636
              </p>
              <p className="text-[0.8125rem] text-surface/40 mt-3">
                Online přihlašování dočasně nedostupné — kontaktujte nás e-mailem.
              </p>
            </div>

            {/* Right: schedule table + CTA */}
            <div>
              <div className="border border-surface/15">
                {SCHEDULE_2026.map((d, i) => (
                  <div
                    key={i}
                    className={[
                      "flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-6 py-4",
                      i < SCHEDULE_2026.length - 1 ? "border-b border-surface/10" : "",
                    ].join(" ")}
                  >
                    <div>
                      <div className="font-medium text-surface">{d.date}</div>
                      <div className="text-[0.8125rem] text-surface/50 mt-0.5">Začátek {d.time}</div>
                    </div>
                    <div
                      className={[
                        "text-[0.8125rem] font-medium",
                        d.available ? "text-accent" : "text-surface/40",
                      ].join(" ")}
                    >
                      {d.seats}
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="mailto:autoskola.pohl@seznam.cz?subject=P%C5%99ihl%C3%A1%C5%A1en%C3%AD%20na%20profesn%C3%AD%20%C5%A1kolen%C3%AD%20CPC%202026"
                className="mt-4 flex items-center justify-center gap-2 bg-accent text-surface text-[0.8125rem] font-medium uppercase tracking-[0.06em] px-8 py-4 hover:bg-accent-deep transition-colors duration-200"
              >
                <Mail size={14} strokeWidth={2.5} />
                Přihlásit se na školení
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Contact ─────────────────────────────────────────────────────────── */}
      <section id="kontakt" className="py-20 border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16">

            {/* Left: contact details */}
            <div>
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-ink-3 mb-3">
                Kontakt
              </p>
              <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold text-ink mb-10">
                Napište nebo zavolejte
              </h2>

              <div className="flex flex-col gap-7">
                <div className="flex gap-4 items-start">
                  <Phone size={15} className="text-accent mt-0.5 shrink-0" strokeWidth={2} />
                  <div>
                    <a
                      href="tel:+420602441636"
                      className="font-medium text-ink hover:text-accent transition-colors duration-200 block"
                    >
                      +420 602 441 636
                    </a>
                    <a
                      href="tel:+420607656937"
                      className="text-[0.875rem] text-ink-3 hover:text-accent transition-colors duration-200 mt-0.5 block"
                    >
                      +420 607 656 937
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Mail size={15} className="text-accent mt-0.5 shrink-0" strokeWidth={2} />
                  <a
                    href="mailto:autoskola.pohl@seznam.cz"
                    className="font-medium text-ink hover:text-accent transition-colors duration-200"
                  >
                    autoskola.pohl@seznam.cz
                  </a>
                </div>

                <div className="flex gap-4 items-start">
                  <MapPin size={15} className="text-accent mt-0.5 shrink-0" strokeWidth={2} />
                  <div>
                    <div className="font-medium text-ink">Komenského 687</div>
                    <div className="text-[0.875rem] text-ink-3 mt-0.5">518 01 Dobruška</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: action cards + company info */}
            <div className="flex flex-col gap-3">
              <a
                href="mailto:autoskola.pohl@seznam.cz"
                className="flex items-center justify-between border border-border bg-surface px-8 py-6 hover:border-accent hover:bg-bg transition-colors duration-200 group"
              >
                <div>
                  <div className="font-semibold text-ink">Napsat e-mail</div>
                  <div className="text-[0.8125rem] text-ink-3 mt-0.5">Odpovíme do 24 hodin</div>
                </div>
                <ChevronRight
                  size={18}
                  className="text-ink-3 group-hover:text-accent transition-colors duration-200"
                />
              </a>

              <a
                href="tel:+420602441636"
                className="flex items-center justify-between border border-border bg-surface px-8 py-6 hover:border-accent hover:bg-bg transition-colors duration-200 group"
              >
                <div>
                  <div className="font-semibold text-ink">Zavolat přímo</div>
                  <div className="text-[0.8125rem] text-ink-3 mt-0.5">Individuálně dle dohody</div>
                </div>
                <ChevronRight
                  size={18}
                  className="text-ink-3 group-hover:text-accent transition-colors duration-200"
                />
              </a>

              <div className="border border-border bg-surface px-8 py-6">
                <div className="font-semibold text-ink mb-2">Fakturační údaje</div>
                <div className="text-[0.8125rem] text-ink-3 leading-[1.85]">
                  Autoškola Pohl s.r.o.
                  <br />Dobré 42, 517 93
                  <br />IČ: 082 06 180 &nbsp;·&nbsp; DIČ: CZ082 06 180
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="py-8 border-t border-border bg-surface">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[0.8125rem] text-ink-3">
          <div>
            © {new Date().getFullYear()} Autoškola Pohl s.r.o. · Dobruška
          </div>
          <nav aria-label="Footer navigation" className="flex gap-6">
            {[
              ["#sluzby",  "Služby"],
              ["#cenik",   "Ceník"],
              ["#skoleni", "Školení"],
              ["#vraceni", "Vrácení ŘP"],
              ["#kontakt", "Kontakt"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="hover:text-ink transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </footer>

    </div>
  );
}
