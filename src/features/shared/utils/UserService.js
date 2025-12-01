// src/features/shared/utils/UserService.js
import { jwtDecode } from "jwt-decode";

/**
 * Retorna os dados do usuário logado **sem** chamar o backend.
 * Ele lê o token do localStorage e decodifica o JWT.
 *
 * Assim paramos de usar o endpoint inexistente /users/me.
 */
export async function getMe() {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("Usuário não autenticado (sem token).");
  }

  try {
    const decoded = jwtDecode(token);

    // Ajuste esses campos de acordo com o conteúdo REAL do seu token
    return {
      userId: decoded.userId || decoded.id || decoded.sub || "",
      nome: decoded.nome || decoded.name || "",
      email: decoded.email || decoded.username || decoded.sub || "",
      role:
        decoded.role ||
        decoded.tipo ||
        (Array.isArray(decoded.authorities) && decoded.authorities[0]) ||
        decoded.authority ||
        "",
      cnh: decoded.cnh || "",
      valCnh: decoded.valCnh || "",
    };
  } catch (e) {
    console.error("Erro ao decodificar token em getMe:", e);
    throw new Error("Token inválido ou corrompido.");
  }
}
