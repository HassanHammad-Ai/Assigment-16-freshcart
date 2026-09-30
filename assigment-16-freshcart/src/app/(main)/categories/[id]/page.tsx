import CategoryDetailContent from "@/features/categories/components/CategoryDetailContent";

export default async function CategoryDetailPage({ params }: PageProps<"/categories/[id]">) {
  const { id } = await params;
  return <CategoryDetailContent categoryId={id} />;
}
