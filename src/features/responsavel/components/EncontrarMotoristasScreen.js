// src/features/responsavel/components/EncontrarMotoristasScreen.js

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const mockMotoristas = [
  {
    id: 1,
    nome: "João Silva",
    distancia: "1,2 km de distância",
    escola: "EMEB Profª Francisca Lucinda Bueno",
    avatar:
      "https://images.pexels.com/photos/432059/pexels-photo-432059.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 2,
    nome: "Maria Santos",
    distancia: "2,4 km de distância",
    escola: "EMEB Milton Santos",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: 3,
    nome: "Carlos Oliveira",
    distancia: "800 m de distância",
    escola: "EMEB José Nunes",
    avatar:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
];

const escolasChips = [
  "EMEB Profª Francisca Lucinda Bueno",
  "EMEB Milton Santos",
  "EMEB José Nunes",
];

export default function EncontrarMotoristasScreen() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [escolaSelecionada, setEscolaSelecionada] = useState("");

  const motoristasFiltrados = mockMotoristas.filter((m) => {
    const matchBusca =
      !busca ||
      m.nome.toLowerCase().includes(busca.toLowerCase()) ||
      m.escola.toLowerCase().includes(busca.toLowerCase());

    const matchEscola =
      !escolaSelecionada || m.escola === escolaSelecionada;

    return matchBusca && matchEscola;
  });

  return (
    <div className="w-full min-h-full px-6 py-6 flex flex-col">
      {/* Título */}
      <div className="flex justify-center mb-8">
        <div className="bg-[#73C8D5] px-10 py-3 rounded-full text-white shadow-md text-lg font-semibold tracking-wide">
          ENCONTRAR MOTORISTAS
        </div>
      </div>

      {/* Buscar por escola / motorista */}
      <div className="flex flex-col items-center gap-4 mb-10">
        <div className="relative w-full max-w-3xl">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por escola ou motorista..."
            className="w-full pl-11 pr-4 py-3 rounded-full border border-slate-200 bg-white shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#73C8D5]"
          />
        </div>

        {/* Chips de escolas */}
        <div className="flex flex-wrap justify-center gap-3">
          {escolasChips.map((esc) => {
            const active = esc === escolaSelecionada;
            return (
              <button
                key={esc}
                onClick={() =>
                  setEscolaSelecionada(active ? "" : esc)
                }
                className={`px-5 py-2 rounded-full border text-sm shadow-sm transition ${
                  active
                    ? "bg-[#73C8D5] text-white border-[#73C8D5]"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {esc}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards de motoristas */}
      <div className="flex flex-wrap justify-center gap-10">
        {motoristasFiltrados.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-[32px] w-[240px] p-6 shadow-xl border border-slate-100 flex flex-col items-center"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 shadow-md">
              <img
                src={m.avatar}
                alt={m.nome}
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="text-lg font-semibold text-slate-800 text-center">
              {m.nome}
            </h3>

            <p className="text-xs text-slate-500 mt-1 text-center">
              {m.distancia}
            </p>

            <p className="text-xs text-slate-400 mt-1 text-center">
              {m.escola}
            </p>

            <button
              onClick={() => navigate(`/motoristas/${m.id}`)}
              className="mt-6 w-full bg-[#73C8D5] text-white py-2 rounded-full shadow hover:bg-[#6abcca] text-sm font-semibold"
            >
              Ver perfil
            </button>
          </div>
        ))}

        {motoristasFiltrados.length === 0 && (
          <p className="text-slate-500 text-sm">
            Nenhum motorista encontrado para os filtros selecionados.
          </p>
        )}
      </div>
    </div>
  );
}
