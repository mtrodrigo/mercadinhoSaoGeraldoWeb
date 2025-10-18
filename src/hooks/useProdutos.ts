import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import type { Produto } from "./types";

async function getProdutos(): Promise<Produto[]> {
  const response = await api.get("/api/products");
  return response.data;
}

export function useProdutos() {
  return useQuery({
    queryKey: ["produtos"],
    queryFn: getProdutos,
    staleTime: 1000 * 60 * 5,
  });
}
