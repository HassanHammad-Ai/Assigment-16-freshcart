import { redirect } from "next/navigation";

// The reset flow (email -> code -> new password) now lives in a single
// three-step screen at /forget-password, matching the Figma designs.
export default function ResetPasswordPage() {
  redirect("/forget-password");
}
