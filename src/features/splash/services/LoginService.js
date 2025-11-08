// src/features/splash/services/LoginService.js
import api from '../../shared/utils/api';

const LoginService = {
  async login({ email, password }) {
    // Lógica REAL da API (Comente ou remova após os testes)
    try {
      // Usa a instância 'api' para fazer a chamada. A baseURL já está configurada.
      const response = await api.post('/v1/api/auth/login', { email, password });
      return response.data;
    } catch (error) {
      console.error('Erro no login:', error.response || error);
      throw new Error(error.response.data.message);
    }
  },

  /**
   * Realiza o login de um usuário.
   * @param {object} loginData - As credenciais de login do usuário (email, password).
   * @returns {Promise<object>} - Uma Promise que resolve para os dados do usuário logado.
   */
  async me() {
    try {
      // Usa a instância 'api' para fazer a chamada. A baseURL já está configurada.
      const response = await api.get('/v1/api/users/me');
      return response.data;
    } catch (error) {
      console.error('Erro no me:', error.response || error);

      throw new Error(error.response.data.message);
    }
  },

  // Outras funções de serviço...
};

export default LoginService;