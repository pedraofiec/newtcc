// src/features/rotas/pages/RotasPage.js
import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaRoute, FaBus } from "react-icons/fa";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// 🔗 service de viagens
import { listarViagens } from "../services/ViagensService";

const RotasPage = () => {
  // null = ainda não escolheu / ida / volta
  const [direction, setDirection] = useState(null); // "ida" | "volta" | null

  // estado vindo do backend
  const [viagens, setViagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  // carrega viagens ao abrir a tela
  useEffect(() => {
    async function carregarViagens() {
      try {
        setLoading(true);
        setErro(null);
        const data = await listarViagens(); // GET /v1/api/viagens
        setViagens(data || []);
      } catch (e) {
        console.error("Erro ao listar viagens:", e);
        setErro("Não foi possível carregar as viagens.");
      } finally {
        setLoading(false);
      }
    }

    carregarViagens();
  }, []);

  const handleBackToSelection = () => {
    setDirection(null);
  };

  // filtra viagens pelo sentido (IDA / VOLTA) quando o usuário escolhe
  const viagensFiltradas =
    direction === null
      ? []
      : viagens.filter((v) => {
          const sentido =
            (v.sentido || v.tipo || v.direcao || "").toString().toLowerCase();
          // esperando algo como "IDA" / "VOLTA" vindo do back
          return sentido.includes(direction);
        });

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

          {/* estado de carregamento / erro enquanto usuário ainda não escolheu direção */}
          {loading && (
            <p className="text-xs text-slate-500 mt-2">
              Carregando viagens cadastradas...
            </p>
          )}
          {erro && !loading && (
            <p className="text-xs text-red-500 mt-2">{erro}</p>
          )}
        </div>
      )}

      {/* === PASSO 2: MOSTRAR MAPA DA ROTA + LISTA DE VIAGENS === */}
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

            {/* Tabs visuais IDA / VOLTA */}
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

            {/* Lista de viagens do tipo selecionado */}
            <div className="mt-6 bg-white/80 rounded-2xl p-4">
              <h3 className="text-sm font-semibold text-slate-800 mb-3">
                Viagens cadastradas para rota de {direction === "ida" ? "ida" : "volta"}
              </h3>

              {loading && (
                <p className="text-xs text-slate-500">
                  Carregando viagens...
                </p>
              )}

              {erro && !loading && (
                <p className="text-xs text-red-500">{erro}</p>
              )}

              {!loading && !erro && viagensFiltradas.length === 0 && (
                <p className="text-xs text-slate-500">
                  Nenhuma viagem encontrada para essa direção.
                </p>
              )}

              {!loading && !erro && viagensFiltradas.length > 0 && (
                <ul className="space-y-2 text-xs text-slate-700">
                  {viagensFiltradas.map((v) => {
                    const dataSaida =
                      v.dataHoraSaida || v.inicio || v.createdAt || null;
                    const dataRetorno =
                      v.dataHoraRetorno || v.fim || v.updatedAt || null;

                    return (
                      <li
                        key={v.id}
                        className="flex justify-between items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                      >
                        <div>
                          <span className="font-semibold mr-2">
                            #{v.id?.slice?.(0, 8) || v.id}
                          </span>
                          <span className="uppercase text-[10px] px-2 py-0.5 rounded-full bg-[#CFF4F7] text-slate-700">
                            {(v.status || "").toString()}
                          </span>
                          <div className="mt-1 text-[11px] text-slate-600">
                            {dataSaida && (
                              <span>
                                Saída:{" "}
                                {new Date(dataSaida).toLocaleString("pt-BR")}
                              </span>
                            )}
                            {dataRetorno && (
                              <span>
                                {" "}
                                • Retorno:{" "}
                                {new Date(dataRetorno).toLocaleString("pt-BR")}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-[11px] text-right">
                          {v.origem && <div>Origem: {v.origem}</div>}
                          {v.destino && <div>Destino: {v.destino}</div>}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
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
