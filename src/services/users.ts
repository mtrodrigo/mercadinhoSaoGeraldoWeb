import api from "./api";
import type { Contact, PaginatedResponse, UpdateContactPayload, User } from "../types/api";

export async function listUsers(params: {
  page?: number;
  pageSize?: number;
  search?: string;
}): Promise<PaginatedResponse<User>> {
  const { data } = await api.get<PaginatedResponse<User>>("/api/admin/users", {
    params,
  });
  return data;
}

export async function getUserContact(id: string): Promise<Contact> {
  const { data } = await api.get<Contact>(`/api/admin/users/${id}/contact`);
  return data;
}

export async function updateUserContact(
  id: string,
  payload: UpdateContactPayload
): Promise<Contact> {
  const { data } = await api.put<Contact>(
    `/api/admin/users/${id}/contact`,
    payload
  );
  return data;
}
