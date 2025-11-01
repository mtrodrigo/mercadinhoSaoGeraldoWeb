import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../../contexts/CartContext";
import type { CartItem } from "../../contexts/CartContext";

type CartModalProps = {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
};

export const CartModal = ({ isOpen, onClose, items, subtotal }: CartModalProps) => {
  const navigate = useNavigate();
  const { updateItemQuantity, removeItem } = useCart();

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-end bg-black/30 pt-20"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="h-full w-full max-w-md overflow-hidden rounded-l-2xl bg-white shadow-xl"
        role="document"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-green-100 px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-green-700">Seu carrinho</h2>
            <p className="text-xs text-gray-500">
              Revise os produtos antes de finalizar o pedido.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-green-100 px-3 py-1 text-sm text-gray-500 transition hover:bg-green-50 hover:text-green-700"
            aria-label="Fechar carrinho"
          >
            Fechar
          </button>
        </header>

        <div className="flex h-[60vh] flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-5 py-4">
            {items.length === 0 ? (
              <p className="text-sm text-gray-500">
                Seu carrinho está vazio. Adicione produtos para continuar.
              </p>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.produtoId} className="flex items-start gap-3">
                    {item.imagemUrl ? (
                      <img
                        src={item.imagemUrl}
                        alt={item.nome}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-green-100 bg-green-50 text-xs text-green-600">
                        Sem imagem
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-semibold text-green-700">
                            {item.nome}
                          </p>
                          <span className="text-xs text-gray-500">
                            {item.preco.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.produtoId)}
                          className="text-xs text-red-500 transition hover:text-red-700"
                        >
                          Remover
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center gap-2 rounded-full border border-green-200 px-2 py-1 text-xs text-green-700">
                          <button
                            type="button"
                            onClick={() =>
                              updateItemQuantity(item.produtoId, item.quantidade - 1)
                            }
                            className="px-2 text-lg"
                          >
                            −
                          </button>
                          <span className="w-6 text-center font-semibold">
                            {item.quantidade}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateItemQuantity(item.produtoId, item.quantidade + 1)
                            }
                            className="px-2 text-lg"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-sm font-semibold text-green-700">
                          {(item.preco * item.quantidade).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <footer className="border-t border-green-100 px-5 py-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <strong className="text-lg text-green-700">
                {subtotal.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </strong>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-full border border-green-200 px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-50"
              >
                Continuar comprando
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate("/checkout");
                }}
                className="flex-1 rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
                disabled={items.length === 0}
              >
                Finalizar pedido
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
