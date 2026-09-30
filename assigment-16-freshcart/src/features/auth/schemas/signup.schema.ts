import { z } from "zod";

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be at most 20 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    rePassword: z.string().min(1, "Please confirm your password"),
    phone: z
      .string()
      .regex(
        /^01[0125][0-9]{8}$/,
        "Enter a valid Egyptian phone number, e.g. 01012345678"
      ),
    terms: z.literal(true, {
      message: "You must agree to the Terms of Service and Privacy Policy",
    }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export type SignupFormValues = z.infer<typeof signupSchema>;

/** Simple visual password-strength meter shared by the signup form. */
export function getPasswordStrength(password: string): {
  label: "Weak" | "Fair" | "Good" | "Strong";
  percent: number;
  colorClass: string;
} {
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) score++;

  const levels = [
    { label: "Weak" as const, percent: 25, colorClass: "bg-red-500" },
    { label: "Fair" as const, percent: 50, colorClass: "bg-orange-500" },
    { label: "Good" as const, percent: 75, colorClass: "bg-yellow-500" },
    { label: "Strong" as const, percent: 100, colorClass: "bg-primary-600" },
  ];

  return levels[Math.min(score, levels.length - 1)];
}
