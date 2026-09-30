import { redirect } from "next/navigation";

// The Figma design has no separate "overview" screen under My Account --
// it opens straight into Settings, with Addresses as the other tab.
export default function ProfileIndexPage() {
  redirect("/profile/settings");
}
