// src/features/home/components/SideBar.jsx
import React from 'react';
import { FaHome, FaCar, FaUser, FaRoute } from 'react-icons/fa';

const SideBar = () => {
  return (
    <div className="w-64 bg-[#BDE0EE] p-6 flex flex-col items-center shadow-lg">
      <nav className="w-full">
        <ul>
          <li className="mb-4">
            <a href="#" className="flex items-center text-gray-700 hover:text-gray-900 font-semibold">
              <FaHome className="mr-3" /> Página inicial
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="flex items-center text-gray-700 hover:text-gray-900 font-semibold">
              <FaCar className="mr-3" /> Encontrar motoristas
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="flex items-center text-gray-700 hover:text-gray-900 font-semibold">
              <FaUser className="mr-3" /> Perfil
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center text-gray-700 hover:text-gray-900 font-semibold">
              <FaRoute className="mr-3" /> Rota
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;