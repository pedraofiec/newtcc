// src/features/responsavel/services/ResponsavelService.js
import api from "../../shared/utils/api";

/**
 * Lê o responsavelId do localStorage (se existir)
 */
function getResponsavelIdFromStorage() {
  return localStorage.getItem("responsavelId") || null;
}

/**
 * Salva o responsavelId no localStorage (se vier válido)
 */
function saveResponsavelId(id) {
  if (id) {
    localStorage.setItem("responsavelId", id);
  }
}

/**
 * 🔹 Buscar dados do responsável logado
 *
 * Estratégia:
 *  1) Se tiver responsavelId salvo → GET /responsaveis/{id}
 *  2) Se não tiver ou der erro:
 *     2.1) Tenta GET /responsaveis/dependentes/criancas
 *          e pega o "responsavel" do primeiro dependente.
 *     2.2) Se ainda não achar, GET /responsaveis e:
 *          - se houver só 1 responsável na lista, assume que é ele.
 */
export async function getResponsavel() {
  // 1) tenta pelo ID salvo
  const storedId = getResponsavelIdFromStorage();

  if (storedId) {
    try {
      const resp = await api.get(`/responsaveis/${storedId}`);
      return resp.data;
    } catch (err) {
      console.warn(
        "Não foi possível carregar responsável pelo ID salvo. Tentando descobrir pelo endpoint de dependentes...",
        err
      );
    }
  }

  // 2.1) tenta descobrir pelo endpoint de dependentes do responsável logado
  try {
    const depsResp = await api.get("/responsaveis/dependentes/criancas");
    const raw = depsResp.data;

    const dependentes =
      (Array.isArray(raw) && raw) ||
      (Array.isArray(raw?.content) && raw.content) ||
      [];

    if (dependentes.length > 0) {
      const primeiro = dependentes[0];

      if (primeiro.responsavel && primeiro.responsavel.id) {
        const responsavel = primeiro.responsavel;
        saveResponsavelId(responsavel.id);
        return responsavel;
      }
    }
  } catch (err) {
    console.warn(
      "Falha ao tentar descobrir responsável via /responsaveis/dependentes/criancas:",
      err
    );
  }

  // 2.2) fallback final: lista todos os responsáveis
  try {
    const resp = await api.get("/responsaveis");
    const raw = resp.data;

    const lista =
      (Array.isArray(raw) && raw) ||
      (Array.isArray(raw?.content) && raw.content) ||
      [];

    if (lista.length === 1) {
      const unico = lista[0];
      saveResponsavelId(unico.id);
      return unico;
    }

    throw new Error(
      "Não foi possível identificar unicamente o responsável (lista vazia ou com vários itens)."
    );
  } catch (err) {
    console.error("Erro ao carregar responsáveis:", err);
    throw new Error(
      "Responsável não identificado. Verifique se o responsavelId está sendo salvo no login ou se o cadastro está correto."
    );
  }
}

/**
 * 🔹 Atualizar dados do responsável logado
 *     Endpoint: PUT /responsaveis/{id}
 */
export async function updateResponsavel(data) {
  let responsavelId = getResponsavelIdFromStorage();

  if (!responsavelId) {
    const resp = await getResponsavel(); // isso já salva o id também
    responsavelId = resp.id;
  }

  try {
    const response = await api.put(`/responsaveis/${responsavelId}`, data);
    // Se o back devolver o objeto atualizado, garantimos que o id fique salvo
    if (response.data?.id) {
      saveResponsavelId(response.data.id);
    }
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar responsável:", error);
    throw error;
  }
}

/**
 * 🔹 Listar dependentes (crianças) do responsável logado
 *     Endpoint: GET /responsaveis/dependentes/criancas
 */
export async function getDependentes() {
  try {
    const response = await api.get("/responsaveis/dependentes/criancas");
    return response.data;
  } catch (error) {
    console.error("Erro ao carregar dependentes:", error);
    throw error;
  }
}

/**
 * 🔹 Buscar um dependente específico pelo ID
 *     Endpoint: GET /responsaveis/dependentes/criancas/{id}
 */
export async function getDependenteById(id) {
  try {
    const response = await api.get(`/responsaveis/dependentes/criancas/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao carregar dependente:", error);
    throw error;
  }
}

/**
 * 🔹 Cadastrar novo dependente para o responsável logado
 *     Endpoint: POST /responsaveis/dependentes/criancas
 */
export async function createDependente(data) {
  try {
    const response = await api.post(`/responsaveis/dependentes/criancas`, data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar dependente:", error);
    throw error;
  }
}

/**
 * 🔹 Atualizar dependente
 *     Endpoint: PUT /responsaveis/dependentes/criancas/{id}
 */
export async function updateDependente(id, data) {
  try {
    const response = await api.put(
      `/responsaveis/dependentes/criancas/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar dependente:", error);
    throw error;
  }
}

/**
 * 🔹 Excluir dependente
 *     Endpoint: DELETE /responsaveis/dependentes/criancas/{id}
 */
export async function deleteDependente(id) {
  try {
    const response = await api.delete(
      `/responsaveis/dependentes/criancas/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir dependente:", error);
    throw error;
  }
}

/**
 * 🔹 Buscar motoristas próximos (solicitações)
 *     Endpoint: GET /responsaveis/motoristas?escola={escolaId}
 */
export async function buscarMotoristas(escolaId) {
  try {
    const response = await api.get(`/responsaveis/motoristas`, {
      params: { escola: escolaId },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar motoristas:", error);
    throw error;
  }
}
