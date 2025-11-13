import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * 🔵 MODO DESENVOLVIMENTO
 * Sem validação de token, sem login.
 * Todas as rotas protegidas ficam liberadas.
 */
const DriverRouteGuard = () => {
  return <Outlet />;
};

export default DriverRouteGuard;
