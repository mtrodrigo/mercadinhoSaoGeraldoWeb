import { LiaCartPlusSolid } from "react-icons/lia";
import type { ProductCardProps } from "../types/ProductCardProps";

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const ProductCard = ({
  img,
  nome,
  descricao,
  preco,
  onAddToCart,
}: ProductCardProps) => {
  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-green-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <figure className="flex h-40 items-center justify-center overflow-hidden rounded-lg bg-green-50">
        {img ? (
          <img
            className="h-full w-full object-cover"
            src={img}
            alt={nome}
            loading="lazy"
          />
        ) : (
          <span className="text-sm text-green-500">Imagem indisponível</span>
        )}
      </figure>
      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="text-lg font-semibold text-green-700">{nome}</h3>
        <p className="mt-1 flex-1 text-sm text-gray-600 line-clamp-3">{descricao}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-green-700">
            {formatCurrency(preco)}
          </span>
          <button
            type="button"
            onClick={onAddToCart}
            className="inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            <LiaCartPlusSolid className="text-xl" />
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};
