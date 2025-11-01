import { useMemo, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { ProductCard } from "../../components/card/ProductCard";
import { MainContainer } from "../../components/containers/MainContainer";
import { useProdutos } from "../../hooks/useProdutos";
import { useCart } from "../../contexts/CartContext";

const Home = () => {
  const [busca, setBusca] = useState("");
  const { data: produtos, isLoading, isError, refetch, isFetching } = useProdutos();
  const { addItem } = useCart();

  const produtosFiltrados = useMemo(() => {
    if (!produtos) return [];
    return produtos.filter((produto) =>
      produto.nome.toLowerCase().includes(busca.toLowerCase()) ||
      produto.descricao.toLowerCase().includes(busca.toLowerCase())
    );
  }, [busca, produtos]);

  return (
    <MainContainer>
      <section className="rounded-3xl border border-green-100 bg-gradient-to-r from-green-50 via-white to-green-50 p-8 shadow-sm">
        <div className="mx-auto flex max-w-4xl flex-col gap-6 text-center">
          <h1 className="text-3xl font-bold text-green-700 md:text-4xl">
            Os produtos fresquinhos do Mercadinho São Geraldo na palma da sua mão
          </h1>
          <p className="text-sm text-gray-600 md:text-base">
            Explore o catálogo atualizado em tempo real, adicione itens ao carrinho e finalize seus pedidos com poucos cliques.
          </p>
          <div className="relative mx-auto flex w-full max-w-xl items-center gap-3">
            <HiMagnifyingGlass className="pointer-events-none absolute left-4 text-xl text-green-500" />
            <input
              type="search"
              placeholder="Busque por nome ou descrição"
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
              className="w-full rounded-full border border-green-200 bg-white py-3 pl-12 pr-4 text-sm shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />
            <button
              onClick={() => refetch()}
              className="hidden rounded-full border border-green-200 px-4 py-2 text-sm font-medium text-green-700 transition hover:border-green-300 hover:bg-green-50 md:inline-flex"
            >
              {isFetching ? "Atualizando" : "Atualizar"}
            </button>
          </div>
        </div>
      </section>

      <section className="mt-10 flex flex-col gap-6">
        <header className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-2xl font-semibold text-green-700">Produtos em destaque</h2>
          <p className="max-w-2xl text-sm text-gray-600">
            Adicione os itens preferidos ao carrinho e finalize seu pedido quando estiver pronto.
          </p>
        </header>

        {isLoading ? (
          <p className="text-center text-green-600">Carregando produtos...</p>
        ) : isError ? (
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-red-600">Não foi possível carregar os produtos agora.</p>
            <button
              onClick={() => refetch()}
              className="rounded-full bg-green-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              Tentar novamente
            </button>
          </div>
        ) : produtosFiltrados.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {produtosFiltrados.map((produto) => (
              <ProductCard
                key={produto.id}
                img={produto.imagemUrl}
                nome={produto.nome}
                descricao={produto.descricao}
                preco={produto.preco}
                onAddToCart={() =>
                  addItem({
                    produtoId: produto.id,
                    nome: produto.nome,
                    preco: produto.preco,
                    imagemUrl: produto.imagemUrl ?? undefined,
                  })
                }
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            Nenhum produto encontrado para a busca realizada.
          </p>
        )}
      </section>
    </MainContainer>
  );
};

export default Home;