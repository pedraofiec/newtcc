// src/features/splash/components/UserTypeSelection.jsx
import React, { useEffect } from 'react'; // <-- 1. Importar o useEffect
import { FaBus, FaUserCircle, FaBuilding } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UserTypeSelection = () => {
  const navigate = useNavigate();

  // 2. Adicionar o useEffect para injetar a animação na página
  useEffect(() => {
    const animationKeyframes = `
      @keyframes slideInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;

    const styleTag = document.createElement('style');
    styleTag.id = 'slideInUp-animation-style'; // ID para evitar duplicatas
    styleTag.innerHTML = animationKeyframes;

    if (!document.getElementById(styleTag.id)) {
      document.head.appendChild(styleTag);
    }

    // Limpeza opcional quando o componente é desmontado
    return () => {
      const styleElement = document.getElementById(styleTag.id);
      if (styleElement) {
        document.head.removeChild(styleElement);
      }
    };
  }, []); // [] garante que o efeito rode apenas uma vez

  // Estilo base para garantir que os botões comecem invisíveis
  const baseButtonStyle = {
    opacity: 0,
    animationFillMode: 'forwards'
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#8AD7E1] p-4 relative overflow-hidden">
      <div className="flex flex-wrap justify-center items-center space-x-8">
        
        {/* Botão Motorista */}
        <button
          onClick={() => navigate('/register/driver')}
          className="flex flex-col items-center justify-center p-8 bg-[#A1E3F4] rounded-2xl shadow-2xl transition duration-300 transform hover:scale-105 cursor-pointer mb-4"
          // 3. Aplicar a animação via 'style' prop em vez de classe
          style={{ ...baseButtonStyle, animation: 'slideInUp 0.5s ease-out forwards' }}
        >
          <FaBus className="text-5xl text-gray-800 mb-4" />
          <span className="text-lg font-semibold text-gray-800">Motorista</span>
        </button>

        {/* Botão Responsável */}
        <button
          onClick={() => navigate('/register/responsible')}
          className="flex flex-col items-center justify-center p-8 bg-[#A1E3F4] rounded-2xl shadow-2xl transition duration-300 transform hover:scale-105 cursor-pointer mb-4"
          // Aplicar a animação com atraso (delay)
          style={{ ...baseButtonStyle, animation: 'slideInUp 0.5s ease-out 0.15s forwards' }}
        >
          <FaUserCircle className="text-5xl text-gray-800 mb-4" />
          <span className="text-lg font-semibold text-gray-800">Responsável</span>
        </button>

        {/* Botão Escolar */}
        <button
          onClick={() => navigate('/register/school')}
          className="flex flex-col items-center justify-center p-8 bg-[#A1E3F4] rounded-2xl shadow-2xl transition duration-300 transform hover:scale-105 cursor-pointer mb-4"
          // Aplicar a animação com mais atraso
          style={{ ...baseButtonStyle, animation: 'slideInUp 0.5s ease-out 0.3s forwards' }}
        >
          <FaBuilding className="text-5xl text-gray-800 mb-4" />
          <span className="text-lg font-semibold text-gray-800">Escolar</span>
        </button>
        
      </div>
    </div>
  );
};

export default UserTypeSelection;