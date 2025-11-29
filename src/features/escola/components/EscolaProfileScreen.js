// src/features/escola/components/EscolaProfileScreen.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaSchool, FaSave, FaEdit } from "react-icons/fa";

// 🔗 Service de escolas
import {
  listarEscolas,
  atualizarEscola,
} from "../service/EscolaService";


const EscolaProfileScreen = () => {
  const navigate = useNavigate();

  // Estado com dados da escola
  const [escola, setEscola] = useState(null); // começa sem dados
  const [escolaId, setEscolaId] = useState(null);

  // Estado de modo (visualização x edição)
  const [isEditing, setIsEditing] = useState(false);

  // Estado do formulário (edição)
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [diretor, setDiretor] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingInicial, setLoadingInicial] = useState(true);
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(false);

  // 🔹 Carrega dados da escola na montagem
  useEffect(() => {
    async function carregarEscola() {
      try {
        setLoadingInicial(true);
        setErro(null);

        // 👉 Aqui estou usando listarEscolas() e pegando a primeira
        // escola como exemplo. Em produção, o ideal é buscar a
        // escola associada ao usuário logado (ex.: via /users/me).
        const data = await listarEscolas();

        if (!data || data.length === 0) {
          setErro("Nenhuma escola encontrada na API.");
          return;
        }

        const primeira = data[0];

        const escolaFormatada = {
          nome: primeira.nome || "",
          email: primeira.email || "",
          telefone: primeira.telefone || "",
          endereco: primeira.endereco || "",
          diretor: primeira.diretor || "",
        };

        setEscola(escolaFormatada);
        setEscolaId(primeira.id);

        // Preenche o formulário com os dados carregados
        setNome(escolaFormatada.nome);
        setEmail(escolaFormatada.email);
        setTelefone(escolaFormatada.telefone);
        setEndereco(escolaFormatada.endereco);
        setDiretor(escolaFormatada.diretor);
      } catch (err) {
        console.error("Erro ao carregar dados da escola:", err);
        setErro("Erro ao carregar dados da escola. Tente novamente.");
      } finally {
        setLoadingInicial(false);
      }
    }

    carregarEscola();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro(null);
    setSucesso(false);

    try {
      if (!escolaId) {
        throw new Error("ID da escola não disponível.");
      }

      // Payload para o backend (ajuste os nomes conforme o seu DTO)
      const payload = {
        nome,
        email,
        telefone,
        endereco,
        diretor,
      };

      // 🔸 Chamada real de API
      const escolaAtualizada = await atualizarEscola(escolaId, payload);

      // Ajuste se o backend devolver outros nomes de campos
      const escolaFormatada = {
        nome: escolaAtualizada.nome || nome,
        email: escolaAtualizada.email || email,
        telefone: escolaAtualizada.telefone || telefone,
        endereco: escolaAtualizada.endereco || endereco,
        diretor: escolaAtualizada.diretor || diretor,
      };

      setEscola(escolaFormatada);
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
    if (escola) {
      // Volta os campos do formulário para o que estava salvo
      setNome(escola.nome);
      setEmail(escola.email);
      setTelefone(escola.telefone);
      setEndereco(escola.endereco);
      setDiretor(escola.diretor);
    }
    setErro(null);
    setIsEditing(false);
  };

  // 🔄 Loading inicial
  if (loadingInicial) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-slate-600 text-sm">Carregando dados da escola...</p>
      </div>
    );
  }

  // ❌ Não conseguiu carregar
  if (!escola && erro) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-slate-700 mb-4">{erro}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-[#8AD7E1] text-white px-4 py-2 rounded-full text-sm font-semibold shadow"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

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
          {!isEditing && escola && (
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
                  <p className="text-sm text-gray-500">
                    {escola.diretor || "Diretor(a) não informado(a)"}
                  </p>
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
