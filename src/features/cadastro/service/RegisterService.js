// src/features/cadastro/services/RegisterService.js
// 💡 O caminho de importação para a instância 'api' (Axios)
import api from '../../shared/utils/api'; 

/**
 * Serviço responsável por lidar com todas as operações de registro (cadastro)
 * de diferentes tipos de usuários (Motorista, Responsável, Escola) através da API.
 */
const RegisterService = {
  
  /**
   * Realiza o cadastro de um novo Motorista.
   * Rota de API assumida: /v1/api/auth/register/motorista
   * @param {object} data - Dados do motorista (nome, cnh, telefone, email, senha).
   * @returns {Promise<object>} - Uma Promise que resolve para os dados do motorista recém-criado.
   */
  async registerDriver(data) {
    try {
      const response = await api.post('/v1/api/auth/register/motorista', data);
      
      return response.data;
    } catch (error) {
      console.error('Erro no cadastro de Motorista:', error.response || error);
      
      const errorMessage = error.response?.data?.message || 'Erro ao cadastrar motorista. Tente novamente.';
      // Lançamos o erro para que o componente front-end possa capturá-lo
      throw new Error(errorMessage); 
    }
  },

  /**
   * Realiza o cadastro de um novo Responsável.
   * Rota de API assumida: /v1/api/auth/register/responsavel
   * @param {object} data - Dados do responsável (nome, cpf, telefone, endereço, email, senha).
   * @returns {Promise<object>} - Uma Promise que resolve para os dados do responsável recém-criado.
   */
  async registerResponsible(data) {
    try {
      console.log("DATA ENVIADO", data);
      const response = await api.post('/v1/api/auth/register/responsavel', data);
      
      return response.data;
    } catch (error) {
      console.error('Erro no cadastro de Responsável:', error.response || error);
      
      const errorMessage = error.response?.data?.message || 'Erro ao cadastrar responsável. Tente novamente.';
      throw new Error(errorMessage);
    }
  },
  
  /**
   * Realiza o cadastro de uma nova Escola.
   * Rota de API assumida: /v1/api/register/escolas
   * @param {object} data - Dados da escola (nomeEscola, cnpj, endereço, email, senha).
   * @returns {Promise<object>} - Uma Promise que resolve para os dados da escola recém-criada.
   */
  async registerSchool(data) {
    try {
      const response = await api.post('/v1/api/auth/register/escola', data);
      
      return response.data;
    } catch (error) {
      console.error('Erro no cadastro de Escola:', error.response || error);
      
      const errorMessage = error.response?.data?.message || 'Erro ao cadastrar escola. Tente novamente.';
      throw new Error(errorMessage);
    }
  },
};

export default RegisterService;