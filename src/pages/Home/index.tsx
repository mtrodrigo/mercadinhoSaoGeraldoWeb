import { MainContainer } from "../../components/containers/MainContainer";
import { HiMagnifyingGlass } from "react-icons/hi2";


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
      <div>
        
      </div>
      </section>
    </MainContainer>
  )
}
export default Home;