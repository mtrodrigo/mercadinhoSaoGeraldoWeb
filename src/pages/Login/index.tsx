import type { FormEvent } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import LoginRegisterContainer from "../../components/containers/LoginRegisterContainer";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = (location.state as { from?: string } | null)?.from ?? "/";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError("Não foi possível autenticar. Verifique suas credenciais e tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LoginRegisterContainer>
      <h1 className="text-2xl font-semibold text-green-700">Acesse sua conta</h1>
      <p className="mt-1 text-sm text-gray-600">
        Entre com seu e-mail e senha para acompanhar pedidos e novidades.
      </p>
      <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="text-sm font-medium text-gray-600" htmlFor="email">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-md border border-green-200 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
        />
        <label className="text-sm font-medium text-gray-600" htmlFor="password">
          Senha
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-md border border-green-200 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
        />
        {error && (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="mt-2 w-full rounded-full bg-green-600 px-4 py-2 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Entrando..." : "Entrar"}
        </button>
      </form>
      <p className="mt-6 text-sm text-gray-600">
        Ainda não tem uma conta? {" "}
        <Link to="/register" className="font-semibold text-green-700 hover:underline">
          Cadastre-se agora
        </Link>
      </p>
    </LoginRegisterContainer>
  );
};

export default Login;