// src/features/escola/components/EscolaHomeScreen.js

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Importa o service de escolas
import { buscarEscolaPorId } from "../service/EscolaService";

export default function EscolaHomeScreen() {
  const navigate = useNavigate();

  const [estudantes, setEstudantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarAlunos() {
      try {
        setLoading(true);
        setErro(null);

        // 👉 ID da escola logada (ajuste conforme seu fluxo de login)
        const escolaId = localStorage.getItem("escolaId");
        if (!escolaId) {
          throw new Error("ID da escola não encontrado (escolaId).");
        }

        // Chama o backend
        const escola = await buscarEscolaPorId(escolaId);

        // Tenta encontrar o array de alunos/crianças dentro do retorno
        const listaBruta =
          escola.criancas || escola.alunos || escola.estudantes || [];

        const alunosFormatados = listaBruta.map((aluno) => ({
          id: aluno.id,
          nome: aluno.nome,
          turma:
            aluno.turma ||
            aluno.serie ||
            aluno.nivelEscolar ||
            "Turma não informada",
        }));

        setEstudantes(alunosFormatados);
      } catch (err) {
        console.error("Erro ao carregar estudantes da escola:", err);
        setErro("Erro ao carregar estudantes. Tente novamente mais tarde.");
        setEstudantes([]); // sem mock, só lista vazia
      } finally {
        setLoading(false);
      }
    }

    carregarAlunos();
  }, []);

  return (
    <div className="w-full min-h-full px-6 py-6 flex flex-col">
      {/* Título estilo Figma */}
      <div className="flex justify-center mb-10">
        <div className="bg-[#73C8D5] px-10 py-3 rounded-full text-white shadow-md text-lg font-semibold tracking-wide">
          ESTUDANTES
        </div>
      </div>

      {loading && (
        <p className="text-center text-sm text-slate-600">
          Carregando estudantes...
        </p>
      )}

      {erro && !loading && (
        <p className="text-center text-sm text-red-600 mb-4">{erro}</p>
      )}

      {!loading && (
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

              {/* Botão visualizar perfil */}
              <button
                onClick={() => navigate(`/students/${aluno.id}`)}
                className="mt-auto bg-white text-slate-700 text-sm font-semibold px-5 py-2 rounded-full shadow hover:bg-slate-100 transition"
              >
                Visualizar perfil
              </button>
            </div>
          ))}

          {estudantes.length === 0 && !erro && (
            <p className="col-span-full text-center text-sm text-slate-500">
              Nenhum estudante cadastrado para esta escola.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
