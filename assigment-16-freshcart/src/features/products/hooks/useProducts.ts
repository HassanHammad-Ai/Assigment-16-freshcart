import { useQuery } from "@tanstack/react-query";
import { productsApi } from "../services/products.api";
import { ProductQueryParams } from "../types/product.types";

export function useProducts(params?: ProductQueryParams) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => productsApi.getAll(params),
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productsApi.getById(id),
    enabled: Boolean(id),
  });
}
