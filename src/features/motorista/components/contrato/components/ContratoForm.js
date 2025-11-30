// src/pages/driver/ContratoForm.js
import React, { useState } from "react";
import toast from "react-hot-toast";

const ContratoForm = ({
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

  function handleResponsavelChange(id) {
    setResponsavelId(id);
    setDependenteId(""); // limpa dependente ao trocar responsável
    onSelectResponsavel(id);
  }

  function handleDependenteChange(id) {
    setDependenteId(id);
    onSelectDependente(id);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!responsavelId)
      return toast.error("Selecione um responsável.");

    if (!dependenteId)
      return toast.error("Selecione um dependente.");

    if (!dataInicio)
      return toast.error("Defina a data de início.");

    if (!dataFim)
      return toast.error("Defina a data de fim.");

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

      {/* RESPONSÁVEL */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Responsável</label>
        <select
          value={responsavelId}
          onChange={(e) => handleResponsavelChange(e.target.value)}
          className="mt-1 block w-full p-2 border rounded"
        >
          <option value="">-- selecione --</option>
          {responsaveis.map((r) => (
            <option key={r.id} value={r.id}>
              {r.nome}
            </option>
          ))}
        </select>
      </div>

      {/* DEPENDENTE */}
      {responsavelId && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Dependente</label>
          <select
            value={dependenteId}
            onChange={(e) => handleDependenteChange(e.target.value)}
            className="mt-1 block w-full p-2 border rounded"
          >
            <option value="">-- selecione --</option>
            {dependentes.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nome}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* FORMULÁRIO DE DATAS E VALOR */}
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

      <div>
        <label className="block text-sm font-medium text-gray-700">Valor Mensal</label>
        <input
          type="number"
          min="0"
          value={valorMensal}
          onChange={(e) => setValorMensal(e.target.value)}
          className="mt-1 block w-full p-2 border rounded"
        />
      </div>

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

      <button
        type="submit"
        className="bg-[#8AD7E1] text-white px-4 py-2 rounded"
      >
        Salvar
      </button>

    </form>
  );
};

export default ContratoForm;
