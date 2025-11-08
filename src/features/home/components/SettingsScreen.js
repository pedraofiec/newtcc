// src/features/home/components/SettingsScreen.js (CORRIGIDO)

import React, { useState } from "react";
// 💡 useLocation é necessário para o controle de sub-telas
import { useNavigate, NavLink, useLocation } from "react-router-dom"; 
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

/* ============== Header (CORRIGIDO) ============== */
const Header = () => {
    // 🚀 CORREÇÃO AQUI: Chame o Hook useNavigate APENAS no topo do componente
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
                        onClick={() => navigate("/perfil")} // 🚀 CORREÇÃO: Usando a variável navigate
                        className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-1.5 text-sm text-slate-700 hover:bg-gray-100 transition duration-150"
                    >
                        <FaUserCircle className="text-lg text-slate-500" />
                        Perfil
                    </button>
                    <button
                        onClick={() => {
                            localStorage.removeItem("accessToken");
                            navigate("/login"); // 🚀 CORREÇÃO: Usando a variável navigate
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

/* ============== SideBar (CORRIGIDO) ============== */
const SideBar = () => {
    // 🚀 CORREÇÃO AQUI: Chame o Hook useNavigate APENAS no topo do componente
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


// --------------------------------------------------------------------------------------
// CONTEÚDO DAS SUB-TELAS
// --------------------------------------------------------------------------------------

const SubscreenPlaceholder = ({ title, path }) => (
    <div className="mt-6 p-8 bg-white rounded-xl shadow-lg ring-1 ring-gray-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">{title}</h2>
        <p className="text-slate-600">
            Esta é a tela de **{title}**. 
            O conteúdo detalhado será implementado aqui.
        </p>
        <blockquote className="mt-4 p-3 border-l-4 border-[#8AD7E1] bg-gray-50 text-sm text-gray-500">
            **Rota Atual:** <code>{path}</code>. 
            Você pode adicionar formulários e lógica de UI aqui.
        </blockquote>
    </div>
);


// --------------------------------------------------------------------------------------
// COMPONENTES AUXILIARES
// --------------------------------------------------------------------------------------

/* ToggleSettingItem (Sem Hooks, mantido como estava) */
const ToggleSettingItem = ({ icon: Icon, title, isEnabled, onToggle }) => (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
            <Icon className="w-5 h-5 text-[#8AD7E1]" />
            <span className="font-medium text-slate-700">{title}</span>
        </div>
        
        <button
            onClick={onToggle}
            className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8AD7E1] ${isEnabled ? 'bg-[#8AD7E1]' : 'bg-gray-200'}`}
        >
            <span className="sr-only">Toggle {title}</span>
            <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${isEnabled ? 'translate-x-5' : 'translate-x-0'}`}
            />
        </button>
    </div>
);

/* NavSettingItem (CORRIGIDO) */
// 💡 Correção: 'navigate' é uma prop passada pelo SettingsScreen
const NavSettingItem = ({ icon: Icon, title, path, navigate, external = false }) => (
    <button
        onClick={() => {
            if (external) {
                window.open(path, '_blank'); 
            } else {
                // 🚀 CORREÇÃO: 'navigate' é a função passada como prop, não o Hook.
                navigate(path); 
            }
        }}
        className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-sm border border-gray-100 transition duration-150 hover:bg-gray-50"
    >
        <div className="flex items-center gap-4">
            <Icon className="w-5 h-5 text-[#8AD7E1]" />
            <span className="font-medium text-slate-700">{title}</span>
        </div>
        <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
    </button>
);


// --------------------------------------------------------------------------------------
// COMPONENTE PRINCIPAL DA TELA DE CONFIGURAÇÕES
// --------------------------------------------------------------------------------------

const SettingsScreen = () => {
    // Hooks chamados APENAS no topo do componente SettingsScreen
    const navigate = useNavigate();
    const location = useLocation();
    
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        navigate("/login");
    };
    
    // Lógica para renderização de sub-telas (mantida)
    const currentPath = location.pathname;
    const isMainSettings = currentPath === '/settings';

    const subScreens = {
        '/settings/perfil': { title: 'Editar Perfil', Component: () => <SubscreenPlaceholder title="Editar Perfil" path={currentPath} /> },
        '/settings/alterar-senha': { title: 'Alterar Senha', Component: () => <SubscreenPlaceholder title="Alterar Senha" path={currentPath} /> },
        '/termos-de-uso': { title: 'Termos de Uso e Política', Component: () => <SubscreenPlaceholder title="Termos de Uso e Política" path={currentPath} /> },
    };

    const CurrentSubScreen = subScreens[currentPath]?.Component;

    const pageTitle = isMainSettings ? 'Configurações' : subScreens[currentPath]?.title || 'Configurações';

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            <Header /> 
            <div className="flex min-h-screen">
                <SideBar />
                
                <main className="flex-1 px-4 pb-16 pt-6 md:px-8 bg-slate-50 lg:ml-60">
                    
                    {/* Cabeçalho dinâmico (com botão voltar para sub-telas) */}
                    <div className="mb-8 flex flex-wrap items-center gap-4 border-b pb-4 border-gray-200">
                        {!isMainSettings && (
                            <button
                                onClick={() => navigate("/settings")}
                                className="flex items-center gap-2 text-slate-500 hover:text-[#8AD7E1] transition duration-150"
                            >
                                <FaArrowLeft className="w-5 h-5" />
                            </button>
                        )}
                        <h1 className="text-3xl font-bold text-slate-800">{pageTitle}</h1>
                    </div>

                    {/* RENDERIZAÇÃO CONDICIONAL */}
                    {isMainSettings ? (
                        /* Conteúdo Principal de Configurações */
                        <div className="space-y-8 max-w-4xl mx-auto">
                            
                            {/* Seção 1: Aparência e Notificações */}
                            <section className="space-y-4">
                                <h2 className="text-xl font-semibold text-slate-600 border-b pb-2">Aparência e Notificações</h2>
                                <ToggleSettingItem icon={FaMoon} title="Modo Escuro (Dark Mode)" isEnabled={isDarkMode} onToggle={() => setIsDarkMode(prev => !prev)} />
                                <ToggleSettingItem icon={FaBell} title="Notificações do Aplicativo" isEnabled={isNotificationsEnabled} onToggle={() => setIsNotificationsEnabled(prev => !prev)} />
                            </section>

                            {/* Seção 2: Conta e Segurança */}
                            <section className="space-y-4">
                                <h2 className="text-xl font-semibold text-slate-600 border-b pb-2">Conta e Segurança</h2>
                                
                                {/* 💡 Passando a função navigate como prop */}
                                <NavSettingItem icon={FaUser} title="Editar Perfil / Dados Pessoais" path="/settings/perfil" navigate={navigate} />
                                <NavSettingItem icon={FaLock} title="Alterar Senha" path="/settings/alterar-senha" navigate={navigate} />
                            </section>
                            
                            {/* Seção 3: Informações e Suporte */}
                            <section className="space-y-4">
                                <h2 className="text-xl font-semibold text-slate-600 border-b pb-2">Informações e Suporte</h2>

                                <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 text-sm text-gray-600 flex justify-between">
                                    <span className="font-semibold text-gray-500">Versão do Aplicativo:</span>
                                    <span className="font-semibold text-slate-800">1.0.0 (TCC)</span>
                                </div>

                                {/* 💡 Passando a função navigate como prop */}
                                <NavSettingItem icon={FaInfoCircle} title="Termos de Uso e Política" path="/termos-de-uso" navigate={navigate} />
                                <NavSettingItem icon={FaInfoCircle} title="Fale Conosco / Suporte" path="mailto:suporte@rotavan.com.br" navigate={navigate} external={true} />
                            </section>
                            
                            {/* Botão de Logout */}
                            <div className="pt-4">
                                <button
                                    onClick={handleLogout}
                                    className="w-full rounded-lg bg-red-600 px-5 py-3 text-base font-semibold text-white shadow-md hover:bg-red-700 transition duration-150 flex items-center justify-center gap-2"
                                >
                                    <FaSignOutAlt className="w-4 h-4" />
                                    Sair da Conta (Logout)
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* Renderiza a sub-tela correspondente */
                        CurrentSubScreen ? <CurrentSubScreen /> : <h1>Rota de Configuração Não Encontrada</h1>
                    )}
                </main>
            </div>
        </div>
    );
};

export default SettingsScreen;