import { ProductCard } from "../../components/card/ProductCard";
import { MainContainer } from "../../components/containers/MainContainer";
import { HiMagnifyingGlass } from "react-icons/hi2";


const produtos = [
  {
    img: "https://www.friossemlimite.com.br/loja/src/uploads/produtos/10764af9dbb006c27544b5708ced6c70/20230707125602.jpg",
    nome: "Arroz Tatiana",
    descricao: "Arroz Tatiana Tipo 1 5kg",
    preco: "R$ 20,99"
  },
  {
    img: "https://www.friossemlimite.com.br/loja/src/uploads/produtos/10764af9dbb006c27544b5708ced6c70/20230707125602.jpg",
    nome: "Arroz Tatiana",
    descricao: "Arroz Tatiana Tipo 1 5kg",
    preco: "R$ 20,99"
  },
  {
    img: "https://www.friossemlimite.com.br/loja/src/uploads/produtos/10764af9dbb006c27544b5708ced6c70/20230707125602.jpg",
    nome: "Arroz Tatiana",
    descricao: "Arroz Tatiana Tipo 1 5kg",
    preco: "R$ 20,99"
  },
  {
    img: "https://www.friossemlimite.com.br/loja/src/uploads/produtos/10764af9dbb006c27544b5708ced6c70/20230707125602.jpg",
    nome: "Arroz Tatiana",
    descricao: "Arroz Tatiana Tipo 1 5kg",
    preco: "R$ 20,99"
  },
  {
    img: "https://www.friossemlimite.com.br/loja/src/uploads/produtos/10764af9dbb006c27544b5708ced6c70/20230707125602.jpg",
    nome: "Arroz Tatiana",
    descricao: "Arroz Tatiana Tipo 1 5kg",
    preco: "R$ 20,99"
  },
  {
    img: "https://www.friossemlimite.com.br/loja/src/uploads/produtos/10764af9dbb006c27544b5708ced6c70/20230707125602.jpg",
    nome: "Arroz Tatiana",
    descricao: "Arroz Tatiana Tipo 1 5kg",
    preco: "R$ 20,99"
  },
  {
    img: "https://www.friossemlimite.com.br/loja/src/uploads/produtos/10764af9dbb006c27544b5708ced6c70/20230707125602.jpg",
    nome: "Arroz Tatiana",
    descricao: "Arroz Tatiana Tipo 1 5kg",
    preco: "R$ 20,99"
  },
  {
    img: "https://www.friossemlimite.com.br/loja/src/uploads/produtos/10764af9dbb006c27544b5708ced6c70/20230707125602.jpg",
    nome: "Arroz Tatiana",
    descricao: "Arroz Tatiana Tipo 1 5kg",
    preco: "R$ 20,99"
  },
  {
    img: "https://www.friossemlimite.com.br/loja/src/uploads/produtos/10764af9dbb006c27544b5708ced6c70/20230707125602.jpg",
    nome: "Arroz Tatiana",
    descricao: "Arroz Tatiana Tipo 1 5kg",
    preco: "R$ 20,99"
  },
  {
    img: "https://www.friossemlimite.com.br/loja/src/uploads/produtos/10764af9dbb006c27544b5708ced6c70/20230707125602.jpg",
    nome: "Arroz Tatiana",
    descricao: "Arroz Tatiana Tipo 1 5kg",
    preco: "R$ 20,99"
  },
  {
    img: "https://www.friossemlimite.com.br/loja/src/uploads/produtos/10764af9dbb006c27544b5708ced6c70/20230707125602.jpg",
    nome: "Arroz Tatiana",
    descricao: "Arroz Tatiana Tipo 1 5kg",
    preco: "R$ 20,99"
  },
  {
    img: "https://www.friossemlimite.com.br/loja/src/uploads/produtos/10764af9dbb006c27544b5708ced6c70/20230707125602.jpg",
    nome: "Arroz Tatiana",
    descricao: "Arroz Tatiana Tipo 1 5kg",
    preco: "R$ 20,99"
  },
]


const Home = () => {
  return(
    <MainContainer>
      <div className="flex w-xl mx-auto">
        <input type="text" placeholder="Digite o produto" className="w-full p-2 border border-green-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
        <button className="hover:scale-115 transition-transform hover:cursor-pointer">
          <HiMagnifyingGlass className="text-3xl text-green-600 ml-2"/>
        </button>
      </div>
      <section>
      <h2 className="text-2xl text-green-600 font-semibold mb-4 mt-10 text-center">Produtos em Destaque</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {produtos.map((produto, index) => (
          <ProductCard
            key={index}
            img={produto.img}
            nome={produto.nome}
            descricao={produto.descricao}
            preco={produto.preco}
          />
        ))}
      </div>
      </section>
    </MainContainer>
  )
}
export default Home;