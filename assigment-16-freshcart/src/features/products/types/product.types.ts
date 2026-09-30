import { Brand, Category, SubCategory } from "@/lib/api-types";

export interface Product {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  imageCover: string;
  images: string[];
  category: Category;
  subcategory: SubCategory[];
  brand: Brand;
  price: number;
  priceAfterDiscount?: number;
  quantity: number;
  sold: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  keyword?: string;
  sort?: string;
  category?: string;
  brand?: string;
  "price[gte]"?: number;
  "price[lte]"?: number;
}
