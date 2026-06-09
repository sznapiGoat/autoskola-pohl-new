"use server";

import { redirect } from "next/navigation";
import { resend } from "@/src/lib/resend";
import { contactSchema } from "@/src/lib/schemas/contact";

export type ContactState = {
  errors: {
    jmeno?:   string;
    email?:   string;
    telefon?: string;
    skupina?: string;
    zprava?:  string;
    gdpr?:    string;
    root?:    string;
  };
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Honeypot: real users never see or fill this field. If it's populated,
  // silently accept (so the bot thinks it succeeded) without sending mail.
  if (String(formData.get("web") ?? "").trim() !== "") {
    redirect("/dekujeme");
  }

  const raw = {
    jmeno:   String(formData.get("jmeno")   ?? ""),
    email:   String(formData.get("email")   ?? ""),
    telefon: String(formData.get("telefon") ?? "").trim() || undefined,
    skupina: String(formData.get("skupina") ?? "").trim() || undefined,
    zprava:  String(formData.get("zprava")  ?? "").trim(),
    gdpr:    formData.get("gdpr") as string | null,
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof ContactState["errors"];
      if (field && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return { errors: fieldErrors };
  }

  const { jmeno, email, telefon, skupina, zprava } = parsed.data;

  const body = [
    `Jméno:    ${jmeno}`,
    `E-mail:   ${email}`,
    telefon ? `Telefon:  ${telefon}` : null,
    skupina ? `Skupina:  ${skupina}` : null,
    zprava  ? `\nZpráva:\n${zprava}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const { error } = await resend.emails.send({
      from:    "Autoškola POHL <onboarding@resend.dev>",
      to:      "autoskola.pohl@seznam.cz",
      replyTo: email,
      subject: `Nová poptávka — ${jmeno}`,
      text:    body,
    });

    if (error) {
      return {
        errors: { root: "Formulář se nepodařilo odeslat. Zavolejte nám prosím." },
      };
    }
  } catch {
    return {
      errors: { root: "Formulář se nepodařilo odeslat. Zavolejte nám prosím." },
    };
  }

  redirect("/dekujeme");
}
