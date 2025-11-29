// src/features/rotas/services/RotasService.js
import axios from "axios";

// Ajuste a baseURL se o endereço/porta da API mudar
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

/**
 * GET /v1/api/rotas
 * Lista todas as rotas.
 *
 * @param {Object} [params] Parâmetros de query opcionais (pagina, filtros, etc.)
 * @returns {Promise<any>} Dados retornados pela API.
 */
export async function listarRotas(params = {}) {
  try {
    const response = await api.get("/rotas", { params });
    return response.data;
  } catch (error) {
    console.error("Erro ao listar rotas:", error);
    throw error;
  }
}

/**
 * GET /v1/api/rotas/{id}
 * Busca uma rota específica pelo ID.
 *
 * @param {string|number} id ID da rota
 * @returns {Promise<any>} Dados da rota.
 */
export async function obterRotaPorId(id) {
  try {
    const response = await api.get(`/rotas/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar rota com id ${id}:`, error);
    throw error;
  }
}

/**
 * POST /v1/api/rotas
 * Cria uma nova rota.
 *
 * @param {Object} rota Dados da rota a ser criada
 * @returns {Promise<any>} Rota criada (retorno da API).
 */
export async function criarRota(rota) {
  try {
    const response = await api.post("/rotas", rota);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar rota:", error);
    throw error;
  }
}

/**
 * PUT /v1/api/rotas/{id}
 * Atualiza uma rota existente.
 *
 * @param {string|number} id ID da rota
 * @param {Object} rota Dados atualizados da rota
 * @returns {Promise<any>} Rota atualizada (retorno da API).
 */
export async function atualizarRota(id, rota) {
  try {
    const response = await api.put(`/rotas/${id}`, rota);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar rota com id ${id}:`, error);
    throw error;
  }
}

/**
 * DELETE /v1/api/rotas/{id}
 * Exclui uma rota.
 *
 * @param {string|number} id ID da rota
 * @returns {Promise<void>}
 */
export async function excluirRota(id) {
  try {
    await api.delete(`/rotas/${id}`);
  } catch (error) {
    console.error(`Erro ao excluir rota com id ${id}:`, error);
    throw error;
  }
}
