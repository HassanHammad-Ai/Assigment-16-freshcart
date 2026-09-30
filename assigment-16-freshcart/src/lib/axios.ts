import axios, { AxiosInstance } from "axios";
import { API_BASE_URL, API_BASE_URL_V2, AUTH_TOKEN_KEY } from "./constants";

// The Route e-commerce API expects the JWT on a plain `token` header
// (not `Authorization: Bearer ...`). Shared by every instance below.
function attachAuthInterceptor(instance: AxiosInstance) {
  instance.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem(AUTH_TOKEN_KEY);
      if (token) {
        config.headers.token = token;
      }
    }
    return config;
  });
  return instance;
}

// Most endpoints (auth, products, categories, brands, wishlist, addresses,
// orders) live under /api/v1.
export const api = attachAuthInterceptor(
  axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
  })
);

// Cart endpoints have a newer /api/v2 revision (see the "Cart (v2)" folder
// in the Postman collection) -- use this instance for all cart calls.
export const apiV2 = attachAuthInterceptor(
  axios.create({
    baseURL: API_BASE_URL_V2,
    headers: { "Content-Type": "application/json" },
  })
);

export interface ApiErrorShape {
  statusMsg?: string;
  message?: string;
  errors?: { msg?: string }[] | Record<string, unknown>;
}

/** Extracts a human-readable message from an Axios error thrown by the API. */
export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ApiErrorShape | undefined;
    if (data?.message) return data.message;
    if (error.message) return error.message;
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong. Please try again.";
}
