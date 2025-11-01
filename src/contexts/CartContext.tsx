import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { CreateOrderInput } from "../types/api";

export type CartItem = {
  produtoId: string;
  nome: string;
  preco: number;
  quantidade: number;
  imagemUrl?: string;
};

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  addItem: (item: Omit<CartItem, "quantidade">, quantity?: number) => void;
  removeItem: (produtoId: string) => void;
  updateItemQuantity: (produtoId: string, quantity: number) => void;
  clearCart: () => void;
  buildOrderInput: () => CreateOrderInput;
};

const STORAGE_KEY = "mercadinho.cart";

function loadCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as CartItem[];
    return parsed;
  } catch (error) {
    console.warn("Não foi possível carregar o carrinho", error);
    return [];
  }
}

function persistCart(items: CartItem[]) {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => loadCart());

  const persist = useCallback((next: CartItem[]) => {
    setItems(next);
    persistCart(next);
  }, []);

  const addItem = useCallback<CartContextValue["addItem"]>(
    (item, quantity = 1) => {
      persist(
        items.some((i) => i.produtoId === item.produtoId)
          ? items.map((current) =>
              current.produtoId === item.produtoId
                ? {
                    ...current,
                    quantidade: current.quantidade + quantity,
                  }
                : current
            )
          : [...items, { ...item, quantidade: quantity }]
      );
    },
    [items, persist]
  );

  const removeItem = useCallback<CartContextValue["removeItem"]>(
    (produtoId) => {
      persist(items.filter((item) => item.produtoId !== produtoId));
    },
    [items, persist]
  );

  const updateItemQuantity = useCallback<
    CartContextValue["updateItemQuantity"]
  >(
    (produtoId, quantity) => {
      if (quantity <= 0) {
        removeItem(produtoId);
        return;
      }
      persist(
        items.map((item) =>
          item.produtoId === produtoId ? { ...item, quantidade: quantity } : item
        )
      );
    },
    [items, persist, removeItem]
  );

  const clearCart = useCallback(() => {
    persist([]);
  }, [persist]);

  const totalItems = useMemo(
    () => items.reduce((acc, item) => acc + item.quantidade, 0),
    [items]
  );

  const totalAmount = useMemo(
    () => items.reduce((acc, item) => acc + item.quantidade * item.preco, 0),
    [items]
  );

  const buildOrderInput = useCallback(
    () => ({
      itens: items.map((item) => ({
        produtoId: item.produtoId,
        quantidade: item.quantidade,
      })),
    }),
    [items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totalItems,
      totalAmount,
      addItem,
      removeItem,
      updateItemQuantity,
      clearCart,
      buildOrderInput,
    }),
    [
      addItem,
      buildOrderInput,
      clearCart,
      items,
      removeItem,
      totalAmount,
      totalItems,
      updateItemQuantity,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de CartProvider");
  }
  return context;
};
