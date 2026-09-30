import type { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "@/features/auth/components/LoginForm";
import LoginHero from "@/features/auth/components/LoginHero";

export const metadata: Metadata = { title: "Sign In" };

export default function LoginPage() {
  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full max-w-6xl mx-auto">
      <LoginHero />
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
