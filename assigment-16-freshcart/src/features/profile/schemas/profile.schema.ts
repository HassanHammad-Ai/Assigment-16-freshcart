import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),
});
export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    rePassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
