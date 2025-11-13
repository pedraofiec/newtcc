import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// Mesmo array de fallback (caso venha direto pela URL sem state)
const passengers = [
  {
    id: 1,
    name: "Maria Souza",
    school: "Escola A",
    address: "Rua A, 123",
  },
  {
    id: 2,
    name: "João da Silva",
    school: "Escola B",
    address: "Av. B, 456",
  },
  {
    id: 3,
    name: "Ana Oliveira",
    school: "Escola C",
    address: "Rua C, 789",
  },
  {
    id: 4,
    name: "Pedro Santos",
    school: "Escola D",
    address: "Av. D, 321",
  },
];

const PassengerProfileScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // 1º tenta pegar do state da navegação
  let passenger = location.state?.passenger;

  // se não veio (ex: reload direto na URL), busca pelo id na lista
  if (!passenger) {
    passenger = passengers.find((p) => String(p.id) === String(id));
  }

  // se ainda não achou, mostra msg simples
  if (!passenger) {
    return (
      <div className="w-full flex flex-col items-center mt-16">
        <p className="text-red-600 mb-4">
          Passageiro não encontrado (id: {id}).
        </p>
        <button
          className="px-4 py-2 rounded-full bg-[#8AD7E1] text-slate-800 font-semibold"
          onClick={() => navigate(-1)}
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-3xl mt-10">
        {/* botão voltar */}
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-slate-600 hover:text-slate-800 mb-4"
        >
          ← Voltar
        </button>

        {/* título */}
        <div className="flex flex-col items-center mb-8">
          <div className="inline-flex px-12 py-3 rounded-full bg-[#8AD7E1] shadow-sm mb-6">
            <span className="text-base font-semibold tracking-wide text-slate-800">
              PERFIL DO PASSAGEIRO
            </span>
          </div>
        </div>

        {/* card de perfil */}
        <div className="bg-[#8AD7E1] rounded-[36px] px-10 py-10 flex flex-col items-center shadow-md">
          {/* avatar */}
          <div className="w-28 h-28 rounded-full bg-[#C4B5FD] flex items-center justify-center mb-6">
            <span className="text-5xl">👤</span>
          </div>

          {/* nome */}
          <div className="w-56 h-9 rounded-full bg-[#CFF4F7] flex items-center justify-center mb-6">
            <span className="text-sm font-semibold text-slate-700">
              {passenger.name}
            </span>
          </div>

          {/* infos */}
          <div className="w-full max-w-md bg-white/70 rounded-3xl px-6 py-4 text-sm text-slate-700 space-y-1 mb-6">
            <p>
              <strong>Escola: </strong>
              {passenger.school}
            </p>
            <p>
              <strong>Endereço: </strong>
              {passenger.address}
            </p>
            {/* aqui depois você pode adicionar mais campos, tipo turno, responsável, telefone etc */}
          </div>

          {/* ações (placeholder para o futuro) */}
          <div className="flex gap-3">
            <button
              className="px-6 py-2 rounded-full bg-white text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-100 transition"
              onClick={() => alert("Em breve: abrir histórico / detalhes")}
            >
              Detalhes
            </button>
            <button
              className="px-6 py-2 rounded-full bg-red-500 text-xs font-semibold text-white shadow-sm hover:bg-red-600 transition"
              onClick={() => alert("Em breve: remover da rota")}
            >
              Remover da rota
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerProfileScreen;
