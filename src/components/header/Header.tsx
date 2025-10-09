import { Link } from "react-router";
import logo_mercadinho_sao_jose from "../../assets/logo_mercadinho_sao_geraldo.png";
import { useMemo, useState } from "react";
import { FiLogIn, FiShoppingCart } from "react-icons/fi";
import { CartModal } from "../modals/CartModal";

export const Header = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems] = useState([
    { id: "1", name: "Arroz 5kg", price: 24.9, qty: 1 },
    { id: "2", name: "Feijão 1kg", price: 8.5, qty: 2 },
  ]);
  const totalQty = useMemo(
    () => cartItems.reduce((acc, i) => acc + i.qty, 0),
    [cartItems]
  );
  const nome = "Rodrigo Marques Tavares";

  const iniciais = (nome: string) => {
    const partes = nome.trim().split(" ");
    const primeiraInicial = partes[0][0].toUpperCase();
    const ultimaInicial = partes[partes.length - 1][0].toUpperCase();
    const resultado = primeiraInicial + ultimaInicial;

    return resultado;
  };

  return (
    <header className="w-full flex px-4 py-1 border-b border-b-green-100 drop-shadow-md drop-shadow-green-200 bg-white mb-5 bg">
      <div className="flex items-center justify-between max-w-6xl w-full mx-auto">
        <figure className="">
          <Link to="/">
            <img
              className="w-40"
              src={logo_mercadinho_sao_jose}
              alt="Logo Mercadinho São José"
            />
          </Link>
        </figure>
        <nav className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setIsAuth((v) => !v)}
            className="h-10 px-4 inline-flex items-center justify-center gap-2 rounded-full border border-green-500 bg-green-50 text-green-600 font-medium hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            aria-label={isAuth ? "Abrir perfil" : "Entrar"}
            title={isAuth ? "Sair (mock)" : "Entrar"}
          >
            {isAuth ? (
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white text-sm">
                {iniciais(nome)}
              </span>
            ) : (
              <>
                <FiLogIn />
                <span>Entrar</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative inline-flex items-center justify-center h-10 w-10 rounded-full border border-gray-200 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label="Abrir carrinho"
          >
            <FiShoppingCart className="text-2xl" />
            {totalQty > 0 && (
              <span className="absolute -right-1 -top-1 flex items-center justify-center bg-green-600 text-white rounded-full h-5 min-w-5 px-1 text-[10px] font-semibold">
                {totalQty}
              </span>
            )}
          </button>
        </nav>
      </div>
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
      />
    </header>
  );
};
