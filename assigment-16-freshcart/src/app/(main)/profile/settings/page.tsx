"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  IconEye,
  IconEyeOff,
  IconInfoCircle,
  IconLoader2,
  IconLock,
  IconUser,
} from "@tabler/icons-react";
import {
  ChangePasswordFormValues,
  UpdateProfileFormValues,
  changePasswordSchema,
  updateProfileSchema,
} from "@/features/profile/schemas/profile.schema";
import { useChangePassword, useUpdateProfile } from "@/features/profile/hooks/useProfile";
import { useAuth } from "@/features/auth/hooks/useAuth";

const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";
const inputClass =
  "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100";

function Card({
  icon,
  iconClass,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode;
  iconClass: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center gap-3 mb-5">
        <span className={`size-10 rounded-xl flex items-center justify-center ${iconClass}`}>{icon}</span>
        <div>
          <h2 className="font-bold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function PasswordInput({
  id,
  placeholder,
  registration,
}: {
  id: string;
  placeholder: string;
  registration: React.InputHTMLAttributes<HTMLInputElement>;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <input
        id={id}
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        className={`${inputClass} pr-11`}
        {...registration}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        {visible ? <IconEyeOff size={18} /> : <IconEye size={18} />}
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const { user, userId } = useAuth();
  const updateProfile = useUpdateProfile();
  const changePassword = useChangePassword();

  const profileForm = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    values: { name: user?.name ?? "", email: user?.email ?? "", phone: "" },
  });

  const passwordForm = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  const pe = profileForm.formState.errors;
  const pwe = passwordForm.formState.errors;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
        <p className="text-sm text-gray-500">Update your profile information and change your password</p>
      </div>

      <Card
        icon={<IconUser size={20} />}
        iconClass="bg-primary-100 text-primary-600"
        title="Profile Information"
        subtitle="Update your personal details"
      >
        <form
          onSubmit={profileForm.handleSubmit((values) => updateProfile.mutate(values))}
          noValidate
          className="space-y-4"
        >
          <div>
            <label htmlFor="name" className={labelClass}>Full Name</label>
            <input id="name" className={inputClass} {...profileForm.register("name")} />
            {pe.name && <p className="text-sm text-red-600 mt-1">{pe.name.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>Email Address</label>
            <input id="email" type="email" className={inputClass} {...profileForm.register("email")} />
            {pe.email && <p className="text-sm text-red-600 mt-1">{pe.email.message}</p>}
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>Phone Number</label>
            <input id="phone" placeholder="01012345678" className={inputClass} {...profileForm.register("phone")} />
            {pe.phone && <p className="text-sm text-red-600 mt-1">{pe.phone.message}</p>}
          </div>
          <button
            type="submit"
            disabled={updateProfile.isPending}
            className="flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50"
          >
            {updateProfile.isPending && <IconLoader2 className="animate-spin" size={16} />}
            Save Changes
          </button>
        </form>
      </Card>

      <section className="bg-gray-50 rounded-2xl border border-gray-100 p-6">
        <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <IconInfoCircle size={18} className="text-gray-400" />
          Account Information
        </h2>
        <dl className="space-y-3 text-sm">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-gray-500">User ID</dt>
            <dd className="font-mono text-xs text-gray-700 break-all text-right">{userId ?? "-"}</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-gray-500">Role</dt>
            <dd className="text-xs font-semibold capitalize bg-primary-100 text-primary-700 rounded-full px-2.5 py-1">
              {user?.role ?? "user"}
            </dd>
          </div>
        </dl>
      </section>

      <Card
        icon={<IconLock size={20} />}
        iconClass="bg-orange-100 text-orange-600"
        title="Change Password"
        subtitle="Update your account password"
      >
        <form
          onSubmit={passwordForm.handleSubmit((values) =>
            changePassword.mutate(values, { onSuccess: () => passwordForm.reset() })
          )}
          noValidate
          className="space-y-4"
        >
          <div>
            <label htmlFor="currentPassword" className={labelClass}>Current Password</label>
            <PasswordInput
              id="currentPassword"
              placeholder="Enter your current password"
              registration={passwordForm.register("currentPassword")}
            />
            {pwe.currentPassword && <p className="text-sm text-red-600 mt-1">{pwe.currentPassword.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className={labelClass}>New Password</label>
            <PasswordInput
              id="password"
              placeholder="Enter your new password"
              registration={passwordForm.register("password")}
            />
            <p className="text-xs text-gray-400 mt-1">Must be at least 6 characters</p>
            {pwe.password && <p className="text-sm text-red-600 mt-1">{pwe.password.message}</p>}
          </div>
          <div>
            <label htmlFor="rePassword" className={labelClass}>Confirm New Password</label>
            <PasswordInput
              id="rePassword"
              placeholder="Confirm your new password"
              registration={passwordForm.register("rePassword")}
            />
            {pwe.rePassword && <p className="text-sm text-red-600 mt-1">{pwe.rePassword.message}</p>}
          </div>
          <button
            type="submit"
            disabled={changePassword.isPending}
            className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
          >
            {changePassword.isPending && <IconLoader2 className="animate-spin" size={16} />}
            Change Password
          </button>
        </form>
      </Card>
    </div>
  );
}
