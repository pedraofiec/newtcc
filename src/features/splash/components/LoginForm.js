// src/features/splash/components/LoginForm.jsx
import React from 'react';
import { FaUser } from 'react-icons/fa6';
import { useNavigate, useLocation } from 'react-router-dom';
import './LoginForm.css';
import LoginService from '../services/LoginService';
import Fundo from './assets/Fundo1.png';
import useUserStore from './features/shared/store/user-store';
import { jwtDecode } from 'jwt-decode';

// O componente CreateOrLoginOption FOI REMOVIDO COMPLETAMENTE.
// A lógica de showSplash FOI REMOVIDA.

const LoginForm = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPass, setShowPass] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState(null);
  
  // O estado showSplash FOI REMOVIDO.

  const navigate = useNavigate();
  const location = useLocation();
  const {setMe} = useUserStore();

  const redirectTo =
    new URLSearchParams(location.search).get('redirect') || '/';

  // Verifica se o usuário já está logado e redireciona (Lógica Mantida)
  React.useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        navigate(redirectTo, { replace: true });
    }
    // O useEffect para 'skipSplash' FOI REMOVIDO.
  }, [navigate, redirectTo]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Use as credenciais de teste: teste@rotavan.com.br / 123
      const response = await LoginService.login({ email, password });
      
      localStorage.setItem('accessToken', response.data.accessToken);
      
      // Redireciona para a rota protegida após o login
      navigate(redirectTo, { replace: true });
    } catch (e) {
      console.error(e);
      setError('Não foi possível entrar. Verifique suas credenciais.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const [form,setForm] = React.useState({email: "", password: ''})

    const submitForm = async (e) => {
        e.preventDefault();
        
        // Isso eu pego do backend
        const responseData = await LoginService.login(form)
        const receivedTokenFromBackend = responseData.token;
        localStorage.setItem("accessToken", receivedTokenFromBackend)

        const decodedUser = jwtDecode(receivedTokenFromBackend);
        // Armazena o token e as informações decodificadas no Zustand
        setAuthData(receivedTokenFromBackend, decodedUser);
        console.log('Dados do usuário decodificados e armazenados:', decodedUser);
        
        const me = await LoginService.me();
        setMe(me.tipo, me)
    

        navigate("/home")

    }

  // RENDERIZAÇÃO: Agora renderiza apenas o formulário de login imediatamente.
  return (
    <div
      className="relative min-h-[100dvh] flex slideIn flex-col items-center justify-center p-4 z-100"
      style={{
       
        backgroundPosition: 'center',
      }}
    >

      {/* Formulário de Login (Card central com Glassmorphism) */}
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
          {/* Input Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 bg-white/80"
          />

          {/* Input Senha */}
          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Senha"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              // Corrigindo a largura para acomodar o botão 'Mostrar'
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

          {/* Botão Entrar */}
          <button
            type="submit"
            disabled={isSubmitting || !email || !password}
            className="w-full py-3 mt-4 text-lg font-semibold text-white bg-gray-600 rounded-full shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Entrando…' : 'Entrar'}
          </button>
        </form>

        {/* Links de navegação */}
        <div className="text-center mt-6 text-gray-700">
          <button
            type="button"
            onClick={() => navigate('/register')}
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