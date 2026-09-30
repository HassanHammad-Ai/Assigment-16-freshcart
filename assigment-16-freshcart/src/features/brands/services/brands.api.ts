import { api } from "@/lib/axios";
import { Brand, ListResponse } from "@/lib/api-types";

export const brandsApi = {
  getAll: () => api.get<ListResponse<Brand>>("/brands").then((res) => res.data),

  getById: (id: string) =>
    api.get<{ data: Brand }>(`/brands/${id}`).then((res) => res.data.data),
};
