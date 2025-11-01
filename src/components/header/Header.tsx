import { useMemo, useState } from "react";
import { FiChevronDown, FiLogIn, FiLogOut, FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import logoMercadinho from "../../assets/logo_mercadinho_sao_geraldo.png";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { CartModal } from "../modals/CartModal";

const obterIniciais = (nome?: string) => {
  if (!nome) return "";
  const partes = nome.trim().split(" ");
  const primeira = partes[0]?.[0] ?? "";
  const ultima = partes[partes.length - 1]?.[0] ?? primeira;
  return `${primeira}${ultima}`.toUpperCase();
};

export const Header = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { items, totalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const subtotal = useMemo(
    () => items.reduce((acc, item) => acc + item.preco * item.quantidade, 0),
    [items]
  );

  return (
    <header className="sticky top-0 z-40 border-b border-green-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <img
            className="w-36"
            src={logoMercadinho}
            alt="Logo Mercadinho São Geraldo"
          />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex">
          <Link to="/" className="transition hover:text-green-700">
            Início
          </Link>
          {isAuthenticated && (
            <Link to="/meus-pedidos" className="transition hover:text-green-700">
              Meus pedidos
            </Link>
          )}
          {isAdmin && (
            <Link to="/admin" className="transition hover:text-green-700">
              Painel administrativo
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-green-200 bg-white text-green-700 transition hover:bg-green-50"
            aria-label="Abrir carrinho"
          >
            <FiShoppingCart className="text-xl" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-green-600 px-1 text-[10px] font-semibold text-white">
                {totalItems}
              </span>
            )}
          </button>

          {isAuthenticated ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-full border border-green-200 bg-white px-3 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-50"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-xs font-bold uppercase tracking-wider text-white">
                  {obterIniciais(user?.nome)}
                </span>
                <span className="hidden md:inline">{user?.nome.split(" ")[0]}</span>
                <FiChevronDown />
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-green-100 bg-white p-2 shadow-lg">
                  <Link
                    to="/perfil"
                    className="block rounded-lg px-3 py-2 text-sm text-gray-600 transition hover:bg-green-50 hover:text-green-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Meu perfil
                  </Link>
                  <Link
                    to="/meus-pedidos"
                    className="block rounded-lg px-3 py-2 text-sm text-gray-600 transition hover:bg-green-50 hover:text-green-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Pedidos
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="block rounded-lg px-3 py-2 text-sm text-gray-600 transition hover:bg-green-50 hover:text-green-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Administração
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                      navigate("/");
                    }}
                    className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 transition hover:bg-red-50"
                  >
                    <FiLogOut /> Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              <FiLogIn />
              Entrar
            </button>
          )}
        </div>
      </div>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={items}
        subtotal={subtotal}
      />
    </header>
  );
};
