"use client";

import { useActionState } from "react";
import { submitContact } from "@/app/actions/contact";
import { cn } from "@/src/lib/cn";

const GROUP_OPTIONS = [
  "Skupina B (osobní automobil)",
  "Skupiny A (motocykl)",
  "Skupiny BE / B96 (auto + přívěs)",
  "Skupiny C / CE (nákladní auto)",
  "Profesní školení CPC",
  "Vrácení řidičského průkazu",
  "Referentské školení",
  "Jiné",
] as const;

const initialState = { success: false, error: "" };

export default function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initialState);

  if (state.success) {
    return (
      <div className="border border-border bg-surface p-8 md:p-10">
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-accent mb-3">
          Odesláno
        </p>
        <h3 className="text-[1.25rem] font-semibold text-ink mb-2">
          Zpráva odeslána
        </h3>
        <p className="text-[0.9375rem] text-ink-2 leading-[1.65]">
          Ozveme se vám do 24 hodin. Mezitím nás můžete kontaktovat telefonicky.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="border border-border bg-surface p-8 md:p-10 flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-[0.8125rem] font-medium text-ink-2">
            Jméno a příjmení
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jan Novák"
            className={cn(
              "border border-border bg-bg px-4 py-3 text-[0.9375rem] text-ink",
              "placeholder:text-ink-3/60 focus:outline-none focus:border-accent",
              "transition-colors duration-200"
            )}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-[0.8125rem] font-medium text-ink-2">
            Telefon
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+420 600 000 000"
            className={cn(
              "border border-border bg-bg px-4 py-3 text-[0.9375rem] text-ink",
              "placeholder:text-ink-3/60 focus:outline-none focus:border-accent",
              "transition-colors duration-200"
            )}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="group" className="text-[0.8125rem] font-medium text-ink-2">
          Zájem o
        </label>
        <select
          id="group"
          name="group"
          required
          defaultValue=""
          className={cn(
            "border border-border bg-bg px-4 py-3 text-[0.9375rem] text-ink",
            "focus:outline-none focus:border-accent transition-colors duration-200",
            "appearance-none"
          )}
        >
          <option value="" disabled>Vyberte skupinu nebo službu…</option>
          {GROUP_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-[0.8125rem] font-medium text-ink-2">
          Zpráva <span className="text-ink-3 font-normal">(volitelné)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Dotaz, termín, specifické požadavky…"
          className={cn(
            "border border-border bg-bg px-4 py-3 text-[0.9375rem] text-ink resize-none",
            "placeholder:text-ink-3/60 focus:outline-none focus:border-accent",
            "transition-colors duration-200"
          )}
        />
      </div>

      {state.error && (
        <p className="text-[0.8125rem] text-red-600">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className={cn(
          "bg-ink text-surface text-[0.8125rem] font-medium uppercase tracking-[0.06em]",
          "px-10 py-4 hover:bg-accent transition-colors duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed self-start"
        )}
      >
        {pending ? "Odesílám…" : "Odeslat zprávu"}
      </button>
    </form>
  );
}
