import { Link } from "react-router";
import LoginRegisterContainer from "../../components/containers/LoginRegisterContainer";

const Register = () => {
    return(
        <LoginRegisterContainer>
            <h1 className="text-xl mb-5 font-semibold text-green-600">Faça o Login</h1>
            <form action="" method="post">
                <input type="email" name="email" id="email" placeholder="Email" className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4 w-full" />
                <input type="text" name="cpf" id="cpf" placeholder="CPF" className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4 w-full" />
                <input type="password" name="password" id="password" placeholder="Senha" className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4 w-full" />
                <input type="password" name="consfirmPassword" id="confirmPassword" placeholder="Confirme a Senha" className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4 w-full" />
                <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="telefone" id="telefone" placeholder="CPF" className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4 w-full" />
                    <input type="text" name="cep" id="cep" placeholder="CEP" className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4 w-full" />
                </div>
                <div className="grid grid-cols-4 gap-4">
                    <input type="text" name="logradouro" id="logradouro" placeholder="Rua, Avenida..." className="col-span-3 border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4 w-full" />
                    <input type="text" name="numero" id="numero" placeholder="Número" className="col-span-1 border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4 w-full" />
                </div>
                <div className="grid grid-cols-5 gap-4">
                    <input type="text" name="bairro" id="bairro" placeholder="Bairro" className="col-span-2 border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4 w-full" />
                    <input type="text" name="cidede" id="cidede" placeholder="Cidade" className="col-span-2 border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4 w-full" />
                    <input type="text" name="uf" id="uf" placeholder="Estado" className="col-span-1 border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4 w-full" />
                </div>
                <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition">Cadastrar</button>
            </form>
            <p className="mt-5">Já tem cadastro clique <Link className="text-red-500 font-semibold" to="/login">aqui</Link></p>
        </LoginRegisterContainer>
    )
}

export default Register;