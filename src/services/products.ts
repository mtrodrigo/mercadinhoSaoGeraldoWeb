import api from "./api";
import type { PaginatedResponse, Product, ProductInput } from "../types/api";

export async function listProducts(params?: {
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<Product[] | PaginatedResponse<Product>> {
  const { data } = await api.get<Product[] | PaginatedResponse<Product>>(
    "/api/products",
    {
      params,
    }
  );
  return data;
}

export async function getProduct(id: string): Promise<Product> {
  const { data } = await api.get<Product>(`/api/products/${id}`);
  return data;
}

export async function createProduct(payload: ProductInput): Promise<Product> {
  const { data } = await api.post<Product>("/api/products", payload);
  return data;
}

export async function updateProduct(
  id: string,
  payload: ProductInput
): Promise<Product> {
  const { data } = await api.put<Product>(`/api/products/${id}`, payload);
  return data;
}

export async function deleteProduct(id: string): Promise<void> {
  await api.delete(`/api/products/${id}`);
}

export async function uploadProductImage(
  id: string,
  file: File
): Promise<void> {
  const formData = new FormData();
  formData.append("image", file);

  await api.post(`/api/products/${id}/image`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
