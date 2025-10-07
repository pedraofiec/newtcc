// src/features/splash/components/ForgotPassword.jsx
import React from 'react';
import { FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Importando para o botão "Voltar"
import LoginService from '../services/LoginService';
// Importa a imagem de fundo
import Fundo from './assets/Fundo1.png'; 

const ForgotPassword = () => {
  const [email, setEmail] = React.useState('');
  const navigate = useNavigate(); // Instância de navegação para voltar
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Você precisará implementar LoginService.forgotPassword
      // await LoginService.forgotPassword(email);
      alert('As instruções de recuperação de senha foram enviadas para o seu e-mail.');
    } catch (error) {
      console.error('Erro na recuperação de senha:', error.response.data);
      alert('Ocorreu um erro. Verifique seu e-mail e tente novamente.');
    }
  };

  return (
    // Container Principal: Aplica o fundo, centraliza o conteúdo e garante altura total
    <div
      className="relative min-h-[100dvh] flex flex-col items-center justify-center p-4"
      style={{
        backgroundImage: `url(${Fundo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay para o efeito de desfoque/vidro fosco no fundo */}
      <div className="absolute inset-0 bg-white opacity-30"></div>

      {/* Card de Recuperação: Aplica Glassmorphism e animação */}
      <div 
        className="relative w-full max-w-sm p-8 bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl ring-1 ring-white/50 slideIn"
        // Observação: Para o 'slideIn' funcionar, você deve ter a classe CSS correspondente
      >
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
            // Estilo do input ajustado para o Glassmorphism
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 bg-white/80" 
          />
          <button
            type="submit"
            className="w-full py-3 mt-4 text-lg font-semibold text-white bg-gray-600 rounded-full shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-300"
          >
            Enviar
          </button>
        </form>

        <div className="text-center mt-4">
            <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-sm text-gray-700 hover:underline"
            >
                Voltar ao Login
            </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;