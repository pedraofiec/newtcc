import React from "react";
import { useNavigate } from "react-router-dom";

export default function EscolaHomeScreen() {
  const navigate = useNavigate();

  // 🔹 Depois você troca esse mock por dados vindos da API
  const estudantes = [
    { id: 1, nome: "João Silva", turma: "5º ano A" },
    { id: 2, nome: "Maria Clara", turma: "3º ano B" },
    { id: 3, nome: "Pedro Santos", turma: "4º ano C" },
    { id: 4, nome: "Ana Beatriz", turma: "2º ano A" },
  ];

  return (
    <div className="w-full min-h-full px-6 py-6 flex flex-col">
      {/* Título estilo Figma */}
      <div className="flex justify-center mb-10">
        <div className="bg-[#73C8D5] px-10 py-3 rounded-full text-white shadow-md text-lg font-semibold tracking-wide">
          ESTUDANTES
        </div>
      </div>

      {/* Grid de estudantes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {estudantes.map((aluno) => (
          <div
            key={aluno.id}
            className="bg-[#73C8D5] rounded-[32px] px-8 py-8 flex flex-col items-center shadow-lg"
          >
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-[#C1D4FF] flex items-center justify-center mb-6">
              <span className="text-4xl text-[#4B4B7C]">👤</span>
            </div>

            {/* Nome */}
            <div className="w-full bg-[#C4F3F5] rounded-full py-2 px-4 mb-2 text-center text-sm text-slate-600">
              {aluno.nome}
            </div>

            {/* Turma */}
            <p className="text-xs text-white/90 mb-4">{aluno.turma}</p>

            {/* Botão visualizar perfil do aluno (caso queira tela de perfil depois) */}
            <button
              onClick={() => navigate(`/students/${aluno.id}`)}
              className="mt-auto bg-white text-slate-700 text-sm font-semibold px-5 py-2 rounded-full shadow hover:bg-slate-100 transition"
            >
              Visualizar perfil
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
