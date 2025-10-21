import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Importe o hook
import LoginForm from './components/LoginForm';
import Fundo from './components/assets/Fundo1.png'; // Assumindo que o fundo é usado aqui // Assumindo que você tem estilos aqui

const SplashScreen = () => {
  const navigate = useNavigate(); // 2. Inicialize o hook

  // 3. Crie a função para navegar
  const handleGoToRegister = () => {
    navigate('/register');
  };

  return (
    <div
      className="splash-container" // Use sua classe de estilização
      style={{ 
        backgroundImage: `url(${Fundo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center' 
      }}
    >
      {/* 4. Passe a função 'handleGoToRegister' para a prop 'goToRegister' */}
      <LoginForm goToRegister={handleGoToRegister} />
    </div>
  );
};

export default SplashScreen;