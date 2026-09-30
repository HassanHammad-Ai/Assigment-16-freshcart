"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconChevronRight, IconMapPin, IconSettings, IconUserCircle } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import PageHeader from "@/components/layout/PageHeader";

const links = [
  { href: "/profile/addresses", label: "My Addresses", icon: IconMapPin },
  { href: "/profile/settings", label: "Settings", icon: IconSettings },
];

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div>
      <PageHeader
        icon={<IconUserCircle size={22} />}
        title="My Account"
        subtitle="Manage your addresses and account settings"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "My Account" }]}
      />

      <div className="bg-gray-50/60">
      <div className="container py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 h-fit">
            <h2 className="font-semibold text-gray-800 px-3 py-2">My Account</h2>
            <nav className="space-y-1">
              {links.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    pathname === href
                      ? "bg-primary-50 text-primary-700"
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <Icon size={18} />
                    {label}
                  </span>
                  <IconChevronRight size={16} className="text-gray-300" />
                </Link>
              ))}
            </nav>
          </aside>

          <div className="lg:col-span-3">{children}</div>
        </div>
      </div>
      </div>
    </div>
  );
}
