// src/features/contratos/services/ContratosService.js

import axios from "axios";

const API_BASE_URL = "http://10.5.36.14:5000/v1/api"; // ajuste se necessário

const api = axios.create({
  baseURL: API_BASE_URL,
});

// adiciona o token JWT automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Lista todos os contratos (Acesso Admin)
 * GET /v1/api/contratos
 */
export async function listarContratos() {
  const response = await api.get("/contratos");
  return response.data;
}

/**
 * Busca um contrato pelo ID
 * GET /v1/api/contratos/{id}
 */
export async function getContratoById(id) {
  const response = await api.get(`/contratos/${id}`);
  return response.data;
}

/**
 * Cria um novo contrato
 * POST /v1/api/contratos
 */
export async function criarContrato(dados) {
  const response = await api.post("/contratos", dados);
  return response.data;
}

/**
 * Atualiza um contrato pelo ID
 * PUT /v1/api/contratos/{id}
 */
export async function atualizarContrato(id, dados) {
  const response = await api.put(`/contratos/${id}`, dados);
  return response.data;
}

/**
 * Deleta um contrato pelo ID
 * DELETE /v1/api/contratos/{id}
 */
export async function deletarContrato(id) {
  const response = await api.delete(`/contratos/${id}`);
  return response.data;
}

/**
 * Busca todos os contratos de um responsável
 * GET /v1/api/contratos/responsavel/{responsavelId}
 */
export async function listarContratosPorResponsavel(responsavelId) {
  const response = await api.get(`/contratos/responsavel/${responsavelId}`);
  return response.data;
}

/**
 * Busca todos os contratos de um motorista
 * GET /v1/api/contratos/motorista/{motoristaId}
 */
export async function listarContratosPorMotorista(motoristaId) {
  const response = await api.get(`/contratos/motorista/${motoristaId}`);
  return response.data;
}