export default function SectionTitle({
  title,
  accent,
  action,
}: {
  title: string;
  accent: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <span className="h-8 w-1.5 rounded-full bg-primary-600" />
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          {title} <span className="text-primary-600">{accent}</span>
        </h2>
      </div>
      {action}
    </div>
  );
}
