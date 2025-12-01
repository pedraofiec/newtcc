// src/features/motorista/components/contrato/components/NovoContratoPage.js
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { criarContrato } from "../service/ContratosService";
import api from "../../../../shared/utils/api";

const NovoContratoPage = () => {
  const navigate = useNavigate();

  const [responsaveis, setResponsaveis] = useState([]);
  const [responsavelId, setResponsavelId] = useState("");

  const [dependentes, setDependentes] = useState([]);
  const [dependenteId, setDependenteId] = useState("");

  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [valorMensal, setValorMensal] = useState("");
  const [status, setStatus] = useState("ATIVO");

  function normalizeResponsaveis(payload) {
    if (!payload) return [];
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload.content)) return payload.content;
    if (Array.isArray(payload.items)) return payload.items;
    if (Array.isArray(payload.data)) return payload.data;
    if (payload._embedded) {
      const keys = Object.keys(payload._embedded);
      if (keys.length > 0 && Array.isArray(payload._embedded[keys[0]])) {
        return payload._embedded[keys[0]];
      }
    }
    const arr = Object.values(payload).find((v) => Array.isArray(v));
    return arr || [];
  }

  const fetchResponsaveis = useCallback(async () => {
    try {
      // ⚠️ NO SEU BACK, ESSA ROTA É SEM /v1/api
      const res = await api.get("/responsaveis");

      console.log("🚀 Resposta da API /responsaveis:", res.data);

      const list = normalizeResponsaveis(res.data);
      setResponsaveis(list);

      if (!list || list.length === 0) {
        toast("Nenhum responsável encontrado.");
      }
    } catch (err) {
      console.error("Erro ao carregar responsáveis:", err);
      toast.error("Falha ao carregar responsáveis.");

      // mock pra não quebrar a UI
      setResponsaveis([
        { id: "mock-1", nomeResponsavel: "Responsável (mock) — sem conexão" },
      ]);
    }
  }, []);

  useEffect(() => {
    fetchResponsaveis();
  }, [fetchResponsaveis]);

  // QUANDO SELECIONAR RESPONSÁVEL → CARREGAR DEPENDENTES
  async function handleSelectResponsavel(id) {
    setResponsavelId(id);
    setDependenteId("");
    setDependentes([]);

    if (!id) return;

    try {
      // idem: dependentes também sem /v1/api
      const res = await api.get("/responsaveis/dependentes/criancas");

      let deps =
        res.data?.dependentes ||
        res.data?.criancas ||
        res.data?.children ||
        res.data ||
        [];

      if (Array.isArray(deps)) {
        deps = deps.filter((d) => {
          const respId =
            d.responsavelId ||
            d.responsavel?.id ||
            d.responsavelIdResponsavel ||
            null;
          return !respId || respId === id;
        });
      } else {
        deps = [];
      }

      setDependentes(deps);

      if (deps.length === 0) {
        toast("Esse responsável ainda não possui dependentes.");
      }
    } catch (err) {
      console.error("Erro ao carregar dependentes:", err);
      toast.error("Falha ao carregar dependentes.");
    }
  }

  async function handleCreate(e) {
    e.preventDefault();

    if (!responsavelId) return toast.error("Selecione um responsável.");
    if (!dependenteId) return toast.error("Selecione um dependente.");
    if (!dataInicio) return toast.error("Informe data de início.");
    if (!dataFim) return toast.error("Informe data fim.");

    const payload = {
      dataInicio,
      dataFim,
      valorMensal: valorMensal ? Number(valorMensal) : 0,
      status,
      responsavelId,
      dependenteId,
    };

    try {
      const result = await criarContrato(payload); // chama /v1/api/contratos
      console.log("Contrato criado:", result);

      toast.success("Contrato criado com sucesso!");
      navigate("/driver/contratos");
    } catch (err) {
      console.error("Erro ao criar contrato:", err);
      toast.error("Falha ao criar contrato. Veja console.");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Novo Contrato</h1>

      <form
        onSubmit={handleCreate}
        className="space-y-4 bg-white p-6 rounded shadow"
      >
        {/* RESPONSÁVEL */}
        <div>
          <label className="block mb-1">Responsável</label>

          {responsaveis.length === 0 ? (
            <div className="p-2 border rounded text-sm text-gray-500">
              Nenhum responsável disponível
            </div>
          ) : (
            <select
              value={responsavelId}
              onChange={(e) => handleSelectResponsavel(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">-- Selecione um responsável --</option>
              {responsaveis.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.nomeResponsavel || r.nome || "Responsável sem nome"}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* DEPENDENTES */}
        {responsavelId && (
          <div>
            <label className="block mb-1">Dependente</label>

            {dependentes.length === 0 ? (
              <div className="p-2 border rounded text-sm text-gray-500">
                Nenhum dependente encontrado
              </div>
            ) : (
              <select
                value={dependenteId}
                onChange={(e) => setDependenteId(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">-- Selecione um dependente --</option>
                {dependentes.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.nome || d.nomeCrianca || "Dependente sem nome"}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}

        {/* DEMAIS CAMPOS */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Data Início</label>
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
            />
          </div>
          <div>
            <label>Data Fim</label>
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label>Valor Mensal</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={valorMensal}
            onChange={(e) => setValorMensal(e.target.value)}
          />
        </div>

        <div>
          <label>Status</label>
          <select
            className="w-full p-2 border rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="ATIVO">ATIVO</option>
            <option value="INATIVO">INATIVO</option>
            <option value="PENDENTE">PENDENTE</option>
            <option value="CANCELADO">CANCELADO</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-sky-600 text-white px-4 py-2 rounded"
        >
          Criar Contrato
        </button>
      </form>
    </div>
  );
};

export default NovoContratoPage;
