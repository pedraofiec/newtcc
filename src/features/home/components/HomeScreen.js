// src/features/home/components/HomeScreen.js (REESTILIZADO)
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPlus, FaHome, FaUsers, FaCar, FaUserCircle, FaMapMarkedAlt, FaSignOutAlt, FaCog } from 'react-icons/fa';
import { MdOutlineDashboard } from 'react-icons/md';

// Componente reusável para o cabeçalho (HEADER MAIS LIMPO)
const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-100 bg-white shadow-sm h-16">
      <div className="flex w-full items-center justify-between px-4 py-3 md:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#8AD7E1] shadow-lg">
            <span className="text-xl text-white font-bold">🚐</span>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-800">ROTAVAN</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/perfil')} // Nova rota
            className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-1.5 text-sm text-slate-700 hover:bg-gray-100 transition duration-150"
          >
            <FaUserCircle className="text-lg text-slate-500" />
            Perfil
          </button>
          <button
            onClick={() => {
                localStorage.removeItem('accessToken');
                navigate('/login');
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

// Componente para a barra lateral (SIDEBAR REESTILIZADA)
const SideBar = ({ openNav, setOpenNav }) => {
  const navigate = useNavigate();
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: MdOutlineDashboard },
    { name: "Dependentes", path: "/dependentes", icon: FaUsers },
    { name: "Rotas", path: "/rotas", icon: FaMapMarkedAlt },
    { name: "Motoristas", path: "/motoristas", icon: FaCar },
    { name: "Responsáveis", path: "/responsaveis", icon: FaUserCircle },
  ];

  return (
    <aside className="fixed left-0 top-[64px] h-[calc(100%-64px)] w-60 border-r border-slate-200 bg-white shadow-xl">
      <nav className="flex flex-col gap-1 p-4 md:p-6">
        {navItems.map((item) => (
            <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-left font-medium transition duration-150
                    ${window.location.pathname === item.path 
                        ? 'bg-[#8AD7E1] text-slate-800 shadow-md' 
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'}`
                }
            >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
            </button>
        ))}
      </nav>
      
      <div className="mt-8 border-t border-slate-100 p-4 md:p-6">
        <button
            onClick={() => navigate('/settings')}
            className="flex items-center gap-3 w-full rounded-lg px-4 py-3 text-left text-slate-600 hover:bg-slate-100 transition duration-150"
        >
            <FaCog className="w-5 h-5" />
            <span>Configurações</span>
        </button>
      </div>
    </aside>
  );
};

// Componente para o card de dependente (CARD NOVO E LIMPO)
const DependentCard = ({ d, onEdit }) => (
  <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-gray-100 transition duration-300 hover:shadow-2xl hover:ring-[#8AD7E1]/50">
    <div className="flex flex-col items-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#8AD7E1]/30 text-[#8AD7E1] border-4 border-[#8AD7E1]/50">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c2.5-4 13.5-4 16 0" />
            </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-4">{d?.nome ?? "Dependente sem nome"}</h3>
    </div>

    <div className="space-y-3 border-t border-gray-100 pt-4">
      <div className="flex justify-between items-center text-sm">
        <span className="font-semibold text-gray-500">Idade:</span>
        <span className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full">{d?.idade ?? "—"} anos</span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="font-semibold text-gray-500">Ano Escolar:</span>
        <span className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full">{d?.ano ?? "—"}</span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="font-semibold text-gray-500">Escola:</span>
        <span className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full max-w-[60%] truncate">{d?.escola ?? "—"}</span>
      </div>
    </div>
    
    <div className="pt-6 text-center">
      <button
        onClick={() => onEdit(d.id)}
        className="w-full rounded-full bg-[#8AD7E1] px-5 py-2 text-sm font-medium text-white shadow-md hover:bg-slate-700 focus:outline-none transition duration-150"
      >
        Editar Perfil
      </button>
    </div>
  </div>
);

// Componente da tela inicial (HomeScreen - Agora é a lista de Dependentes)
const HomeScreen = () => {
  const [openNav, setOpenNav] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dependents, setDependents] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const mockDependents = [
    { id: 1, nome: "Ana Clara", idade: 8, ano: "3º ano", escola: "Colégio Aurora" },
    { id: 2, nome: "João Pedro", idade: 11, ano: "6º ano", escola: "Escola Horizonte" },
    { id: 3, nome: "Mariana Souza", idade: 5, ano: "Jardim I", escola: "Escola Arco-Íris" },
  ];

  useEffect(() => {
    // Simulação de carregamento da API
    setTimeout(() => {
        setDependents(mockDependents);
        setLoading(false);
    }, 500);
  }, []);

  const handleEdit = async (id) => {
    // Lógica real de navegação ou edição
    navigate(`/dependentes/editar/${id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header />
      <div className="flex min-h-screen">
        <SideBar openNav={openNav} setOpenNav={setOpenNav} />
        <main className="flex-1 px-4 pb-16 pt-6 md:px-8 bg-slate-50 lg:ml-60">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b pb-4 border-gray-200">
            <h1 className="text-3xl font-bold text-slate-800">Meus Dependentes</h1>
            <button 
                onClick={() => navigate('/dependentes/novo')}
                className="flex items-center gap-2 rounded-full bg-[#8AD7E1] px-5 py-2 text-sm font-semibold text-slate-800 shadow-lg hover:bg-[#7bc8d2] transition duration-150"
            >
                <FaPlus className="w-4 h-4" />
                Adicionar Novo
            </button>
          </div>
          
          {loading ? (
            <div className="py-12 text-center text-slate-500">Carregando dados...</div>
          ) : error ? (
            <div className="rounded-md bg-red-50 p-4 text-red-700">{error}</div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {dependents.map((d) => (
                <DependentCard key={d.id} d={d} onEdit={handleEdit} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default HomeScreen;