// src/features/splash/components/UserTypeSelection.jsx
import React from 'react';
import { FaBus, FaUserCircle, FaBuilding } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // <-- Importe o useNavigate

const UserTypeSelection = () => {
  const navigate = useNavigate(); // <-- Inicialize o hook

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#8AD7E1] p-4 relative overflow-hidden">
      <div className="flex flex-wrap justify-center items-center space-x-8">
        {/* Botão Motorista */}
        <button
          // Use o navigate com a rota correta
          onClick={() => navigate('/register/driver')}
          className="flex flex-col items-center justify-center p-8 bg-[#A1E3F4] rounded-2xl shadow-2xl transition duration-300 transform hover:scale-105 cursor-pointer mb-4"
        >
          <FaBus className="text-5xl text-gray-800 mb-4" />
          <span className="text-lg font-semibold text-gray-800">Motorista</span>
        </button>

        {/* Botão Responsável */}
        <button
          // Use o navigate com a rota correta
          onClick={() => navigate('/register/responsible')}
          className="flex flex-col items-center justify-center p-8 bg-[#A1E3F4] rounded-2xl shadow-2xl transition duration-300 transform hover:scale-105 cursor-pointer mb-4"
        >
          <FaUserCircle className="text-5xl text-gray-800 mb-4" />
          <span className="text-lg font-semibold text-gray-800">Responsável</span>
        </button>

        {/* Botão Escolar */}
        <button
          // Use o navigate com a rota correta
          onClick={() => navigate('/register/school')}
          className="flex flex-col items-center justify-center p-8 bg-[#A1E3F4] rounded-2xl shadow-2xl transition duration-300 transform hover:scale-105 cursor-pointer mb-4"
        >
          <FaBuilding className="text-5xl text-gray-800 mb-4" />
          <span className="text-lg font-semibold text-gray-800">Escolar</span>
        </button>
      </div>
    </div>
  );
};

export default UserTypeSelection;