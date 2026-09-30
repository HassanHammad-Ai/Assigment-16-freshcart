import type { Metadata } from "next";
import PasswordRecovery from "@/features/auth/components/PasswordRecovery";

export const metadata: Metadata = { title: "Forgot Password" };

export default function ForgetPasswordPage() {
  return <PasswordRecovery />;
}
