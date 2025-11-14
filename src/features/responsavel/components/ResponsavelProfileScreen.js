import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaUser, FaSave, FaEdit } from "react-icons/fa";

const ResponsavelProfileScreen = () => {
  const navigate = useNavigate();

  // Mock inicial – substituir com dados da API no futuro
  const [profile, setProfile] = useState({
    nome: "Ana Paula de Souza",
    email: "ana.responsavel@gmail.com",
    telefone: "(11) 99876-5432",
    cpf: "123.456.789-00",
    endereco: "Rua das Acácias, 250 – Jardim Europa, Indaiatuba",
    dependentes: 2,
    role: "Responsável",
  });

  // Controle de edição
  const [isEditing, setIsEditing] = useState(false);

  // Form editável
  const [nome, setNome] = useState(profile.nome);
  const [email, setEmail] = useState(profile.email);
  const [telefone, setTelefone] = useState(profile.telefone);
  const [cpf, setCpf] = useState(profile.cpf);
  const [endereco, setEndereco] = useState(profile.endereco);
  const [dependentes, setDependentes] = useState(profile.dependentes);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const salvar = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    setTimeout(() => {
      setProfile({
        ...profile,
        nome,
        email,
        telefone,
        cpf,
        endereco,
        dependentes,
      });

      setLoading(false);
      setSuccess(true);
      setIsEditing(false);
    }, 1000);
  };

  const cancelar = () => {
    setNome(profile.nome);
    setEmail(profile.email);
    setTelefone(profile.telefone);
    setCpf(profile.cpf);
    setEndereco(profile.endereco);
    setDependentes(profile.dependentes);
    setIsEditing(false);
  };

  return (
    <div className="w-full flex flex-col items-center font-sans">
      <div className="w-full max-w-3xl mt-6 px-4 md:px-0">

        {/* Voltar */}
        <button
          onClick={() => navigate("/home")}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium"
        >
          <FaChevronLeft className="mr-2" /> Voltar ao Painel
        </button>

        {/* Header da página */}
        <div className="flex items-center gap-2 mb-1">
          <FaUser className="text-2xl text-[#8AD7E1]" />
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-800">
            {isEditing ? "Editar Perfil do Responsável" : "Meu Perfil de Responsável"}
          </h1>
        </div>

        <p className="text-sm text-slate-500 mb-4">
          {isEditing
            ? "Atualize suas informações pessoais."
            : "Veja suas informações cadastradas na plataforma."}
        </p>

        <hr className="border-slate-200 mb-5" />

        {/* Card principal */}
        <div className="bg-white rounded-3xl shadow-md p-5 md:p-7">

          {success && (
            <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">
              Perfil atualizado com sucesso!
            </div>
          )}

          {/* =================== VISUALIZAÇÃO =================== */}
          {!isEditing && (
            <div className="flex flex-col items-center gap-6">

              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-sky-100 flex items-center justify-center">
                <span className="text-3xl text-sky-700">👩‍👧</span>
              </div>

              {/* Nome e role */}
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-800">{profile.nome}</p>
                <p className="text-sm text-gray-500">{profile.role}</p>
              </div>

              {/* Cards dos dados */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">

                <Field label="Nome Completo" value={profile.nome} />
                <Field label="E-mail" value={profile.email} />
                <Field label="Telefone" value={profile.telefone} />
                <Field label="CPF" value={profile.cpf} />
                <Field label="Dependentes cadastrados" value={profile.dependentes} />
                <Field label="Endereço" value={profile.endereco} full />

              </div>

              {/* Botão Editar */}
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#8AD7E1] text-sm font-semibold text-white hover:bg-[#7bc8d2] transition"
              >
                <FaEdit /> Editar perfil
              </button>

            </div>
          )}

          {/* =================== EDIÇÃO =================== */}
          {isEditing && (
            <form onSubmit={salvar} className="space-y-4">
              <Input label="Nome completo" value={nome} setter={setNome} />
              <Input label="E-mail" type="email" value={email} setter={setEmail} />
              <Input label="Telefone" value={telefone} setter={setTelefone} />
              <Input label="CPF" value={cpf} setter={setCpf} />
              <Input label="Endereço" value={endereco} setter={setEndereco} />
              <Input
                label="Dependentes cadastrados"
                type="number"
                value={dependentes}
                setter={setDependentes}
              />

              {/* Botões */}
              <div className="flex flex-col-reverse md:flex-row md:justify-end gap-3 mt-4">

                <button
                  type="button"
                  onClick={cancelar}
                  className="w-full md:w-auto px-5 py-2.5 rounded-full border border-slate-300 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full md:w-auto flex items-center justify-center gap-2 py-2.5 px-5 rounded-full text-sm font-semibold text-white shadow-md transition ${
                    loading
                      ? "bg-slate-400 cursor-not-allowed"
                      : "bg-[#8AD7E1] hover:bg-[#7bc8d2]"
                  }`}
                >
                  <FaSave />
                  {loading ? "Salvando..." : "Salvar alterações"}
                </button>

              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};

// COMPONENTES REUTILIZADOS
function Field({ label, value, full }) {
  return (
    <div className={full ? "md:col-span-2 flex flex-col" : "flex flex-col"}>
      <span className="text-xs font-semibold text-slate-600 mb-1">{label}</span>
      <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800">
        {value}
      </div>
    </div>
  );
}

function Input({ label, value, setter, type = "text" }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => setter(e.target.value)}
        className="mt-1 block w-full border border-slate-200 rounded-lg px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#8AD7E1] focus:border-[#8AD7E1] outline-none"
      />
    </div>
  );
}

export default ResponsavelProfileScreen;
