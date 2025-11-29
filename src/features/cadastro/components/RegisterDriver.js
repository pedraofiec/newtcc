// src/features/cadastro/components/RegisterDriver.jsx
import React from 'react';
import { FaUser, FaBus, FaPlus } from 'react-icons/fa';
import './Register.css';

// 🚀 IMPORTANDO O NOVO SERVIÇO
import RegisterService from '../service/RegisterService';

// ⚠️ Recebe goToLogin como prop
const RegisterDriver = ({ goToLogin }) => {
  const [nomeMotorista, setNomeMotorista] = React.useState('');
  const [cnh, setCnh] = React.useState('');
  const [cpf, setCpf] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [valCnh, setValCnh] = React.useState('');
  const [endereco, setEndereco] = React.useState('');
  const [placaVeiculo, setPlacaVeiculo] = React.useState('');

  // 💡 NOVOS ESTADOS PARA API
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (event) => { // 💡 TORNANDO ASSÍNCRONA
    event.preventDefault();
    setError('');
    setLoading(true);

    const data = { 
      nomeMotorista, 
      cnh, 
      cpf,
      phone, 
      email, 
      password,
      endereco,
      placaVeiculo,
      valCnh
    };

    try {
      // 🚀 CHAMA O SERVIÇO DE CADASTRO
      await RegisterService.registerDriver(data);
      
      // Sucesso: feedback e redirecionamento
      alert('Cadastro de Motorista realizado com sucesso! Faça login para continuar.');
      if (goToLogin) goToLogin();

    } catch (err) {
      // Falha: exibe o erro
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#4DD0E1] from-0% to-white-500 to-50% p-4 relative overflow-hidden">
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-2xl mt-16 form-container is-visible">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">CADASTRO DE MOTORISTA</h2>
        <div className="relative mb-6">
          <FaBus className="text-8xl text-gray-800 opacity-70" />
          <FaPlus className="absolute bottom-0 right-0 text-3xl text-[#4DD0E1] bg-white rounded-full p-1" />
        </div>
        
        {/* 💡 FEEDBACK DE ERRO */}
        {error && (
            <div className="w-full p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-md border border-red-200">
                {error}
            </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
          {/* ... (Campos de input) ... */}
          <input
            type="text"
            placeholder="Nome Completo"
            value={nomeMotorista}
            onChange={(e) => setNomeMotorista(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 bg-gray-200 placeholder-gray-500"
            required
          />
          <input
            type="text"
            placeholder="Nome CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 bg-gray-200 placeholder-gray-500"
            required
          />
          <input
            type="text"
            placeholder="CNH"
            value={cnh}
            onChange={(e) => setCnh(e.target.value)}
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
          <input
            type="text"
            placeholder="Endereço Casa"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 bg-gray-200 placeholder-gray-500"
            required
          />
          <input
            type="text"
            placeholder="Validade CNH(2025-11-08)"
            value={valCnh}
            onChange={(e) => setValCnh(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 bg-gray-200 placeholder-gray-500"
            required
          />
          <input
            type="text"
            placeholder="Placa Do Veiculo"
            value={placaVeiculo}
            onChange={(e) => setPlacaVeiculo(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 bg-gray-200 placeholder-gray-500"
            required
          />
          

          <button
            type="submit"
            disabled={loading} // 💡 DESABILITA SE CARREGANDO
            className={`w-full py-3 mt-4 text-lg font-semibold text-white bg-[#4DD0E1] rounded-full shadow-md transition duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#34A4B5] focus:outline-none focus:ring-2 focus:ring-[#4DD0E1] focus:ring-offset-2'}`}
          >
            {loading ? 'Cadastrando...' : 'Criar conta'}
          </button>
          {/* Botão para voltar ao Login */}
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

export default RegisterDriver;