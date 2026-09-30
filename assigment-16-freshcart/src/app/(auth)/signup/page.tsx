import type { Metadata } from "next";
import SignupForm from "@/features/auth/components/SignupForm";
import SignupHero from "@/features/auth/components/SignupHero";

export const metadata: Metadata = { title: "Create Account" };

export default function SignupPage() {
  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start w-full max-w-6xl mx-auto">
      <SignupHero />
      <SignupForm />
    </div>
  );
}
