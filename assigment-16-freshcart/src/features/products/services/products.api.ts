import { api } from "@/lib/axios";
import { ListResponse } from "@/lib/api-types";
import { Product, ProductQueryParams } from "../types/product.types";

export const productsApi = {
  getAll: (params?: ProductQueryParams) =>
    api
      .get<ListResponse<Product>>("/products", { params })
      .then((res) => res.data),

  getById: (id: string) =>
    api.get<{ data: Product }>(`/products/${id}`).then((res) => res.data.data),
};
