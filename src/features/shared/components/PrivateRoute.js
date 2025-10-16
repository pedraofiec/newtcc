import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // 1. Verifica se o token de acesso existe no localStorage
  const isAuthenticated = !!localStorage.getItem('accessToken');

  if (isAuthenticated) {
    // 2. Se logado, renderiza o componente filho (ex: HomeScreen)
    return children;
  } else {
    // 3. Se NÃO logado, redireciona para a tela de login.
    // O 'replace: true' impede que o usuário volte para a tela restrita pelo histórico.
    // O 'state' é opcional, mas útil para redirecionar o usuário de volta após o login.
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;