import { Link } from "react-router";

const NotFound = () => (
  <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
    <h1 className="text-3xl font-semibold text-green-700">Página não encontrada</h1>
    <p className="text-gray-600 max-w-md">
      O conteúdo que você procura não existe ou foi movido. Utilize o menu para
      navegar ou retorne para a página inicial.
    </p>
    <Link
      to="/"
      className="rounded-full bg-green-600 px-6 py-2 text-white transition hover:bg-green-700"
    >
      Voltar para a página inicial
    </Link>
  </div>
);

export default NotFound;
