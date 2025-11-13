import React, { useState } from "react";

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

// Dados mockados (depois você pode puxar do back)
const INITIAL_CURRENT = [
  {
    id: 1,
    name: "João da Silva",
    school: "Escola A",
    address: "Rua A, 123",
    route: {
      ida: { time: "26min", distance: "11km" },
      volta: { time: "28min", distance: "11,7km" },
    },
  },
  {
    id: 2,
    name: "Maria Souza",
    school: "Escola B",
    address: "Av. B, 456",
    route: {
      ida: { time: "24min", distance: "9,8km" },
      volta: { time: "25min", distance: "10,1km" },
    },
  },
  {
    id: 3,
    name: "Pedro Santos",
    school: "Escola A",
    address: "Rua C, 789",
    route: {
      ida: { time: "20min", distance: "8km" },
      volta: { time: "22min", distance: "8,5km" },
    },
  },
];

const INITIAL_AVAILABLE = [
  {
    id: 4,
    name: "Ana Oliveira",
    school: "Escola C",
    address: "Rua D, 10",
    route: {
      ida: { time: "30min", distance: "12km" },
      volta: { time: "32min", distance: "12,5km" },
    },
  },
  {
    id: 5,
    name: "Lucas Costa",
    school: "Escola A",
    address: "Av. E, 20",
    route: {
      ida: { time: "18min", distance: "7km" },
      volta: { time: "19min", distance: "7,3km" },
    },
  },
];

const StudentAssignmentScreen = () => {
  const [currentStudents, setCurrentStudents] = useState(INITIAL_CURRENT);
  const [availableStudents, setAvailableStudents] = useState(INITIAL_AVAILABLE);

  // Estado do modal de sugestão de rota
  const [selectedStudent, setSelectedStudent] = useState(null);
 const [activeRouteTab, setActiveRouteTab] = useState("ida");


  const handleRemoveFromRoute = (student) => {
    setCurrentStudents((prev) => prev.filter((s) => s.id !== student.id));
    setAvailableStudents((prev) => [...prev, student]);
  };

  const handleAddToRoute = (student) => {
    setAvailableStudents((prev) => prev.filter((s) => s.id !== student.id));
    setCurrentStudents((prev) => [...prev, student]);
  };

  const openRouteSuggestion = (student) => {
    setSelectedStudent(student);
    setActiveRouteTab("ida");
  };

  const closeRouteSuggestion = () => {
    setSelectedStudent(null);
  };

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
                {/* Abre sugestão de rota (igual ao Figma) */}
                <RotaVanButton
                  color="blue"
                  onClick={() => openRouteSuggestion(student)}
                >
                  Sugestão de rota
                </RotaVanButton>

                {/* Remove da rota */}
                <RotaVanButton
                  color="red"
                  onClick={() => handleRemoveFromRoute(student)}
                >
                  Remover
                </RotaVanButton>
              </div>
            </div>
          ))}

          {currentStudents.length === 0 && (
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
                  onClick={() => handleAddToRoute(student)}
                >
                  Adicionar
                </RotaVanButton>
              </div>
            </div>
          ))}

          {availableStudents.length === 0 && (
            <div className="px-6 py-4 text-sm text-gray-500">
              Nenhum aluno disponível para adicionar.
            </div>
          )}
        </div>
      </div>

      {/* MODAL de Sugestão de Rota (igual ao Figma) */}
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Mapa Ida */}
                  <div className="flex flex-col items-center">
                    <div className="w-full h-48 bg-white rounded-2xl shadow-inner mb-3 flex items-center justify-center text-gray-400 text-sm">
                      Mapa da rota de ida
                    </div>
                    <div className="text-xs text-gray-700 text-center">
                      <div>
                        Tempo estimado:{" "}
                        <strong>{selectedStudent.route.ida.time}</strong>
                      </div>
                      <div>
                        Distância:{" "}
                        <strong>{selectedStudent.route.ida.distance}</strong>
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
                        <strong>{selectedStudent.route.volta.time}</strong>
                      </div>
                      <div>
                        Distância:{" "}
                        <strong>{selectedStudent.route.volta.distance}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Observação / ações futuras */}
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
