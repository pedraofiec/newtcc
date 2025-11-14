import React from "react";
import { FaUserCircle, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function DependentesScreen() {
  const navigate = useNavigate();

  const mockDependentes = [
    { id: 1, nome: "João Silva", idade: 10, nivel: "5º ano", escola: "EMEB Profª Francisca Lucinda Bueno" },
    { id: 2, nome: "Maria Clara", idade: 7, nivel: "2º ano", escola: "EMEB Milton Santos" }
  ];

  return (
    <div className="w-full min-h-full px-6 py-6 flex flex-col">

      {/* Título */}
      <div className="flex justify-center mb-10">
        <div className="bg-[#73C8D5] px-10 py-3 rounded-full text-white shadow-md text-lg font-semibold tracking-wide">
          DEPENDENTES
        </div>
      </div>

      {/* Botão adicionar */}
      <div className="flex justify-end mb-8">
        <button
          onClick={() => navigate("/register/student")}
          className="flex items-center gap-2 bg-[#73C8D5] text-white px-5 py-2 rounded-full shadow hover:bg-[#6abcca] transition"
        >
          <FaPlus size={14} /> Cadastrar dependente
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {mockDependentes.map((dep) => (
          <div
            key={dep.id}
            className="bg-white rounded-3xl shadow-xl p-6 border border-slate-200 flex flex-col items-center"
          >
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-[#73C8D5] flex items-center justify-center shadow mb-4">
              <FaUserCircle className="text-white text-5xl" />
            </div>

            {/* Nome */}
            <h3 className="text-xl font-semibold text-slate-700">{dep.nome}</h3>

            <div className="w-full mt-4 space-y-2 text-sm text-slate-600">

              <Field label="Idade" value={dep.idade + " anos"} />
              <Field label="Nível escolar" value={dep.nivel} />
              <Field label="Escola" value={dep.escola} />

            </div>

            <button
              onClick={() => navigate(`/students/${dep.id}`)}
              className="mt-6 w-full bg-[#73C8D5] text-white py-2 rounded-full shadow hover:bg-[#6abcca]"
            >
              Editar perfil
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-[11px] text-slate-400 uppercase font-semibold tracking-wide">
        {label}
      </span>
      <div className="w-full bg-slate-100 py-2 px-3 rounded-xl border border-slate-200 text-sm">
        {value}
      </div>
    </div>
  );
}
