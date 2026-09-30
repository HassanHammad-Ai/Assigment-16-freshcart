import Link from "next/link";
import { IconMoodEmpty } from "@tabler/icons-react";

export default function EmptyState({
  title,
  description,
  actionHref,
  actionLabel,
  icon,
}: {
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <div className="size-20 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center mb-6">
        {icon ?? <IconMoodEmpty size={40} stroke={1.5} />}
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      {description && (
        <p className="text-gray-500 max-w-md mb-6">{description}</p>
      )}
      {actionHref && actionLabel && (
        <Link href={actionHref} className="btn bg-primary-600 text-white hover:bg-primary-700">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
