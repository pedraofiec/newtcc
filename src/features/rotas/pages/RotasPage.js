// src/features/rotas/pages/RotasPage.jsx
import React, { useMemo, useState, useRef, useLayoutEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import RouteMap from "../components/RouteMap";
import { defaultWaypoints } from "../services/route.waypoints";
import { geocodeAddress } from "../services/geocode";

import {
  FaUserCircle,
  FaSignOutAlt,
  FaCog,
  FaMapMarkedAlt,
  FaCar
} from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";

/* ============== Header (igual ao HomeScreen) ============== */
const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-100 bg-white shadow-sm h-16">
      <div className="flex w-full items-center justify-between px-4 py-3 md:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#8AD7E1] shadow-lg">
            <span className="text-xl text-white font-bold">🚐</span>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-800">
            ROTAVAN
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/perfil")}
            className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-1.5 text-sm text-slate-700 hover:bg-gray-100 transition duration-150"
          >
            <FaUserCircle className="text-lg text-slate-500" />
            Perfil
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("accessToken");
              navigate("/login");
            }}
            className="flex items-center rounded-full bg-green-500 px-4 py-1.5 text-sm text-white shadow hover:bg-green-600"
          >
            <FaSignOutAlt className="mr-2" />
            Login / Criar Conta
          </button>
        </div>
      </div>
    </header>
  );
};

/* ============== SideBar (igual ao HomeScreen, NavLink ativo) ============== */
const SideBar = () => {
  const navigate = useNavigate();
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: MdOutlineDashboard },
    { name: "Rotas", path: "/rotas", icon: FaMapMarkedAlt },
    { name: "Motoristas", path: "/motoristas", icon: FaCar },
    { name: "Responsáveis", path: "/responsaveis", icon: FaUserCircle }
  ];
  const normalize = (p) => (p === "/dashboard" ? "/" : p);

  return (
    <aside className="fixed left-0 top-[64px] h-[calc(100%-64px)] w-60 border-r border-slate-200 bg-white shadow-xl">
      <nav className="flex flex-col gap-1 p-4 md:p-6">
        {navItems.map((item) => {
          const target = normalize(item.path);
          return (
            <NavLink
              key={item.name}
              to={target}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-left font-medium transition duration-150 ${
                  isActive
                    ? "bg-[#8AD7E1] text-slate-800 shadow-md"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
              end
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-8 border-t border-slate-100 p-4 md:p-6">
        <button
          onClick={() => navigate("/settings")}
          className="flex items-center gap-3 w-full rounded-lg px-4 py-3 text-left text-slate-600 hover:bg-slate-100 transition duration-150"
        >
          <FaCog className="w-5 h-5" />
          <span>Configurações</span>
        </button>
      </div>
    </aside>
  );
};

/* ============== Pílula de Info ============== */
function InfoPill({ label, value }) {
  return (
    <div className="px-3 py-1 rounded-full bg-[#d7f5f8] text-[#02343F] text-sm font-medium shadow-sm">
      <span className="opacity-75 mr-1">{label}:</span>
      {value}
    </div>
  );
}

/* ============== Página de Rotas (compacta, sem scroll) ============== */
export default function RotasPage() {
  // Waypoints + resumo
  const [wps, setWps] = useState(defaultWaypoints.slice(0, 2));
  const [summary, setSummary] = useState({ distanceMeters: 0, durationSeconds: 0 });

  // Busca (geocoding)
  const [originQuery, setOriginQuery] = useState("");
  const [destQuery, setDestQuery] = useState("");

  // Simulação
  const [simKey, setSimKey] = useState(0);
  const [stopKey, setStopKey] = useState(0);

  // Clique para definir pontos no mapa
  const [clickMode, setClickMode] = useState(null); // 'origin' | 'destination' | null

  // ===== Altura dinâmica do mapa (para caber sem scroll) =====
  const headerH = 64;                 // h-16 = 64px
  const pagePadding = 24;             // padding/margens aproximados
  const controlsRef = useRef(null);
  const [mapHeight, setMapHeight] = useState(420);

  useLayoutEffect(() => {
    function recalc() {
      const vh = window.innerHeight;
      const controlsH = controlsRef.current?.getBoundingClientRect().height ?? 140;
      // reserva header + paddings + folga para botões
      const reserved = headerH + pagePadding + controlsH + 90;
      const h = Math.max(320, vh - reserved);
      setMapHeight(h);
    }
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, []);

  const fmt = useMemo(() => ({
    dist: (m) => (m ? `${(m / 1000).toFixed(1)} km` : "—"),
    dur: (s) => {
      if (!s) return "—";
      const min = Math.round(s / 60);
      if (min < 60) return `${min} min`;
      const h = Math.floor(min / 60);
      const r = min % 60;
      return `${h}h ${r}min`;
    }
  }), []);

  async function traceBySearch() {
    const [o, d] = await Promise.all([
      geocodeAddress(originQuery),
      geocodeAddress(destQuery),
    ]);
    if (!o || !d) {
      alert("Não foi possível localizar um dos endereços. Tente ser mais específico.");
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
    setSummary({ distanceMeters: 0, durationSeconds: 0 });
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header />
      <div className="flex min-h-screen">
        <SideBar />

        <main className="flex-1 px-4 pb-16 pt-6 md:px-8 bg-slate-50 lg:ml-60">
          {/* Título */}
          <div className="mx-auto w-full md:w-[420px] text-center mb-4">
            <div className="inline-block px-8 py-2 rounded-full bg-[#92dbe1] text-[#02343F] font-semibold tracking-wide">
              ROTAS
            </div>
          </div>

          {/* Card mais estreito */}
          <div className="mx-auto w-full max-w-[980px] bg-white rounded-[24px] p-4 md:p-5 shadow">

            {/* Controles (compactados em 1 linha quando couber) */}
            <div ref={controlsRef} className="mb-3">
              <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto_auto] md:items-end">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Origem</label>
                  <input
                    value={originQuery}
                    onChange={(e) => setOriginQuery(e.target.value)}
                    placeholder="Digite um endereço ou clique em 'Definir no mapa'"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 h-10"
                  />
                  <button
                    onClick={() => setClickMode(clickMode === "origin" ? null : "origin")}
                    className={`mt-2 text-xs rounded-full px-3 py-1 border ${
                      clickMode === "origin"
                        ? "bg-slate-800 text-white"
                        : "border-slate-300 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {clickMode === "origin" ? "Clique no mapa: origem..." : "Definir no mapa"}
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Destino</label>
                  <input
                    value={destQuery}
                    onChange={(e) => setDestQuery(e.target.value)}
                    placeholder="Digite um endereço ou clique em 'Definir no mapa'"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 h-10"
                  />
                  <button
                    onClick={() => setClickMode(clickMode === "destination" ? null : "destination")}
                    className={`mt-2 text-xs rounded-full px-3 py-1 border ${
                      clickMode === "destination"
                        ? "bg-slate-800 text-white"
                        : "border-slate-300 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {clickMode === "destination" ? "Clique no mapa: destino..." : "Definir no mapa"}
                  </button>
                </div>

                <div className="flex gap-2 md:justify-end">
                  <button
                    onClick={traceBySearch}
                    className="h-10 rounded-lg bg-[#92dbe1] text-[#02343F] px-4 font-medium hover:opacity-90"
                  >
                    Traçar
                  </button>
                  <button
                    onClick={resetAll}
                    className="h-10 rounded-lg border border-slate-300 text-slate-700 px-4 font-medium hover:bg-slate-50"
                  >
                    Reset
                  </button>
                </div>

                <div className="flex gap-2 md:justify-end">
                  <InfoPill label="Estimativa" value={fmt.dur(summary.durationSeconds)} />
                  <InfoPill label="Distância" value={fmt.dist(summary.distanceMeters)} />
                </div>
              </div>
            </div>

            {/* Mapa com altura dinâmica */}
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

            {/* Ações */}
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => setSimKey((v) => v + 1)}
                className="px-4 py-2 rounded-lg bg-[#92dbe1] text-[#02343F] font-medium hover:opacity-90 disabled:opacity-50"
                disabled={!(wps && wps.length >= 2)}
              >
                Iniciar Rota
              </button>
              <button
                onClick={() => setStopKey((v) => v + 1)}
                className="px-4 py-2 rounded-lg border border-[#92dbe1] text-[#02343F] hover:bg-[#f6fbfc]"
              >
                Parar
              </button>
              <span className="text-xs text-slate-500 mt-2">
                Dica: você pode <b>arrastar os pinos</b> no mapa para ajustar a rota.
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
