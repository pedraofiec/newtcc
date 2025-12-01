// src/features/contratos/services/ContratosService.js
import api from "../../../../shared/utils/api";

// baseURL do api.js = http://localhost:5000
// então aqui colocamos o prefixo completo da API
const BASE_URL = "/v1/api/contratos";

/** GET /v1/api/contratos */
export async function listarContratos() {
  const res = await api.get(BASE_URL);
  return res.data;
}

/** GET /v1/api/contratos/{id} */
export async function getContratoById(id) {
  const res = await api.get(`${BASE_URL}/${id}`);
  return res.data;
}

/** POST /v1/api/contratos */
export async function criarContrato(dados) {
  const res = await api.post(BASE_URL, dados);
  return res.data;
}

/** PUT /v1/api/contratos/{id} */
export async function atualizarContrato(id, dados) {
  const res = await api.put(`${BASE_URL}/${id}`, dados);
  return res.data;
}

/** DELETE /v1/api/contratos/{id} */
export async function deletarContrato(id) {
  const res = await api.delete(`${BASE_URL}/${id}`);
  return res.data;
}

/** listar por responsavel: GET /v1/api/contratos/responsavel/{responsavelId} */
export async function listarContratosPorResponsavel(responsavelId) {
  const res = await api.get(`${BASE_URL}/responsavel/${responsavelId}`);
  return res.data;
}

/** listar por motorista: GET /v1/api/contratos/motorista/{motoristaId} */
export async function listarContratosPorMotorista(motoristaId) {
  const res = await api.get(`${BASE_URL}/motorista/${motoristaId}`);
  return res.data;
}
