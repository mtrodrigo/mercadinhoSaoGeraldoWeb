const Login = () => {
    return(
        <div className="flex flex-col justify-center items-center max-w-2xl mx-auto bg-amber-50 px-3 py-10 rounded-md shadow-md">
            <h1 className="text-xl mb-5 font-semibold text-green-600">Faça o Login</h1>
            <form action="" method="post">
                <input type="email" name="email" id="email" placeholder="Email" className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4 w-full" />
                <input type="password" name="password" id="password" placeholder="Senha" className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4 w-full" />
                <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition">Entrar</button>
            </form>
            <p className="mt-5">Não tem cadastro clique <a className="text-red-500 font-semibold" href="">aqui</a></p>
        </div>
    )
}

export default Login;