// src/features/rotas/pages/RotasPage.js
import React, { useMemo, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import RouteMap from "../components/RouteMap";
import { defaultWaypoints } from "../services/route.waypoints";

import {
  FaUserCircle,
  FaSignOutAlt,
  FaCog,
  FaMapMarkedAlt,
  FaCar
} from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";

/* ============== Header (mesmo do HomeScreen) ============== */
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

/* ============== SideBar (idêntico ao do HomeScreen, Opção A) ============== */
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

/* ============== UI auxiliar (pílulas de info) ============== */
function InfoPill({ label, value }) {
  return (
    <div className="px-3 py-1 rounded-full bg-[#d7f5f8] text-[#02343F] text-sm font-medium shadow-sm">
      <span className="opacity-75 mr-1">{label}:</span>
      {value}
    </div>
  );
}

/* ============== RotasPage ============== */
export default function RotasPage() {
  const [wps] = useState(defaultWaypoints);
  const kpis = useMemo(
    () => [
      { label: "Estimativa", value: "8–12 min" },
      { label: "Distância", value: "1.8–3.2 km" }
    ],
    []
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header />

      <div className="flex min-h-screen">
        <SideBar />

        {/* Conteúdo */}
        <main className="flex-1 px-4 pb-16 pt-6 md:px-8 bg-slate-50 lg:ml-60">
          {/* Título em pílula, como no print */}
          <div className="mx-auto w-full md:w-[420px] text-center mb-4">
            <div className="inline-block px-8 py-2 rounded-full bg-[#92dbe1] text-[#02343F] font-semibold tracking-wide">
              ROTAS
            </div>
          </div>

          {/* Card com Mapa */}
          <div className="mx-auto w-full md:w-[720px] bg-white rounded-[24px] p-4 shadow">
            <div className="flex gap-2 mb-3">
              {kpis.map((k) => (
                <InfoPill key={k.label} {...k} />
              ))}
            </div>

            <RouteMap waypoints={wps} />

            <div className="mt-3 flex gap-2">
              <button className="px-4 py-2 rounded-lg bg-[#92dbe1] text-[#02343F] font-medium hover:opacity-90">
                Iniciar Rota
              </button>
              <button className="px-4 py-2 rounded-lg border border-[#92dbe1] text-[#02343F] hover:bg-[#f6fbfc]">
                Alternar Paradas
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
