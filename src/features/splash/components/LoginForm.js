// src/features/splash/components/LoginForm.jsx
import React from 'react';
import { FaUser } from 'react-icons/fa6';
import { useNavigate, useLocation } from 'react-router-dom';
import './LoginForm.css';
import LoginService from '../services/LoginService';
import Fundo from './assets/Fundo1.png';

// --- SplashScreen (inline) ---
const CreateOrLoginOption = ({ onLogin, onRegister }) => (
  <div className="flex flex-col items-center justify-center min-h-screen p-8 z-10">
    
    {/* A classe 'slideIn' foi adicionada aqui */}
    <div className="bg-white p-10 rounded-3xl shadow-2xl flex flex-col items-center z-10 slideIn">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Escolha o que você deseja fazer:</h1>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onLogin}
            className="rounded-full bg-slate-800 text-white px-6 py-2 hover:brightness-110"
          >
            Fazer login
          </button>
          <button
            onClick={onRegister}
            className="rounded-full bg-cyan-500 text-slate-900 px-6 py-2 font-semibold hover:brightness-110"
          >
            Criar conta
          </button>
        </div>
      </div>
    </div>
);
const LoginForm = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPass, setShowPass] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [showSplash, setShowSplash] = React.useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo =
    new URLSearchParams(location.search).get('redirect') || '/';

  React.useEffect(() => {
    const skip = new URLSearchParams(location.search).get('skipSplash');
    if (skip === '1') setShowSplash(false);
  }, [location.search]);

  React.useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) navigate(redirectTo, { replace: true });
  }, [navigate, redirectTo]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await LoginService.login({ email, password });
      localStorage.setItem('accessToken', response.data.accessToken);
      navigate(redirectTo, { replace: true });
    } catch (e) {
      console.error(e);
      setError('Não foi possível entrar. Verifique suas credenciais.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSplash) {
    return (
      <CreateOrLoginOption
        onLogin={() => setShowSplash(false)}
        onRegister={() => navigate('/register')}
      />
    );
  }

  return (
    <div
      className="relative min-h-[100dvh] flex slideIn flex-col items-center justify-center p-4 z-100"
      style={{
       
        backgroundPosition: 'center',
      }}
    >

      <div className="relative w-full max-w-sm p-8 bg-white rounded-2xl shadow-2xl">
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
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
          />

          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Senha"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pr-12 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
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

          <button
            type="submit"
            disabled={isSubmitting || !email || !password}
            className="w-full py-3 mt-4 text-lg font-semibold text-white bg-gray-600 rounded-full shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Entrando…' : 'Entrar'}
          </button>
        </form>

        <div className="text-center mt-6 text-gray-700  z-10">
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
