import type { FormEvent } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import LoginRegisterContainer from "../../components/containers/LoginRegisterContainer";
import { useAuth } from "../../contexts/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cpf: "",
    password: "",
    confirmPassword: "",
    telefone: "",
    cep: "",
    logradouro: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    complemento: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas informadas não coincidem.");
      return;
    }

    setIsSubmitting(true);
    try {
      await registerUser({
        nome: formData.nome,
        email: formData.email,
        password: formData.password,
        cpf: formData.cpf,
        contato: {
          telefone: formData.telefone || undefined,
          cep: formData.cep || undefined,
          logradouro: formData.logradouro || undefined,
          numero: formData.numero || undefined,
          bairro: formData.bairro || undefined,
          cidade: formData.cidade || undefined,
          estado: formData.estado || undefined,
          complemento: formData.complemento || undefined,
        },
      });
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Não foi possível concluir o cadastro. Verifique as informações e tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LoginRegisterContainer>
      <h1 className="text-2xl font-semibold text-green-700">Crie sua conta</h1>
      <p className="mt-1 text-sm text-gray-600">
        Cadastre-se para comprar com praticidade e acompanhar seus pedidos.
      </p>
      <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600" htmlFor="nome">
              Nome completo
            </label>
            <input
              id="nome"
              name="nome"
              required
              value={formData.nome}
              onChange={handleChange}
              className="rounded-md border border-green-200 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="rounded-md border border-green-200 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-1 sm:col-span-2">
            <label className="text-sm font-medium text-gray-600" htmlFor="cpf">
              CPF
            </label>
            <input
              id="cpf"
              name="cpf"
              required
              value={formData.cpf}
              onChange={handleChange}
              placeholder="000.000.000-00"
              className="rounded-md border border-green-200 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600" htmlFor="telefone">
              Telefone
            </label>
            <input
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="(00) 00000-0000"
              className="rounded-md border border-green-200 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="rounded-md border border-green-200 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600" htmlFor="confirmPassword">
              Confirmar senha
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="rounded-md border border-green-200 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600" htmlFor="cep">
              CEP
            </label>
            <input
              id="cep"
              name="cep"
              value={formData.cep}
              onChange={handleChange}
              className="rounded-md border border-green-200 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600" htmlFor="logradouro">
              Logradouro
            </label>
            <input
              id="logradouro"
              name="logradouro"
              value={formData.logradouro}
              onChange={handleChange}
              className="rounded-md border border-green-200 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="flex flex-col gap-1 sm:col-span-3">
            <label className="text-sm font-medium text-gray-600" htmlFor="bairro">
              Bairro
            </label>
            <input
              id="bairro"
              name="bairro"
              value={formData.bairro}
              onChange={handleChange}
              className="rounded-md border border-green-200 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600" htmlFor="numero">
              Número
            </label>
            <input
              id="numero"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              className="rounded-md border border-green-200 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600" htmlFor="cidade">
              Cidade
            </label>
            <input
              id="cidade"
              name="cidade"
              value={formData.cidade}
              onChange={handleChange}
              className="rounded-md border border-green-200 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600" htmlFor="estado">
              Estado
            </label>
            <input
              id="estado"
              name="estado"
              maxLength={2}
              value={formData.estado}
              onChange={handleChange}
              className="rounded-md border border-green-200 px-3 py-2 uppercase focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />
          </div>
          <div className="flex flex-col gap-1 sm:col-span-1">
            <label className="text-sm font-medium text-gray-600" htmlFor="complemento">
              Complemento
            </label>
            <input
              id="complemento"
              name="complemento"
              value={formData.complemento}
              onChange={handleChange}
              className="rounded-md border border-green-200 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />
          </div>
        </div>
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
          {isSubmitting ? "Cadastrando..." : "Criar conta"}
        </button>
      </form>
      <p className="mt-6 text-sm text-gray-600">
        Já possui cadastro? {" "}
        <Link to="/login" className="font-semibold text-green-700 hover:underline">
          Acesse sua conta
        </Link>
      </p>
    </LoginRegisterContainer>
  );
};

export default Register;