"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { cn } from "@/src/lib/cn";

const SKUPINA_OPTIONS = ["AM", "A", "B", "C", "E", "Kondiční jízda"] as const;

const initialState: ContactState = { success: false, errors: {} };

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <span role="alert" className="text-[0.75rem] text-red-600 mt-1">
      {message}
    </span>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
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

  if (state.success) {
    return (
      <div className="border border-border bg-surface p-8 md:p-10">
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-accent mb-3">
          Odesláno
        </p>
        <p className="text-[1.125rem] font-semibold text-ink mb-2">
          ✓ Děkujeme! Ozveme se co nejdříve.
        </p>
        <p className="text-[0.9375rem] text-ink-2 leading-[1.65]">
          Mezitím nás můžete kontaktovat telefonicky.
        </p>
      </div>
    );
  }

  const inputClass = cn(
    "border border-border bg-bg px-4 py-3 text-[0.9375rem] text-ink w-full",
    "placeholder:text-ink-3/60 focus:outline-none focus:border-accent",
    "transition-colors duration-200"
  );

  return (
    <form action={formAction} noValidate className="border border-border bg-surface p-8 md:p-10 flex flex-col gap-5">
      {/* Jméno + Telefon row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="jmeno" className="text-[0.8125rem] font-medium text-ink-2">
            Jméno a příjmení
          </label>
          <input
            id="jmeno"
            name="jmeno"
            type="text"
            required
            autoComplete="name"
            placeholder="Jan Novák"
            aria-describedby={state.errors.jmeno ? "err-jmeno" : undefined}
            className={inputClass}
          />
          <FieldError message={state.errors.jmeno} />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="telefon" className="text-[0.8125rem] font-medium text-ink-2">
            Telefon
          </label>
          <input
            id="telefon"
            name="telefon"
            type="tel"
            required
            autoComplete="tel"
            placeholder="602 441 636"
            aria-describedby={state.errors.telefon ? "err-telefon" : undefined}
            className={inputClass}
          />
          <FieldError message={state.errors.telefon} />
        </div>
      </div>

      {/* Skupina */}
      <div className="flex flex-col gap-1">
        <label htmlFor="skupina" className="text-[0.8125rem] font-medium text-ink-2">
          Zájem o skupinu
        </label>
        <select
          id="skupina"
          name="skupina"
          required
          defaultValue=""
          aria-describedby={state.errors.skupina ? "err-skupina" : undefined}
          className={cn(inputClass, "appearance-none")}
        >
          <option value="" disabled>
            Vyberte skupinu…
          </option>
          {SKUPINA_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <FieldError message={state.errors.skupina} />
      </div>

      {/* Zpráva */}
      <div className="flex flex-col gap-1">
        <label htmlFor="zprava" className="text-[0.8125rem] font-medium text-ink-2">
          Zpráva{" "}
          <span className="text-ink-3 font-normal">(volitelné)</span>
        </label>
        <textarea
          id="zprava"
          name="zprava"
          rows={4}
          placeholder="Dotaz, termín, specifické požadavky…"
          aria-describedby={state.errors.zprava ? "err-zprava" : undefined}
          className={cn(inputClass, "resize-none")}
        />
        <FieldError message={state.errors.zprava} />
      </div>

      {/* Root error */}
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
          "bg-ink text-surface text-[0.8125rem] font-medium uppercase tracking-[0.06em]",
          "px-10 py-4 hover:bg-accent hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] transition-all duration-200",
          "disabled:opacity-60 disabled:cursor-not-allowed"
        )}
      >
        {pending && <Spinner />}
        {pending ? "Odesílám…" : "Odeslat zprávu"}
      </button>
    </form>
  );
}
