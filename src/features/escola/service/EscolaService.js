// src/features/escolas/services/EscolasService.js

import axios from "axios";

const API_BASE_URL = "http://10.5.36.14:5000/v1/api"; // ajuste se necessário

const api = axios.create({
  baseURL: API_BASE_URL,
});

// adiciona token JWT automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Lista todas as escolas
 * GET /v1/api/escolas
 */
export async function listarEscolas() {
  const response = await api.get("/escolas");
  return response.data;
}

/**
 * Busca uma escola pelo ID
 * GET /v1/api/escolas/{id}
 */
export async function getEscolaById(id) {
  const response = await api.get(`/escolas/${id}`);
  return response.data;
}

/**
 * Atualiza uma escola
 * PUT /v1/api/escolas/{id}
 */
export async function atualizarEscola(id, dados) {
  const response = await api.put(`/escolas/${id}`, dados);
  return response.data;
}

/**
 * Deleta uma escola
 * DELETE /v1/api/escolas/{id}
 */
export async function deletarEscola(id) {
  const response = await api.delete(`/escolas/${id}`);
  return response.data;
}

/**
 * Importa escolas via CSV
 * POST /v1/api/escolas/upload-csv
 */
export async function uploadCSV(formData) {
  const response = await api.post("/escolas/upload-csv", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

/**
 * Sincroniza coordenadas de todas as escolas
 * POST /v1/api/escolas/sincronizar-coords
 */
export async function sincronizarCoordenadas() {
  const response = await api.post("/escolas/sincronizar-coords");
  return response.data;
}
