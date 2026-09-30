"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconEye,
  IconEyeOff,
  IconLockFilled,
  IconLoader2,
  IconMail,
  IconStarFilled,
  IconUsers,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { LoginFormValues, loginSchema } from "../schemas/login.schema";
import { useLoginMutation } from "../hooks/useAuthMutations";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "../store/auth.slice";
import { getApiErrorMessage } from "@/lib/axios";
import SocialButtons from "./SocialButtons";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { mutate, isPending } = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormValues> = (values) => {
    mutate(values, {
      onSuccess: (data) => {
        dispatch(setCredentials({ user: data.user, token: data.token }));
        toast.success(`Welcome back, ${data.user.name}!`);
        const redirect = searchParams.get("redirect");
        router.push(redirect || "/");
      },
      onError: (error) => {
        toast.error(getApiErrorMessage(error));
      },
    });
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <span className="text-3xl font-bold text-primary-600">
              Fresh<span className="text-gray-800">Cart</span>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome Back!
          </h1>
          <p className="text-gray-600">
            Sign in to continue your fresh shopping experience
          </p>
        </div>

        <SocialButtons />

        {/* Login Form */}
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                placeholder="Enter your email"
                id="email"
                {...register("email")}
              />
              <IconMail
                stroke={2}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <Link
                href="/forget-password"
                className="text-sm text-primary-600 hover:text-primary-700 cursor-pointer font-medium"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full px-4 py-3 pl-12 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                placeholder="Enter your password"
                {...register("password")}
              />
              <IconLockFilled className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <IconEyeOff stroke={2} /> : <IconEye stroke={2} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input type="checkbox" className="size-4 accent-primary-600" defaultChecked />
            Keep me signed in
          </label>

          <button
            type="submit"
            disabled={isPending}
            className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white py-3 px-4 rounded-xl hover:bg-primary-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending && <IconLoader2 className="animate-spin" size={20} />}
            {isPending ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t border-gray-100">
          <p className="text-gray-600">
            New to FreshCart?
            <Link
              href="/signup"
              className="text-primary-600 hover:text-primary-700 ms-2 font-semibold cursor-pointer"
            >
              Create an account
            </Link>
          </p>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center justify-center space-x-6 mt-6 text-xs text-gray-500">
          <div className="flex items-center">
            <IconLockFilled className="mr-1" />
            SSL Secured
          </div>
          <div className="flex items-center">
            <IconUsers stroke={2} className="mr-1" />
            50K+ Users
          </div>
          <div className="flex items-center">
            <IconStarFilled className="mr-1" />
            4.9 Rating
          </div>
        </div>
      </div>
    </div>
  );
}
