// src/features/rotas/pages/RotasPage.jsx
import React, {
  useMemo,
  useState,
  useRef,
  useLayoutEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { FaRoute, FaChevronLeft } from "react-icons/fa";
import RouteMap from "../components/RouteMap";
import { defaultWaypoints } from "../services/route.waypoints";
import { geocodeAddress } from "../services/geocode";

/* Pill de resumo */
function InfoPill({ label, value }) {
  return (
    <div className="px-3 py-1 rounded-full bg-[#d7f5f8] text-[#02343F] text-xs md:text-sm font-medium shadow-sm">
      <span className="opacity-75 mr-1">{label}:</span>
      {value}
    </div>
  );
}

export default function RotasPage() {
  const navigate = useNavigate();

  // Waypoints + resumo
  const [wps, setWps] = useState(defaultWaypoints.slice(0, 2));
  const [summary, setSummary] = useState({
    distanceMeters: 0,
    durationSeconds: 0,
  });

  // Busca
  const [originQuery, setOriginQuery] = useState("");
  const [destQuery, setDestQuery] = useState("");

  // Simulação
  const [simKey, setSimKey] = useState(0);
  const [stopKey, setStopKey] = useState(0);

  // Clique no mapa
  const [clickMode, setClickMode] = useState(null); // 'origin' | 'destination' | null

  // altura dinâmica do mapa
  const headerH = 64;
  const pagePadding = 24;
  const controlsRef = useRef(null);
  const [mapHeight, setMapHeight] = useState(420);

  useLayoutEffect(() => {
    function recalc() {
      const vh = window.innerHeight;
      const controlsH =
        controlsRef.current?.getBoundingClientRect().height ?? 140;
      const reserved = headerH + pagePadding + controlsH + 90;
      const h = Math.max(320, vh - reserved);
      setMapHeight(h);
    }
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, []);

  const fmt = useMemo(
    () => ({
      dist: (m) => (m ? `${(m / 1000).toFixed(1)} km` : "—"),
      dur: (s) => {
        if (!s) return "—";
        const min = Math.round(s / 60);
        if (min < 60) return `${min} min`;
        const h = Math.floor(min / 60);
        const r = min % 60;
        return `${h}h ${r}min`;
      },
    }),
    []
  );

  async function traceBySearch() {
    const [o, d] = await Promise.all([
      geocodeAddress(originQuery),
      geocodeAddress(destQuery),
    ]);
    if (!o || !d) {
      alert(
        "Não foi possível localizar um dos endereços. Tente ser mais específico."
      );
      return;
    }
    setWps([o, d]);
    setClickMode(null);
  }

  function resetAll() {
    setWps([]);
    setClickMode(null);
    setStopKey((v) => v + 1);
    setOriginQuery("");
    setDestQuery("");
    setSummary({
      distanceMeters: 0,
      durationSeconds: 0,
    });
  }

  return (
    <div className="w-full flex flex-col items-center font-sans">
      <div className="w-full max-w-6xl mt-6 px-4 md:px-0">
        {/* topo – link de voltar + título */}
        <button
                onClick={() => navigate('/home')}
                className="flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium"
              >
                <FaChevronLeft className="mr-2" /> Voltar a Página Inicial
              </button>

        <div className="flex items-center gap-2 mb-2">
          <FaRoute className="text-2xl text-[#8AD7E1]" />
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-800">
            Gerenciamento de Rotas
          </h1>
        </div>
        <p className="text-sm text-slate-500 mb-4">
          Defina origem, destino e visualize o trajeto sugerido para sua rota
          escolar.
        </p>
        <hr className="border-slate-200 mb-5" />

        {/* card principal */}
        <div className="bg-white rounded-3xl shadow-md p-4 md:p-6 mb-6">
          {/* controles */}
          <div ref={controlsRef} className="mb-4">
            <div className="grid gap-4 md:grid-cols-[1.2fr_1.2fr_auto] md:items-end">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Origem
                </label>
                <input
                  value={originQuery}
                  onChange={(e) => setOriginQuery(e.target.value)}
                  placeholder="Digite um endereço ou clique em 'Definir no mapa'"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 h-10 text-sm shadow-sm focus:ring-2 focus:ring-[#8AD7E1] focus:border-[#8AD7E1] outline-none"
                />
                <button
                  type="button"
                  onClick={() =>
                    setClickMode(clickMode === "origin" ? null : "origin")
                  }
                  className={`mt-2 text-[11px] rounded-full px-3 py-1 border ${
                    clickMode === "origin"
                      ? "bg-slate-800 text-white"
                      : "border-slate-300 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {clickMode === "origin"
                    ? "Clique no mapa para definir a origem"
                    : "Definir origem no mapa"}
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Destino
                </label>
                <input
                  value={destQuery}
                  onChange={(e) => setDestQuery(e.target.value)}
                  placeholder="Digite um endereço ou clique em 'Definir no mapa'"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 h-10 text-sm shadow-sm focus:ring-2 focus:ring-[#8AD7E1] focus:border-[#8AD7E1] outline-none"
                />
                <button
                  type="button"
                  onClick={() =>
                    setClickMode(
                      clickMode === "destination" ? null : "destination"
                    )
                  }
                  className={`mt-2 text-[11px] rounded-full px-3 py-1 border ${
                    clickMode === "destination"
                      ? "bg-slate-800 text-white"
                      : "border-slate-300 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {clickMode === "destination"
                    ? "Clique no mapa para definir o destino"
                    : "Definir destino no mapa"}
                </button>
              </div>

              <div className="flex flex-col gap-2 md:items-end">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={traceBySearch}
                    className="h-10 rounded-full bg-[#8AD7E1] text-[#02343F] px-4 text-sm font-semibold hover:opacity-90"
                  >
                    Traçar Rota
                  </button>
                  <button
                    type="button"
                    onClick={resetAll}
                    className="h-10 rounded-full border border-slate-300 text-slate-700 px-4 text-sm font-medium hover:bg-slate-50"
                  >
                    Limpar
                  </button>
                </div>
                <div className="flex gap-2 mt-1 flex-wrap justify-end">
                  <InfoPill
                    label="Tempo estimado"
                    value={fmt.dur(summary.durationSeconds)}
                  />
                  <InfoPill
                    label="Distância"
                    value={fmt.dist(summary.distanceMeters)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* mapa */}
          <div className="rounded-2xl overflow-hidden border border-slate-100">
            <RouteMap
              waypoints={wps}
              onWaypointsChange={setWps}
              onSummary={setSummary}
              onPickDone={() => setClickMode(null)}
              height={mapHeight}
              startSim={simKey}
              stopSim={stopKey}
              allowClickSet={clickMode}
            />
          </div>

          {/* ações */}
          <div className="mt-4 flex flex-wrap gap-2 items-center">
            <button
              type="button"
              onClick={() => setSimKey((v) => v + 1)}
              className="px-4 py-2 rounded-full bg-[#8AD7E1] text-[#02343F] text-sm font-semibold hover:opacity-90 disabled:opacity-50"
              disabled={!(wps && wps.length >= 2)}
            >
              Iniciar Rota
            </button>
            <button
              type="button"
              onClick={() => setStopKey((v) => v + 1)}
              className="px-4 py-2 rounded-full border border-[#8AD7E1] text-[#02343F] text-sm font-medium hover:bg-[#f6fbfc]"
            >
              Parar
            </button>
            <span className="text-[11px] text-slate-500 mt-1">
              Dica: você pode <b>arrastar os pinos</b> para ajustar o caminho da
              rota.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
