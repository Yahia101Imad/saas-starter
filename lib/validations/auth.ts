import { z } from "zod";

// SIGN IN
export const signInSchema = z.object({
  email: z.email("Please enter a valid email address."),

  password: z.string().min(8, "Password must be at least 8 characters."),
});

export type SignInFormData = z.infer<typeof signInSchema>;

// SIGN UP
export const signUpSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters.").max(100),

    email: z.email("Please enter a valid email address."),

    password: z.string().min(8, "Password must be at least 8 characters."),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
