import api from "../../../api";


/**
 * Serviço de API para operações de Autenticação (Login e Registro).
 */
const LoginService = {

  /**
   * Realiza o registro de um novo usuário.
   * @param {object} registerData - Os dados de registro do usuário (name, email, password, picture).
   * @returns {Promise<object>} - Uma Promise que resolve para os dados do usuário registrado.
   */
  async register(registerData) {
    try {
      // Usa a instância 'api' para fazer a chamada. A baseURL já está configurada.
      const response = await api.post('/v1/api/auth/register', registerData);
      return response.data;
    } catch (error) {
      console.error('Erro no registro:', error.response || error);
      
      let errorMessage = 'Erro ao registrar. Por favor, tente novamente.';
      if (error.response && error.response.status === 409) {
        errorMessage = 'Este email já está registrado. Por favor, use outro.';
      } else if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      
      throw new Error(errorMessage);
    }
  },

  /**
   * Realiza o login de um usuário.
   * @param {object} loginData - As credenciais de login do usuário (email, password).
   * @returns {Promise<object>} - Uma Promise que resolve para os dados do usuário logado.
   */
  async login(loginData) {
    try {
      // Usa a instância 'api' para fazer a chamada. A baseURL já está configurada.
      const response = await api.post('/v1/api/auth/login', loginData);
      return response.data;
    } catch (error) {
      console.error('Erro no login:', error.response || error);

      let errorMessage = 'Erro ao fazer login. Por favor, tente novamente.';
      if (error.response && error.response.status === 401) {
        errorMessage = 'Email ou senha inválidos.';
      } else if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }

      throw new Error(errorMessage);
    }
  }

};

export default LoginService;