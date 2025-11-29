// src/features/viagens/services/ViagensService.js
import axios from "axios";

// Altere a URL conforme o ambiente (dev/homolog/prod)
const api = axios.create({
  baseURL: "http://10.5.36.14:5000/v1/api",
});

// Interceptor para enviar o token JWT em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ============================================================================
 * VIAGENS – API para gerenciamento e acompanhamento de viagens (corridas)
 * Swagger:
 *  GET    /v1/api/viagens
 *  POST   /v1/api/viagens
 *  PATCH  /v1/api/viagens/{id}/status
 *  GET    /v1/api/viagens/{id}
 *  DELETE /v1/api/viagens/{id}
 *  GET    /v1/api/viagens/motorista/{motoristaId}
 *  GET    /v1/api/viagens/crianca/{criancaId}
 * ==========================================================================*/

/**
 * Lista todas as viagens.
 * GET /v1/api/viagens
 */
export async function listarViagens() {
  try {
    const response = await api.get("/viagens");
    return response.data;
  } catch (error) {
    console.error("Erro ao listar viagens:", error);
    throw error;
  }
}

/**
 * Cria (agenda) uma nova viagem.
 * POST /v1/api/viagens
 * @param {Object} payload  Ex: { motoristaId, criancaId, dataHoraSaida, dataHoraRetorno, ... }
 */
export async function criarViagem(payload) {
  try {
    const response = await api.post("/viagens", payload);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar viagem:", error);
    throw error;
  }
}

/**
 * Atualiza o status de uma viagem (ex: Iniciar, Finalizar, Cancelar).
 * PATCH /v1/api/viagens/{id}/status
 * @param {string} id       UUID da viagem
 * @param {string} status   Novo status (ver enum do back: por ex. "AGENDADA", "EM_ANDAMENTO", "FINALIZADA"...)
 */
export async function atualizarStatusViagem(id, status) {
  try {
    const response = await api.patch(`/viagens/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar status da viagem ${id}:`, error);
    throw error;
  }
}

/**
 * Busca detalhes de uma viagem pelo ID.
 * GET /v1/api/viagens/{id}
 */
export async function buscarViagemPorId(id) {
  try {
    const response = await api.get(`/viagens/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar viagem ${id}:`, error);
    throw error;
  }
}

/**
 * Deleta (cancela definitivamente) uma viagem.
 * DELETE /v1/api/viagens/{id}
 */
export async function deletarViagem(id) {
  try {
    const response = await api.delete(`/viagens/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao deletar viagem ${id}:`, error);
    throw error;
  }
}

/**
 * Busca viagens de um motorista por data (ver DTO esperado no back).
 * GET /v1/api/viagens/motorista/{motoristaId}
 * @param {string} motoristaId  UUID do motorista
 * @param {Object} filtros      Ex: { dataInicio, dataFim } se o back suportar query params
 */
export async function listarViagensPorMotorista(motoristaId, filtros = {}) {
  try {
    const response = await api.get(`/viagens/motorista/${motoristaId}`, {
      params: filtros,
    });
    return response.data;
  } catch (error) {
    console.error(
      `Erro ao listar viagens do motorista ${motoristaId}:`,
      error
    );
    throw error;
  }
}

/**
 * Busca histórico de viagens de um dependente (criança) por período.
 * GET /v1/api/viagens/crianca/{criancaId}
 * @param {string} criancaId  UUID da criança
 * @param {Object} filtros    Ex: { dataInicio, dataFim }
 */
export async function listarViagensPorCrianca(criancaId, filtros = {}) {
  try {
    const response = await api.get(`/viagens/crianca/${criancaId}`, {
      params: filtros,
    });
    return response.data;
  } catch (error) {
    console.error(
      `Erro ao listar viagens da criança (dependente) ${criancaId}:`,
      error
    );
    throw error;
  }
}
