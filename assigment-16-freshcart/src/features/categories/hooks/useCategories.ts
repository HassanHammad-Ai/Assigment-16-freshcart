import { useQuery } from "@tanstack/react-query";
import { categoriesApi } from "../services/categories.api";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => categoriesApi.getAll(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCategory(id: string) {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => categoriesApi.getById(id),
    enabled: Boolean(id),
  });
}
