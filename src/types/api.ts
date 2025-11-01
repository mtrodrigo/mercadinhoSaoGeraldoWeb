export type Role = "Admin" | "Client" | "Employee" | "User";

export type User = {
  id: string;
  nome: string;
  email: string;
  role: Role;
  cpf?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Contact = {
  telefone?: string;
  cep?: string;
  logradouro?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  complemento?: string;
};

export type Product = {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  imagemUrl?: string;
  categoria?: string;
  criadoEm?: string;
  atualizadoEm?: string;
};

export type ProductInput = {
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  categoria?: string;
};

export type OrderItem = {
  produtoId: string;
  produtoNome: string;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
  imagemUrl?: string;
};

export type Order = {
  id: string;
  status: string;
  total: number;
  criadoEm: string;
  atualizadoEm?: string;
  itens: OrderItem[];
  cliente?: Pick<User, "id" | "nome" | "email">;
};

export type CreateOrderItemInput = {
  produtoId: string;
  quantidade: number;
};

export type CreateOrderInput = {
  itens: CreateOrderItemInput[];
};

export type PaginatedResponse<T> = {
  items: T[];
  totalItems: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  nome: string;
  email: string;
  password: string;
  cpf: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
  user: User;
};

export type RegisterResponse = {
  user: User;
  accessToken?: string;
  refreshToken?: string;
};

export type UpdateProfilePayload = {
  nome: string;
  cpf?: string;
};

export type UpdateContactPayload = Contact;
