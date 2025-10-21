import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

// --- Interceptor de Requisição (O seu código original) ---
// Adiciona o token Bearer em CADA requisição
api.interceptors.request.use(
  (config) => {
    // Pega o token do localStorage
    const token = localStorage.getItem('accessToken');

    // Se o token existir, adiciona no header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Lida com erros da requisição
    return Promise.reject(error);
  }
);

// --- ATUALIZAÇÃO: Interceptor de Resposta ---
// Lida com erros globais, como 401 (Não Autorizado)
api.interceptors.response.use(
  (response) => {
    // Se a resposta for sucesso (2xx), apenas a retorna
    return response;
  },
  (error) => {
    // Verifica se o erro é 401 (Não autorizado)
    if (error.response && error.response.status === 401) {
      // 1. Limpa o token inválido do localStorage
      localStorage.removeItem('accessToken');
      
      // 2. Limpa outros dados de usuário se você os salvar (opcional)
      // localStorage.removeItem('user'); 
      
      // 3. Redireciona o usuário para a tela de login
      // Usamos window.location pois não podemos usar hooks do React aqui.
      // Ajuste a rota '/login' se a sua for diferente (ex: '/')
      if (window.location.pathname !== '/login') {
         window.location.href = '/login'; 
      }
      
      console.error("Sessão expirada. Por favor, faça login novamente.");
    }

    // Retorna o erro para que outros 'catch' possam lidar com ele
    return Promise.reject(error);
  }
);

export default api;