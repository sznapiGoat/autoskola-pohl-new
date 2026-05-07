"use server";

import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Zadejte celé jméno").max(100),
  phone: z
    .string()
    .min(9, "Zadejte platné telefonní číslo")
    .max(20)
    .regex(/^[+\d\s\-()]+$/, "Neplatný formát telefonu"),
  group: z.string().min(1, "Vyberte skupinu"),
  message: z.string().max(2000).optional(),
});

export interface ContactState {
  success: boolean;
  error: string;
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const raw = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    group: formData.get("group"),
    message: formData.get("message") ?? "",
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return { success: false, error: first?.message ?? "Neplatná data" };
  }

  const { name, phone, group, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      success: false,
      error: "Odesílání e-mailů není nakonfigurováno. Kontaktujte nás telefonicky.",
    };
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  const body = [
    `Jméno: ${name}`,
    `Telefon: ${phone}`,
    `Zájem: ${group}`,
    message ? `\nZpráva:\n${message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const { error } = await resend.emails.send({
    from: "web@autoskola-pohl.cz",
    to: "autoskola.pohl@seznam.cz",
    replyTo: undefined,
    subject: `Nová poptávka — ${group}`,
    text: body,
  });

  if (error) {
    return { success: false, error: "Zprávu se nepodařilo odeslat. Zkuste to prosím znovu." };
  }

  return { success: true, error: "" };
}
