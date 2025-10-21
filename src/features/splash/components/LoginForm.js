// src/features/splash/components/LoginForm.js
import React from 'react';
import { FaUser } from 'react-icons/fa6';
import { useNavigate, useLocation } from 'react-router-dom';
import './LoginForm.css';
import LoginService from '../services/LoginService';
import Fundo from './assets/Fundo1.png';
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

  // --- MUDANÇA 1: Corrigido o redirecionamento ---
  // Antes estava '|| /', o que faria ele voltar para o login.
  // Agora ele vai para '/home' por padrão após logar.
  const redirectTo =
    new URLSearchParams(location.search).get('redirect') || '/home'; 

  React.useEffect(() => {
    // Esta lógica de verificar se já existe token continua útil
    const token = localStorage.getItem('accessToken');
    if (token) {
      navigate(redirectTo, { replace: true });
    }
  }, [navigate, redirectTo]);

  
  // --- MUDANÇA 2: Função de handleSubmit SIMULADA ---
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    console.warn('--- MODO DE TESTE (SEM BACKEND) ---');

    // Simula um atraso de rede de 1.5 segundos
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      // Vamos simular uma lógica simples:
      // Se o email for "teste@teste.com" e a senha "123", o login funciona.
      if (email === 'teste@teste.com' && password === '123') {
        
        console.log('Simulação de login: SUCESSO');
        // 1. Simula a resposta do backend
        const fakeResponse = { accessToken: 'token-falso-para-teste-12345' };

        // 2. Salva o token falso no localStorage
        localStorage.setItem('accessToken', fakeResponse.accessToken);

        // 3. Navega para a página de destino (agora '/home')
        navigate(redirectTo, { replace: true });

      } else {
        // 4. Simula um erro de credenciais
        console.log('Simulação de login: FALHA');
        throw new Error('Credenciais inválidas. Tente novamente.');
      }

    } catch (e) {
      setError(e.message);
    } finally {
      setIsSubmitting(false);
    }

    /* --- CÓDIGO DO BACKEND ORIGINAL (Comentado) ---
    try {
      const response = await LoginService.login({ email, password });
      localStorage.setItem('accessToken', response.accessToken);
      navigate(redirectTo, { replace: true });
    } catch (e) {
      console.error(e);
      setError('Não foi possível entrar. Verifique suas credenciais.');
    } finally {
      setIsSubmitting(false);
    }
    */
  };

  return (
    <div
      className="relative min-h-[100dvh] flex slideIn flex-col items-center justify-center p-4 z-100"
      style={{ backgroundPosition: 'center' }}
    >
      <div className="relative w-full max-w-sm p-8 bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl ring-1 ring-white/50">
        <div className="flex justify-center mb-6">
          <FaUser className="text-8xl text-gray-800" />
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 px-4 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 bg-white/80"
          />

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
            >
              {showPass ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !email || !password}
            className="w-full py-3 mt-4 text-lg font-semibold text-white bg-gray-600 rounded-full shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Entrando…' : 'Entrar'}
          </button>
        </form>

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
