// src/features/escola/components/EscolaProfileScreen.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaSchool, FaSave, FaEdit } from "react-icons/fa";

const EscolaProfileScreen = () => {
  const navigate = useNavigate();

  // Dados atuais da escola (mock por enquanto – depois você troca por dados da API)
  const [escola, setEscola] = useState({
    nome: "EMEB Profª Francisca Lucinda Bueno",
    email: "emic.francisca@indaiatuba.sp.gov.br",
    telefone: "(19) 99999-1234",
    endereco: "Rua das Acácias, 250 – Jardim Europa, Indaiatuba/SP",
    diretor: "Maria de Souza",
  });

  // Estado de modo (visualização x edição)
  const [isEditing, setIsEditing] = useState(false);

  // Estado do formulário (edição)
  const [nome, setNome] = useState(escola.nome);
  const [email, setEmail] = useState(escola.email);
  const [telefone, setTelefone] = useState(escola.telefone);
  const [endereco, setEndereco] = useState(escola.endereco);
  const [diretor, setDiretor] = useState(escola.diretor);

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro(null);
    setSucesso(false);

    try {
      // 🔸 Aqui entra a chamada real de API (ex: escolaService.updateEscola({...}))
      // const data = await updateEscola({ nome, email, telefone, endereco, diretor });
      // setEscola(data);

      // Mock de delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Atualiza o “estado oficial” da escola
      setEscola({
        nome,
        email,
        telefone,
        endereco,
        diretor,
      });

      setSucesso(true);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      setErro("Erro ao salvar os dados da escola. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelarEdicao = () => {
    // Volta os campos do formulário para o que estava salvo
    setNome(escola.nome);
    setEmail(escola.email);
    setTelefone(escola.telefone);
    setEndereco(escola.endereco);
    setDiretor(escola.diretor);
    setErro(null);
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
          <FaChevronLeft className="mr-2" /> Voltar à Página inicial
        </button>

        {/* Título */}
        <div className="flex items-center gap-2 mb-1">
          <FaSchool className="text-2xl text-[#8AD7E1]" />
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-800">
            {isEditing ? "Editar dados da Escola" : "Perfil da Escola"}
          </h1>
        </div>
        <p className="text-sm text-slate-500 mb-4">
          {isEditing
            ? "Atualize as informações institucionais utilizadas no RotaVan."
            : "Veja os dados cadastrados desta unidade escolar."}
        </p>
        <hr className="border-slate-200 mb-5" />

        <div className="bg-white rounded-3xl shadow-md p-5 md:p-7">
          {erro && (
            <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
              {erro}
            </div>
          )}
          {sucesso && (
            <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">
              Dados da escola atualizados com sucesso!
            </div>
          )}

          {/* ===================== MODO VISUALIZAÇÃO ===================== */}
          {!isEditing && (
            <div className="flex flex-col gap-6">
              {/* Avatar + nome */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-20 h-20 rounded-full bg-sky-100 flex items-center justify-center">
                  <span className="text-3xl text-sky-700">🏫</span>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-800">
                    {escola.nome}
                  </p>
                  <p className="text-sm text-gray-500">{escola.diretor}</p>
                </div>
              </div>

              {/* Infos em “cards” */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoField label="Nome da escola" value={escola.nome} />
                <InfoField label="E-mail" value={escola.email} />
                <InfoField label="Telefone" value={escola.telefone} />
                <InfoField label="Diretor(a)" value={escola.diretor} />
              </div>

              <div className="w-full">
                <InfoField label="Endereço" value={escola.endereco} full />
              </div>

              {/* Botão editar */}
              <div className="flex justify-center mt-2">
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setSucesso(false);
                  }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#8AD7E1] text-sm font-semibold text-white hover:bg-[#7bc8d2] transition"
                >
                  <FaEdit /> Editar informações
                </button>
              </div>
            </div>
          )}

          {/* ===================== MODO EDIÇÃO ===================== */}
          {isEditing && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="nome"
                  className="block text-xs font-semibold text-slate-600 mb-1"
                >
                  Nome da escola
                </label>
                <input
                  id="nome"
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="mt-1 block w-full border border-slate-200 rounded-lg px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#8AD7E1] focus:border-[#8AD7E1] outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold text-slate-600 mb-1"
                  >
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full border border-slate-200 rounded-lg px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#8AD7E1] focus:border-[#8AD7E1] outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="telefone"
                    className="block text-xs font-semibold text-slate-600 mb-1"
                  >
                    Telefone
                  </label>
                  <input
                    id="telefone"
                    type="tel"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    className="mt-1 block w-full border border-slate-200 rounded-lg px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#8AD7E1] focus:border-[#8AD7E1] outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="diretor"
                  className="block text-xs font-semibold text-slate-600 mb-1"
                >
                  Diretor(a)
                </label>
                <input
                  id="diretor"
                  type="text"
                  value={diretor}
                  onChange={(e) => setDiretor(e.target.value)}
                  className="mt-1 block w-full border border-slate-200 rounded-lg px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#8AD7E1] focus:border-[#8AD7E1] outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="endereco"
                  className="block text-xs font-semibold text-slate-600 mb-1"
                >
                  Endereço
                </label>
                <textarea
                  id="endereco"
                  rows={3}
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  className="mt-1 block w-full border border-slate-200 rounded-lg px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#8AD7E1] focus:border-[#8AD7E1] outline-none resize-none"
                />
              </div>

              <div className="mt-2 flex flex-col-reverse md:flex-row md:justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCancelarEdicao}
                  disabled={loading}
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

const InfoField = ({ label, value, full = false }) => (
  <div className={full ? "w-full" : ""}>
    <span className="text-xs font-semibold text-slate-600 mb-1 block">
      {label}
    </span>
    <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 break-words">
      {value}
    </div>
  </div>
);

export default EscolaProfileScreen;
