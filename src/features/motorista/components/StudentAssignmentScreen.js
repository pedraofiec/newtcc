// src/features/motorista/components/StudentAssignmentScreen.js
import React, { useState, useEffect } from "react";
import { listarRotasDaSolicitacao } from "../services/SolicitacoesService";
import { listarRotas } from "../../rotas/services/RotaService";// <-- NOVO

// Botão padrão (mesmo estilo que usamos em outras telas)
const RotaVanButton = ({ children, color = "blue", onClick }) => {
  const colors = {
    red: "text-red-600 hover:text-red-800 border-red-600 hover:bg-red-100",
    green: "text-green-600 hover:text-green-800 border-green-600 hover:bg-green-100",
    blue: "text-blue-600 hover:text-blue-800 border-blue-600 hover:bg-blue-100",
    gray: "text-gray-600 hover:text-gray-800 border-gray-600 hover:bg-gray-100",
  };

  return (
    <button
      onClick={onClick}
      className={`text-sm font-medium transition duration-200 px-4 py-1 rounded-full border ${colors[color]}`}
    >
      {children}
    </button>
  );
};

// função auxiliar para mapear o aluno que vem da API
const mapAlunoToStudent = (aluno, rota) => {
  return {
    // id do “student” na tela (pode ser o próprio id do aluno ou da solicitação)
    id:
      aluno.id ||
      aluno.solicitacaoId ||
      aluno.idSolicitacao ||
      `${rota?.id || "rota"}-${aluno?.nome || aluno?.name || "aluno"}`,

    // usado para chamar /solicitacoes/{id}/rotas no modal
    solicitacaoId: aluno.solicitacaoId || aluno.idSolicitacao || aluno.id,

    name: aluno.nome || aluno.name || "Aluno sem nome informado",
    school:
      aluno.escola?.nome ||
      aluno.schoolName ||
      rota?.escola?.nome ||
      "Escola não informada",
    address:
      aluno.endereco ||
      aluno.address ||
      aluno.enderecoAluno ||
      "Endereço não informado",
  };
};

const StudentAssignmentScreen = () => {
  const [currentStudents, setCurrentStudents] = useState([]);
  const [availableStudents, setAvailableStudents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  // Estado do modal de sugestão de rota
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeRouteTab, setActiveRouteTab] = useState("ida");

  // Estado da resposta de rota da API (Solicitações)
  const [routeSuggestion, setRouteSuggestion] = useState(null);
  const [routeLoading, setRouteLoading] = useState(false);
  const [routeError, setRouteError] = useState(null);

  // Carregar rotas do backend (RotaService) ao montar a tela
  useEffect(() => {
    const carregarRotas = async () => {
      setLoading(true);
      setLoadError(null);

      try {
        const data = await listarRotas(); // pode vir array ou objeto

        const rotas = Array.isArray(data) ? data : [data];

        const alunosDaRota = [];

        rotas.forEach((rota) => {
          // AJUSTE AQUI se o nome da lista de alunos for outro
          const alunos =
            rota.alunos ||
            rota.estudantes ||
            rota.students ||
            rota.alunosRota ||
            [];

          alunos.forEach((aluno) => {
            alunosDaRota.push(mapAlunoToStudent(aluno, rota));
          });
        });

        // Por enquanto, todos os alunos vindos da rota entram como "atuais".
        // Se o seu back diferenciar “atuais” e “disponíveis”, dá pra separar aqui.
        setCurrentStudents(alunosDaRota);
        setAvailableStudents([]); // ajuste depois se existir outra fonte
      } catch (error) {
        console.error(error);
        setLoadError("Não foi possível carregar as rotas do motorista.");
      } finally {
        setLoading(false);
      }
    };

    carregarRotas();
  }, []);

  const handleRemoveFromRouteClick = (student) => {
    // Ajuste de estado local; se quiser persistir no back, aqui é o ponto pra chamar PUT/DELETE
    setCurrentStudents((prev) => prev.filter((s) => s.id !== student.id));
    setAvailableStudents((prev) => [...prev, student]);
  };

  const handleAddToRouteClick = (student) => {
    setAvailableStudents((prev) => prev.filter((s) => s.id !== student.id));
    setCurrentStudents((prev) => [...prev, student]);
  };

  const openRouteSuggestion = async (student) => {
    setSelectedStudent(student);
    setActiveRouteTab("ida");
    setRouteSuggestion(null);
    setRouteError(null);
    setRouteLoading(true);

    try {
      // usa o id da solicitação (se existir) ou o próprio id
      const solicitacaoId = student.solicitacaoId || student.id;

      const data = await listarRotasDaSolicitacao(solicitacaoId);

      // Exemplo esperado (ajuste conforme o retorno real da API):
      // {
      //   ida:   { tempoEstimado: "26min", distancia: "11km" },
      //   volta: { tempoEstimado: "28min", distancia: "11,7km" }
      // }
      setRouteSuggestion(data || null);
    } catch (error) {
      console.error(error);
      setRouteError("Erro ao carregar sugestão de rota.");
    } finally {
      setRouteLoading(false);
    }
  };

  const closeRouteSuggestion = () => {
    setSelectedStudent(null);
    setRouteSuggestion(null);
    setRouteError(null);
  };

  const ida = routeSuggestion?.ida || {};
  const volta = routeSuggestion?.volta || {};

  return (
    <div className="w-full p-6">
      {/* Cabeçalho simples / navegação */}
      <button
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
        onClick={() => window.history.back()}
      >
        ← Voltar à Página Inicial
      </button>

      <h1 className="text-2xl font-semibold flex items-center gap-2 mb-6">
        <span className="text-pink-500 text-xl">🧭</span>
        Gerenciamento de Alunos na Rota
      </h1>

      {loading && (
        <div className="mb-4 text-sm text-gray-600">
          Carregando rotas do motorista...
        </div>
      )}

      {loadError && (
        <div className="mb-4 text-sm text-red-600">{loadError}</div>
      )}

      {/* Alunos Atuais */}
      <div className="bg-white rounded-xl shadow mb-6">
        <div className="border-b px-6 py-4 flex items-center gap-2">
          <span className="text-red-500">👥</span>
          <h2 className="font-semibold text-gray-800">
            Alunos Atuais na Rota ({currentStudents.length})
          </h2>
        </div>

        <div className="divide-y">
          {currentStudents.map((student) => (
            <div
              key={student.id}
              className="flex items-center justify-between px-6 py-4 bg-red-50"
            >
              <div
                className="flex-1 cursor-pointer"
                onClick={() => openRouteSuggestion(student)}
              >
                <p className="font-medium text-gray-800">{student.name}</p>
                <p className="text-sm text-gray-600">
                  {student.school} | {student.address}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <RotaVanButton
                  color="blue"
                  onClick={() => openRouteSuggestion(student)}
                >
                  Sugestão de rota
                </RotaVanButton>

                <RotaVanButton
                  color="red"
                  onClick={() => handleRemoveFromRouteClick(student)}
                >
                  Remover
                </RotaVanButton>
              </div>
            </div>
          ))}

          {!loading && currentStudents.length === 0 && (
            <div className="px-6 py-4 text-sm text-gray-500">
              Nenhum aluno na rota no momento.
            </div>
          )}
        </div>
      </div>

      {/* Alunos Disponíveis para Adicionar */}
      <div className="bg-white rounded-xl shadow">
        <div className="border-b px-6 py-4 flex items-center gap-2">
          <span className="text-green-500">➕</span>
          <h2 className="font-semibold text-gray-800">
            Alunos Disponíveis para Adicionar ({availableStudents.length})
          </h2>
        </div>

        <div className="divide-y">
          {availableStudents.map((student) => (
            <div
              key={student.id}
              className="flex items-center justify-between px-6 py-4 bg-green-50"
            >
              <div
                className="flex-1 cursor-pointer"
                onClick={() => openRouteSuggestion(student)}
              >
                <p className="font-medium text-gray-800">{student.name}</p>
                <p className="text-sm text-gray-600">
                  {student.school} | {student.address}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <RotaVanButton
                  color="blue"
                  onClick={() => openRouteSuggestion(student)}
                >
                  Sugestão de rota
                </RotaVanButton>

                <RotaVanButton
                  color="green"
                  onClick={() => handleAddToRouteClick(student)}
                >
                  Adicionar
                </RotaVanButton>
              </div>
            </div>
          ))}

          {!loading && availableStudents.length === 0 && (
            <div className="px-6 py-4 text-sm text-gray-500">
              Nenhum aluno disponível para adicionar.
            </div>
          )}
        </div>
      </div>

      {/* MODAL de Sugestão de Rota */}
      {selectedStudent && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
          <div className="bg-[#8AD7E1] rounded-3xl w-full max-w-5xl mx-4 shadow-xl relative">
            {/* Botão fechar (X) */}
            <button
              className="absolute top-4 right-6 text-xl text-gray-700 hover:text-gray-900"
              onClick={closeRouteSuggestion}
            >
              ✕
            </button>

            {/* Cabeçalho do modal */}
            <div className="px-8 pt-8 pb-4 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#C4B5FD] flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex gap-4">
                  <div className="flex-1 bg-[#CFF4F7] rounded-full px-4 py-1 text-sm text-gray-700">
                    {selectedStudent.name}
                  </div>
                  <div className="flex-1 bg-[#CFF4F7] rounded-full px-4 py-1 text-sm text-gray-700">
                    {selectedStudent.school}
                  </div>
                </div>
                <p className="text-xs text-gray-700">
                  Sugestão de rota com base nos alunos atuais da linha.
                </p>
              </div>
            </div>

            {/* Tabs Rota de ida / volta */}
            <div className="px-8 pb-2 flex gap-4">
              <button
                className={`flex-1 py-1 rounded-full text-sm font-semibold ${
                  activeRouteTab === "ida"
                    ? "bg-[#42c5dd] text-white"
                    : "bg-[#CFF4F7] text-gray-700"
                }`}
                onClick={() => setActiveRouteTab("ida")}
              >
                Rota de ida
              </button>
              <button
                className={`flex-1 py-1 rounded-full text-sm font-semibold ${
                  activeRouteTab === "volta"
                    ? "bg-[#42c5dd] text-white"
                    : "bg-[#CFF4F7] text-gray-700"
                }`}
                onClick={() => setActiveRouteTab("volta")}
              >
                Rota de volta
              </button>
            </div>

            {/* Conteúdo dos mapas */}
            <div className="px-8 pb-8">
              <div className="bg-[#CFF4F7] rounded-3xl px-6 py-6">
                {routeLoading && (
                  <div className="text-center text-sm text-gray-700">
                    Carregando sugestão de rota...
                  </div>
                )}

                {routeError && (
                  <div className="text-center text-sm text-red-600">
                    {routeError}
                  </div>
                )}

                {!routeLoading && !routeError && routeSuggestion && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Mapa Ida */}
                    <div className="flex flex-col items-center">
                      <div className="w-full h-48 bg-white rounded-2xl shadow-inner mb-3 flex items-center justify-center text-gray-400 text-sm">
                        Mapa da rota de ida
                      </div>
                      <div className="text-xs text-gray-700 text-center">
                        <div>
                          Tempo estimado:{" "}
                          <strong>
                            {ida.tempoEstimado || ida.time || "--"}
                          </strong>
                        </div>
                        <div>
                          Distância:{" "}
                          <strong>
                            {ida.distancia || ida.distance || "--"}
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* Mapa Volta */}
                    <div className="flex flex-col items-center">
                      <div className="w-full h-48 bg-white rounded-2xl shadow-inner mb-3 flex items-center justify-center text-gray-400 text-sm">
                        Mapa da rota de volta
                      </div>
                      <div className="text-xs text-gray-700 text-center">
                        <div>
                          Tempo estimado:{" "}
                          <strong>
                            {volta.tempoEstimado || volta.time || "--"}
                          </strong>
                        </div>
                        <div>
                          Distância:{" "}
                          <strong>
                            {volta.distancia || volta.distance || "--"}
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {!routeLoading && !routeError && !routeSuggestion && (
                  <div className="text-center text-sm text-gray-700">
                    Nenhuma sugestão de rota disponível para esta solicitação.
                  </div>
                )}

                <div className="mt-6 text-xs text-gray-700 text-center">
                  Ajuste a rota final considerando outros alunos na linha. Em
                  uma próxima etapa podemos integrar com um serviço de mapas
                  real (Google Maps, OpenStreetMap, etc.).
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAssignmentScreen;
