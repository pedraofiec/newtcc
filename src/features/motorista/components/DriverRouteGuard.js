// src/features/motorista/components/DriverRouteGuard.js
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const DriverRouteGuard = () => {
  const location = useLocation();

  // 1. Lê o token do localStorage
  const token = localStorage.getItem('accessToken');

  // 2. Se não tiver token -> manda pro login
  if (!token) {
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${redirect}`} replace />;
  }

  // 3. Tenta decodificar o token
  let decoded;
  try {
    decoded = jwtDecode(token);
    // Apenas pra você inspecionar no console, se quiser
    console.log('JWT decodificado (DriverRouteGuard):', decoded);
  } catch (err) {
    console.error('Token inválido ou expirado:', err);
    localStorage.removeItem('accessToken');
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${redirect}`} replace />;
  }

  // 4. Descobre o "tipo" do usuário no payload
  const tipoRaw =
    decoded?.tipo ??
    decoded?.tipoUsuario ??
    decoded?.userType ??
    decoded?.role ??
    decoded?.perfil ??
    decoded?.perfilUsuario ??
    null;

  // Se não existir campo de tipo, por enquanto vamos considerar que é motorista
  if (tipoRaw === null || tipoRaw === undefined) {
    return <Outlet />;
  }

  const tipo = String(tipoRaw).toLowerCase();
  const isDriver = tipo.includes('driver') || tipo.includes('motorista');

  // 5. Se NÃO for motorista -> Acesso negado
  if (!isDriver) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-red-50">
        <div className="text-5xl mb-4 text-red-600">🚫</div>
        <h1 className="text-2xl font-bold text-red-800 mb-2">Acesso Negado</h1>
        <p className="text-gray-600 text-center">
          Somente motoristas têm permissão para acessar esta página.
        </p>
        <button
          onClick={() => {
            localStorage.removeItem('accessToken');
            window.location.href = '/#/login';
          }}
          className="mt-6 px-4 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition duration-200"
        >
          Ir para Login
        </button>
      </div>
    );
  }

  // 6. Se chegou aqui, é motorista -> libera as rotas filhas
  return <Outlet />;
};

export default DriverRouteGuard;
