import React from 'react';
import { useNavigate } from 'react-router-dom';

const passengers = [
  { id: 1, name: 'Maria Souza' },
  { id: 2, name: 'João da Silva' },
  { id: 3, name: 'Ana Oliveira' },
  { id: 4, name: 'Pedro Santos' },
];

const DriverScreen = () => {
  const navigate = useNavigate();

  const handleViewProfile = (passenger) => {
    navigate(`/driver/passengers/${passenger.id}`, {
      state: { passenger },
    });
  };

  return (
    <div className="w-full flex flex-col items-center font-sans"> 
      {/* 👆 AQUI: ativa Inter para toda a tela */}

      {/* Título PASSAGEIROS (pílula central) */}
      <div className="w-full max-w-5xl flex flex-col items-center mt-6">
        <div className="inline-flex px-12 py-3 rounded-full bg-[#8AD7E1] mb-10 shadow-md">
          <span className="text-base md:text-lg font-semibold tracking-wide text-slate-800">
            PASSAGEIROS
          </span>
        </div>

        {/* Grid de cards 2x2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {passengers.map((p) => (
            <div
              key={p.id}
              className="w-64 h-72 bg-[#8AD7E1] rounded-[32px] flex flex-col items-center pt-8 shadow-lg"
            >
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-[#B9C4FF] flex items-center justify-center mb-6">
                <span className="text-4xl text-slate-700">👤</span>
              </div>

              {/* Nome */}
              <div className="w-44 h-8 rounded-full bg-[#CFF4F7] flex items-center justify-center mb-4">
                <span className="text-sm font-medium text-slate-700">
                  {p.name}
                </span>
              </div>

              {/* Botão Visualizar perfil */}
              <button
                onClick={() => handleViewProfile(p)}
                className="mt-2 px-6 py-2 rounded-full bg-white text-sm font-semibold text-slate-700 shadow hover:bg-slate-100 transition"
              >
                Visualizar perfil
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DriverScreen;
