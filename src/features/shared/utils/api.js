import axios from "axios";
import { useStatusModalStore } from "../store/modal-store";


// Acessa as funções de estado diretamente do store
const { showLoading, showSuccess, showError, closeModal } = useStatusModalStore.getState();

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
})

// Request interceptor to add the bearer token
api.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    showLoading("Loading...")
    const token = localStorage.getItem('accessToken');

    // If a token exists, add it to the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);


// -----------------------------------------------------------------
// NOVO CÓDIGO: Response Interceptor
// -----------------------------------------------------------------

/**
 * Response Interceptor
 * 1. Fecha o modal de 'loading'.
 * 2. Exibe 'success' ou 'error' com base no status.
 */
api.interceptors.response.use(
  // SUCCESS (Qualquer código de status na faixa de 2xx ou 3xx)
  (response) => {
    // 1. Fecha o modal de loading
    closeModal();
    
    // 2. Exibe o modal de sucesso.
    // Nota: Você pode ajustar a mensagem para algo mais específico, 
    // mas para um interceptor genérico, uma mensagem padrão funciona bem.

    // -----------------------------------------------------------------
        // ALTERAÇÃO: Verifica se o método HTTP é diferente de 'get'
        // Transforma para minúsculas para garantir a comparação
        const httpMethod = response.config.method?.toLowerCase(); 
        
        if (httpMethod !== 'get') {
            // 2. Exibe o modal de sucesso APENAS para POST, PUT, DELETE, etc.
            showSuccess(`Status ${response.status}: Sucesso na operação.`);
        }
    

    // O modal se fechará quando o usuário clicar no botão 'Fechar'.
    
    return response;
  },
  
  // ERROR (Qualquer código de status fora da faixa de 2xx e 3xx)
  async (error) => {
    // 1. Fecha o modal de loading
    closeModal();

    // Extrai o status HTTP e a mensagem de erro
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    // 2. Exibe o modal de erro.
    if (status) {
        showError(`Erro ${status}: ${message}`);
    } else {
        // Erro sem resposta HTTP (ex: falha de rede)
        showError(`Falha de Conexão: ${message}`);
    }

    // 3. (Opcional) Tratamento de token expirado ou não autorizado
    if (status === 401) {
        // Redirecionar para login ou tentar refresh do token
        // ...
    }

    return Promise.reject(error);
  }
);


export default api;