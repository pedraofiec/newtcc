// src/components/layout/LayoutComponents.js

import React from "react";
import { useNavigate, NavLink, Outlet } from "react-router-dom"; // <-- adicionado Outlet
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
    const navigate = useNavigate(); 
    
    return (
        <header className="fixed top-0 z-30 w-full border-b border-slate-100 bg-[#8AD7E1] shadow-sm h-16">
            <div className="flex w-full items-center justify-between px-4 py-3 md:px-8">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-lg">
                        <span className="text-xl text-[#8AD7E1] font-bold">🚐</span>
                    </div>
                    <span className="text-xl font-extrabold tracking-tight text-white">
                        ROTAVAN
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate("/settings/perfil")}
                        className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition duration-150"
                    >
                        <FaUserCircle className="w-5 h-5" />
                        Perfil
                    </button>
                    <button 
                        onClick={() => {
                            // Lógica simples de logout
                            localStorage.removeItem("accessToken");
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


/* ============== SideBar ============== */
export const SideBar = () => {
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
                <NavLink to="/home" className={linkClasses}>
                    <MdOutlineDashboard className="w-5 h-5" /> Página inicial
                </NavLink>
                <NavLink to="/driver/manage-students" className={linkClasses}>
                    <FaUser className="w-5 h-5" /> Solicitações
                </NavLink>
                <NavLink to="/settings/perfil" className={linkClasses}>
                    <FaUserCircle className="w-5 h-5" /> Perfil
                </NavLink>
                <NavLink to="/rotas" className={linkClasses}>
                    <FaMapMarkedAlt className="w-5 h-5" /> Rota
                </NavLink>
            </div>
        </nav>
    );
};

/* ============== Layout completo (Header + SideBar + Conteúdo) ============== */
export const DashboardLayout = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header fixo no topo */}
            <Header />

            <div className="flex">
                {/* Sidebar fixa à esquerda (somente em telas grandes) */}
                <SideBar />

                {/* Área de conteúdo: padding-top para não ficar atrás do header,
                    margin-left em telas grandes para não ficar atrás da sidebar */}
                <main className="flex-1 pt-20 px-4 pb-8 lg:ml-60 md:px-8">
                    {/* Aqui entram as páginas (home, rota, etc) */}
                    <Outlet />
                </main>
            </div>
        </div>
    );
};