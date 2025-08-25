// src/features/splash/components/LoginForm.jsx
import React from 'react';
import { FaUser } from 'react-icons/fa6'; 
import './LoginForm.css';

const LoginForm = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Login solicitado com:', { email, password });
    alert(`Login solicitado com E-mail: ${email}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#A1E3F4] p-4 relative overflow-hidden">
      {/* A parte de cima (cabeçalho) foi removida daqui */}

      <div
        className={`w-full max-w-sm p-8 bg-[#A1E3F4] rounded-2xl shadow-2xl mt-16`}
      >
        <div className="flex justify-center mb-6">
          <FaUser className="text-8xl text-gray-800" />
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
          />
          
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
          />
          
          <button
            type="submit"
            className="w-full py-3 mt-4 text-lg font-semibold text-white bg-gray-600 rounded-full shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-300"
          >
            Entrar
          </button>
        </form>

        <div className="text-center mt-6 text-gray-700">
          <a href="#" className="block text-sm font-medium hover:underline mb-1">Criar conta</a>
          <a href="#" className="block text-sm font-medium hover:underline">Esqueceu a senha?</a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;