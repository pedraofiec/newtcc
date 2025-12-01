// src/features/shared/utils/UserService.js
import { jwtDecode } from "jwt-decode";

/**
 * Retorna dados do usuário logado lendo apenas o JWT.
 * Garante:
 *  - userId  -> id do usuário (ou sub)
 *  - id      -> mesmo valor de userId (pra compatibilidade)
 *  - email   -> cai para 'sub' se não existir 'email'
 */
export async function getMe() {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("Usuário não autenticado.");
  }

  try {
    const decoded = jwtDecode(token);

    // id base (userId, id ou sub)
    const baseId =
      decoded.userId ||
      decoded.id ||
      decoded.sub ||
      "";

    return {
      // para telas novas
      userId: baseId,
      // para telas antigas que ainda usam "id"
      id: baseId,

      nome:
        decoded.nome ||
        decoded.name ||
        decoded.nomeResponsavel ||
        decoded.nomeMotorista ||
        "",

      // 👇 AQUI ESTÁ O PULO DO GATO: cai para 'sub' se não tiver 'email'
      email:
        decoded.email ||
        decoded.username ||
        decoded.sub ||
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
