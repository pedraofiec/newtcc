// src/features/shared/utils/UserService.js
import { jwtDecode } from "jwt-decode";

/**
 * Retorna dados do usuário logado lendo apenas o JWT.
 */
export async function getMe() {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("Usuário não autenticado.");
  }

  try {
    const decoded = jwtDecode(token);

    return {
      id:
        decoded.userId ||
        decoded.id ||
        decoded.sub || // << geralmente o correto
        "",
      nome:
        decoded.nome ||
        decoded.name ||
        decoded.nomeResponsavel ||
        "",
      email:
        decoded.email ||
        decoded.username ||
        "",
      role:
        decoded.role ||
        decoded.tipo ||
        (Array.isArray(decoded.authorities) && decoded.authorities[0]) ||
        decoded.authority ||
        "",
    };
  } catch (e) {
    console.error("Erro ao decodificar token:", e);
    throw new Error("Token inválido.");
  }
}
