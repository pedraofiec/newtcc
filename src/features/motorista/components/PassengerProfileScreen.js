// src/features/motorista/components/PassengerProfileScreen.js

import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaChevronLeft, FaUserCircle, FaPlus, FaSave } from "react-icons/fa";

export default function PassengerProfileScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  // Se você mandar o passageiro via navigate state, pegamos daqui:
  const passengerFromState = location.state?.passenger;

  // Dados básicos do passageiro (mock ou vindo do state)
  const passenger = passengerFromState || {
    id,
    nome: "Nome do passageiro",
    escola: "Escola do passageiro",
    endereco: "Endereço do passageiro",
  };

  // Controle da exibição do formulário de contrato
  const [showContractForm, setShowContractForm] = useState(false);

  // Campos do contrato
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [valorMensal, setValorMensal] = useState("");

  const handleAddContractClick = () => {
    setShowContractForm(true);
  };

  const handleSaveContract = (e) => {
    e.preventDefault();

    // Aqui depois você chama sua API pra salvar o contrato
    console.log("Salvando contrato para passageiro:", passenger.id, {
      dataInicio,
      dataFim,
      valorMensal,
    });

    alert("Contrato salvo (mock). Depois você integra com a API. 😊");
  };

  const handleBack = () => {
    navigate(-1); // volta para a tela anterior (DriverScreen)
  };

  return (
    <div className="w-full min-h-full px-6 py-6 flex flex-col">
      {/* Cabeçalho "PASSAGEIROS" como no Figma */}
      <div className="w-full flex justify-center mb-6">
        <div className="bg-[#73C8D5] text-white font-semibold text-sm px-10 py-2 rounded-full shadow">
          PASSAGEIROS
        </div>
      </div>

      {/* Card central */}
      <div className="max-w-4xl mx-auto bg-[#B7EEF1] rounded-[30px] px-6 py-6 shadow-md flex flex-col gap-4">
        {/* Linha com ícone + informações básicas */}
        <div className="flex items-center gap-4 mb-2">
          <div className="w-16 h-16 rounded-full bg-[#8DD7E0] flex items-center justify-center">
            <FaUserCircle className="text-4xl text-white" />
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <InfoLine label="Nome" value={passenger.nome} />
            <InfoLine label="Escola" value={passenger.escola} />
            <InfoLine label="Endereço" value={passenger.endereco} />
          </div>
        </div>

        {/* Se ainda não clicou em "Adicionar contrato" */}
        {!showContractForm && (
          <div className="mt-4 flex justify-start">
            <button
              onClick={handleAddContractClick}
              className="flex items-center gap-2 bg-[#73C8D5] text-white text-sm px-4 py-2 rounded-full shadow hover:bg-[#5fb4c2] transition"
            >
              <FaPlus className="text-xs" />
              Adicionar contrato
            </button>
          </div>
        )}

        {/* Se já clicou: mostra o formulário de contrato (3ª tela do Figma) */}
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
                  className="w-full bg-white rounded-xl px-3 py-2 text-xs border border-slate-200 outline-none"
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
                  required
                />
              </ContractField>

              <ContractField label="Data fim">
                <input
                  type="date"
                  className="w-full bg-white rounded-xl px-3 py-2 text-xs border border-slate-200 outline-none"
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
                  className="w-full bg-white rounded-xl px-3 py-2 text-xs border border-slate-200 outline-none"
                  placeholder="Ex: 350,00"
                  value={valorMensal}
                  onChange={(e) => setValorMensal(e.target.value)}
                  required
                />
              </ContractField>
            </div>

            <div className="mt-3 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 bg-white text-[#73C8D5] text-xs font-semibold px-4 py-2 rounded-full shadow hover:bg-slate-50 transition"
              >
                <FaSave className="text-xs" />
                Salvar
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Botão Voltar lá embaixo, alinhado à direita, como no Figma */}
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

// Linha de informação (barra azul clarinha com label)
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
