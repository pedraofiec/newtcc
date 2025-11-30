// src/features/responsavel/services/MotoristasService.js
import axios from "axios";

// base do seu back (ajuste se estiver em outra porta/host)
const API_BASE_URL = "http://localhost/v1/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// adiciona token JWT automaticamente em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * GET /v1/api/motoristas
 * Lista todos os motoristas cadastrados.
 */
export async function listarMotoristas() {
  const { data } = await api.get("/motoristas");
  // Exemplo de item (do Swagger):
  // {
  //   "motoristaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //   "nomeMotorista": "string",
  //   "cnh": "string",
  //   "valCnh": "2025-11-30",
  //   "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //   "email": "string"
  // }
  return data;
}

/**
 * GET /v1/api/motoristas/{id}
 * Busca um motorista pelo ID (UUID).
 */
export async function getMotoristaById(id) {
  const { data } = await api.get(`/motoristas/${id}`);
  return data;
}

/**
 * POST /v1/api/auth/register/motorista
 * Registro de um novo motorista (criação de conta).
 *
 * payload esperado (Swagger):
 * {
 *   "email": "motorista@email.com",
 *   "password": "senhaForte123",
 *   "nomeMotorista": "Carlos Alberto",
 *   "cnh": "01234567890",
 *   "cpf": "99988877766",
 *   "placaVeiculo": "BRA2E19",
 *   "valCnh": "2028-10-20"
 * }
 */
export async function registrarMotorista(payload) {
  const { data } = await api.post("/auth/register/motorista", payload);
  // resposta: { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
  return data;
}
