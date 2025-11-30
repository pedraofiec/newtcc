// src/features/shared/utils/UserService.js
import api from "./api";

/**
 * GET /v1/api/users/me
 */
export async function getMe() {
  // 👇 aqui é só "/users/me"
  const response = await api.get("/users/me");
  return response.data;
}
