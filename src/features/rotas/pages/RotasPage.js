// src/features/rotas/pages/RotasPage.js
import React, { useState } from "react";
import { FaChevronLeft, FaRoute, FaBus } from "react-icons/fa";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const RotasPage = () => {
  // null = ainda não escolheu / ida / volta
  const [direction, setDirection] = useState(null); // "ida" | "volta" | null

  const handleBackToSelection = () => {
    setDirection(null);
  };

  return (
    <div className="w-full p-6">
      {/* Topo: voltar + título geral da página */}
      <button
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4 text-sm font-medium"
        onClick={() => window.history.back()}
      >
        <FaChevronLeft /> Voltar à Página Inicial
      </button>

      {/* Título estilo "Gerenciamento..." */}
      <div className="flex items-center gap-2 mb-2">
        <FaRoute className="text-xl text-[#8AD7E1]" />
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-800">
          Gerenciamento de Rotas
        </h1>
      </div>
      <p className="text-sm text-slate-500 mb-6">
        Escolha se deseja visualizar a rota de ida ou de volta e veja o mapa
        sugerido para o trajeto escolar.
      </p>

      {/* Pílula "ROTA" centralizada (igual Figma) */}
      <div className="w-full flex justify-center mb-8">
        <div className="inline-flex px-10 py-2 rounded-full bg-[#8AD7E1] shadow-sm">
          <span className="text-sm md:text-base font-semibold tracking-wide text-slate-800">
            ROTA
          </span>
        </div>
      </div>

      {/* === PASSO 1: ESCOLHER IDA / VOLTA === */}
      {direction === null && (
        <div className="flex flex-col items-center gap-12 mt-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-16">
            {/* Bloco IDA */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 rounded-3xl bg-slate-100 flex items-center justify-center shadow-md">
                <FaBus className="text-5xl text-slate-800" />
              </div>
              <button
                onClick={() => setDirection("ida")}
                className="px-8 py-2 rounded-full bg-[#8AD7E1] text-sm font-semibold text-white shadow hover:bg-[#78c9d4] transition"
              >
                IDA
              </button>
            </div>

            {/* Bloco VOLTA */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 rounded-3xl bg-slate-100 flex items-center justify-center shadow-md">
                <FaBus className="text-5xl text-slate-800" />
              </div>
              <button
                onClick={() => setDirection("volta")}
                className="px-8 py-2 rounded-full bg-[#8AD7E1] text-sm font-semibold text-white shadow hover:bg-[#78c9d4] transition"
              >
                VOLTA
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-500 text-center max-w-md">
            Toque em <strong>IDA</strong> ou <strong>VOLTA</strong> para
            visualizar a rota correspondente no mapa.
          </p>
        </div>
      )}

      {/* === PASSO 2: MOSTRAR MAPA DA ROTA === */}
      {direction !== null && (
        <div className="flex flex-col items-center mt-2">
          {/* Card colorido com mapa dentro (estilo Figma) */}
          <div className="bg-[#8AD7E1] rounded-3xl shadow-lg p-6 md:p-8 w-full max-w-5xl">
            {/* Header do card */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  Rota de {direction === "ida" ? "ida" : "volta"}
                </h2>
                <p className="text-xs text-slate-700">
                  Visualização aproximada do trajeto da linha escolar na{" "}
                  {direction === "ida" ? "ida até a escola." : "volta para casa."}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 justify-end">
                <button
                  onClick={handleBackToSelection}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold border border-white text-white/90 hover:bg-white/10"
                >
                  Trocar direção
                </button>
              </div>
            </div>

            {/* Tabs visuais IDA / VOLTA (não trocam rota, só feedback visual) */}
            <div className="flex gap-4 mb-4">
              <button
                className={`flex-1 py-2 rounded-full text-xs md:text-sm font-semibold ${
                  direction === "ida"
                    ? "bg-[#42c5dd] text-white"
                    : "bg-[#CFF4F7] text-slate-700"
                }`}
                onClick={() => setDirection("ida")}
              >
                Rota de ida
              </button>
              <button
                className={`flex-1 py-2 rounded-full text-xs md:text-sm font-semibold ${
                  direction === "volta"
                    ? "bg-[#42c5dd] text-white"
                    : "bg-[#CFF4F7] text-slate-700"
                }`}
                onClick={() => setDirection("volta")}
              >
                Rota de volta
              </button>
            </div>

            {/* MAPA */}
            <div className="w-full h-80 bg-white rounded-3xl overflow-hidden shadow-inner">
              <MapContainer
                center={[-23.092, -47.219]} // região de Indaiatuba (aprox.)
                zoom={13}
                scrollWheelZoom={false}
                className="w-full h-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </MapContainer>
            </div>

            {/* Texto explicativo embaixo do mapa */}
            <div className="mt-4 text-xs text-slate-700 text-center">
              Tempo estimado e distância podem ser ajustados na integração
              futura com um serviço de rotas (Google Maps, OpenStreetMap,
              etc.). Esta visualização serve como referência do trajeto.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RotasPage;
