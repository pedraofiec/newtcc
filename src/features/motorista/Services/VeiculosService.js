// src/features/motorista/Services/VeiculosService.js
import api from "../../shared/utils/api";

// A baseURL do api.js é http://localhost:5000
// então aqui PRECISAMOS colocar o prefixo /v1/api
const BASE_URL = "/v1/api/veiculos";

/* ================================
   LISTAR TODOS OS VEÍCULOS
================================ */
export const listarVeiculos = async () => {
  const response = await api.get(BASE_URL);
  return response.data;
};

/* ================================
   CADASTRAR UM NOVO VEÍCULO
================================ */
export const cadastrarVeiculo = async (veiculo) => {
  const response = await api.post(BASE_URL, veiculo);
  return response.data;
};

/* ================================
   BUSCAR VEÍCULO POR ID
================================ */
export const buscarVeiculoPorId = async (id) => {
  const response = await api.get(`${BASE_URL}/${id}`);
  return response.data;
};

/* ================================
   ATUALIZAR VEÍCICULO POR ID
================================ */
export const atualizarVeiculo = async (id, veiculo) => {
  const response = await api.put(`${BASE_URL}/${id}`, veiculo);
  return response.data;
};

/* ================================
   DELETAR VEÍCULO POR ID
================================ */
export const deletarVeiculo = async (id) => {
  const response = await api.delete(`${BASE_URL}/${id}`);
  return response.data;
};

/* ================================
   BUSCAR VEÍCULO POR PLACA
================================ */
export const buscarPorPlaca = async (placa) => {
  const response = await api.get(`${BASE_URL}/placa/${placa}`);
  return response.data;
};
