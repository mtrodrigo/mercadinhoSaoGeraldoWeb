import { useQuery } from "@tanstack/react-query";
import { listProducts } from "../../services/products";
import { listOrders } from "../../services/orders";
import { listUsers } from "../../services/users";
import type { Order, PaginatedResponse, Product, User } from "../../types/api";

function extractItems<T>(data: PaginatedResponse<T> | T[] | undefined): T[] {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  return data.items;
}

function extractTotal<T>(data: PaginatedResponse<T> | T[] | undefined): number {
  if (!data) return 0;
  if (Array.isArray(data)) return data.length;
  return data.totalItems;
}

const Dashboard = () => {
  const productsQuery = useQuery({
    queryKey: ["admin", "products", "summary"],
    queryFn: () => listProducts({ page: 1, pageSize: 50 }),
  });

  const ordersQuery = useQuery({
    queryKey: ["admin", "orders", "summary"],
    queryFn: () => listOrders({ page: 1, pageSize: 10 }),
  });

  const usersQuery = useQuery({
    queryKey: ["admin", "users", "summary"],
    queryFn: () => listUsers({ page: 1, pageSize: 10 }),
  });

  const productsData =
    productsQuery.data as PaginatedResponse<Product> | Product[] | undefined;
  const ordersData = ordersQuery.data as PaginatedResponse<Order> | undefined;
  const usersData = usersQuery.data as PaginatedResponse<User> | undefined;

  const totalProducts = extractTotal<Product>(productsData);
  const totalOrders = extractTotal<Order>(ordersData);
  const totalUsers = extractTotal<User>(usersData);

  const latestOrders = extractItems<Order>(ordersData).slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-lg border border-green-100 bg-green-50 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-green-800">Produtos ativos</h3>
          <p className="mt-2 text-3xl font-bold text-green-700">
            {productsQuery.isLoading ? "..." : totalProducts}
          </p>
          <p className="text-sm text-green-600">
            Cadastre novos itens para manter o catálogo atualizado.
          </p>
        </div>
        <div className="rounded-lg border border-blue-100 bg-blue-50 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-blue-800">Pedidos recentes</h3>
          <p className="mt-2 text-3xl font-bold text-blue-700">
            {ordersQuery.isLoading ? "..." : totalOrders}
          </p>
          <p className="text-sm text-blue-600">
            Acompanhe o fluxo de pedidos e identifique gargalos rapidamente.
          </p>
        </div>
        <div className="rounded-lg border border-amber-100 bg-amber-50 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-amber-800">Clientes cadastrados</h3>
          <p className="mt-2 text-3xl font-bold text-amber-700">
            {usersQuery.isLoading ? "..." : totalUsers}
          </p>
          <p className="text-sm text-amber-600">
            Fidelize os clientes oferecendo promoções e bom atendimento.
          </p>
        </div>
      </section>

      <section className="rounded-xl border border-green-100 bg-white p-6 shadow-sm">
        <header className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-green-700">Pedidos recentes</h2>
            <p className="text-sm text-gray-500">
              Visualize os cinco pedidos mais recentes realizados na plataforma.
            </p>
          </div>
        </header>
        {ordersQuery.isLoading ? (
          <p className="text-sm text-gray-500">Carregando pedidos...</p>
        ) : latestOrders.length > 0 ? (
          <ul className="space-y-3">
            {latestOrders.map((order) => (
              <li
                key={order.id}
                className="flex flex-col gap-2 rounded-lg border border-green-50 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-semibold text-green-700">
                    Pedido #{order.id.slice(0, 8)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.criadoEm).toLocaleString("pt-BR")}
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  <span className="font-semibold text-green-700">
                    {order.total.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                  {order.cliente && (
                    <span className="ml-2 text-gray-500">
                      por {order.cliente.nome}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">
            Nenhum pedido encontrado. Assim que os clientes realizarem compras,
            os dados aparecerão aqui.
          </p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
