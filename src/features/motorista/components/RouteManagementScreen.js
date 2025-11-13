import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaRoute, FaEdit } from 'react-icons/fa';

const RouteManagementScreen = () => {
  const navigate = useNavigate();

  // Simulação de dados da rota
  const routeData = {
    name: "Rota Matinal 1",
    van: "VAN 001",
    stops: [
      { name: "Ponto de Coleta 1 (Casa do João)", address: "Rua A, 123", time: "06:30", students: 2 },
      { name: "Ponto de Coleta 2 (Prédio Maria)", address: "Av. B, 456", time: "06:45", students: 1 },
      { name: "Escola Central", address: "Praça C, 789", time: "07:10", students: 3 },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
      {/* Botão de Voltar */}
      <button
        onClick={() => navigate('/home')}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium"
      >
        <FaChevronLeft className="mr-2" /> Voltar a Página Inicial
      </button>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
          <FaRoute className="mr-3 text-blue-600" /> Gerenciamento de Rota
        </h1>
        <button
          onClick={() => alert('Abrir Modal de Edição de Rota')}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-200 shadow-md"
        >
          <FaEdit className="mr-2" /> Editar Rota
        </button>
      </div>

      {/* Cartão de Detalhes da Rota */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-2">{routeData.name}</h2>
        <p className="text-gray-600 mb-4">Van Associada: <span className="font-medium">{routeData.van}</span></p>
        
        {/* Simulação de Mapa */}
        <div className="h-64 w-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 font-bold mb-6 border-4 border-dashed border-gray-400">
          [IMAGEM DE MAPA DA ROTA AQUI - Integração com Mapas] 
        </div>

        {/* Lista de Paradas */}
        <h3 className="text-lg font-bold text-gray-700 mb-3 border-b pb-2">Paradas ({routeData.stops.length})</h3>
        <ul className="space-y-4">
          {routeData.stops.map((stop, index) => (
            <li key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm border-l-4 border-blue-500">
              <div className="flex justify-between items-center">
                <p className="text-base font-semibold text-gray-800">{index + 1}. {stop.name}</p>
                <span className="text-sm font-bold text-blue-600">{stop.time}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Endereço: {stop.address}</p>
              <p className="text-xs text-gray-500 mt-1">Alunos para buscar/deixar: {stop.students}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RouteManagementScreen;