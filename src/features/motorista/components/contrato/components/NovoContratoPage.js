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

  // Função auxiliar para lidar com paginação do Spring Boot (content, _embedded, etc)
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

  // 1. Carrega todos os Responsáveis (e seus filhos) ao abrir a tela
  const fetchResponsaveis = useCallback(async () => {
    try {
      const res = await api.get("/responsaveis");
      
      const list = normalizeResponsaveis(res.data);
      setResponsaveis(list);

      if (!list || list.length === 0) {
        toast("Nenhum responsável encontrado no sistema.");
      }
    } catch (err) {
      console.error("Erro ao carregar responsáveis:", err);
      toast.error("Falha ao carregar lista de responsáveis.");
    }
  }, []);

  useEffect(() => {
    fetchResponsaveis();
  }, [fetchResponsaveis]);

  // 2. CORREÇÃO: Filtra os dependentes LOCALMENTE sem chamar API extra
  function handleSelectResponsavel(id) {
    setResponsavelId(id);
    setDependenteId(""); // Reseta a criança selecionada
    setDependentes([]);  // Limpa a lista antiga

    if (!id) return;

    // Encontra o objeto do pai selecionado na lista que já temos
    // Convertemos para String para garantir que a comparação funcione
    const paiSelecionado = responsaveis.find((r) => String(r.id) === String(id));

    if (paiSelecionado) {
      // Extrai os filhos desse pai
      const listaFilhos = 
        paiSelecionado.dependentes || 
        paiSelecionado.criancas || 
        paiSelecionado.children || 
        [];

      setDependentes(listaFilhos);

      if (listaFilhos.length === 0) {
        toast("Este responsável não possui dependentes cadastrados.");
      }
    }
  }

  // 3. Enviar o contrato para o backend
  async function handleCreate(e) {
    e.preventDefault();

    if (!responsavelId) return toast.error("Selecione um responsável.");
    if (!dependenteId) return toast.error("Selecione um dependente.");
    if (!dataInicio) return toast.error("Informe a data de início.");
    if (!dataFim) return toast.error("Informe a data fim.");

    const payload = {
      dataInicio,
      dataFim,
      valorMensal: valorMensal ? Number(valorMensal) : 0,
      status,
      responsavelId, // ID do Pai
      dependenteId,  // ID da Criança
    };

    try {
      await criarContrato(payload);
      toast.success("Contrato criado com sucesso!");
      navigate("/driver/contratos"); // Redireciona de volta para a lista
    } catch (err) {
      console.error("Erro ao criar contrato:", err);
      toast.error("Erro ao salvar contrato. Verifique os dados.");
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-slate-700">Novo Contrato</h1>

      <form
        onSubmit={handleCreate}
        className="space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-slate-100"
      >
        {/* SELEÇÃO DO RESPONSÁVEL */}
        <div>
          <label className="block mb-2 text-sm font-medium text-slate-600">Responsável</label>
          <select
            value={responsavelId}
            onChange={(e) => handleSelectResponsavel(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400 outline-none"
          >
            <option value="">-- Selecione um responsável --</option>
            {responsaveis.map((r) => (
              <option key={r.id} value={r.id}>
                {r.nomeResponsavel || r.nome || "Sem Nome"} (CPF: {r.cpf || r.cpfResponsavel || "N/A"})
              </option>
            ))}
          </select>
        </div>

        {/* SELEÇÃO DO DEPENDENTE (Só aparece se tiver responsável) */}
        {responsavelId && (
          <div className="animate-fade-in">
            <label className="block mb-2 text-sm font-medium text-slate-600">Dependente (Aluno)</label>
            {dependentes.length === 0 ? (
              <div className="p-3 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-lg text-sm">
                Nenhum dependente vinculado a este responsável.
              </div>
            ) : (
              <select
                value={dependenteId}
                onChange={(e) => setDependenteId(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400 outline-none"
              >
                <option value="">-- Selecione o aluno --</option>
                {dependentes.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.nome || d.nomeCrianca || d.nomeAluno || "Aluno sem nome"}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}

        {/* DATAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-600">Data Início</label>
            <input
              type="date"
              required
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400 outline-none"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-600">Data Fim</label>
            <input
              type="date"
              required
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400 outline-none"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
            />
          </div>
        </div>

        {/* VALORES E STATUS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-600">Valor Mensal (R$)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              required
              placeholder="Ex: 350.00"
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400 outline-none"
              value={valorMensal}
              onChange={(e) => setValorMensal(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-600">Status</label>
            <select
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400 outline-none"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="ATIVO">ATIVO</option>
              <option value="PENDENTE">PENDENTE</option>
              <option value="INATIVO">INATIVO</option>
            </select>
          </div>
        </div>

        {/* BOTÃO */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-[#73C8D5] hover:bg-[#5fbecb] text-white font-bold py-3 px-4 rounded-full shadow-md transition duration-300 transform hover:scale-[1.02]"
          >
            Criar Contrato
          </button>
        </div>
      </form>
    </div>
  );
};

export default NovoContratoPage;