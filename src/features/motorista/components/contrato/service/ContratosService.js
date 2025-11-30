// src/features/contratos/services/ContratosService.js
import api from "../../../../shared/utils/api";

// listar, buscar, criar, etc — usando api (baseURL do .env)

/** GET /contratos */
export async function listarContratos() {
  const res = await api.get("/contratos");
  return res.data;
}

/** GET /contratos/{id} */
export async function getContratoById(id) {
  const res = await api.get(`/contratos/${id}`);
  return res.data;
}

/** POST /contratos */
export async function criarContrato(dados) {
  const res = await api.post("/contratos", dados);
  return res.data;
}

/** PUT /contratos/{id} */
export async function atualizarContrato(id, dados) {
  const res = await api.put(`/contratos/${id}`, dados);
  return res.data;
}

/** DELETE /contratos/{id} */
export async function deletarContrato(id) {
  const res = await api.delete(`/contratos/${id}`);
  return res.data;
}

/** listar por responsavel: GET /contratos/responsavel/{responsavelId} */
export async function listarContratosPorResponsavel(responsavelId) {
  const res = await api.get(`/contratos/responsavel/${responsavelId}`);
  return res.data;
}

/** listar por motorista: GET /contratos/motorista/{motoristaId} */
export async function listarContratosPorMotorista(motoristaId) {
  const res = await api.get(`/contratos/motorista/${motoristaId}`);
  return res.data;
}
