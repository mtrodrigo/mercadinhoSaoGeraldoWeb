import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../../services/orders";
import { useCart } from "../../contexts/CartContext";

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const Checkout = () => {
  const { items, totalAmount, buildOrderInput, clearCart } = useCart();
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      setFeedback("Pedido criado com sucesso! Você pode acompanhar o status na aba Meus pedidos.");
      clearCart();
    },
  });

  const isDisabled = useMemo(() => items.length === 0 || mutation.isPending, [
    items.length,
    mutation.isPending,
  ]);

  const handleCheckout = async () => {
    setFeedback(null);
    setError(null);
    try {
      await mutation.mutateAsync(buildOrderInput());
    } catch (err) {
      console.error(err);
      setError(
        "Não foi possível finalizar o pedido. Verifique os itens e tente novamente."
      );
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-6">
      <header>
        <h1 className="text-2xl font-semibold text-green-700">Finalizar pedido</h1>
        <p className="text-sm text-gray-600">
          Revise os itens antes de confirmar. Você pode editar o carrinho na barra superior.
        </p>
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

      <div className="rounded-xl border border-green-100 bg-white shadow-sm">
        <ul className="divide-y divide-green-50">
          {items.length === 0 && (
            <li className="p-4 text-center text-gray-500">
              O carrinho está vazio. Adicione produtos para continuar.
            </li>
          )}
          {items.map((item) => (
            <li key={item.produtoId} className="flex items-center justify-between gap-4 p-4">
              <div className="flex flex-1 flex-col">
                <span className="font-medium text-gray-800">{item.nome}</span>
                <span className="text-sm text-gray-500">
                  {item.quantidade} x {formatCurrency(item.preco)}
                </span>
              </div>
              <span className="text-base font-semibold text-green-700">
                {formatCurrency(item.quantidade * item.preco)}
              </span>
            </li>
          ))}
        </ul>
        <footer className="flex items-center justify-between gap-4 border-t border-green-50 p-4">
          <span className="text-sm text-gray-500">Total</span>
          <strong className="text-xl text-green-700">{formatCurrency(totalAmount)}</strong>
        </footer>
      </div>

      <button
        type="button"
        onClick={handleCheckout}
        className="self-end rounded-full bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isDisabled}
      >
        {mutation.isPending ? "Enviando pedido..." : "Confirmar pedido"}
      </button>
    </section>
  );
};

export default Checkout;
