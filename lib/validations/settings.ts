import { z } from "zod";

export const updateThemeSchema = z.object({
  theme: z.enum(["LIGHT", "DARK", "SYSTEM"]),
});

export type UpdateThemeFormData = z.infer<typeof updateThemeSchema>;
