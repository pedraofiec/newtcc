// src/features/escola/components/EscolaHomeScreen.js

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 

// Importa API e o service da escola para identificação
import api from "../../shared/utils/api";
import { listarEscolas } from "../service/EscolaService";

export default function EscolaHomeScreen() {
  const navigate = useNavigate();

  const [estudantes, setEstudantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  // 1. Normaliza dados para garantir array
  function normalizeData(payload) {
    if (!payload) return [];
    if (Array.isArray(payload)) return payload;
    if (payload.content && Array.isArray(payload.content)) return payload.content;
    if (payload.data && Array.isArray(payload.data)) return payload.data;
    if (payload.items && Array.isArray(payload.items)) return payload.items;
    
    // Tratamento para Spring HATEOAS
    if (payload._embedded) {
      const keys = Object.keys(payload._embedded);
      if (keys.length > 0 && Array.isArray(payload._embedded[keys[0]])) {
        return payload._embedded[keys[0]];
      }
    }
    return [];
  }

  // 2. Identifica o usuário (Prioriza Token para evitar dados antigos)
  function getIdentificadorUsuario() {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Pega ID ou Email do token
        return decoded.id || decoded.userId || decoded.escolaId || decoded.sub;
      } catch (e) {
        console.error("Erro token", e);
      }
    }
    // Fallback para storage se não tiver token
    return localStorage.getItem("escolaId");
  }

  useEffect(() => {
    async function carregarAlunos() {
      try {
        setLoading(true);
        setErro(null);

        // --- PASSO A: Descobrir QUEM é a escola logada ---
        let identificador = getIdentificadorUsuario();
        let idEscolaLogada = identificador;
        let nomeEscolaLogada = "";

        if (!identificador) {
          throw new Error("Sessão não encontrada.");
        }

        // Se o identificador for email (devido ao bug do login), buscamos o ID real
        if (String(identificador).includes("@")) {
            console.log("Identificador é email. Buscando dados da escola...");
            const resEscolas = await listarEscolas();
            const listaEscolas = normalizeData(resEscolas);
            
            const emailBuscado = String(identificador).trim().toLowerCase();
            const nomeUsuario = emailBuscado.split("@")[0];

            // Tenta achar a escola na lista
            let escolaEncontrada = listaEscolas.find(e => {
                const mail = e.email || e.emailEscola;
                return mail && String(mail).trim().toLowerCase() === emailBuscado;
            });

            if (!escolaEncontrada) {
                // Fallback por nome
                escolaEncontrada = listaEscolas.find(e => 
                    String(e.nome || "").toLowerCase().includes(nomeUsuario)
                );
            }

            if (escolaEncontrada) {
                idEscolaLogada = escolaEncontrada.id;
                nomeEscolaLogada = escolaEncontrada.nome;
                // Corrige o storage
                localStorage.setItem("escolaId", idEscolaLogada);
                localStorage.setItem("userId", idEscolaLogada);
            }
        } else {
            // Se já temos o ID, vamos tentar pegar o nome dela na lista (para ajudar no filtro)
            try {
                const resEscolas = await listarEscolas();
                const lista = normalizeData(resEscolas);
                const esc = lista.find(e => String(e.id) === String(identificador));
                if (esc) nomeEscolaLogada = esc.nome;
            } catch (e) { console.warn("Não foi possível buscar nome da escola"); }
        }

        console.log("Escola Identificada:", idEscolaLogada, nomeEscolaLogada);

        // --- PASSO B: Buscar ALUNOS via RESPONSÁVEIS (Rota Segura) ---
        // A rota /v1/api/alunos está quebrada (Erro 500), então usamos essa:
        const response = await api.get("/responsaveis"); 
        const listaResponsaveis = normalizeData(response.data || response);

        console.log("Total de Responsáveis encontrados:", listaResponsaveis.length);

        // Extrai todas as crianças de todos os pais numa única lista
        const todosAlunos = listaResponsaveis.flatMap(resp => 
            resp.dependentes || resp.criancas || resp.children || []
        );

        console.log("Total de Alunos no sistema:", todosAlunos.length);

        // --- PASSO C: Filtrar alunos desta escola ---
        const alunosDaMinhaEscola = todosAlunos.filter(aluno => {
            // 1. Tenta comparar pelo ID da escola (se o aluno tiver esse campo)
            const idEscolaDoAluno = aluno.escolaId || (aluno.escola && aluno.escola.id);
            
            if (idEscolaDoAluno && String(idEscolaDoAluno) === String(idEscolaLogada)) {
                return true;
            }

            // 2. Tenta comparar pelo NOME da escola (caso o ID falhe ou venha nulo)
            const nomeEscolaDoAluno = aluno.escola || (aluno.escola && aluno.escola.nome) || aluno.nomeEscola;
            
            if (nomeEscolaLogada && nomeEscolaDoAluno) {
                return String(nomeEscolaDoAluno).trim().toLowerCase() === String(nomeEscolaLogada).trim().toLowerCase();
            }

            return false;
        });

        console.log("Alunos filtrados para esta escola:", alunosDaMinhaEscola.length);

        // Formata para exibir
        const alunosFormatados = alunosDaMinhaEscola.map((aluno) => ({
          id: aluno.id || aluno.alunoId,
          nome: aluno.nome || aluno.nomeCompleto || "Nome não informado",
          turma: aluno.turma || aluno.serie || "Turma não informada",
        }));

        setEstudantes(alunosFormatados);

      } catch (err) {
        console.error("Erro ao carregar lista:", err);
        // Não mostra erro fatal, apenas lista vazia para não travar a tela
        setEstudantes([]);
      } finally {
        setLoading(false);
      }
    }

    carregarAlunos();
  }, []);

  return (
    <div className="w-full min-h-full px-6 py-6 flex flex-col font-sans">
      <div className="flex justify-center mb-10">
        <div className="bg-[#73C8D5] px-10 py-3 rounded-full text-white shadow-md text-lg font-semibold tracking-wide">
          ESTUDANTES MATRICULADOS
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

      {!loading && !erro && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {estudantes.length > 0 ? (
            estudantes.map((aluno) => (
              <div
                key={aluno.id}
                className="bg-[#73C8D5] rounded-[32px] px-6 py-8 flex flex-col items-center shadow-lg transform hover:scale-105 transition duration-300"
              >
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full bg-[#C1D4FF] flex items-center justify-center mb-4 border-4 border-white/20">
                  <span className="text-4xl">🎓</span>
                </div>

                {/* Nome */}
                <div className="w-full bg-[#C4F3F5] rounded-full py-2 px-4 mb-3 text-center shadow-inner">
                  <span className="text-sm font-bold text-slate-700 block truncate">
                    {aluno.nome}
                  </span>
                </div>

                {/* Turma */}
                <div className="bg-white/20 px-4 py-1 rounded-full mb-4">
                    <p className="text-xs text-white font-medium">{aluno.turma}</p>
                </div>

                {/* Botão */}
                <button
                  onClick={() => navigate(`/students/${aluno.id}`)}
                  className="mt-auto bg-white text-[#73C8D5] text-sm font-bold px-6 py-2 rounded-full shadow hover:bg-slate-50 transition"
                >
                  Ver Perfil
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center bg-gray-100 rounded-2xl p-8 border border-dashed border-gray-300">
                <p className="text-slate-500 font-medium">Nenhum estudante encontrado.</p>
                <p className="text-xs text-slate-400 mt-2">
                    Verifique se os responsáveis já vincularam os alunos à esta escola.
                </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}