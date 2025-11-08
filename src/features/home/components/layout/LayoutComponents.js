// src/components/layout/LayoutComponents.js

import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { 
    FaUserCircle, 
    FaSignOutAlt, 
    FaCog, 
    FaMapMarkedAlt, 
    FaCar,
    FaUser,         
    FaLock,         
    FaBell,         
    FaInfoCircle,   
    FaMoon,
    FaArrowLeft 
} from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md"; 

/* ============== Header ============== */
export const Header = () => {
    // Componente de layout simples. A lógica de logout ficaria aqui se necessário.
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
                        className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm text-slate-700 hover:bg-gray-100 transition duration-150"
                    >
                        <FaUserCircle className="w-5 h-5" />
                        Perfil
                    </button>
                    <button 
                        onClick={() => {/* Lógica de Logout */}} 
                        className="text-slate-500 hover:text-red-500"
                    >
                        <FaSignOutAlt className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </header>
    );
};


/* ============== SideBar ============== */
export const SideBar = () => {
    // Função para determinar o estilo do NavLink
    const linkClasses = ({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-lg transition duration-150 ${
            isActive
                ? "bg-[#8AD7E1] text-white font-semibold shadow-md"
                : "text-slate-700 hover:bg-gray-100"
        }`;

    return (
        <nav 
            className="fixed inset-y-0 left-0 z-20 hidden w-60 transform overflow-y-auto border-r border-slate-100 bg-white p-4 shadow-xl transition duration-300 ease-in-out lg:flex lg:flex-col lg:pt-20"
        >
            <div className="flex flex-col gap-2">
                <NavLink to="/home" className={linkClasses}>
                    <MdOutlineDashboard className="w-5 h-5" /> Dashboard
                </NavLink>
                <NavLink to="/rotas" className={linkClasses}>
                    <FaMapMarkedAlt className="w-5 h-5" /> Rotas
                </NavLink>
                <NavLink to="/veiculos" className={linkClasses}>
                    <FaCar className="w-5 h-5" /> Veículos
                </NavLink>
                <NavLink to="/settings" className={linkClasses}>
                    <FaCog className="w-5 h-5" /> Configurações
                </NavLink>
            </div>
            {/* Outros links da SideBar, se houver */}
        </nav>
    );
};