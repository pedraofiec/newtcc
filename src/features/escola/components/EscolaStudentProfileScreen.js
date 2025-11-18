// src/features/escola/components/EscolaStudentProfileScreen.js

import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaChevronLeft, FaUserGraduate } from "react-icons/fa";

// 🔹 Mesmo mock de alunos da EscolaHomeScreen (depois troca por API)
const estudantes = [
  { id: 1, nome: "João Silva", turma: "5º ano A", responsavel: "Carlos Silva", telefone: "(19) 99999-1111" },
  { id: 2, nome: "Maria Clara", turma: "3º ano B", responsavel: "Fernanda Clara", telefone: "(19) 99999-2222" },
  { id: 3, nome: "Pedro Santos", turma: "4º ano C", responsavel: "Joana Santos", telefone: "(19) 99999-3333" },
  { id: 4, nome: "Ana Beatriz", turma: "2º ano A", responsavel: "Paulo Beatriz", telefone: "(19) 99999-4444" },
];

const EscolaStudentProfileScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const aluno = estudantes.find((a) => a.id === Number(id));

  if (!aluno) {
    return (
      <div className="w-full min-h-full px-6 py-6 flex flex-col items-center justify-center">
        <p className="text-slate-700 mb-4">Aluno não encontrado.</p>
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
            <p className="text-sm text-slate-500">{aluno.turma}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoField label="Nome do estudante" value={aluno.nome} />
          <InfoField label="Turma" value={aluno.turma} />
          <InfoField label="Responsável" value={aluno.responsavel} />
          <InfoField label="Telefone do responsável" value={aluno.telefone} />
        </div>

        {/* Aqui depois você pode colocar mais coisas: endereço, observações, etc */}
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
