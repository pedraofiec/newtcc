// src/features/solicitacoes/services/SolicitacoesService.js
import axios from "axios";

// Ajuste a baseURL se o endereço da sua API mudar
const api = axios.create({
  baseURL: "http://10.5.36.14:5000/v1/api",
});

// Interceptor para anexar o JWT em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ============================================================================
 * SOLICITAÇÕES – API para o fluxo de solicitação de vaga (Responsável -> Motorista)
 *
 * Swagger:
 *  POST  /solicitacoes                     -> Cria uma nova solicitação de vaga
 *  PATCH /solicitacoes/{id}/decisao        -> Aceita ou recusa uma solicitação (Motorista)
 *  GET   /solicitacoes/{id}/rotas          -> Lista as rotas sugeridas de uma solicitação
 * ==========================================================================*/

/**
 * Cria uma nova solicitação de vaga.
 * POST /solicitacoes
 *
 * @param {Object} dados  Corpo da requisição, conforme o back-end espera
 */
export async function criarSolicitacao(dados) {
  try {
    const response = await api.post("/solicitacoes", dados);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar solicitação de vaga:", error);
    throw error;
  }
}

/**
 * Define a decisão de uma solicitação (aceitar / recusar).
 * PATCH /solicitacoes/{id}/decisao
 *
 * @param {string} id             UUID da solicitação
 * @param {Object} decisaoPayload Ex.: { status: "ACEITA" } ou { status: "RECUSADA" }
 */
export async function decidirSolicitacao(id, decisaoPayload) {
  try {
    const response = await api.patch(`/solicitacoes/${id}/decisao`, decisaoPayload);
    return response.data;
  } catch (error) {
    console.error(`Erro ao definir decisão da solicitação ${id}:`, error);
    throw error;
  }
}

/**
 * Lista rotas sugeridas para uma solicitação.
 * GET /solicitacoes/{id}/rotas
 *
 * @param {string} id  UUID da solicitação
 */
export async function listarRotasDaSolicitacao(id) {
  try {
    const response = await api.get(`/solicitacoes/${id}/rotas`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao listar rotas da solicitação ${id}:`, error);
    throw error;
  }
}
