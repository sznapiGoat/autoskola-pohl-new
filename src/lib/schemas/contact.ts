import { z } from "zod";

export const contactSchema = z.object({
  jmeno: z
    .string()
    .min(2, "Zadejte celé jméno")
    .max(100, "Jméno je příliš dlouhé"),
  telefon: z
    .string()
    .regex(
      /^(\+420\s?)?[0-9]{3}\s?[0-9]{3}\s?[0-9]{3}$/,
      "Zadejte platné české číslo (např. 602 441 636)"
    ),
  skupina: z.enum(["AM", "A", "B", "C", "E", "Kondiční jízda"], {
    message: "Vyberte skupinu nebo typ jízdy",
  }),
  zprava: z.string().max(2000, "Zpráva je příliš dlouhá").optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
