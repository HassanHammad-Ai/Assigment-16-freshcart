import { IconLoader2 } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export default function Spinner({
  className,
  size = 32,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div className={cn("flex items-center justify-center py-10", className)}>
      <IconLoader2 size={size} className="animate-spin text-primary-600" />
    </div>
  );
}
