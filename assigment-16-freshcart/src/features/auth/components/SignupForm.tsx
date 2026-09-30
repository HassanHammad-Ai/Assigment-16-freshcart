"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconEye, IconEyeOff, IconLoader2, IconUserPlus } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  SignupFormValues,
  getPasswordStrength,
  signupSchema,
} from "../schemas/signup.schema";
import { useSignupMutation } from "../hooks/useAuthMutations";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "../store/auth.slice";
import { getApiErrorMessage } from "@/lib/axios";
import SocialButtons from "./SocialButtons";

const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";
const inputClass =
  "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all";

export default function SignupForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { mutate, isPending } = useSignupMutation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const password = watch("password") || "";
  const strength = getPasswordStrength(password);

  const onSubmit: SubmitHandler<SignupFormValues> = (values) => {
    mutate(
      {
        name: values.name,
        email: values.email,
        password: values.password,
        rePassword: values.rePassword,
        phone: values.phone,
      },
      {
        onSuccess: (data) => {
          dispatch(setCredentials({ user: data.user, token: data.token }));
          toast.success("Account created! Welcome to FreshCart.");
          router.push("/");
        },
        onError: (error) => {
          toast.error(getApiErrorMessage(error));
        },
      }
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Create Your Account</h2>
        <p className="text-gray-500 text-sm">Start your fresh journey with us today</p>
      </div>

      <SocialButtons verb="Sign up" />

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label htmlFor="name" className={labelClass}>Name*</label>
          <input type="text" className={inputClass} placeholder="Ali" id="name" {...register("name")} />
          {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>Email*</label>
          <input type="email" className={inputClass} placeholder="ali@example.com" id="email" {...register("email")} />
          {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password" className={labelClass}>Password*</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className={`${inputClass} pr-16`}
              placeholder="Create a strong password"
              autoComplete="new-password"
              id="password"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <IconEyeOff size={16} /> : <IconEye size={16} />}
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {password.length > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <div className="grow h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`${strength.colorClass} h-full transition-all duration-300`}
                  style={{ width: `${strength.percent}%` }}
                />
              </div>
              <span className="text-xs text-gray-500">{strength.label}</span>
            </div>
          )}
          <p className="text-xs text-gray-400 mt-1">Must be at least 6 characters</p>
          {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
        </div>

        <div>
          <label htmlFor="rePassword" className={labelClass}>Confirm Password*</label>
          <input
            type={showPassword ? "text" : "password"}
            className={inputClass}
            placeholder="Confirm your password"
            autoComplete="new-password"
            id="rePassword"
            {...register("rePassword")}
          />
          {errors.rePassword && <p className="text-sm text-red-600 mt-1">{errors.rePassword.message}</p>}
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>Phone Number*</label>
          <input type="tel" className={inputClass} placeholder="01012345678" id="phone" {...register("phone")} />
          {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <label htmlFor="terms" className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer">
            <input type="checkbox" id="terms" className="size-4 mt-0.5 accent-primary-600" {...register("terms")} />
            <span>
              I agree to the{" "}
              <Link href="/terms" className="text-primary-600 hover:underline">Terms of Service</Link>{" "}
              and{" "}
              <Link href="/privacy-policy" className="text-primary-600 hover:underline">Privacy Policy</Link> *
            </span>
          </label>
          {errors.terms && <p className="text-sm text-red-600 mt-1">{errors.terms.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary-600 py-3 font-semibold text-white shadow-lg shadow-primary-600/20 hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? <IconLoader2 className="animate-spin" size={18} /> : <IconUserPlus size={18} />}
          {isPending ? "Creating Account..." : "Create My Account"}
        </button>
      </form>

      <p className="border-t border-gray-100 mt-6 pt-5 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-primary-600 font-semibold hover:underline">Sign In</Link>
      </p>
    </div>
  );
}
