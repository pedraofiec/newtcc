import api from "../../../../shared/utils/api";

// listar, buscar, criar, etc — usando api (baseURL do .env)

/** GET /contratos */
export async function listarContratos() {
  const res = await api.get("/v1/api/contratos");
  return res.data;
}

/** GET /contratos/{id} */
export async function getContratoById(id) {
  const res = await api.get(`/v1/api/contratos/${id}`);
  return res.data;
}

/** POST /contratos */
export async function criarContrato(dados) {
  const res = await api.post("/v1/api/contratos", dados);
  return res.data;
}

/** PUT /contratos/{id} */
export async function atualizarContrato(id, dados) {
  const res = await api.put(`/v1/api/contratos/${id}`, dados);
  return res.data;
}

/** DELETE /contratos/{id} */
export async function deletarContrato(id) {
  const res = await api.delete(`/v1/api/contratos/${id}`);
  return res.data;
}

/** listar por responsavel */
export async function listarContratosPorResponsavel(responsavelId) {
  const res = await api.get(`/v1/api/contratos/responsavel/${responsavelId}`);
  return res.data;
}

/** listar por motorista */
export async function listarContratosPorMotorista(motoristaId) {
  const res = await api.get(`/v1/api/contratos/motorista/${motoristaId}`);
  return res.data;
}
