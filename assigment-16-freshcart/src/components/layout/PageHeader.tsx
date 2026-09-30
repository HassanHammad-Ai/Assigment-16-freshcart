import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function PageHeader({
  icon,
  title,
  subtitle,
  variant = "green",
  breadcrumb,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  variant?: "green" | "purple";
  breadcrumb?: { label: string; href?: string }[];
}) {
  return (
    <div
      className={cn(
        "py-8",
        variant === "purple"
          ? "bg-gradient-to-r from-violet-600 to-fuchsia-500"
          : "bg-gradient-to-r from-primary-600 to-primary-500"
      )}
    >
      <div className="container text-white">
        {breadcrumb && (
          <nav className="flex items-center gap-1.5 text-sm text-white/80 mb-3">
            {breadcrumb.map((item, i) => (
              <span key={item.label} className="flex items-center gap-1.5">
                {i > 0 && <IconChevronRight size={14} />}
                {item.href ? (
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                ) : (
                  <span>{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <div className="flex items-center gap-3">
          <div className="size-11 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            {icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            {subtitle && <p className="text-white/80 text-sm">{subtitle}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
