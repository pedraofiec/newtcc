// src/features/responsavel/services/MotoristasService.js
import axios from "axios";

const API_BASE_URL = "http://localhost/v1/api"; // ajuste se mudar

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
 * Lista todos os motoristas cadastrados.
 * GET /v1/api/motoristas
 */
export async function listarMotoristas() {
  const response = await api.get("/motoristas");
  return response.data; // espera lista de motoristas
}

/**
 * Busca um motorista pelo ID (UUID).
 * GET /v1/api/motoristas/{id}
 */
export async function getMotoristaById(id) {
  const response = await api.get(`/motoristas/${id}`);
  return response.data; // dados de 1 motorista
}
