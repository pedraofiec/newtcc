import React from "react";
import { FaSchool } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function EscolasScreen() {
  const navigate = useNavigate();

  const mockEscolas = [
    {
      id: 1,
      nome: "EMEB Profª Francisca Lucinda Bueno",
      endereco: "Rua das Acácias, 250 – Jardim Europa, Indaiatuba",
    },
    {
      id: 2,
      nome: "EMEB Milton Santos",
      endereco: "Av. das Flores, 890 – Centro, Indaiatuba",
    },
    {
      id: 3,
      nome: "EMEB José Nunes",
      endereco: "Rua Ipês Roxos, 120 – Vila Verde, Indaiatuba",
    },
    {
      id: 4,
      nome: "Colégio Futuro Brilhante",
      endereco: "Av. Presidente Kennedy, 1500 – Jardim Morada, Indaiatuba",
    },
  ];

  return (
    <div className="w-full min-h-full px-6 py-6 flex flex-col">

      {/* Título */}
      <div className="flex justify-center mb-10">
        <div className="bg-[#73C8D5] px-10 py-3 rounded-full text-white shadow-md text-lg font-semibold tracking-wide">
          ESCOLAS
        </div>
      </div>

      {/* Grid de escolas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {mockEscolas.map((escola) => (
          <div
            key={escola.id}
            className="bg-white rounded-3xl shadow-xl p-6 border border-slate-200 flex flex-col items-center"
          >
            {/* Ícone / avatar da escola */}
            <div className="w-24 h-24 rounded-full bg-[#73C8D5] flex items-center justify-center shadow mb-4">
              <FaSchool className="text-white text-4xl" />
            </div>

            {/* Nome */}
            <h3 className="text-lg font-semibold text-slate-700 text-center">
              {escola.nome}
            </h3>

            {/* Endereço */}
            <div className="w-full mt-4">
              <Field label="Endereço" value={escola.endereco} />
            </div>

            {/* Botão visualizar perfil da escola */}
            <button
              onClick={() => navigate(`/schools/${escola.id}`)}
              className="mt-6 w-full bg-[#73C8D5] text-white py-2 rounded-full shadow hover:bg-[#6abcca] text-sm font-semibold"
            >
              Visualizar escola
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
