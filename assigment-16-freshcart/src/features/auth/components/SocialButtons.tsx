"use client";

import { IconBrandFacebookFilled, IconBrandGoogleFilled } from "@tabler/icons-react";
import { toast } from "sonner";

// The Route API only supports email/password sign-in, so the Google and
// Facebook buttons from the design are visual only for now.
export default function SocialButtons({ verb = "Continue" }: { verb?: string }) {
  const notAvailable = (provider: string) => () =>
    toast.info(`${provider} sign-in isn't available yet. Please use your email.`);

  return (
    <>
      <div className="space-y-3">
        <button
          type="button"
          onClick={notAvailable("Google")}
          className="w-full flex items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <IconBrandGoogleFilled size={18} className="text-red-500" />
          {verb} with Google
        </button>
        <button
          type="button"
          onClick={notAvailable("Facebook")}
          className="w-full flex items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <IconBrandFacebookFilled size={18} className="text-blue-600" />
          {verb} with Facebook
        </button>
      </div>

      <div className="flex items-center gap-4 my-6">
        <span className="h-px flex-1 bg-gray-200" />
        <span className="text-xs font-medium tracking-wider text-gray-400 uppercase">
          or continue with email
        </span>
        <span className="h-px flex-1 bg-gray-200" />
      </div>
    </>
  );
}
