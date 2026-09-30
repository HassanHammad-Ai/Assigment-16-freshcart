import ProductDetailContent from "@/features/products/components/ProductDetailContent";

export default async function ProductDetailPage({ params }: PageProps<"/product/[id]">) {
  const { id } = await params;
  return <ProductDetailContent productId={id} />;
}
