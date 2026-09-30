import { api } from "@/lib/axios";
import { Address, AddressListResponse, AddressPayload } from "../types/address.types";

export const addressesApi = {
  getAll: () =>
    api.get<AddressListResponse>("/addresses").then((res) => res.data),

  add: (payload: AddressPayload) =>
    api
      .post<{ status: string; data: Address[] }>("/addresses", payload)
      .then((res) => res.data),

  remove: (id: string) =>
    api
      .delete<{ status: string; message: string; data: Address[] }>(
        `/addresses/${id}`
      )
      .then((res) => res.data),
};
