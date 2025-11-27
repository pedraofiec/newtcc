import React, { useState, useEffect } from "react";
import { FaUserCircle, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getDependentes } from "../services/ResponsavelService";

export default function DependentesScreen() {
  const navigate = useNavigate();

  const [dependentes, setDependentes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDependentes() {
      try {
        const data = await getDependentes(); // chamada ao service
        setDependentes(data);
      } catch (error) {
        console.error("Erro ao carregar dependentes:", error);

        // fallback temporário (mock)
        setDependentes([
          {
            id: 1,
            nome: "João Silva",
            idade: 10,
            nivel: "5º ano",
            escola: "EMEB Profª Francisca Lucinda Bueno",
          },
          {
            id: 2,
            nome: "Maria Clara",
            idade: 7,
            nivel: "2º ano",
            escola: "EMEB Milton Santos",
          },
        ]);
      } finally {
        setLoading(false);
      }
    }

    carregarDependentes();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-full px-6 py-6 flex items-center justify-center">
        <p className="text-slate-500">Carregando dependentes...</p>
      </div>
    );
  }

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

      {/* Cards – AQUI estão os ajustes de tamanho/largura/altura */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {dependentes.map((dep) => (
          <div
            key={dep.id}
            className="bg-white rounded-[32px] shadow-2xl p-10 border border-slate-200 flex flex-col items-center w-[330px] h-[500px] mx-auto"
          >
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full bg-[#73C8D5] flex items-center justify-center shadow mb-6">
              <FaUserCircle className="text-white text-6xl" />
            </div>

            {/* Nome */}
            <h3 className="text-2xl font-semibold text-slate-700 mb-4">
              {dep.nome}
            </h3>

            {/* Infos */}
            <div className="w-full space-y-3 text-base text-slate-700">
              <Field label="Idade" value={`${dep.idade} anos`} />
              <Field label="Nível escolar" value={dep.nivel} />
              <Field label="Escola" value={dep.escola} />
            </div>

            {/* Botão */}
            <button
              onClick={() => navigate(`/students/${dep.id}`)}
              className="mt-auto w-full bg-[#73C8D5] text-white py-3 rounded-full shadow hover:bg-[#6abcca] text-base font-semibold"
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
