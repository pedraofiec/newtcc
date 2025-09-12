// src/features/splash/components/UserTypeSelection.jsx
import React, { useEffect } from 'react';
import { FaBus, FaUserCircle, FaBuilding } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UserTypeSelection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const css = `
      @keyframes slideInUp {
        from { opacity: 0; transform: translateY(30px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    `;
    const style = document.createElement('style');
    style.id = 'custom-animations-style';
    style.innerHTML = css;
    if (!document.getElementById(style.id)) document.head.appendChild(style);
    return () => { const el = document.getElementById(style.id); if (el) document.head.removeChild(el); };
  }, []);

  // 🔧 Ajuste tamanhos só aqui:
  const vars = {
    // diâmetro da bola branca (centro)
    ball: '600px',
    // largura total da rua (asfalto)
    roadWidth: '100px',
    // espessura da faixa amarela
    dashBand: '8px',
    // velocidade da van
    speed: '10s',
  };

  // Derivados (calculados em CSS)
  const rootStyle = {
    '--ball': vars.ball,
    '--road-width': vars.roadWidth,
    '--dash-band': vars.dashBand,
    '--ring': `calc(var(--ball) + var(--road-width) * 2)`,        // diâmetro externo da rua
    '--centerline': `calc(var(--ball) + var(--road-width))`,      // diâmetro da linha central da rua
    '--speed': vars.speed,
  } 

  const baseButtonStyle = { opacity: 0, animationFillMode: 'forwards' };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-[#8AD7E1] p-4 relative overflow-hidden"
      style={rootStyle}
    >
      {/* RUA (asfalto): anel escuro */}
      <div
        className="absolute rounded-full"
        style={{
          width: 'var(--ring)',
          height: 'var(--ring)',
          borderRadius: '50%',
          border: 'var(--road-width) solid #2b2b2b', // asfalto
          zIndex: 0,
        }}
      />

      {/* FAIXA AMARELA TRACEJADA no centro da rua */}
      <div
        className="absolute rounded-full"
        style={{
          width: 'var(--centerline)',
          height: 'var(--centerline)',
          borderRadius: '50%',
          // traços amarelos em volta
          background:
            'repeating-conic-gradient(#FFD700 0deg 12deg, transparent 12deg 24deg)',
          // recorta para ficar só uma "argolinha" fininha na borda do círculo
          WebkitMask:
            'radial-gradient(farthest-side, transparent calc(100% - var(--dash-band)), #000 0)',
          mask:
            'radial-gradient(farthest-side, transparent calc(100% - var(--dash-band)), #000 0)',
          zIndex: 1,
        }}
      />

      {/* BOLA BRANCA no centro (fundo dos botões) */}
      <div
        className="absolute rounded-full bg-white"
        style={{ width: 'var(--ball)', height: 'var(--ball)', zIndex: 2 }}
      />

      {/* VAN girando exatamente no meio da rua */}
      <div
        className="absolute rounded-full"
        style={{
          width: 'var(--centerline)',
          height: 'var(--centerline)',
          animation: 'spin-slow var(--speed) linear infinite',
          zIndex: 3,
        }}
      >
        <span
          className="absolute left-1/2 transform -translate-x-1/2 text-4xl select-none"
          role="img"
          aria-label="van"
          // posiciona a van sobre a faixa (meio da rua):
          style={{ top: `calc(-1 * var(--dash-band) - 18px)` }} // ajuste fino vertical da van
        >
          🚐
        </span>
      </div>

      {/* Botões no centro */}
      <div className="relative flex flex-wrap justify-center items-center space-x-8 z-10">
        <button
          onClick={() => navigate('/register/driver')}
          className="flex flex-col items-center justify-center p-8 bg-[#A1E3F4] rounded-2xl shadow-2xl transition duration-300 transform hover:scale-105 cursor-pointer mb-4"
          style={{ ...baseButtonStyle, animation: 'slideInUp 0.5s ease-out forwards' }}
        >
          <FaBus className="text-5xl text-gray-800 mb-4" />
          <span className="text-lg font-semibold text-gray-800">Motorista</span>
        </button>

        <button
          onClick={() => navigate('/register/responsible')}
          className="flex flex-col items-center justify-center p-8 bg-[#A1E3F4] rounded-2xl shadow-2xl transition duration-300 transform hover:scale-105 cursor-pointer mb-4"
          style={{ ...baseButtonStyle, animation: 'slideInUp 0.5s ease-out 0.15s forwards' }}
        >
          <FaUserCircle className="text-5xl text-gray-800 mb-4" />
          <span className="text-lg font-semibold text-gray-800">Responsável</span>
        </button>

        <button
          onClick={() => navigate('/register/school')}
          className="flex flex-col items-center justify-center p-8 bg-[#A1E3F4] rounded-2xl shadow-2xl transition duration-300 transform hover:scale-105 cursor-pointer mb-4"
          style={{ ...baseButtonStyle, animation: 'slideInUp 0.5s ease-out 0.3s forwards' }}
        >
          <FaBuilding className="text-5xl text-gray-800 mb-4" />
          <span className="text-lg font-semibold text-gray-800">Escolar</span>
        </button>
      </div>
    </div>
  );
};

export default UserTypeSelection;
