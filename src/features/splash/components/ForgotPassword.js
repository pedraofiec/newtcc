// src/features/splash/components/ForgotPassword.jsx
import React from 'react';
import { FaLock } from 'react-icons/fa';
import LoginService from '../services/LoginService';

const ForgotPassword = () => {
  const [email, setEmail] = React.useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await LoginService.forgotPassword(email);
      alert('As instruções de recuperação de senha foram enviadas para o seu e-mail.');
    } catch (error) {
      console.error('Erro na recuperação de senha:', error.response.data);
      alert('Ocorreu um erro. Verifique seu e-mail e tente novamente.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#8AD7E1] p-4 relative overflow-hidden animate__animated animate__slideInUp">
      <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-2xl mt-16">
        <div className="flex justify-center mb-6">
          <FaLock className="text-8xl text-gray-800" />
        </div>
        <h2 className="text-center text-xl font-semibold mb-6 text-gray-800">RECUPERAR SENHA</h2>
        <p className="text-center text-gray-600 mb-4">
          Digite seu e-mail para receber as instruções de redefinição de senha.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 bg-gray-200"
          />
          <button
            type="submit"
            className="w-full py-3 mt-4 text-lg font-semibold text-white bg-gray-600 rounded-full shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-300"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;