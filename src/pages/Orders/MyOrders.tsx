import { useQuery } from "@tanstack/react-query";
import { listMyOrders } from "../../services/orders";
import type { Order } from "../../types/api";

const statusColors: Record<string, string> = {
  Pendente: "bg-yellow-100 text-yellow-700",
  Processando: "bg-blue-100 text-blue-700",
  Concluido: "bg-green-100 text-green-700",
  Cancelado: "bg-red-100 text-red-700",
};

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const OrderCard = ({ order }: { order: Order }) => {
  const statusClass = statusColors[order.status] ?? "bg-gray-100 text-gray-600";

  return (
    <article className="rounded-lg border border-green-100 bg-white p-4 shadow-sm">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-green-50 pb-3">
        <div>
          <h3 className="text-lg font-semibold text-green-700">
            Pedido #{order.id.slice(0, 8)}
          </h3>
          <p className="text-sm text-gray-500">
            Realizado em {new Date(order.criadoEm).toLocaleString("pt-BR")}
          </p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}>
          {order.status}
        </span>
      </header>
      <ul className="mt-4 space-y-2">
        {order.itens.map((item) => (
          <li
            key={`${order.id}-${item.produtoId}`}
            className="flex items-center justify-between text-sm text-gray-600"
          >
            <div>
              <p className="font-medium text-gray-700">{item.produtoNome}</p>
              <p>
                {item.quantidade} x {formatCurrency(item.precoUnitario)}
              </p>
            </div>
            <span className="font-semibold text-green-700">
              {formatCurrency(item.subtotal)}
            </span>
          </li>
        ))}
      </ul>
      <footer className="mt-4 flex items-center justify-between border-t border-green-50 pt-3 text-sm">
        <span className="text-gray-500">Total</span>
        <span className="text-lg font-semibold text-green-700">
          {formatCurrency(order.total)}
        </span>
      </footer>
    </article>
  );
};

const MyOrders = () => {
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["meus-pedidos"],
    queryFn: listMyOrders,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-green-600">
        Carregando seus pedidos...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-lg text-red-600">
          Não foi possível carregar seus pedidos. Tente novamente mais tarde.
        </p>
        <button
          onClick={() => refetch()}
          className="rounded-full bg-green-600 px-6 py-2 text-white transition hover:bg-green-700"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-green-700">
            Meus pedidos
          </h1>
          <p className="text-sm text-gray-600">
            Acompanhe o status de todos os seus pedidos realizados no mercado.
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

      {data && data.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {data.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-green-100 bg-white p-6 text-center text-gray-600">
          Você ainda não possui pedidos. Que tal explorar nossos produtos?
        </div>
      )}
    </section>
  );
};

export default MyOrders;
