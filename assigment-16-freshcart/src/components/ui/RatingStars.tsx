import { IconStarFilled } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export default function RatingStars({
  rating,
  count,
  size = 16,
}: {
  rating: number;
  count?: number;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <IconStarFilled
            key={i}
            size={size}
            className={cn(i < Math.round(rating) ? "text-yellow-400" : "text-gray-200")}
          />
        ))}
      </div>
      <span className="text-sm text-gray-500">
        {rating.toFixed(1)}
        {typeof count === "number" ? ` (${count})` : ""}
      </span>
    </div>
  );
}
