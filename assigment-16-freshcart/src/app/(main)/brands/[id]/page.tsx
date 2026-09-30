import BrandDetailContent from "@/features/brands/components/BrandDetailContent";

export default async function BrandDetailPage({ params }: PageProps<"/brands/[id]">) {
  const { id } = await params;
  return <BrandDetailContent brandId={id} />;
}
