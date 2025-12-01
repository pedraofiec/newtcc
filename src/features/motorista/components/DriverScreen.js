// src/features/motorista/components/DriverScreen.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// import antigo que buscava motoristas
// import { listarMotoristas } from "../Services/MotoristaService";

import { listarContratosPorMotorista } from "../components/contrato/service/ContratosService";

const DriverScreen = () => {
  const navigate = useNavigate();

  const [passengers, setPassengers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const motoristaId = localStorage.getItem("motoristaId");

  useEffect(() => {
    const fetchPassengers = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!motoristaId) {
          setError("Motorista não identificado.");
          setLoading(false);
          return;
        }

        // Agora busca contratos vinculados ao motorista
        const contratos = await listarContratosPorMotorista(motoristaId);

        // Mapeia dependentes do contrato
        const mapped = (Array.isArray(contratos) ? contratos : []).map(
          (c) => ({
            id: c.dependenteId,
            name:
              c.dependenteNome ||
              c.nomeCrianca ||
              c.alunoNome ||
              "Passageiro",
            raw: c,
          })
        );

        setPassengers(mapped);
      } catch (err) {
        console.error("Erro ao carregar passageiros:", err);
        setError("Não foi possível carregar a lista de passageiros.");
      } finally {
        setLoading(false);
      }
    };

    fetchPassengers();
  }, [motoristaId]);

  const handleViewProfile = (passenger) => {
    navigate(`/driver/passengers/${passenger.id}`, {
      state: { passenger },
    });
  };

  return (
    <div className="w-full flex flex-col items-center font-sans">
      {/* Título PASSAGEIROS (pílula central) */}
      <div className="w-full max-w-5xl flex flex-col items-center mt-6">
        <div className="inline-flex px-12 py-3 rounded-full bg-[#8AD7E1] mb-10 shadow-md">
          <span className="text-base md:text-lg font-semibold tracking-wide text-slate-800">
            PASSAGEIROS
          </span>
        </div>

        {/* Estados de carregamento/erro/vazio */}
        {loading && (
          <p className="text-sm text-slate-600 mb-4">
            Carregando passageiros...
          </p>
        )}

        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

        {!loading && !error && passengers.length === 0 && (
          <p className="text-sm text-slate-600 mb-4">
            Nenhum passageiro encontrado.
          </p>
        )}

        {/* Grid de cards 2x2 */}
        {!loading && !error && passengers.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {passengers.map((p) => (
              <div
                key={p.id}
                className="w-64 h-72 bg-[#8AD7E1] rounded-[32px] flex flex-col items-center pt-8 shadow-lg"
              >
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full bg-[#B9C4FF] flex items-center justify-center mb-6">
                  <span className="text-4xl text-slate-700">👤</span>
                </div>

                {/* Nome */}
                <div className="w-44 h-8 rounded-full bg-[#CFF4F7] flex items-center justify-center mb-1">
                  <span className="text-sm font-medium text-slate-700">
                    {p.name}
                  </span>
                </div>

                {/* Sem email — dependente não tem email */}
                <div className="w-48 text-center text-[11px] text-slate-700 mb-3 px-2">
                  Passageiro vinculado ao contrato
                </div>

                {/* Botão Visualizar perfil */}
                <button
                  onClick={() => handleViewProfile(p)}
                  className="mt-2 px-6 py-2 rounded-full bg-white text-sm font-semibold text-slate-700 shadow hover:bg-slate-100 transition"
                >
                  Visualizar perfil
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverScreen;
