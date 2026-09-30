"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  IconCheck,
  IconEye,
  IconEyeOff,
  IconKey,
  IconLoader2,
  IconLock,
  IconLockFilled,
  IconMail,
  IconMailCheck,
  IconShieldCheck,
} from "@tabler/icons-react";
import {
  ForgetPasswordFormValues,
  ResetPasswordFormValues,
  VerifyResetCodeFormValues,
  forgetPasswordSchema,
  resetPasswordSchema,
  verifyResetCodeSchema,
} from "../schemas/forget-password.schema";
import {
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useVerifyResetCodeMutation,
} from "../hooks/useAuthMutations";
import { getApiErrorMessage } from "@/lib/axios";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | 3;

const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";
const inputClass =
  "w-full py-3 pl-11 pr-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all";
const primaryBtn =
  "w-full flex items-center justify-center gap-2 rounded-xl bg-primary-600 py-3 font-semibold text-white shadow-lg shadow-primary-600/20 hover:bg-primary-700 transition-colors disabled:opacity-50";

function Stepper({ step }: { step: Step }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {[1, 2, 3].map((n, i) => (
        <div key={n} className="flex items-center gap-2">
          <span
            className={cn(
              "size-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors",
              n < step && "bg-primary-600 text-white",
              n === step && "bg-primary-600 text-white ring-4 ring-primary-100",
              n > step && "bg-gray-100 text-gray-400"
            )}
          >
            {n < step ? <IconCheck size={16} /> : n === step && n === 1 ? <IconMail size={15} /> : n === step && n === 2 ? <IconKey size={15} /> : n === step ? <IconLock size={15} /> : n}
          </span>
          {i < 2 && <span className={cn("h-0.5 w-10 rounded", n < step ? "bg-primary-600" : "bg-gray-200")} />}
        </div>
      ))}
    </div>
  );
}

function Hero() {
  return (
    <div className="hidden lg:flex flex-col items-center text-center">
      <div className="relative w-full max-w-md aspect-[4/3] rounded-3xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center overflow-hidden">
        <span className="absolute -top-10 -left-10 size-40 rounded-full bg-primary-200/50" />
        <span className="absolute -bottom-12 -right-8 size-48 rounded-full bg-primary-200/40" />
        <div className="relative size-28 rounded-3xl bg-white shadow-xl flex items-center justify-center">
          <IconLockFilled size={52} className="text-primary-600" />
        </div>
        <span className="absolute left-10 top-1/3 size-12 rounded-2xl bg-white shadow-lg flex items-center justify-center text-primary-500">
          <IconMail size={22} />
        </span>
        <span className="absolute right-10 top-1/2 size-12 rounded-2xl bg-white shadow-lg flex items-center justify-center text-primary-500">
          <IconShieldCheck size={22} />
        </span>
      </div>
      <h2 className="mt-8 text-2xl font-bold text-gray-900">Reset Your Password</h2>
      <p className="mt-2 text-gray-600 max-w-sm">
        Don&apos;t worry, it happens to the best of us. We&apos;ll help you get back into your account in no time.
      </p>
      <div className="mt-5 flex items-center gap-5 text-sm text-gray-500">
        <span className="flex items-center gap-1.5"><IconMailCheck size={16} className="text-primary-600" /> Email Verification</span>
        <span className="flex items-center gap-1.5"><IconShieldCheck size={16} className="text-primary-600" /> Stay Secure</span>
        <span className="flex items-center gap-1.5"><IconCheck size={16} className="text-primary-600" /> Get Back In</span>
      </div>
    </div>
  );
}

export default function PasswordRecovery() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const forgetMutation = useForgetPasswordMutation();
  const verifyMutation = useVerifyResetCodeMutation();
  const resetMutation = useResetPasswordMutation();

  const emailForm = useForm<ForgetPasswordFormValues>({ resolver: zodResolver(forgetPasswordSchema) });
  const codeForm = useForm<VerifyResetCodeFormValues>({ resolver: zodResolver(verifyResetCodeSchema) });
  const passwordForm = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    values: { email, newPassword: "", confirmPassword: "" },
  });

  const onSendCode: SubmitHandler<ForgetPasswordFormValues> = (values) => {
    forgetMutation.mutate(values, {
      onSuccess: () => {
        setEmail(values.email);
        toast.success("A reset code has been sent to your email.");
        setStep(2);
      },
      onError: (error) => toast.error(getApiErrorMessage(error)),
    });
  };

  const onResend = () => {
    forgetMutation.mutate(
      { email },
      {
        onSuccess: () => toast.success("A new code has been sent."),
        onError: (error) => toast.error(getApiErrorMessage(error)),
      }
    );
  };

  const onVerify: SubmitHandler<VerifyResetCodeFormValues> = (values) => {
    verifyMutation.mutate(values, {
      onSuccess: () => {
        toast.success("Code verified. Choose your new password.");
        setStep(3);
      },
      onError: (error) => toast.error(getApiErrorMessage(error)),
    });
  };

  const onReset: SubmitHandler<ResetPasswordFormValues> = (values) => {
    resetMutation.mutate(
      { email, newPassword: values.newPassword },
      {
        onSuccess: () => {
          toast.success("Password updated! Please sign in.");
          router.push("/login");
        },
        onError: (error) => toast.error(getApiErrorMessage(error)),
      }
    );
  };

  const titles: Record<Step, { title: string; subtitle: string }> = {
    1: { title: "Forgot Password?", subtitle: "No worries, we'll send you a reset code" },
    2: { title: "Check Your Email", subtitle: `Enter the 6-digit code sent to ${email}` },
    3: { title: "Create New Password", subtitle: "Your new password must be different from previous passwords" },
  };

  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full max-w-6xl mx-auto">
      <Hero />

      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
        <div className="text-center mb-5">
          <span className="text-2xl font-bold text-primary-600">
            Fresh<span className="text-gray-800">Cart</span>
          </span>
          <h1 className="text-xl font-bold text-gray-900 mt-3">{titles[step].title}</h1>
          <p className="text-sm text-gray-500 mt-1">{titles[step].subtitle}</p>
        </div>

        <Stepper step={step} />

        {step === 1 && (
          <form className="space-y-5" onSubmit={emailForm.handleSubmit(onSendCode)} noValidate>
            <div>
              <label htmlFor="email" className={labelClass}>Email Address</label>
              <div className="relative">
                <IconMail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input id="email" type="email" className={inputClass} placeholder="Enter your email address" {...emailForm.register("email")} />
              </div>
              {emailForm.formState.errors.email && (
                <p className="text-sm text-red-600 mt-1">{emailForm.formState.errors.email.message}</p>
              )}
            </div>
            <button type="submit" disabled={forgetMutation.isPending} className={primaryBtn}>
              {forgetMutation.isPending && <IconLoader2 className="animate-spin" size={18} />}
              {forgetMutation.isPending ? "Sending..." : "Send Reset Code"}
            </button>
            <p className="text-center text-sm">
              <Link href="/login" className="text-primary-600 hover:underline">← Back to Sign In</Link>
            </p>
            <p className="border-t border-gray-100 pt-4 text-center text-sm text-gray-600">
              Remember your password?{" "}
              <Link href="/login" className="text-primary-600 font-semibold hover:underline">Sign In</Link>
            </p>
          </form>
        )}

        {step === 2 && (
          <form className="space-y-5" onSubmit={codeForm.handleSubmit(onVerify)} noValidate>
            <div>
              <label htmlFor="resetCode" className={labelClass}>Verification Code</label>
              <div className="relative">
                <IconKey size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="resetCode"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="••••••"
                  className={`${inputClass} tracking-[0.5em] text-center text-lg`}
                  {...codeForm.register("resetCode")}
                />
              </div>
              {codeForm.formState.errors.resetCode && (
                <p className="text-sm text-red-600 mt-1">{codeForm.formState.errors.resetCode.message}</p>
              )}
            </div>
            <button type="submit" disabled={verifyMutation.isPending} className={primaryBtn}>
              {verifyMutation.isPending && <IconLoader2 className="animate-spin" size={18} />}
              {verifyMutation.isPending ? "Verifying..." : "Verify Code"}
            </button>
            <p className="text-center text-sm text-gray-600">
              Didn&apos;t receive the code?{" "}
              <button
                type="button"
                onClick={onResend}
                disabled={forgetMutation.isPending}
                className="text-primary-600 font-semibold hover:underline disabled:opacity-50"
              >
                Resend Code
              </button>
            </p>
            <p className="text-center text-sm">
              <button type="button" onClick={() => setStep(1)} className="text-primary-600 hover:underline">
                ← Change email address
              </button>
            </p>
          </form>
        )}

        {step === 3 && (
          <form className="space-y-5" onSubmit={passwordForm.handleSubmit(onReset)} noValidate>
            {(
              [
                ["newPassword", "New Password", "Enter new password"],
                ["confirmPassword", "Confirm Password", "Confirm new password"],
              ] as const
            ).map(([field, label, placeholder]) => (
              <div key={field}>
                <label htmlFor={field} className={labelClass}>{label}</label>
                <div className="relative">
                  <IconLockFilled size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    id={field}
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    className={`${inputClass} pr-11`}
                    {...passwordForm.register(field)}
                  />
                  {field === "newPassword" && (
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                    </button>
                  )}
                </div>
                {passwordForm.formState.errors[field] && (
                  <p className="text-sm text-red-600 mt-1">{passwordForm.formState.errors[field]?.message}</p>
                )}
              </div>
            ))}
            <button type="submit" disabled={resetMutation.isPending} className={primaryBtn}>
              {resetMutation.isPending && <IconLoader2 className="animate-spin" size={18} />}
              {resetMutation.isPending ? "Updating..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
