// src/services/responsaveisService.js

import api from "../../shared/utils/api";


// 🔹 Buscar dados do responsável logado
export async function getResponsavel() {
  try {
    const response = await api.get("/responsaveis/me");
    return response.data;
  } catch (error) {
    console.error("Erro ao carregar dados do responsável:", error);
    throw error;
  }
}

// 🔹 Atualizar informações do responsável
export async function updateResponsavel(data) {
  try {
    const response = await api.put("/responsaveis/update", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar responsável:", error);
    throw error;
  }
}

// 🔹 Listar dependentes vinculados ao responsável
export async function getDependentes() {
  try {
    const response = await api.get("/responsaveis/dependentes");
    return response.data;
  } catch (error) {
    console.error("Erro ao carregar dependentes:", error);
    throw error;
  }
}

// 🔹 Buscar dependente por ID
export async function getDependenteById(id) {
  try {
    const response = await api.get(`/responsaveis/dependentes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao carregar dependente:", error);
    throw error;
  }
}

// 🔹 Cadastrar novo dependente
export async function createDependente(data) {
  try {
    const response = await api.post("/responsaveis/dependentes", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar dependente:", error);
    throw error;
  }
}

// 🔹 Atualizar dependente
export async function updateDependente(id, data) {
  try {
    const response = await api.put(`/responsaveis/dependentes/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar dependente:", error);
    throw error;
  }
}

// 🔹 Excluir dependente
export async function deleteDependente(id) {
  try {
    const response = await api.delete(`/responsaveis/dependentes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir dependente:", error);
    throw error;
  }
}

// 🔹 Buscar motoristas próximos (solicitações)
export async function buscarMotoristas(escolaId) {
  try {
    const response = await api.get(`/responsaveis/motoristas?escola=${escolaId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar motoristas:", error);
    throw error;
  }
}
