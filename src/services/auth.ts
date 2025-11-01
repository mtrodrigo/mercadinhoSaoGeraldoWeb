import api from "./api";
import type {
  Contact,
  LoginCredentials,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  UpdateContactPayload,
  UpdateProfilePayload,
  User,
} from "../types/api";

export async function login(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/api/auth/login", credentials);
  return data;
}

export async function register(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  const { data } = await api.post<RegisterResponse>(
    "/api/auth/register",
    payload
  );
  return data;
}

export async function getProfile(): Promise<User> {
  const { data } = await api.get<User>("/api/me");
  return data;
}

export async function updateProfile(
  payload: UpdateProfilePayload
): Promise<User> {
  const { data } = await api.put<User>("/api/me", payload);
  return data;
}

export async function getContact(): Promise<Contact> {
  const { data } = await api.get<Contact>("/api/me/contact");
  return data;
}

export async function updateContact(
  payload: UpdateContactPayload
): Promise<Contact> {
  const { data } = await api.put<Contact>("/api/me/contact", payload);
  return data;
}
