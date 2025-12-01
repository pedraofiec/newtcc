// src/features/motorista/components/DriverScreen.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listarContratosPorMotorista } from "../components/contrato/service/ContratosService";

const DriverScreen = () => {
  const navigate = useNavigate();

  const [passengers, setPassengers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const motoristaId = localStorage.getItem("motoristaId");

  useEffect(() => {
    const fetchPassageiros = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!motoristaId) {
          setPassengers([]);
          setError("Motorista não identificado.");
          return;
        }

        const contratos = await listarContratosPorMotorista(motoristaId);

        const list = Array.isArray(contratos)
          ? contratos
          : contratos?.content || [];

        const mapped = list.map((c) => ({
          id:
            c.dependenteId ||
            c.alunoId ||
            c.criancaId ||
            c.id, // fallback
          name:
            c.dependenteNome ||
            c.nomeDependente ||
            c.nomeCrianca ||
            c.alunoNome ||
            "Passageiro",
          email:
            c.emailResponsavel ||
            c.responsavelEmail ||
            c.responsavel?.email ||
            "",
          rawContrato: c,
        }));

        setPassengers(mapped);
      } catch (err) {
        console.error("Erro ao carregar passageiros:", err);
        setError("Não foi possível carregar a lista de passageiros.");
      } finally {
        setLoading(false);
      }
    };

    fetchPassageiros();
  }, [motoristaId]);

  const handleViewProfile = (passenger) => {
    navigate(`/driver/passengers/${passenger.id}`, {
      state: { passenger },
    });
  };

  return (
    <div className="w-full flex flex-col items-center font-sans">
      <div className="w-full max-w-5xl flex flex-col items-center mt-6">
        <div className="inline-flex px-12 py-3 rounded-full bg-[#8AD7E1] mb-10 shadow-md">
          <span className="text-base md:text-lg font-semibold tracking-wide text-slate-800">
            PASSAGEIROS
          </span>
        </div>

        {loading && (
          <p className="text-sm text-slate-600 mb-4">
            Carregando passageiros...
          </p>
        )}

        {error && (
          <p className="text-sm text-red-600 mb-4">
            {error}
          </p>
        )}

        {!loading && !error && passengers.length === 0 && (
          <p className="text-sm text-slate-600 mb-4">
            Nenhum passageiro encontrado.
          </p>
        )}

        {!loading && !error && passengers.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {passengers.map((p) => (
              <div
                key={p.id}
                className="w-64 h-72 bg-[#8AD7E1] rounded-[32px] flex flex-col items-center pt-8 shadow-lg"
              >
                <div className="w-20 h-20 rounded-full bg-[#B9C4FF] flex items-center justify-center mb-6">
                  <span className="text-4xl text-slate-700">👤</span>
                </div>

                <div className="w-44 h-8 rounded-full bg-[#CFF4F7] flex items-center justify-center mb-1">
                  <span className="text-sm font-medium text-slate-700">
                    {p.name}
                  </span>
                </div>

                <div className="w-48 text-center text-[11px] text-slate-700 mb-3 px-2">
                  {p.email}
                </div>

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
