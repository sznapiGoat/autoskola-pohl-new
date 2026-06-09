import { z } from "zod";

export const contactSchema = z.object({
  jmeno: z
    .string()
    .min(2, "Zadejte celé jméno")
    .max(100, "Jméno je příliš dlouhé"),
  email: z
    .string()
    .min(1, "E-mail je povinný")
    .email("Zadejte platný e-mail"),
  telefon: z
    .string()
    .regex(
      /^(\+420\s?)?[0-9]{3}\s?[0-9]{3}\s?[0-9]{3}$/,
      "Zadejte platné české číslo (např. 602 441 636)"
    )
    .optional(),
  skupina: z
    .string()
    .max(100, "Neplatná hodnota")
    .optional(),
  zprava: z
    .string()
    .min(1, "Zpráva je povinná")
    .max(2000, "Zpráva je příliš dlouhá"),
  gdpr: z.literal("on", { message: "Souhlas se zpracováním údajů je povinný" }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
