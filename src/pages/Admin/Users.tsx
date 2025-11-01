import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listUsers, getUserContact, updateUserContact } from "../../services/users";
import type { Contact, PaginatedResponse, User } from "../../types/api";

const Users = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const usersQuery = useQuery<PaginatedResponse<User>>({
    queryKey: ["admin", "users", page, pageSize, search],
    queryFn: () => listUsers({ page, pageSize, search }),
  });

  const selectedUser = useMemo(
    () => usersQuery.data?.items.find((user) => user.id === selectedUserId) ?? null,
    [selectedUserId, usersQuery.data]
  );

  const contactQuery = useQuery({
    queryKey: ["admin", "users", "contact", selectedUserId],
    queryFn: () => (selectedUserId ? getUserContact(selectedUserId) : Promise.resolve({} as Contact)),
    enabled: Boolean(selectedUserId),
  });

  const updateContactMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Contact }) =>
      updateUserContact(id, data),
  });

  const totalPages = usersQuery.data?.totalPages ?? 1;
  const users = usersQuery.data?.items ?? [];

  const handleSelectUser = (userId: string) => {
    setSelectedUserId(userId);
    setFeedback(null);
    setError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedUserId) return;
    setFeedback(null);
    setError(null);
    const formData = new FormData(event.currentTarget);
    const payload: Contact = {
      telefone: formData.get("telefone")?.toString() ?? undefined,
      cep: formData.get("cep")?.toString() ?? undefined,
      logradouro: formData.get("logradouro")?.toString() ?? undefined,
      numero: formData.get("numero")?.toString() ?? undefined,
      bairro: formData.get("bairro")?.toString() ?? undefined,
      cidade: formData.get("cidade")?.toString() ?? undefined,
      estado: formData.get("estado")?.toString() ?? undefined,
      complemento: formData.get("complemento")?.toString() ?? undefined,
    };

    try {
      await updateContactMutation.mutateAsync({ id: selectedUserId, data: payload });
      await queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      await queryClient.invalidateQueries({ queryKey: ["admin", "users", "contact", selectedUserId] });
      setFeedback("Contato atualizado com sucesso!");
    } catch (err) {
      console.error(err);
      setError("Não foi possível salvar o contato. Tente novamente.");
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
      <section className="flex flex-col gap-4">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-green-700">Usuários</h1>
            <p className="text-sm text-gray-500">
              Gerencie clientes e acompanhe os dados de contato cadastrado.
            </p>
          </div>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar por nome ou email"
            className="w-full rounded-full border border-green-200 px-4 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 md:max-w-xs"
          />
        </header>

        <div className="overflow-hidden rounded-xl border border-green-100 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-green-50 text-sm">
            <thead className="bg-green-50 text-left text-xs font-semibold uppercase tracking-wide text-green-700">
              <tr>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Perfil</th>
                <th className="px-4 py-3">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-green-50">
              {usersQuery.isLoading ? (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                    Carregando usuários...
                  </td>
                </tr>
              ) : users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-green-50/40">
                    <td className="px-4 py-3 font-medium text-gray-800">{user.nome}</td>
                    <td className="px-4 py-3 text-gray-600">{user.email}</td>
                    <td className="px-4 py-3 text-gray-600">{user.role}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleSelectUser(user.id)}
                        className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                          selectedUserId === user.id
                            ? "border-green-500 bg-green-600 text-white"
                            : "border-green-200 text-green-700 hover:border-green-300 hover:bg-green-50"
                        }`}
                      >
                        {selectedUserId === user.id ? "Selecionado" : "Selecionar"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                    Nenhum usuário encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
          <span>
            Página {page} de {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Anterior
            </button>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page >= totalPages}
              className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Próxima
            </button>
          </div>
        </footer>
      </section>

      <aside className="flex flex-col gap-4 rounded-xl border border-green-100 bg-white p-5 shadow-sm">
        <header>
          <h2 className="text-lg font-semibold text-green-700">Contato do usuário</h2>
          <p className="text-xs text-gray-500">
            Selecione um usuário para visualizar e atualizar os dados de contato.
          </p>
        </header>

        {feedback && (
          <div className="rounded-md border border-green-200 bg-green-50 px-4 py-2 text-xs text-green-700">
            {feedback}
          </div>
        )}
        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-xs text-red-600">
            {error}
          </div>
        )}

        {selectedUser ? (
          contactQuery.isLoading ? (
            <p className="text-sm text-gray-500">Carregando contato...</p>
          ) : (
            <form
              key={selectedUserId ?? ""}
              className="flex flex-col gap-3"
              onSubmit={handleSubmit}
            >
              <p className="text-sm font-medium text-gray-700">{selectedUser.nome}</p>
              <input type="hidden" name="userId" value={selectedUser.id} />
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600" htmlFor="telefone">
                  Telefone
                </label>
                <input
                  id="telefone"
                  name="telefone"
                  defaultValue={contactQuery.data?.telefone ?? ""}
                  className="rounded-md border border-green-200 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-600" htmlFor="cep">
                    CEP
                  </label>
                  <input
                    id="cep"
                    name="cep"
                    defaultValue={contactQuery.data?.cep ?? ""}
                    className="rounded-md border border-green-200 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-600" htmlFor="numero">
                    Número
                  </label>
                  <input
                    id="numero"
                    name="numero"
                    defaultValue={contactQuery.data?.numero ?? ""}
                    className="rounded-md border border-green-200 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600" htmlFor="logradouro">
                  Logradouro
                </label>
                <input
                  id="logradouro"
                  name="logradouro"
                  defaultValue={contactQuery.data?.logradouro ?? ""}
                  className="rounded-md border border-green-200 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-600" htmlFor="bairro">
                    Bairro
                  </label>
                  <input
                    id="bairro"
                    name="bairro"
                    defaultValue={contactQuery.data?.bairro ?? ""}
                    className="rounded-md border border-green-200 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-600" htmlFor="cidade">
                    Cidade
                  </label>
                  <input
                    id="cidade"
                    name="cidade"
                    defaultValue={contactQuery.data?.cidade ?? ""}
                    className="rounded-md border border-green-200 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600" htmlFor="estado">
                  Estado
                </label>
                <input
                  id="estado"
                  name="estado"
                  defaultValue={contactQuery.data?.estado ?? ""}
                  maxLength={2}
                  className="rounded-md border border-green-200 px-3 py-2 text-sm uppercase focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600" htmlFor="complemento">
                  Complemento
                </label>
                <input
                  id="complemento"
                  name="complemento"
                  defaultValue={contactQuery.data?.complemento ?? ""}
                  className="rounded-md border border-green-200 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                />
              </div>
              <button
                type="submit"
                className="mt-2 rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={updateContactMutation.isPending}
              >
                {updateContactMutation.isPending ? "Salvando..." : "Salvar contato"}
              </button>
            </form>
          )
        ) : (
          <p className="text-sm text-gray-500">
            Nenhum usuário selecionado. Escolha alguém na tabela para visualizar os
            dados de contato.
          </p>
        )}
      </aside>
    </div>
  );
};

export default Users;
