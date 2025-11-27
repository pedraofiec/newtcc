import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaChevronLeft, FaCarSide, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

// Aqui poderia vir de uma API – por enquanto, reaproveito o mock:
const mockMotoristas = [
  {
    id: 1,
    nome: "João Silva",
    distancia: "1,2 km de distância",
    escola: "EMEB Profª Francisca Lucinda Bueno",
    avatar:
      "https://images.pexels.com/photos/432059/pexels-photo-432059.jpeg?auto=compress&cs=tinysrgb&w=200",
    telefone: "(19) 99999-0001",
    veiculo: "Van Escolar - Fiat Ducato",
    placa: "ABC-1234",
    bairro: "Jardim Europa",
  },
  {
    id: 2,
    nome: "Maria Santos",
    distancia: "2,4 km de distância",
    escola: "EMEB Milton Santos",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200",
    telefone: "(19) 99999-0002",
    veiculo: "Kombi Escolar",
    placa: "DEF-5678",
    bairro: "Centro",
  },
  {
    id: 3,
    nome: "Carlos Oliveira",
    distancia: "800 m de distância",
    escola: "EMEB José Nunes",
    avatar:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200",
    telefone: "(19) 99999-0003",
    veiculo: "Van Renault Master",
    placa: "GHI-9012",
    bairro: "Vila Verde",
  },
];

const MotoristaProfileScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const motorista = mockMotoristas.find((m) => String(m.id) === String(id));

  if (!motorista) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 mb-4">
            Motorista não encontrado.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-full bg-[#73C8D5] text-white text-sm"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center font-sans">
      <div className="w-full max-w-3xl mt-6 px-4 md:px-0">
        <button
          onClick={() => navigate("/encontrar-motoristas")}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium"
        >
          <FaChevronLeft className="mr-2" /> Voltar para lista
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center">
          {/* Avatar */}
          <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg mb-4">
            <img
              src={motorista.avatar}
              alt={motorista.nome}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Nome + escola */}
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-800">
            {motorista.nome}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Atende a {motorista.escola}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {motorista.distancia}
          </p>

          {/* Dados principais */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <InfoBox
              icon={<FaPhone />}
              label="Telefone"
              value={motorista.telefone}
            />
            <InfoBox
              icon={<FaMapMarkerAlt />}
              label="Bairro"
              value={motorista.bairro}
            />
            <InfoBox
              icon={<FaCarSide />}
              label="Veículo"
              value={motorista.veiculo}
            />
            <InfoBox
              icon={<FaCarSide />}
              label="Placa"
              value={motorista.placa}
            />
          </div>

          {/* Botão para futura solicitação */}
          <button
            onClick={() => alert("Aqui depois entra a solicitação de transporte")}
            className="mt-8 px-8 py-3 rounded-full bg-[#73C8D5] text-white font-semibold shadow hover:bg-[#6abcca] text-sm"
          >
            Solicitar transporte com este motorista
          </button>
        </div>
      </div>
    </div>
  );
};

const InfoBox = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3">
    <div className="mt-1 text-[#73C8D5]">{icon}</div>
    <div className="flex flex-col">
      <span className="text-[11px] text-slate-400 uppercase font-semibold tracking-wide">
        {label}
      </span>
      <span className="text-sm text-slate-700">{value}</span>
    </div>
  </div>
);

export default MotoristaProfileScreen;
