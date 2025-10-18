import { LiaCartPlusSolid } from "react-icons/lia";
import type { ProductCardProps } from "../types/ProductCardProps";

export const ProductCard = ({
  img,
  nome,
  descricao,
  preco,
}: ProductCardProps) => {
  return (
    <div className="flex flex-col items-center justify-between bg-amber-50 border border-green-200 rounded-lg p-4 shadow hover:shadow-lg transition-shadow">
      <figure className="max-h-3/10">
        <img className="w-full" src={img} alt={nome} />
      </figure>
      <div>
        <h3 className="text-green-600 font-bold">{nome}</h3>
        <p className="text-green-600">{descricao}</p>
        <div className="mt-2 flex justify-between items-center text-green-600">
          <span className="font-semibold">{preco}</span>
          <button>
            <LiaCartPlusSolid className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};
