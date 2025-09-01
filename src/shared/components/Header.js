// src/shared/components/Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../features/splash/components/assets/logotcc.jpg';


const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center w-full p-4 bg-[#BDE0EE] shadow-md">
      <div className="flex items-center">
        <img src={logo} alt="Logo da Rotavan" className="h-10 w-auto mr-2 rounded-full shadow-md" />
        <span className="text-xl font-bold text-gray-700">ROTAVAN</span>
      </div>
      <div className="space-x-4">
        <button
          onClick={() => navigate('/login')}
          className="py-2 px-6 bg-gray-600 text-white rounded-full shadow-md hover:bg-gray-700 transition duration-300"
        >
          Entrar
        </button>
        <button
          onClick={() => navigate('/register')}
          className="py-2 px-6 bg-[#4DD0E1] text-white rounded-full shadow-md hover:bg-[#34A4B5] transition duration-300"
        >
          Criar conta
        </button>
      </div>
    </div>
  );
};

export default Header;