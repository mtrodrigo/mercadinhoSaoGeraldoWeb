import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import type { PaginatedResponse, Product } from "../types/api";

async function getProdutos(busca?: string): Promise<Product[]> {
  const { data } = await api.get<Product[] | PaginatedResponse<Product>>(
    "/api/products",
    {
      params: busca ? { search: busca } : undefined,
    }
  );

  if (Array.isArray(data)) {
    return data;
  }

  return data.items;
}

export function useProdutos(busca?: string) {
  return useQuery({
    queryKey: ["produtos", busca ?? "todas"],
    queryFn: () => getProdutos(busca),
    staleTime: 1000 * 60 * 5,
  });
}
