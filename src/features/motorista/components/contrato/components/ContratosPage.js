// src/pages/driver/ContratosPage.js
import React, { useEffect, useState } from "react";
import { listarContratosPorMotorista, listarContratos, deletarContrato } from "../service/ContratosService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ContratosPage = () => {
  const [contratos, setContratos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();
  const motoristaId = localStorage.getItem("motoristaId"); // ajuste conforme auth

  useEffect(() => {
    carregar();
    // eslint-disable-next-line
  }, []);

  async function carregar() {
    setLoading(true);
    setServerError(null);

    // Se não temos motoristaId tentamos pegar todos os contratos (admin) como fallback
    if (!motoristaId) {
      console.warn("motoristaId ausente no localStorage — tentando listar todos os contratos como fallback.");
      try {
        const dados = await listarContratos();
        setContratos(dados || []);
      } catch (err) {
        tratarErro(err, "GET /v1/api/contratos");
      } finally {
        setLoading(false);
      }
      return;
    }

    // Preferência: buscar contratos do motorista (esperado)
    try {
      const dados = await listarContratosPorMotorista(motoristaId);
      setContratos(dados || []);
    } catch (err) {
      // se deu 500 no endpoint por algum motivo, logamos o body e tentamos fallback
      tratarErro(err, `GET /v1/api/contratos/motorista/${motoristaId}`);
      // fallback: tenta listar todos contratos (caso o endpoint do motorista esteja quebrado)
      try {
        const dados = await listarContratos();
        setContratos(dados || []);
        toast("Fallback: carregando todos os contratos (admin).");
      } catch (err2) {
        tratarErro(err2, "GET /v1/api/contratos (fallback)");
      }
    } finally {
      setLoading(false);
    }
  }

  function tratarErro(err, context = "") {
    console.error("Erro ao carregar contratos — contexto:", context, err);
    // mostra no console body do servidor, se houver
    if (err?.response) {
      console.log("Server response body:", err.response.data);
      setServerError({
        status: err.response.status,
        body: err.response.data,
        context
      });
      toast.error(`Erro ${err.response.status}: Ocorreu um erro no servidor.`);
    } else if (err?.request) {
      setServerError({ status: 0, body: "Sem resposta do servidor (network/CORS?)", context });
      toast.error("Sem resposta do servidor. Verifique conexão/CORS.");
    } else {
      setServerError({ status: null, body: err.message, context });
      toast.error("Erro ao carregar contratos.");
    }
  }

  async function handleRetry() {
    await carregar();
  }

  async function handleDelete(id) {
    if (!window.confirm("Deseja realmente deletar este contrato?")) return;

    try {
      await deletarContrato(id);
      toast.success("Contrato removido.");
      await carregar();  // ← recarrega a lista corretamente
    } catch (err) {
      console.error("Erro ao deletar:", err);
      if (err.response) {
        console.log("Response body:", err.response.data);
      }
      toast.error("Falha ao deletar contrato.");
    }
  }

  if (loading) return <div>Carregando contratos...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Contratos</h1>
        <div>
          <button onClick={() => navigate("/driver/contratos/novo")} className="bg-[#8AD7E1] text-white px-4 py-2 rounded">+ Novo Contrato</button>
        </div>
      </div>

      {serverError && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded">
          <strong className="text-red-700">Erro {serverError.status || ""} no servidor</strong>
          <div className="text-sm text-red-600 mt-2">
            Ocorreu um erro inesperado ao carregar os contratos. Você pode:
            <ul className="list-disc ml-5 mt-2">
              <li>Clicar em Repetir.</li>
              <li>Verificar o console do navegador para ver o body da resposta do servidor.</li>
            </ul>
          </div>

          <div className="mt-3 flex gap-2">
            <button onClick={handleRetry} className="px-3 py-1 bg-yellow-400 rounded">Repetir</button>
            <button onClick={() => { console.log("Server error body:", serverError.body); alert(JSON.stringify(serverError.body, null, 2)); }} className="px-3 py-1 bg-red-100 rounded">Ver detalhes</button>
          </div>
        </div>
      )}

      {contratos.length === 0 ? (
        <div className="text-gray-500">Nenhum contrato encontrado.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contratos.map((c) => (
            <div key={c.id} className="p-5 bg-white rounded-xl shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold">{c.alunoNome || c.responsavel?.nome || `Contrato ${c.id}`}</h2>
                  <p className="text-sm text-gray-600">Início: {c.dataInicio} • Fim: {c.dataFim}</p>
                  <p className="text-sm text-gray-600">Valor mensal: R$ {c.valorMensal}</p>
                  <p className="text-sm text-gray-600">Status: {c.status}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <button onClick={() => navigate(`/driver/contratos/${c.id}/editar`)} className="px-3 py-1 rounded bg-slate-100 hover:bg-slate-200">Editar</button>
                  <button onClick={() => handleDelete(c.id)} className="px-3 py-1 rounded bg-red-50 text-red-600 hover:bg-red-100">Deletar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContratosPage;
