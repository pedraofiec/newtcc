// src/features/splash/components/SplashScreen.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Fundo from './components/assets/Fundo1.png';
import LoginForm from './components/LoginForm';

const SplashScreen = () => {
  const navigate = useNavigate();

  

  return (
    <div>
   
     
      {/* Adiciona um overlay para escurecer a imagem de fundo */}
      <div className="absolute inset-0 bg-black bg-cover opacity-70 z-0" style={{
        backgroundImage: `url(${Fundo})`
      }}></div>
    
     <LoginForm />
    </div>
  );
};

export default SplashScreen;