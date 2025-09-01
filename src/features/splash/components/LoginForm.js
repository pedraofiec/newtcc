// src/features/splash/components/LoginForm.jsx
import React from 'react';
import { FaUser } from 'react-icons/fa6';
import { useNavigate, useLocation } from 'react-router-dom';
import './LoginForm.css';
import LoginService from '../services/LoginService';

// --- SplashScreen (inline) ---
const SplashScreen = ({ onLogin, onRegister }) => (
  <div className="min-h-[100dvh] flex items-center justify-center bg-[#A1E3F4] p-6">
    <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100">
        <span className="text-2xl">🚐</span>
      </div>
      <h1 className="text-2xl font-semibold text-slate-800">ROTAVAN</h1>
      <p className="mt-1 text-slate-600">Rotas escolares com segurança</p>

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

  // /login?redirect=/destino
  const redirectTo =
    new URLSearchParams(location.search).get('redirect') || '/';

  // Permite pular o splash: /login?skipSplash=1
  React.useEffect(() => {
    const skip = new URLSearchParams(location.search).get('skipSplash');
    if (skip === '1') setShowSplash(false);
  }, [location.search]);

  // Se já estiver autenticado, não mostra login/splash
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

  // Primeiro mostra o splash
  if (showSplash) {
    return (
      <SplashScreen
        onLogin={() => setShowSplash(false)}
        onRegister={() => navigate('/register')}
      />
    );
  }

  // Depois, o formulário de login
  return (
    <div className="min-h-[100dvh] flex slideIn flex-col items-center justify-center bg-[#A1E3F4] p-4">
      <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-2xl">
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
