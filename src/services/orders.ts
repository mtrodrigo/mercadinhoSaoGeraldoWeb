import api from "./api";
import type {
  CreateOrderInput,
  Order,
  PaginatedResponse,
} from "../types/api";

export async function createOrder(payload: CreateOrderInput): Promise<Order> {
  const { data } = await api.post<Order>("/api/orders", payload);
  return data;
}

export async function listMyOrders(): Promise<Order[]> {
  const { data } = await api.get<Order[]>("/api/orders/mine");
  return data;
}

export async function listOrders(params: {
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResponse<Order>> {
  const { data } = await api.get<PaginatedResponse<Order>>("/api/orders", {
    params,
  });
  return data;
}
