"use server";

import { resend } from "@/src/lib/resend";
import { contactSchema } from "@/src/lib/schemas/contact";

export type ContactState = {
  success: boolean;
  errors: {
    jmeno?: string;
    telefon?: string;
    skupina?: string;
    zprava?: string;
    root?: string;
  };
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const raw = {
    jmeno: formData.get("jmeno"),
    telefon: formData.get("telefon"),
    skupina: formData.get("skupina"),
    zprava: formData.get("zprava") ?? "",
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
    return { success: false, errors: fieldErrors };
  }

  const { jmeno, telefon, skupina, zprava } = parsed.data;

  const body = [
    `Jméno:   ${jmeno}`,
    `Telefon: ${telefon}`,
    `Skupina: ${skupina}`,
    zprava ? `\nZpráva:\n${zprava}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const { error } = await resend.emails.send({
      from: "Autoškola POHL <onboarding@resend.dev>",
      to: "autoskola.pohl@seznam.cz",
      subject: `Nová poptávka — ${jmeno}`,
      text: body,
    });

    if (error) {
      return {
        success: false,
        errors: {
          root: "Formulář se nepodařilo odeslat. Zavolejte nám prosím.",
        },
      };
    }
  } catch {
    return {
      success: false,
      errors: {
        root: "Formulář se nepodařilo odeslat. Zavolejte nám prosím.",
      },
    };
  }

  return { success: true, errors: {} };
}
