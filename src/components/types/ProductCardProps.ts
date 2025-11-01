export interface ProductCardProps {
  img?: string | null;
  nome: string;
  descricao: string;
  preco: number;
  onAddToCart?: () => void;
}