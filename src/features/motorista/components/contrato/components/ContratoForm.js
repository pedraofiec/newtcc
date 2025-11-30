// src/pages/driver/ContratoForm.js
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const ContratoForm = ({
  initialValues = {},
  responsaveis = [],
  dependentes = [],
  onSelectResponsavel,
  onSelectDependente,
  onSubmit,
}) => {

  const [responsavelId, setResponsavelId] = useState("");
  const [dependenteId, setDependenteId] = useState("");

  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [valorMensal, setValorMensal] = useState("");
  const [status, setStatus] = useState("ATIVO");

  useEffect(() => {
    if (initialValues) {
      setResponsavelId(initialValues.responsavelId || "");
      setDependenteId(initialValues.dependenteId || "");
      setDataInicio(initialValues.dataInicio || "");
      setDataFim(initialValues.dataFim || "");
      setValorMensal(initialValues.valorMensal || "");
      setStatus(initialValues.status || "ATIVO");
    }
  }, [initialValues]);

  async function handleSubmit(e) {
    e.preventDefault();

    // 🚫 REMOVE TODA VALIDAÇÃO DE RESPONSÁVEL E DEPENDENTE
    // 🚫 NÃO EXISTE MAIS:
    // if (!responsavelId) toast.error("Selecione um responsável")
    // if (!dependenteId) toast.error("Selecione um dependente")

    if (!dataInicio) return toast.error("Defina a data de início.");
    if (!dataFim) return toast.error("Defina a data de fim.");

    const payload = {
      responsavelId,
      dependenteId,
      dataInicio,
      dataFim,
      valorMensal: Number(valorMensal),
      status,
    };

    await onSubmit(payload);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">

      {/* 🔥 NÃO MOSTRA RESPONSÁVEL NEM DEPENDENTE */}
      {/* campos completamente removidos da interface */}

      {/* DATAS */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Data Início</label>
          <input
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            className="mt-1 block w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Data Fim</label>
          <input
            type="date"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
            className="mt-1 block w-full p-2 border rounded"
          />
        </div>
      </div>

      {/* VALOR MENSAL */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Valor Mensal</label>
        <input
          type="number"
          value={valorMensal}
          onChange={(e) => setValorMensal(e.target.value)}
          className="mt-1 block w-full p-2 border rounded"
        />
      </div>

      {/* STATUS */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 block w-full p-2 border rounded"
        >
          <option value="ATIVO">ATIVO</option>
          <option value="INATIVO">INATIVO</option>
          <option value="PENDENTE">PENDENTE</option>
          <option value="CANCELADO">CANCELADO</option>
        </select>
      </div>

      <button type="submit" className="bg-[#8AD7E1] text-white px-4 py-2 rounded">
        Salvar
      </button>
    </form>
  );
};

export default ContratoForm;
