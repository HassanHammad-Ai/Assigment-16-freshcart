import { api } from "@/lib/axios";
import { Category, ListResponse } from "@/lib/api-types";

export const categoriesApi = {
  getAll: () =>
    api.get<ListResponse<Category>>("/categories").then((res) => res.data),

  getById: (id: string) =>
    api.get<{ data: Category }>(`/categories/${id}`).then((res) => res.data.data),
};
