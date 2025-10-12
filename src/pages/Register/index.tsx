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
                <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition">Entrar</button>
            </form>
            <p className="mt-5">Não tem cadastro clique <Link className="text-red-500 font-semibold" to="/register">aqui</Link></p>
        </LoginRegisterContainer>
    )
}

export default Register;