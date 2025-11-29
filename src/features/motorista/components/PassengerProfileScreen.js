import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaChevronLeft, FaUserCircle, FaPlus, FaSave } from "react-icons/fa";

import { criarContrato } from "../../motorista/components/contrato/service/ContratosService";

// IMPORTAÇÃO CORRETA DO SERVICE
import { getDependenteById } from "../../responsavel/services/ResponsavelService";

export default function PassengerProfileScreen() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [passenger, setPassenger] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showContractForm, setShowContractForm] = useState(false);

  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [valorMensal, setValorMensal] = useState("");

  /* ===============================
        BUSCAR DEPENDENTE REAL
  =============================== */
  useEffect(() => {
    carregarDependente();
  }, []);

  const carregarDependente = async () => {
    try {
      const dependente = await getDependenteById(id);
      setPassenger(dependente);
    } catch (err) {
      console.error("Erro ao buscar dependente:", err);
      alert("Erro ao carregar dependente.");
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
        SALVAR CONTRATO
  =============================== */
  const handleSaveContract = async (e) => {
    e.preventDefault();

    const novoContrato = {
      id: null,
      dataInicio,
      dataFim,
      valorMensal: Number(valorMensal),
      status: "ATIVO",
      idDependente: passenger.id
    };

    try {
      await criarContrato(novoContrato);

      alert("Contrato cadastrado com sucesso!");
      setShowContractForm(false);

      setDataInicio("");
      setDataFim("");
      setValorMensal("");
    } catch (err) {
      console.error("Erro ao salvar contrato:", err);
      alert("Erro ao salvar contrato.");
    }
  };

  const handleBack = () => navigate(-1);

  if (loading) {
    return <div className="p-4 text-center">Carregando dados...</div>;
  }

  if (!passenger) {
    return <div className="p-4 text-center text-red-500">Dependente não encontrado.</div>;
  }

  return (
    <div className="w-full min-h-full px-6 py-6 flex flex-col">
      
      <div className="w-full flex justify-center mb-6">
        <div className="bg-[#73C8D5] text-white font-semibold text-sm px-10 py-2 rounded-full shadow">
          PASSAGEIROS
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-[#B7EEF1] rounded-[30px] px-6 py-6 shadow-md flex flex-col gap-4">

        <div className="flex items-center gap-4 mb-2">
          <div className="w-16 h-16 rounded-full bg-[#8DD7E0] flex items-center justify-center">
            <FaUserCircle className="text-4xl text-white" />
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <InfoLine label="Nome" value={passenger.nome} />
            <InfoLine label="Escola" value={passenger.escola || "Não informado"} />
            <InfoLine label="Endereço" value={passenger.endereco || "Não informado"} />
          </div>
        </div>

        {!showContractForm && (
          <div className="mt-4 flex justify-start">
            <button
              onClick={() => setShowContractForm(true)}
              className="flex items-center gap-2 bg-[#73C8D5] text-white text-sm px-4 py-2 rounded-full shadow hover:bg-[#5fb4c2] transition"
            >
              <FaPlus className="text-xs" />
              Adicionar contrato
            </button>
          </div>
        )}

        {showContractForm && (
          <form
            onSubmit={handleSaveContract}
            className="mt-4 bg-[#C4F3F5] rounded-2xl px-4 py-4 flex flex-col gap-3 max-w-xl"
          >
            <div className="text-xs font-semibold text-slate-600 mb-1">
              Contrato
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <ContractField label="Data início">
                <input
                  type="date"
                  className="w-full bg-white rounded-xl px-3 py-2 text-xs border border-slate-200"
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
                  required
                />
              </ContractField>

              <ContractField label="Data fim">
                <input
                  type="date"
                  className="w-full bg-white rounded-xl px-3 py-2 text-xs border border-slate-200"
                  value={dataFim}
                  onChange={(e) => setDataFim(e.target.value)}
                  required
                />
              </ContractField>

              <ContractField label="Valor mensal">
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="w-full bg-white rounded-xl px-3 py-2 text-xs border border-slate-200"
                  placeholder="Ex: 350"
                  value={valorMensal}
                  onChange={(e) => setValorMensal(e.target.value)}
                  required
                />
              </ContractField>
            </div>

            <div className="mt-3 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 bg-white text-[#73C8D5] text-xs font-semibold px-4 py-2 rounded-full shadow"
              >
                <FaSave className="text-xs" />
                Salvar
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="mt-6 flex justify-end max-w-4xl mx-auto">
        <button
          onClick={handleBack}
          className="bg-[#73C8D5] text-white text-sm px-6 py-2 rounded-full shadow hover:bg-[#5fb4c2] transition flex items-center gap-2"
        >
          <FaChevronLeft className="text-xs" />
          Voltar
        </button>
      </div>
    </div>
  );
}


/* Componentes auxiliares */

function InfoLine({ label, value }) {
  return (
    <div className="flex flex-col text-xs">
      <span className="text-[11px] text-slate-600 mb-1">{label}</span>
      <div className="w-full bg-[#C4F3F5] rounded-full h-6 flex items-center px-3 text-[11px] text-slate-700">
        {value}
      </div>
    </div>
  );
}

function ContractField({ label, children }) {
  return (
    <div className="flex flex-col text-xs">
      <span className="text-[11px] text-slate-600 mb-1">{label}</span>
      {children}
    </div>
  );
}
