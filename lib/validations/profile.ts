import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

export const changeEmailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type ChangeEmailFormData = z.infer<typeof changeEmailSchema>;
