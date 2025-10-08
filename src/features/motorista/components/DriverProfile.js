import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const DriverProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // mock: busque por id real quando tiver API
  const motorista = { id, nome: "Motorista " + id, telefone: "(11) 99999-9999", avaliacao: 4.8 };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl p-6">
        <button onClick={() => navigate(-1)} className="mb-4 text-slate-600 hover:underline">
          ← Voltar
        </button>
        <div className="rounded-3xl bg-white p-6 shadow ring-1 ring-slate-100">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">{motorista.nome}</h1>
          <p className="text-slate-600">Telefone: {motorista.telefone}</p>
          <p className="text-slate-600">Avaliação: {motorista.avaliacao}</p>
          <div className="mt-6">
            <button className="rounded-full bg-[#8AD7E1] px-5 py-2 font-semibold text-slate-800 shadow">
              Solicitar contato
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverProfile;
