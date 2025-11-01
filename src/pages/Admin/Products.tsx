import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  listProducts,
  updateProduct,
  uploadProductImage,
} from "../../services/products";
import type { PaginatedResponse, Product } from "../../types/api";

type ProductFormState = {
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  categoria: string;
  imagem: File | null;
};

const emptyForm: ProductFormState = {
  nome: "",
  descricao: "",
  preco: 0,
  estoque: 0,
  categoria: "",
  imagem: null,
};

const Products = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [formState, setFormState] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const productsQuery = useQuery({
    queryKey: ["admin", "products", "list"],
    queryFn: () => listProducts({ page: 1, pageSize: 100 }),
  });

  const productsData =
    productsQuery.data as PaginatedResponse<Product> | Product[] | undefined;

  const products = useMemo(() => {
    const items = Array.isArray(productsData)
      ? productsData
      : productsData?.items ?? [];

    return items.filter((product) =>
      product.nome.toLowerCase().includes(search.toLowerCase())
    );
  }, [productsData, search]);

  const createMutation = useMutation({
    mutationFn: createProduct,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, ...payload }: { id: string } & Parameters<typeof updateProduct>[1]) =>
      updateProduct(id, payload),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
      setFeedback("Produto removido com sucesso!");
    },
  });

  useEffect(() => {
    if (editingId) {
      const product = products.find((item) => item.id === editingId);
      if (product) {
        setFormState({
          nome: product.nome,
          descricao: product.descricao,
          preco: product.preco,
          estoque: product.estoque,
          categoria: product.categoria ?? "",
          imagem: null,
        });
      }
    } else {
      setFormState(emptyForm);
    }
  }, [editingId, products]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);
    setError(null);

    const payload = {
      nome: formState.nome,
      descricao: formState.descricao,
      preco: Number(formState.preco),
      estoque: Number(formState.estoque),
      categoria: formState.categoria,
    };

    const imageFile = formState.imagem;
    const isEdit = Boolean(editingId);

    try {
      if (isEdit && editingId) {
        await updateMutation.mutateAsync({ id: editingId, ...payload });
        if (imageFile) {
          await uploadProductImage(editingId, imageFile);
        }
      } else {
        const product = await createMutation.mutateAsync(payload);
        if (imageFile) {
          await uploadProductImage(product.id, imageFile);
        }
      }
      await queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
      setFormState(emptyForm);
      setEditingId(null);
      setFeedback(isEdit ? "Produto atualizado com sucesso!" : "Produto criado com sucesso!");
    } catch (err) {
      console.error(err);
      setError("Não foi possível salvar o produto. Verifique os dados e tente novamente.");
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFeedback(null);
    setError(null);
  };

  const handleDelete = async (productId: string) => {
    if (!confirm("Tem certeza de que deseja remover este produto?")) return;
    setFeedback(null);
    setError(null);
    try {
      await deleteMutation.mutateAsync(productId);
    } catch (err) {
      console.error(err);
      setError("Não foi possível remover o produto. Tente novamente.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-green-700">Produtos</h1>
          <p className="text-sm text-gray-500">
            Cadastre, edite e organize os itens disponíveis no catálogo.
          </p>
        </div>
        <input
          type="search"
          placeholder="Buscar por nome"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full rounded-full border border-green-200 px-4 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 md:max-w-xs"
        />
      </header>

      {feedback && (
        <div className="rounded-md border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-700">
          {feedback}
        </div>
      )}

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
          {error}
        </div>
      )}

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="overflow-hidden rounded-xl border border-green-100 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-green-50 text-sm">
            <thead className="bg-green-50 text-left text-xs font-semibold uppercase tracking-wide text-green-700">
              <tr>
                <th className="px-4 py-3">Produto</th>
                <th className="px-4 py-3">Preço</th>
                <th className="px-4 py-3">Estoque</th>
                <th className="px-4 py-3">Categoria</th>
                <th className="px-4 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-green-50">
              {productsQuery.isLoading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                    Carregando produtos...
                  </td>
                </tr>
              ) : products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-green-50/40">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-800">{product.nome}</div>
                      <div className="text-xs text-gray-500 line-clamp-2">
                        {product.descricao}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-green-700">
                      {product.preco.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="px-4 py-3">{product.estoque}</td>
                    <td className="px-4 py-3">{product.categoria ?? "-"}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="rounded-full border border-green-200 px-3 py-1 text-xs font-medium text-green-700 transition hover:border-green-300 hover:bg-green-50"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="rounded-full border border-red-200 px-3 py-1 text-xs font-medium text-red-600 transition hover:border-red-300 hover:bg-red-50"
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                    Nenhum produto encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-xl border border-green-100 bg-white p-5 shadow-sm"
        >
          <header>
            <h2 className="text-lg font-semibold text-green-700">
              {editingId ? "Editar produto" : "Adicionar novo produto"}
            </h2>
            <p className="text-xs text-gray-500">
              Preencha os campos abaixo e envie para salvar as alterações.
            </p>
          </header>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600" htmlFor="nome">
              Nome
            </label>
            <input
              id="nome"
              name="nome"
              value={formState.nome}
              onChange={(event) =>
                setFormState((prev) => ({ ...prev, nome: event.target.value }))
              }
              className="rounded-md border border-green-200 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600" htmlFor="descricao">
              Descrição
            </label>
            <textarea
              id="descricao"
              name="descricao"
              rows={3}
              value={formState.descricao}
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  descricao: event.target.value,
                }))
              }
              className="rounded-md border border-green-200 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
              required
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600" htmlFor="preco">
                Preço (R$)
              </label>
              <input
                id="preco"
                name="preco"
                type="number"
                step="0.01"
                min="0"
                value={formState.preco}
                onChange={(event) =>
                  setFormState((prev) => ({
                    ...prev,
                    preco: Number(event.target.value),
                  }))
                }
                className="rounded-md border border-green-200 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600" htmlFor="estoque">
                Estoque
              </label>
              <input
                id="estoque"
                name="estoque"
                type="number"
                min="0"
                value={formState.estoque}
                onChange={(event) =>
                  setFormState((prev) => ({
                    ...prev,
                    estoque: Number(event.target.value),
                  }))
                }
                className="rounded-md border border-green-200 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600" htmlFor="categoria">
              Categoria
            </label>
            <input
              id="categoria"
              name="categoria"
              value={formState.categoria ?? ""}
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  categoria: event.target.value,
                }))
              }
              className="rounded-md border border-green-200 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600" htmlFor="imagem">
              Imagem do produto
            </label>
            <input
              id="imagem"
              name="imagem"
              type="file"
              accept="image/*"
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  imagem: event.target.files?.[0] ?? null,
                }))
              }
              className="rounded-md border border-green-200 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            {editingId && (
              <button
                type="button"
                onClick={() => setEditingId(null)}
                className="rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-600 transition hover:bg-gray-50"
              >
                Cancelar edição
              </button>
            )}
            <button
              type="submit"
              className="ml-auto rounded-full bg-green-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {editingId
                ? updateMutation.isPending
                  ? "Salvando..."
                  : "Atualizar produto"
                : createMutation.isPending
                ? "Cadastrando..."
                : "Cadastrar produto"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Products;
