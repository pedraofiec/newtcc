// src/features/cadastro/components/RegisterSchool.jsx
import React from 'react';
import { FaBuilding, FaPlus } from 'react-icons/fa';
import './Register.css';

const RegisterSchool = () => {
  const [schoolName, setSchoolName] = React.useState('');
  const [cnpj, setCnpj] = React.useState('');
  const [address, setAddress] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Cadastro de escola solicitado:', { schoolName, cnpj, address });
    alert('Cadastro de escola solicitado.');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#8AD7E1] p-4 relative overflow-hidden">
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-2xl mt-16 form-container is-visible">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">CADASTRO DE ESCOLA</h2>
        <div className="relative mb-6">
          <FaBuilding className="text-8xl text-gray-800" />
          <FaPlus className="absolute bottom-0 right-0 text-3xl text-gray-600 bg-white border-2 border-white rounded-full" />
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome da escola"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 bg-gray-200 placeholder-gray-500"
          />
          <input
            type="text"
            placeholder="CNPJ"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 bg-gray-200 placeholder-gray-500"
          />
          <input
            type="text"
            placeholder="Endereço"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 bg-gray-200 placeholder-gray-500"
          />
          <button
            type="submit"
            className="w-full py-3 mt-4 text-lg font-semibold text-white bg-[#4DD0E1] rounded-full shadow-md hover:bg-[#34A4B5] focus:outline-none focus:ring-2 focus:ring-[#4DD0E1] focus:ring-offset-2 transition duration-300"
          >
            Criar conta
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterSchool;