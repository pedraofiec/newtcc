import React from 'react';
import { FaUser } from 'react-icons/fa6';
import { useNavigate, useLocation } from 'react-router-dom';
import './LoginForm.css';
import LoginService from '../services/LoginService';
// Removido 'Fundo' pois não estava sendo usado no JSX
// import Fundo from './assets/Fundo1.png'; 
import useUserStore from '../../shared/store/user-store';
import useAuthStore from '../../shared/store/auth-store';
import { jwtDecode } from 'jwt-decode';

const LoginForm = ({ goToRegister }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPass, setShowPass] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { setMe } = useUserStore();
  const { setAuthData } = useAuthStore();

  // Obtém o parâmetro 'redirect' da URL, se existir, caso contrário, usa '/home'
  const redirectTo =
    new URLSearchParams(location.search).get('redirect') || '/home';

  // Efeito que verifica se o usuário JÁ ESTÁ LOGADO
  // e redireciona para a /home se um token for encontrado.
  React.useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      // Se já tem token, decodifica e atualiza o estado global
      // Isso garante que o estado persista ao recarregar a página
      try {
        const userData = jwtDecode(token);
        setMe(userData);
        setAuthData({ accessToken: token }); // Atualiza o auth store
        navigate(redirectTo, { replace: true });
      } catch (e) {
        // Token inválido, limpa o token armazenado
        localStorage.removeItem('accessToken');
      }
    }
  }, [navigate, redirectTo, setMe, setAuthData]);

  
  // --- ATUALIZAÇÃO: handleSubmit restaurado para usar o backend real ---
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // 1. Chama o serviço de login real
      const response = await LoginService.login({ email, password });

      // 2. Salva o token
      localStorage.setItem('accessToken', response.token);

      // 3. Decodifica o token para obter os dados do usuário
      const userData = jwtDecode(response.token);

      // 4. Atualiza os stores globais do Zustand
      setAuthData(response); // Salva os dados de autenticação (ex: tokens)
      setMe(userData);       // Salva os dados do perfil do usuário

      // 5. Navega para a página de destino (ex: /home)
      navigate(redirectTo, { replace: true });

    } catch (e) {
      console.error(e);
      // Define uma mensagem de erro mais amigável
      if (e.response && e.response.status === 401) {
        setError('Email ou senha inválidos.');
      } else {
        setError('Não foi possível entrar. Tente novamente mais tarde.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="relative min-h-[100dvh] flex slideIn flex-col items-center justify-center p-4 z-100"
      style={{ backgroundPosition: 'center' }}
    >
      <div className="relative w-full max-w-sm p-8 bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl ring-1 ring-white/50">
        <div className="flex justify-center mb-6">
          {/* Ícone de Usuário */}
          <FaUser className="text-8xl text-gray-800" />
        </div>

        {/* Mensagem de Erro */}
        {error && (
          <div className="mb-4 rounded-md bg-red-50 px-4 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Campo de Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 bg-white/80"
          />

          {/* Campo de Senha com Toggle Mostrar/Ocultar */}
          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Senha"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pr-16 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 bg-white/80"
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600 hover:text-gray-800"
              aria-label={showPass ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {showPass ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>

          {/* Botão de Login */}
          <button
            type="submit"
            disabled={isSubmitting || !email || !password}
            className="w-full py-3 mt-4 text-lg font-semibold text-white bg-gray-600 rounded-full shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Entrando…' : 'Entrar'}
          </button>
        </form>

        {/* Links de Ação */}
        <div className="text-center mt-6 text-gray-700">
          <button
            type="button"
            onClick={goToRegister}
            className="block w-full text-sm font-medium hover:underline mb-1"
          >
            Criar conta
          </button>
          <button
            type="button"
            onClick={() => navigate('/forgot-password')}
            className="block w-full text-sm font-medium hover:underline"
          >
            Esqueceu a senha?
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;