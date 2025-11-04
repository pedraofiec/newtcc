// src/features/cadastro/components/RegisterResponsible.jsx
import React from 'react';
import { FaUser, FaPlus } from 'react-icons/fa';
import './Register.css';

// 🚀 CORREÇÃO DO CAMINHO DE IMPORTAÇÃO
import RegisterService from '../service/RegisterService'; 

// ⚠️ Recebe goToLogin como prop
const RegisterResponsible = ({ goToLogin }) => {
  const [fullName, setFullName] = React.useState('');
  const [cpf, setCpf] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [email, setEmail] = React.useState(''); 
  const [password, setPassword] = React.useState(''); 
  
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    const data = { 
      fullName, 
      cpf, 
      phone, 
      address, 
      email, 
      password 
    };

    try {
      await RegisterService.registerResponsible(data);
      
      alert('Cadastro de Responsável realizado com sucesso! Faça login para continuar.');
      if (goToLogin) goToLogin();

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#4DD0E1] from-0% to-white-500 to-50% p-4 relative overflow-hidden">
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-2xl mt-16 form-container is-visible">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">CADASTRO DE RESPONSÁVEL</h2>
        <div className="relative mb-6">
          <FaUser className="text-8xl text-gray-800 opacity-70" />
          <FaPlus className="absolute bottom-0 right-0 text-3xl text-[#4DD0E1] bg-white rounded-full p-1" />
        </div>
        
        {error && (
            <div className="w-full p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-md border border-red-200">
                {error}
            </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
          <input
            type="text"
            placeholder="Nome Completo"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 bg-gray-200 placeholder-gray-500"
            required
          />
          <input
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 bg-gray-200 placeholder-gray-500"
            required
          />
          <input
            type="tel"
            placeholder="Telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 bg-gray-200 placeholder-gray-500"
            required
          />
          <input
            type="text"
            placeholder="Endereço Completo"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 bg-gray-200 placeholder-gray-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 bg-gray-200 placeholder-gray-500"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 bg-gray-200 placeholder-gray-500"
            required
          />
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-4 text-lg font-semibold text-white bg-[#4DD0E1] rounded-full shadow-md transition duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#34A4B5] focus:outline-none focus:ring-2 focus:ring-[#4DD0E1] focus:ring-offset-2'}`}
          >
            {loading ? 'Cadastrando...' : 'Criar conta'}
          </button>
          {goToLogin && (
              <button 
                  type="button" 
                  onClick={goToLogin}
                  className="w-full py-3 mt-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition duration-300"
              >
                  Já tem conta? Fazer Login
              </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegisterResponsible;