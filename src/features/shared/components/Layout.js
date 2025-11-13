// src/components/Layout.jsx
import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
// Importações de Icones (Certifique-se que 'react-icons' está instalado)
import { FaCog, FaMapMarkedAlt, FaCar, FaUserCircle } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";

// --------------------------------------------------------------------------------------
// ÍCONES SVG INLINE (Para evitar quebras onde react-icons não foi totalmente configurado)
// --------------------------------------------------------------------------------------

// Equivalente a FaSignOutAlt (LogOut)
const IconSignOut = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
);

// Equivalente a FaUserCircle
const IconUserCircle = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);
// --------------------------------------------------------------------------------------


/* Header (MOVIDO DE HomeScreen.js) */
const Header = () => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        navigate("/login", { replace: true });
    };

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
                        <IconUserCircle className="w-4 h-4 text-slate-500" />
                        Perfil
                    </button>
                    <button
                        onClick={handleLogout}
                        className="flex items-center rounded-full bg-red-500 px-4 py-1.5 text-sm text-white shadow hover:bg-red-600 transition duration-150"
                    >
                        <IconSignOut className="mr-2 w-4 h-4" />
                        Sair
                    </button>
                </div>
            </div>
        </header>
    );
};

/* SideBar (MOVIDO DE HomeScreen.js) */
const SideBar = () => {
    const navItems = [
        // Usando os ícones importados do react-icons
        { name: "Dashboard", path: "/home", icon: MdOutlineDashboard }, 
        { name: "Rotas", path: "/rotas", icon: FaMapMarkedAlt },
        { name: "Motoristas", path: "/motoristas", icon: FaCar },
        { name: "Responsáveis", path: "/responsaveis", icon: FaUserCircle } 
    ];

    return (
        <aside className="fixed left-0 top-[64px] z-20 h-[calc(100%-64px)] w-60 border-r border-slate-200 bg-white shadow-xl">
            <nav className="flex flex-col gap-1 p-4 md:p-6">
                {navItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-lg px-4 py-3 text-left font-medium transition duration-150 ${
                                    isActive
                                        ? "bg-[#8AD7E1] text-slate-800 shadow-md"
                                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                                }`
                            }
                            end={item.path === "/home"}
                        >
                            <IconComponent className="w-5 h-5" />
                            <span>{item.name}</span>
                        </NavLink>
                    );
                })}
            </nav>

            <div className="mt-8 border-t border-slate-100 p-4 md:p-6">
                <NavLink
                    to="/settings"
                    className="flex items-center gap-3 w-full rounded-lg px-4 py-3 text-left text-slate-600 hover:bg-slate-100 transition duration-150"
                >
                    <FaCog className="w-5 h-5" />
                    <span>Configurações</span>
                </NavLink>
            </div>
        </aside>
    );
};


/* Componente Layout Principal */
const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            <Header />
            <div className="flex min-h-screen">
                <SideBar />
                {/* ml-60 para compensar a largura da SideBar */}
                <main className="flex-1 px-4 pb-16 pt-6 md:px-8 bg-slate-50 lg:ml-60">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;