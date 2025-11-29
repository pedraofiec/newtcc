// src/services/pontoService.js

import api from "../../shared/utils/api";

// Busca ponto por ID
export async function getPontoById(id) {
  const { data } = await api.get(`/v1/api/pontos/${id}`);
  return data; // Ponto
}

// Atualiza ponto
export async function updatePonto(id, payload) {
  const { data } = await api.put(`/v1/api/pontos/${id}`, payload);
  return data; // Ponto
}

// Deleta ponto
export async function deletePonto(id) {
  await api.delete(`/v1/api/pontos/${id}`);
}
