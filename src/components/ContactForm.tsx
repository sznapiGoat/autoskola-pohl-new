"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { cn } from "@/src/lib/cn";

const COURSE_OPTIONS = [
  "Skupina AM",
  "Skupina A1",
  "Skupina A2",
  "Skupina A",
  "Skupina B",
  "Skupina B96",
  "Skupina BE",
  "Skupina C",
  "Skupina CE",
  "Automat (sk. B)",
  "Profesní školení CPC",
  "Referentské školení",
  "Kondiční jízdy",
  "Vrácení řidičského průkazu",
] as const;

const initialState: ContactState = { errors: {} };

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <span id={id} role="alert" className="text-[0.75rem] text-red-600 mt-1 block">
      {message}
    </span>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962
           7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);

  const inputClass = cn(
    "border border-border bg-bg px-4 py-3 text-[0.9375rem] text-ink w-full",
    "placeholder:text-ink-3/60 focus:outline-none focus:border-accent",
    "transition-colors duration-200"
  );

  return (
    <form
      action={formAction}
      noValidate
      className="border border-border bg-surface p-8 md:p-10 flex flex-col gap-5"
    >
      {/* Honeypot — hidden from real users, catches bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor="web">Nechte prázdné</label>
        <input id="web" name="web" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Row 1: Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="jmeno" className="text-[0.8125rem] font-medium text-ink-2">
            Jméno a příjmení{" "}
            <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="jmeno"
            name="jmeno"
            type="text"
            autoComplete="name"
            placeholder="Jan Novák"
            aria-required="true"
            aria-describedby={state.errors.jmeno ? "err-jmeno" : undefined}
            className={cn(inputClass, state.errors.jmeno && "border-red-400")}
          />
          <FieldError id="err-jmeno" message={state.errors.jmeno} />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-[0.8125rem] font-medium text-ink-2">
            E-mail{" "}
            <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="jan.novak@email.cz"
            aria-required="true"
            aria-describedby={state.errors.email ? "err-email" : undefined}
            className={cn(inputClass, state.errors.email && "border-red-400")}
          />
          <FieldError id="err-email" message={state.errors.email} />
        </div>
      </div>

      {/* Row 2: Phone + Course */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="telefon" className="text-[0.8125rem] font-medium text-ink-2">
            Telefon{" "}
            <span className="text-[0.75rem] font-normal text-ink-3">(volitelné)</span>
          </label>
          <input
            id="telefon"
            name="telefon"
            type="tel"
            autoComplete="tel"
            placeholder="+420 602 441 636"
            aria-describedby={state.errors.telefon ? "err-telefon" : undefined}
            className={cn(inputClass, state.errors.telefon && "border-red-400")}
          />
          <FieldError id="err-telefon" message={state.errors.telefon} />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="skupina" className="text-[0.8125rem] font-medium text-ink-2">
            Zájem o skupinu{" "}
            <span className="text-[0.75rem] font-normal text-ink-3">(volitelné)</span>
          </label>
          <select
            id="skupina"
            name="skupina"
            defaultValue=""
            aria-describedby={state.errors.skupina ? "err-skupina" : undefined}
            className={cn(
              inputClass,
              "appearance-none cursor-pointer",
              state.errors.skupina && "border-red-400"
            )}
          >
            <option value="">Vyberte skupinu…</option>
            {COURSE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <FieldError id="err-skupina" message={state.errors.skupina} />
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1">
        <label htmlFor="zprava" className="text-[0.8125rem] font-medium text-ink-2">
          Zpráva / dotaz{" "}
          <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <textarea
          id="zprava"
          name="zprava"
          rows={5}
          placeholder="Dotaz, termín, specifické požadavky…"
          aria-required="true"
          aria-describedby={state.errors.zprava ? "err-zprava" : undefined}
          className={cn(inputClass, "resize-none", state.errors.zprava && "border-red-400")}
        />
        <FieldError id="err-zprava" message={state.errors.zprava} />
      </div>

      {/* GDPR consent */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="gdpr"
          className={cn(
            "flex items-start gap-3 cursor-pointer",
            state.errors.gdpr && "text-red-600"
          )}
        >
          <input
            type="checkbox"
            id="gdpr"
            name="gdpr"
            aria-required="true"
            aria-describedby={state.errors.gdpr ? "err-gdpr" : undefined}
            className="mt-0.5 w-4 h-4 shrink-0 cursor-pointer"
            style={{ accentColor: "oklch(36% 0.175 252)" }}
          />
          <span className="text-[0.8125rem] text-ink-2 leading-[1.6] select-none">
            Souhlasím se zpracováním osobních údajů dle zásad ochrany
            osobních údajů.
          </span>
        </label>
        <FieldError id="err-gdpr" message={state.errors.gdpr} />
      </div>

      {/* Root / network error */}
      {state.errors.root && (
        <p role="alert" className="text-[0.875rem] text-red-600">
          {state.errors.root}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className={cn(
          "inline-flex items-center justify-center gap-2 self-start",
          "bg-ink text-surface text-[0.8125rem] font-medium tracking-[0.04em]",
          "px-10 py-4 hover:bg-accent hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]",
          "transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        )}
      >
        {pending && <Spinner />}
        {pending ? "Odesílám…" : "Odeslat zprávu"}
      </button>
    </form>
  );
}
