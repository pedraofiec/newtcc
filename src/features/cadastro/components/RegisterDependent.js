// src/features/cadastro/components/RegisterDependent.jsx
import React from 'react';
import { FaUser, FaPlus, FaCalendarAlt, FaSchool } from 'react-icons/fa';
import RotavanLogo from '../../splash/components/assets/logotcc.jpg';
import './RegisterDependent.css'; // Mantenha o arquivo de animação para consistência

const RegisterDependent = () => {
  const [fullName, setFullName] = React.useState('');
  const [cpf, setCpf] = React.useState('');
  const [dob, setDob] = React.useState('');
  const [school, setSchool] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Cadastro de dependente solicitado:', { fullName, cpf, dob, school });
    alert('Cadastro de dependente solicitado.');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#8AD7E1] p-4 relative overflow-hidden">
      {/* Cabeçalho "ROTAVAN" */}
      <div className="absolute top-0 left-0 w-full p-4 flex items-center z-10 bg-[#A1E3F4]">
        <img src={RotavanLogo} alt="Logo Rotavan" className="w-10 h-10 mr-2" />
        <span className="text-white font-bold text-2xl tracking-widest">ROTAVAN</span>
      </div>

      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-2xl mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">CADASTRO DE DEPENDENTES</h2>

        <div className="relative mb-6">
          <FaUser className="text-8xl text-gray-800" />
          <FaPlus className="absolute bottom-0 right-0 text-3xl text-gray-600 bg-white border-2 border-white rounded-full" />
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome completo"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 bg-gray-200 placeholder-gray-500"
          />
          <input
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 bg-gray-200 placeholder-gray-500"
          />
          <input
            type="date"
            placeholder="Data de nascimento"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 bg-gray-200 text-gray-500"
          />
          <input
            type="text"
            placeholder="Escola"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 bg-gray-200 placeholder-gray-500"
          />
          <div className="flex justify-center mt-4">
            <FaPlus className="text-3xl text-gray-600 cursor-pointer hover:text-gray-800 transition duration-200" />
          </div>
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

export default RegisterDependent;