// src/features/escola/components/layout/EscolaLayout.js

import React from "react";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { MdOutlineDashboard, MdSchool } from "react-icons/md";

/* ============== Header da Escola ============== */
export const EscolaHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 z-30 w-full border-b border-slate-100 bg-[#8AD7E1] shadow-sm h-16">
      <div className="flex w-full items-center justify-between px-4 py-3 md:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-lg">
            <span className="text-xl text-[#8AD7E1] font-bold">🚐</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-white">
              ROTAVAN
            </span>
            <span className="text-[11px] text-white/80 -mt-1">
              Área da Escola
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* 🔴 CORREÇÃO AQUI: 
             Antes estava "/escola/profile", mudei para "/profile" 
             para igualar ao link da Sidebar.
          */}
          <button
            onClick={() => navigate("/profile")} 
            className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition duration-150"
          >
            <FaUserCircle className="w-5 h-5" />
            Perfil
          </button>
          
          <button
            onClick={() => {
              localStorage.removeItem("accessToken");
              // Limpa IDs também para evitar cache sujo
              localStorage.removeItem("escolaId");
              localStorage.removeItem("userId");
              window.location.href = "/#/login";
            }}
            className="text-white hover:text-red-100"
          >
            <FaSignOutAlt className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

/* ============== SideBar da Escola ============== */
export const EscolaSideBar = () => {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg transition duration-150 ${
      isActive
        ? "bg-[#8AD7E1] text-white font-semibold shadow-md"
        : "text-slate-700 hover:bg-slate-100"
    }`;

  return (
    <nav
      className="fixed inset-y-0 left-0 z-20 hidden w-60 transform overflow-y-auto border-r border-slate-100 bg-white p-4 shadow-xl transition duration-300 ease-in-out lg:flex lg:flex-col lg:pt-20"
    >
      <div className="flex flex-col gap-2">
        {/* Página inicial da escola */}
        <NavLink to="/home" className={linkClasses}>
          <MdOutlineDashboard className="w-5 h-5" /> Página inicial
        </NavLink>

        {/* Perfil da escola */}
        <NavLink to="/profile" className={linkClasses}>
          <MdSchool className="w-5 h-5" /> Perfil
        </NavLink>
      </div>
    </nav>
  );
};

/* ============== Layout completo ============== */
const EscolaLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header fixo no topo */}
      <EscolaHeader />

      <div className="flex">
        {/* Sidebar fixa à esquerda */}
        <EscolaSideBar />

        {/* Área de conteúdo */}
        <main className="flex-1 pt-20 px-4 pb-8 lg:ml-60 md:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EscolaLayout;