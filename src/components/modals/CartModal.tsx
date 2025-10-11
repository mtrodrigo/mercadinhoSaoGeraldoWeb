import { useEffect } from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
};

type CartModalProps = {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
};

export const CartModal = ({ isOpen, onClose, items }: CartModalProps) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const total = items.reduce((acc, i) => acc + i.price * i.qty, 0);

  return (
    <div
      className="fixed right-0 top-19 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative z-10 w-full max-w-lg rounded-lg bg-white shadow-xl">
        <header className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <h2 className="text-lg font-semibold">Seu Carrinho</h2>
          <button
            onClick={onClose}
            className="rounded-md px-2 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label="Fechar"
          >
            ✕
          </button>
        </header>

        <div className="max-h-80 overflow-auto px-4 py-3">
          {items.length === 0 ? (
            <p className="text-gray-600">Seu carrinho está vazio.</p>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-3">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-12 w-12 rounded object-cover border"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded bg-gray-100 border flex items-center justify-center text-sm text-gray-500">
                      IMG
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-medium leading-tight">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.qty} x{" "}
                      {item.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  </div>
                  <div className="font-semibold">
                    {(item.qty * item.price).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </div>
                </li>
              ))}
              <div className="flex justify-between border-t pt-3 mt-3">
                <span className="text-gray-600 mr-2">Total:</span>
                <span className="font-semibold">
                  {total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            </ul>
          )}
        </div>

        <footer className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="rounded-md border px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Continuar comprando
            </button>
            <button
              className="rounded-md bg-green-600 px-3 py-2 text-sm text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              onClick={() => alert("Finalização não implementada.")}
            >
              Finalizar compra
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
