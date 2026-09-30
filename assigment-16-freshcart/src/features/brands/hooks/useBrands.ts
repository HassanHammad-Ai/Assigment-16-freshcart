import { useQuery } from "@tanstack/react-query";
import { brandsApi } from "../services/brands.api";

export function useBrands() {
  return useQuery({
    queryKey: ["brands"],
    queryFn: () => brandsApi.getAll(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useBrand(id: string) {
  return useQuery({
    queryKey: ["brand", id],
    queryFn: () => brandsApi.getById(id),
    enabled: Boolean(id),
  });
}
