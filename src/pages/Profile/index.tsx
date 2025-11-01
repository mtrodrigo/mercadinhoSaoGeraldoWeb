import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const Profile = () => {
  const {
    user,
    contact,
    updateProfile,
    updateContact,
    isLoading,
    refreshProfile,
  } = useAuth();
  const [nome, setNome] = useState(user?.nome ?? "");
  const [cpf, setCpf] = useState(user?.cpf ?? "");
  const [telefone, setTelefone] = useState(contact?.telefone ?? "");
  const [cep, setCep] = useState(contact?.cep ?? "");
  const [logradouro, setLogradouro] = useState(contact?.logradouro ?? "");
  const [numero, setNumero] = useState(contact?.numero ?? "");
  const [bairro, setBairro] = useState(contact?.bairro ?? "");
  const [cidade, setCidade] = useState(contact?.cidade ?? "");
  const [estado, setEstado] = useState(contact?.estado ?? "");
  const [complemento, setComplemento] = useState(contact?.complemento ?? "");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setNome(user?.nome ?? "");
    setCpf(user?.cpf ?? "");
  }, [user]);

  useEffect(() => {
    setTelefone(contact?.telefone ?? "");
    setCep(contact?.cep ?? "");
    setLogradouro(contact?.logradouro ?? "");
    setNumero(contact?.numero ?? "");
    setBairro(contact?.bairro ?? "");
    setCidade(contact?.cidade ?? "");
    setEstado(contact?.estado ?? "");
    setComplemento(contact?.complemento ?? "");
  }, [contact]);

  const handleProfileSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage(null);
    setErrorMessage(null);

    try {
      await updateProfile({ nome, cpf });
      await refreshProfile();
      setStatusMessage("Dados do perfil atualizados com sucesso!");
    } catch (error) {
      setErrorMessage("Não foi possível atualizar os dados do perfil.");
      console.error(error);
    }
  };

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage(null);
    setErrorMessage(null);

    try {
      await updateContact({
        telefone,
        cep,
        logradouro,
        numero,
        bairro,
        cidade,
        estado,
        complemento,
      });
      setStatusMessage("Contato atualizado com sucesso!");
    } catch (error) {
      setErrorMessage("Não foi possível atualizar o contato.");
      console.error(error);
    }
  };

  if (isLoading && !user) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-green-600">
        Carregando perfil...
      </div>
    );
  }

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-8 rounded-xl border border-green-100 bg-white p-6 shadow-sm">
      <header>
        <h1 className="text-2xl font-semibold text-green-700">
          Informações do Perfil
        </h1>
        <p className="text-sm text-gray-600">
          Atualize seus dados pessoais e endereço para facilitar os pedidos.
        </p>
      </header>

      {statusMessage && (
        <div className="rounded-md border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-700">
          {statusMessage}
        </div>
      )}

      {errorMessage && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
          {errorMessage}
        </div>
      )}

      <form
        onSubmit={handleProfileSubmit}
        className="space-y-4"
        aria-label="Formulário de dados pessoais"
      >
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-600" htmlFor="nome">
            Nome completo
          </label>
          <input
            id="nome"
            name="nome"
            type="text"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            className="w-full rounded-md border border-green-200 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-600" htmlFor="cpf">
            CPF
          </label>
          <input
            id="cpf"
            name="cpf"
            type="text"
            value={cpf}
            onChange={(event) => setCpf(event.target.value)}
            placeholder="000.000.000-00"
            className="w-full rounded-md border border-green-200 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
          />
        </div>
        <button
          type="submit"
          className="rounded-full bg-green-600 px-6 py-2 font-medium text-white transition hover:bg-green-700"
        >
          Salvar alterações do perfil
        </button>
      </form>

      <form
        onSubmit={handleContactSubmit}
        className="space-y-4"
        aria-label="Formulário de contato e endereço"
      >
        <h2 className="text-xl font-semibold text-green-700">Contato</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600" htmlFor="telefone">
              Telefone
            </label>
            <input
              id="telefone"
              name="telefone"
              type="tel"
              value={telefone}
              onChange={(event) => setTelefone(event.target.value)}
              className="w-full rounded-md border border-green-200 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600" htmlFor="cep">
              CEP
            </label>
            <input
              id="cep"
              name="cep"
              type="text"
              value={cep}
              onChange={(event) => setCep(event.target.value)}
              className="w-full rounded-md border border-green-200 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          <div className="md:col-span-3">
            <label className="mb-1 block text-sm font-medium text-gray-600" htmlFor="logradouro">
              Logradouro
            </label>
            <input
              id="logradouro"
              name="logradouro"
              type="text"
              value={logradouro}
              onChange={(event) => setLogradouro(event.target.value)}
              className="w-full rounded-md border border-green-200 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600" htmlFor="numero">
              Número
            </label>
            <input
              id="numero"
              name="numero"
              type="text"
              value={numero}
              onChange={(event) => setNumero(event.target.value)}
              className="w-full rounded-md border border-green-200 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600" htmlFor="bairro">
              Bairro
            </label>
            <input
              id="bairro"
              name="bairro"
              type="text"
              value={bairro}
              onChange={(event) => setBairro(event.target.value)}
              className="w-full rounded-md border border-green-200 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600" htmlFor="cidade">
              Cidade
            </label>
            <input
              id="cidade"
              name="cidade"
              type="text"
              value={cidade}
              onChange={(event) => setCidade(event.target.value)}
              className="w-full rounded-md border border-green-200 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600" htmlFor="estado">
              UF
            </label>
            <input
              id="estado"
              name="estado"
              type="text"
              value={estado}
              onChange={(event) => setEstado(event.target.value)}
              maxLength={2}
              className="w-full rounded-md border border-green-200 px-3 py-2 uppercase focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-600" htmlFor="complemento">
            Complemento
          </label>
          <input
            id="complemento"
            name="complemento"
            type="text"
            value={complemento}
            onChange={(event) => setComplemento(event.target.value)}
            className="w-full rounded-md border border-green-200 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
          />
        </div>
        <button
          type="submit"
          className="rounded-full bg-green-600 px-6 py-2 font-medium text-white transition hover:bg-green-700"
        >
          Salvar contato
        </button>
      </form>
    </section>
  );
};

export default Profile;
