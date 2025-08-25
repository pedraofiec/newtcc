// src/features/splash/components/UserTypeSelection.jsx
import React from 'react';
import { FaBus, FaUserCircle } from 'react-icons/fa';

const UserTypeSelection = ({ onSelectResponsible }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#8AD7E1] p-4 relative overflow-hidden">
      {/* Cabeçalho "ROTAVAN" */}
      <div className="absolute top-0 left-0 w-full p-4 flex items-center z-10 bg-[#A1E3F4]">
        <span className="text-white font-bold text-2xl tracking-widest">ROTAVAN</span>
      </div>

      <div className="flex justify-center items-center space-x-8">
        {/* Botão Motorista */}
        <button className="flex flex-col items-center justify-center p-8 bg-[#A1E3F4] rounded-2xl shadow-2xl transition duration-300 transform hover:scale-105 cursor-pointer">
          <FaBus className="text-5xl text-gray-800 mb-4" />
          <span className="text-lg font-semibold text-gray-800">Motorista</span>
        </button>

        {/* Botão Responsável */}
        <button
          onClick={onSelectResponsible}
          className="flex flex-col items-center justify-center p-8 bg-[#A1E3F4] rounded-2xl shadow-2xl transition duration-300 transform hover:scale-105 cursor-pointer"
        >
          <FaUserCircle className="text-5xl text-gray-800 mb-4" />
          <span className="text-lg font-semibold text-gray-800">Responsável</span>
        </button>
      </div>
    </div>
  );
};

export default UserTypeSelection;