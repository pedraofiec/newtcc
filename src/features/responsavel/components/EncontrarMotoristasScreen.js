import React from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const escolas = [
  "EMEB Profª Francisca Lucinda Bueno",
  "EMEB Milton Santos",
  "EMEB José Nunes",
];

const motoristas = [
  { id: 1, nome: "João Silva", dist: "1,2 km", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: 2, nome: "Maria Santos", dist: "2,4 km", avatar: "https://i.pravatar.cc/150?img=15" },
  { id: 3, nome: "Carlos Oliveira", dist: "800 m", avatar: "https://i.pravatar.cc/150?img=20" },
];

export default function EncontrarMotoristasScreen() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-full px-6 py-6 flex flex-col">

      {/* Header */}
      <div className="flex justify-center mb-10">
        <div className="bg-[#73C8D5] px-10 py-3 rounded-full text-white shadow text-lg font-semibold tracking-wide">
          ENCONTRAR MOTORISTAS
        </div>
      </div>

      {/* Área de busca */}
      <div className="max-w-3xl mx-auto w-full mb-8">
        <div className="flex items-center bg-white border border-[#73C8D5] rounded-full px-5 py-2 shadow-sm">
          <FaSearch className="text-[#73C8D5] text-lg" />
          <input
            type="text"
            placeholder="Buscar por escola..."
            className="ml-3 flex-1 outline-none text-sm"
          />
        </div>
      </div>

      {/* Chips das escolas */}
      <div className="flex flex-wrap gap-3 justify-center mb-10">
        {escolas.map((e, idx) => (
          <button
            key={idx}
            className="px-5 py-2 rounded-full bg-white border border-[#73C8D5] text-[#73C8D5] shadow-sm hover:bg-[#73C8D5] hover:text-white transition text-xs md:text-sm"
          >
            {e}
          </button>
        ))}
      </div>

      {/* Lista de motoristas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {motoristas.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 hover:shadow-2xl transition"
          >
            <div className="flex flex-col items-center">

              {/* Avatar */}
              <img
                src={m.avatar}
                alt="motorista"
                className="w-24 h-24 rounded-full shadow mb-4 object-cover"
              />

              {/* Nome + distância */}
              <h3 className="text-lg font-semibold text-slate-700">{m.nome}</h3>
              <p className="text-sm text-slate-500">{m.dist} de distância</p>

              {/* Botão ver perfil */}
              <button
                onClick={() => navigate(`/motorista/${m.id}`)}
                className="mt-6 w-full bg-[#73C8D5] text-white py-2 rounded-full shadow hover:bg-[#6abcca] text-sm"
              >
                Ver perfil
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
