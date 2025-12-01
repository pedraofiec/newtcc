// src/features/splash/services/LoginService.js
import api from "../../shared/utils/api";

const LoginService = {
  async login({ email, password }) {
    try {
      const response = await api.post(
        "/v1/api/auth/login",
        { email, password },
        {
          headers: {
            Authorization: undefined, // garante que não manda Bearer
          },
        }
      );

      console.log("LOGIN RESPONSE DATA =>", response.data);
      // Só devolve os dados. Quem salva token é o componente.
      return response.data;
    } catch (error) {
      console.error("Erro no login:", error.response || error);

      const message =
        error.response?.data?.message ||
        error.message ||
        "Erro desconhecido ao fazer login";

      throw new Error(message);
    }
  },

  // 🚫 APAGAMOS o me(), porque /users/me NÃO existe no back
};

export default LoginService;
