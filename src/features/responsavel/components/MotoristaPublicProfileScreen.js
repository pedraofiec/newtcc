// src/features/responsavel/components/MotoristaPublicProfileScreen.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaChevronLeft, FaUser } from "react-icons/fa";

import { getMotoristaById } from "../../motorista/Services/MotoristaService";

const MotoristaPublicProfileScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [motorista, setMotorista] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregar() {
      try {
        setLoading(true);
        setErro(null);
        const data = await getMotoristaById(id);
        setMotorista(data);
      } catch (e) {
        console.error("Erro ao carregar motorista:", e);
        setErro("Não foi possível carregar os dados do motorista.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      carregar();
    } else {
      setErro("ID do motorista não informado.");
      setLoading(false);
    }
  }, [id]);

  function handleVoltar() {
    // 🔹 volta para a lista de motoristas do responsável
    // rota correta conforme App.js → path="solicitacoes"
    navigate("/solicitacoes");
  }

  // campos tratados para exibição
  const nome =
    motorista?.nomeMotorista ||
    motorista?.nome ||
    motorista?.user?.nome ||
    "Motorista";

  const email = motorista?.email || motorista?.user?.email || "-";
  const cnh = motorista?.cnh || "-";
  const valCnh = motorista?.valCnh || "-";

  const escola =
    motorista?.escola?.nome ||
    motorista?.escolaNome ||
    motorista?.nomeEscola ||
    "-";

  const placa =
    motorista?.placaVeiculo ||
    motorista?.placa ||
    motorista?.veiculo?.placa ||
    "-";

  const modeloVeiculo =
    motorista?.veiculo?.modelo ||
    motorista?.modeloVeiculo ||
    "-";

  const avatar =
    motorista?.fotoUrl ||
    motorista?.user?.picture ||
    "https://i.pravatar.cc/150?img=11";

  return (
    <div className="w-full flex flex-col items-center font-sans">
      <div className="w-full max-w-3xl mt-6 px-4 md:px-0">
        {/* Voltar */}
        <button
          onClick={handleVoltar}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium"
        >
          <FaChevronLeft className="mr-2" /> Voltar para os motoristas
        </button>

        {/* Header da página */}
        <div className="flex items-center gap-2 mb-1">
          <FaUser className="text-2xl text-[#8AD7E1]" />
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-800">
            Perfil do Motorista
          </h1>
        </div>
        <p className="text-sm text-slate-500 mb-4">
          Veja as informações do motorista selecionado.
        </p>
        <hr className="border-slate-200 mb-5" />

        {/* Card principal */}
        <div className="bg-white rounded-3xl shadow-md p-5 md:p-7">
          {loading && (
            <div className="text-sm text-slate-600 mb-3">
              Carregando dados do motorista...
            </div>
          )}

          {erro && (
            <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
              {erro}
            </div>
          )}

          {!loading && !erro && motorista && (
            <div className="flex flex-col items-center gap-6">
              {/* Avatar + nome */}
              <div className="flex flex-col items-center gap-3">
                <img
                  src={avatar}
                  alt={nome}
                  className="w-24 h-24 rounded-full object-cover shadow"
                />
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-800">
                    {nome}
                  </p>
                  <p className="text-sm text-gray-500">Motorista</p>
                </div>
              </div>

              {/* Informações em cards */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoField label="Nome completo" value={nome} />
                <InfoField label="E-mail" value={email} />
                <InfoField label="CNH" value={cnh} />
                <InfoField label="Validade da CNH" value={valCnh} />
                <InfoField label="Escola atendida" value={escola} />
                <InfoField label="Placa do veículo" value={placa} />
                <InfoField
                  label="Modelo do veículo"
                  value={modeloVeiculo}
                  full
                />
              </div>
            </div>
          )}

          {!loading && !erro && !motorista && (
            <p className="text-sm text-slate-600">
              Motorista não encontrado.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

function InfoField({ label, value, full }) {
  return (
    <div className={full ? "md:col-span-2 flex flex-col" : "flex flex-col"}>
      <span className="text-xs font-semibold text-slate-600 mb-1">
        {label}
      </span>
      <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 break-all">
        {value}
      </div>
    </div>
  );
}

export default MotoristaPublicProfileScreen;
