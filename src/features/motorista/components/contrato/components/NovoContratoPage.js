// src/features/motorista/components/contrato/components/NovoContratoPage.js
import React, { useEffect, useState } from "react";
import { criarContrato } from "../service/ContratosService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../../../shared/utils/api";

const NovoContratoPage = () => {
  const navigate = useNavigate();

  const [responsaveis, setResponsaveis] = useState([]);
  const [responsavelId, setResponsavelId] = useState("");

  const [dependentes, setDependentes] = useState([]);
  const [dependenteId, setDependenteId] = useState("");
  const [dependenteNome, setDependenteNome] = useState(""); // 👈 novo

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

  useEffect(() => {
    let cancelled = false;
    async function fetchResponsaveis() {
      try {
        const res = await api.get("/v1/api/responsaveis");
        if (cancelled) return;
        const list = normalizeResponsaveis(res.data);
        setResponsaveis(list);

        if (!list || list.length === 0) toast("Nenhum responsável encontrado.");
      } catch (err) {
        console.error("Erro ao carregar responsáveis:", err);
        toast.error("Falha ao carregar responsáveis.");
        setResponsaveis([
          { id: "mock-1", nomeResponsavel: "Responsável (mock) — sem conexão" },
        ]);
      }
    }

    fetchResponsaveis();
    return () => {
      cancelled = true;
    };
  }, []);

  // 🔥 quando escolhe o responsável, busca os dependentes desse responsável
  async function handleSelectResponsavel(id) {
    setResponsavelId(id);
    setDependenteId("");
    setDependentes([]);
    setDependenteNome("");

    if (!id) return;

    try {
      // ajuste se sua rota for outra
      const res = await api.get(`/v1/api/responsaveis/${id}`);
      let deps =
        res.data?.dependentes ||
        res.data?.criancas ||
        res.data?.children ||
        [];

      setDependentes(Array.isArray(deps) ? deps : []);

      if (!deps || deps.length === 0) {
        toast("Esse responsável ainda não possui dependentes.");
      }
    } catch (err) {
      console.error("Erro ao carregar dependentes:", err);
      toast.error("Falha ao carregar dependentes.");
    }
  }

  // 👇 quando escolhe o dependente, guarda também o NOME
  function handleSelectDependente(id) {
    setDependenteId(id);

    const dep = dependentes.find((d) => String(d.id) === String(id));
    const nome =
      dep?.nome ||
      dep?.nomeCrianca ||
      dep?.nomeAluno ||
      dep?.alunoNome ||
      "";

    setDependenteNome(nome);
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
      dependenteNome, // 👈 AQUI vai o nome da criança junto
    };

    try {
      const result = await criarContrato(payload);
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
                  {r.nomeResponsavel || r.nome}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* DEPENDENTE */}
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
                onChange={(e) => handleSelectDependente(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">-- Selecione um dependente --</option>
                {dependentes.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.nome || d.nomeCrianca || d.nomeAluno}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}

        {/* datas / valor / status iguais ao que já estava */}
        {/* ... (mantém o resto do formulário) ... */}
      </form>
    </div>
  );
};

export default NovoContratoPage;
