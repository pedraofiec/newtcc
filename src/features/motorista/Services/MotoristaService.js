// src/features/responsavel/services/MotoristasService.js
import api from "../../shared/utils/api";

// base do recurso no backend (Swagger usa /v1/api/...)
// a baseURL do api.js é http://localhost:5000
const BASE_URL = "/v1/api/motoristas";

/**
 * GET /v1/api/motoristas
 * Lista todos os motoristas cadastrados.
 */
export async function listarMotoristas() {
  const { data } = await api.get(BASE_URL);
  return data;
}

/**
 * GET /v1/api/motoristas/{id}
 * Busca um motorista pelo ID (UUID).
 */
export async function getMotoristaById(id) {
  const { data } = await api.get(`${BASE_URL}/${id}`);
  return data;
}

/**
 * POST /v1/api/auth/register/motorista
 * Registro de um novo motorista (criação de conta).
 */
export async function registrarMotorista(payload) {
  const { data } = await api.post(
    "/v1/api/auth/register/motorista",
    payload,
    {
      headers: {
        Authorization: undefined, // não manda Bearer no registro
      },
    }
  );
  return data;
}
