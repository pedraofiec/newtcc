// src/features/splash/services/LoginService.js

// Credenciais Falsas para Teste
const TEST_USER = {
  email: 'teste@rotavan.com.br',
  password: '123'
};
const FAKE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test-token-valido';

const LoginService = {
  async login({ email, password }) {
    // --- LÓGICA DE TESTE ---
    if (email === TEST_USER.email && password === TEST_USER.password) {
      console.log("Login de teste bem-sucedido! Redirecionando...");
      
      // Simula a resposta da API com um pequeno delay
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: {
              accessToken: FAKE_TOKEN,
              user: { email: TEST_USER.email, name: "Usuário Teste" }
            }
          });
        }, 300); // 300ms de delay para simular a rede
      });
    }
    // --- FIM DA LÓGICA DE TESTE ---

    // Lógica REAL da API (Comente ou remova após os testes)
    try {
      const response = await fetch('SUA_URL_DA_API/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Falha na autenticação da API.');
      }

      const data = await response.json();
      return { data };

    } catch (error) {
      // Retorna erro para o formulário
      throw new Error('Não foi possível se conectar com o servidor.');
    }
  },

  // Outras funções de serviço...
};

export default LoginService;