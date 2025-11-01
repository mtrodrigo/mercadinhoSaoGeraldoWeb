import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { listOrders } from "../../services/orders";
import type { Order, PaginatedResponse } from "../../types/api";

const statusColors: Record<string, string> = {
  Pendente: "bg-yellow-100 text-yellow-700",
  Processando: "bg-blue-100 text-blue-700",
  Concluido: "bg-green-100 text-green-700",
  Cancelado: "bg-red-100 text-red-700",
};

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const Orders = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const { data, isLoading, isError, refetch, isFetching } = useQuery<
    PaginatedResponse<Order>
  >({
    queryKey: ["admin", "orders", page, pageSize],
    queryFn: () => listOrders({ page, pageSize }),
  });

  const totalPages = data?.totalPages ?? 1;
  const orders = data?.items ?? [];

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-green-700">Pedidos</h1>
          <p className="text-sm text-gray-500">
            Consulte os pedidos realizados e acompanhe os detalhes de cada um.
          </p>
        </div>
        <button
          onClick={() => refetch()}
          className="rounded-full border border-green-200 px-4 py-2 text-sm font-medium text-green-700 transition hover:border-green-300 hover:bg-green-50"
          disabled={isFetching}
        >
          {isFetching ? "Atualizando..." : "Atualizar"}
        </button>
      </header>

      <div className="overflow-hidden rounded-xl border border-green-100 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-green-50 text-sm">
          <thead className="bg-green-50 text-left text-xs font-semibold uppercase tracking-wide text-green-700">
            <tr>
              <th className="px-4 py-3">Pedido</th>
              <th className="px-4 py-3">Cliente</th>
              <th className="px-4 py-3">Data</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-green-50">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                  Carregando pedidos...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-red-600">
                  Não foi possível carregar os pedidos.
                </td>
              </tr>
            ) : orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id} className="align-top">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-gray-800">
                      #{order.id.slice(0, 8)}
                    </div>
                    <ul className="mt-2 space-y-1 text-xs text-gray-500">
                      {order.itens.map((item) => (
                        <li key={`${order.id}-${item.produtoId}`}>
                          {item.quantidade}x {item.produtoNome}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {order.cliente ? (
                      <>
                        <div className="font-medium text-gray-800">
                          {order.cliente.nome}
                        </div>
                        <div className="text-xs text-gray-500">
                          {order.cliente.email}
                        </div>
                      </>
                    ) : (
                      <span className="text-xs text-gray-500">Cliente não informado</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {new Date(order.criadoEm).toLocaleString("pt-BR")}
                  </td>
                  <td className="px-4 py-3 font-semibold text-green-700">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        statusColors[order.status] ?? "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                  Nenhum pedido cadastrado ainda.
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
    </div>
  );
};

export default Orders;
