import { z } from "zod";

export const forgetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});
export type ForgetPasswordFormValues = z.infer<typeof forgetPasswordSchema>;

export const verifyResetCodeSchema = z.object({
  resetCode: z
    .string()
    .min(1, "Reset code is required")
    .length(6, "The reset code is 6 digits"),
});
export type VerifyResetCodeFormValues = z.infer<typeof verifyResetCodeSchema>;

export const resetPasswordSchema = z
  .object({
    email: z.string().email(),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
