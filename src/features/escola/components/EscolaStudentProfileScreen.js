// src/features/escola/components/EscolaStudentProfileScreen.js

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaChevronLeft, FaUserGraduate } from "react-icons/fa";

// 🔗 Service que busca um dependente/aluno pelo ID
// (ajuste o caminho/nome da função se estiver diferente no seu projeto)
import { getDependenteById } from "../../responsavel/services/ResponsavelService";

const EscolaStudentProfileScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [aluno, setAluno] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarAluno() {
      try {
        setLoading(true);
        setErro(null);

        // Chamada ao backend: GET /responsaveis/dependentes/criancas/{id}
        const data = await getDependenteById(id);

        // Aqui faço um "mapeamento" genérico.
        // Ajuste os campos conforme o DTO que o backend realmente retorna.
        const alunoFormatado = {
          id: data.id,
          nome: data.nome || data.nomeCrianca || "",
          turma: data.turma || data.serie || data.nivelEscolar || "",
          responsavel:
            (data.responsavel && data.responsavel.nomeResponsavel) ||
            data.nomeResponsavel ||
            "",
          telefone:
            (data.responsavel && data.responsavel.telefone) ||
            data.telefoneResponsavel ||
            data.telefone ||
            "",
        };

        setAluno(alunoFormatado);
      } catch (e) {
        console.error("Erro ao carregar aluno:", e);
        setErro("Não foi possível carregar os dados do aluno.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      carregarAluno();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="w-full min-h-full px-6 py-6 flex flex-col items-center justify-center">
        <p className="text-slate-600 text-sm">Carregando dados do aluno...</p>
      </div>
    );
  }

  if (erro || !aluno) {
    return (
      <div className="w-full min-h-full px-6 py-6 flex flex-col items-center justify-center">
        <p className="text-slate-700 mb-4">
          {erro || "Aluno não encontrado."}
        </p>
        <button
          onClick={() => navigate(-1)}
          className="bg-[#73C8D5] text-white px-4 py-2 rounded-full text-sm font-semibold shadow"
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-full px-6 py-6 flex flex-col max-w-3xl mx-auto">
      {/* Cabeçalho com voltar */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-600 text-sm mb-6 hover:text-slate-800 transition"
      >
        <FaChevronLeft className="text-xs" />
        Voltar para lista de estudantes
      </button>

      {/* Card principal */}
      <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6 md:p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-[#C1D4FF] flex items-center justify-center">
            <FaUserGraduate className="text-3xl text-[#4B4B7C]" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-800">
              {aluno.nome}
            </h1>
            <p className="text-sm text-slate-500">
              {aluno.turma || "Turma não informada"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoField label="Nome do estudante" value={aluno.nome} />
          <InfoField
            label="Turma / Nível escolar"
            value={aluno.turma || "—"}
          />
          <InfoField
            label="Responsável"
            value={aluno.responsavel || "—"}
          />
          <InfoField
            label="Telefone do responsável"
            value={aluno.telefone || "—"}
          />
        </div>

        {/* Aqui depois você pode colocar mais campos: endereço, observações, histórico de viagens etc. */}
      </div>
    </div>
  );
};

const InfoField = ({ label, value }) => (
  <div>
    <span className="text-xs font-semibold text-slate-600 mb-1 block">
      {label}
    </span>
    <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 break-words">
      {value}
    </div>
  </div>
);

export default EscolaStudentProfileScreen;
