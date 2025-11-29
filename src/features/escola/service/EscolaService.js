// src/features/escola/services/EscolasService.js
import axios from "axios";
import api from "../../shared/utils/api";




/* ============================================================================
 * ESCOLAS – API para gerenciamento de Escolas
 * Swagger:
 *  GET    /escolas/{id}          -> buscar escola pelo ID
 *  PUT    /escolas/{id}          -> atualizar escola
 *  DELETE /escolas/{id}          -> deletar escola
 *  POST   /escolas/upload-csv    -> importar escolas via CSV
 *  POST   /escolas/sincronizar-coords -> sincronizar coordenadas
 *  GET    /escolas               -> listar todas as escolas
 * ==========================================================================*/

/**
 * Lista todas as escolas
 * GET /escolas
 */
export async function listarEscolas() {
  try {
    const response = await api.get("/escolas");
    return response.data;
  } catch (error) {
    console.error("Erro ao listar escolas:", error);
    throw error;
  }
}

/**
 * Busca uma escola pelo ID (UUID)
 * GET /escolas/{id}
 */
export async function buscarEscolaPorId(id) {
  try {
    const response = await api.get(`/escolas/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar escola ${id}:`, error);
    throw error;
  }
}

/**
 * Atualiza dados de uma escola
 * PUT /escolas/{id}
 * @param {string} id      UUID da escola
 * @param {Object} dados   objeto com os campos que podem ser atualizados
 */
export async function atualizarEscola(id, dados) {
  try {
    const response = await api.put(`/escolas/${id}`, dados);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar escola ${id}:`, error);
    throw error;
  }
}

/**
 * Deleta (remove) uma escola
 * DELETE /escolas/{id}
 */
export async function deletarEscola(id) {
  try {
    const response = await api.delete(`/escolas/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao deletar escola ${id}:`, error);
    throw error;
  }
}

/**
 * Importa escolas via upload de arquivo CSV
 * POST /escolas/upload-csv
 * @param {File} file   arquivo CSV selecionado no input type="file"
 */
export async function uploadEscolasCsv(file) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/escolas/upload-csv", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao importar escolas via CSV:", error);
    throw error;
  }
}

/**
 * Sincroniza coordenadas das escolas
 * POST /escolas/sincronizar-coords
 * @param {Object} payload  depende de como o back espera (pode ser vazio {})
 */
export async function sincronizarCoordenadas(payload = {}) {
  try {
    const response = await api.post("/escolas/sincronizar-coords", payload);
    return response.data;
  } catch (error) {
    console.error("Erro ao sincronizar coordenadas das escolas:", error);
    throw error;
  }
}
