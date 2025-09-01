import React from 'react';
import LoginForm from './components/LoginForm';
import Fundo1 from './components/assets/Fundo1.png'; // <-- Importe a imagem

const SplashScreen = () => {
  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${Fundo1})` // <-- Use a variável aqui
      }}
    >
      {/* Overlay com opacidade de 0.5 */}
      <div className="absolute inset-0 bg-black opacity-20"></div>

      {/* Formulário sobreposto com z-index para ficar acima do overlay */}
      <div className="relative z-10 w-full max-w-sm">
        <LoginForm/>
      </div>
    </div>
  );
};

export default SplashScreen;