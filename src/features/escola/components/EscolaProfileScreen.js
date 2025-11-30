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

  const [escola, setEscola] = useState(null);
  const [escolaId, setEscolaId] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cnpj, setCnpj] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingInicial, setLoadingInicial] = useState(true);
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(false);

  // 🔹 Carrega dados da escola
  useEffect(() => {
    async function carregarEscola() {
      try {
        setLoadingInicial(true);
        setErro(null);

        const data = await listarEscolas();

        if (!data || data.length === 0) {
          setErro("Nenhuma escola encontrada na API.");
          return;
        }

        const primeira = data[0];

        // 👉 Usa os dados EXATAMENTE como chegam do backend
        setEscola(primeira);
        setEscolaId(primeira.id);

        setNome(primeira.nome || "");
        setEmail(primeira.email || "");
        setTelefone(primeira.telefone || "");
        setEndereco(primeira.endereco || "");
        setCnpj(primeira.cnpj || "");

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
      if (!escolaId) throw new Error("ID da escola não disponível.");

      const payload = {
        nome,
        email,
        telefone,
        endereco,
        cnpj,
      };

      const escolaAtualizada = await atualizarEscola(escolaId, payload);

      // Atualiza localmente
      setEscola({
        nome: escolaAtualizada.nome || nome,
        email: escolaAtualizada.email || email,
        telefone: escolaAtualizada.telefone || telefone,
        endereco: escolaAtualizada.endereco || endereco,
        cnpj: escolaAtualizada.cnpj || cnpj,
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
    if (escola) {
      setNome(escola.nome);
      setEmail(escola.email);
      setTelefone(escola.telefone);
      setEndereco(escola.endereco);
      setCnpj(escola.cnpj);
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

  // ❌ Falha ao carregar
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

        <button
          onClick={() => navigate("/home")}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium"
        >
          <FaChevronLeft className="mr-2" /> Voltar à Página inicial
        </button>

        <div className="flex items-center gap-2 mb-1">
          <FaSchool className="text-2xl text-[#8AD7E1]" />
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-800">
            {isEditing ? "Editar dados da Escola" : "Perfil da Escola"}
          </h1>
        </div>

        <hr className="border-slate-200 mb-5" />

        <div className="bg-white rounded-3xl shadow-md p-5 md:p-7">

          {/* ALERTAS */}
          {erro && (
            <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
              {erro}
            </div>
          )}
          {sucesso && (
            <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">
              Dados atualizados com sucesso!
            </div>
          )}

          {/* ========== MODO VISUALIZAÇÃO ========== */}
          {!isEditing && escola && (
            <div className="flex flex-col gap-6">

              <div className="flex flex-col items-center gap-3">
                <div className="w-20 h-20 rounded-full bg-sky-100 flex items-center justify-center">
                  <span className="text-3xl text-sky-700">🏫</span>
                </div>
                <p className="text-lg font-semibold text-gray-800">
                  {escola.nome}
                </p>
              </div>

              <div className="w-full">
                <InfoField label="Nome da escola" value={escola.nome} />
                <InfoField label="Telefone" value={escola.telefone || "Não informado"} />
                <InfoField label="E-mail" value={escola.email || "Não informado"} />
                <InfoField label="CNPJ" value={escola.cnpj || "Não informado"} />
                <InfoField label="Endereço" value={escola.endereco} full />
              </div>

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

          {/* ========== MODO EDIÇÃO ========== */}
          {isEditing && (
            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Nome da escola
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="mt-1 block w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  CNPJ
                </label>
                <input
                  type="text"
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                  className="mt-1 block w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    className="mt-1 block w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
                />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Endereço
                </label>
                <textarea
                  rows={3}
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  className="mt-1 block w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
                />
              </div>

              <div className="mt-2 flex flex-col-reverse md:flex-row md:justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCancelarEdicao}
                  className="px-5 py-2.5 rounded-full border border-slate-300 text-sm text-slate-600"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#8AD7E1] text-sm font-semibold text-white"
                >
                  <FaSave /> Salvar
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
    <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800">
      {value}
    </div>
  </div>
);

export default EscolaProfileScreen;
