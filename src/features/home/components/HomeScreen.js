import React, { useEffect, useState } from "react";
import { HashRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";

// Componente reusável para o cabeçalho
const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 bg-[#8AD7E1] backdrop-blur h-16">
      <div className="flex w-full items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow">
            <span className="text-xl">🚐</span>
          </div>
          <span className="text-xl font-semibold tracking-wide text-slate-800">ROTAVAN</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/login')}
            className="rounded-full bg-white/10 px-4 py-1.5 text-sm text-slate-800 hover:bg-white/20"
          >
            Login / Registrar
          </button>
        </div>
      </div>
    </header>
  );
};

// Componente para o card de dependente
const DependentCard = ({ d, onEdit }) => (
  <div className="rounded-3xl bg-[#8AD7E1] p-6 shadow-sm ring-1 ring-[#8AD7E1]">
    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-200 text-indigo-700">
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c2.5-4 13.5-4 16 0" />
      </svg>
    </div>
    <div className="space-y-3">
      <div className="text-center text-slate-700">
        <div className="mb-2 rounded-full bg-cyan-50 px-4 py-2 text-sm font-semibold">Nome</div>
        <div className="rounded-full bg-cyan-50 px-4 py-2 text-sm">{d?.nome ?? "—"}</div>
      </div>
      <div className="text-center text-slate-700">
        <div className="mb-2 rounded-full bg-cyan-50 px-4 py-2 text-sm font-semibold">Idade</div>
        <div className="rounded-full bg-cyan-50 px-4 py-2 text-sm">{d?.idade ?? "—"}</div>
      </div>
      <div className="text-center text-slate-700">
        <div className="mb-2 rounded-full bg-cyan-50 px-4 py-2 text-sm font-semibold">Ano escolar</div>
        <div className="rounded-full bg-cyan-50 px-4 py-2 text-sm">{d?.ano ?? "—"}</div>
      </div>
      <div className="text-center text-slate-700">
        <div className="mb-2 rounded-full bg-cyan-50 px-4 py-2 text-sm font-semibold">Escola</div>
        <div className="rounded-full bg-cyan-50 px-4 py-2 text-sm">{d?.escola ?? "—"}</div>
      </div>
      <div className="pt-2 text-center">
        <button
          onClick={() => onEdit(d.id)}
          className="rounded-full bg-white px-5 py-2 text-sm font-medium text-slate-700 shadow hover:shadow-md hover:brightness-105 focus:outline-none"
        >
          Editar perfil
        </button>
      </div>
    </div>
  </div>
);

// Componente para a barra lateral
const SideBar = ({ openNav, setOpenNav }) => (
  <aside className="fixed left-0 top-[64px] h-[calc(100%-64px)] w-60 border-r border-slate-200 bg-[#8AD7E1]">
    <nav className="flex flex-col gap-2 p-4 md:p-6">
      <a href="/home" className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-white">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3 11.5 12 4l9 7.5" />
          <path d="M5 10v10h14V10" />
        </svg>
        <span>Página inicial</span>
      </a>
      <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-white">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <span>Encontrar motoristas</span>
      </a>
      <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-white">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c2.5-4 13.5-4 16 0" />
        </svg>
        <span>Perfil</span>
      </a>
      <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-white">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4 19l8-14 8 14H4Z" />
          <path d="M12 13v6" />
        </svg>
        <span>Rota</span>
      </a>
    </nav>
  </aside>
);

// Componente da tela inicial
const HomeScreen = () => {
  const [openNav, setOpenNav] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dependents, setDependents] = useState([]);
  const [error, setError] = useState(null);

  const mockDependents = [
    { id: 1, nome: "Ana Clara", idade: 8, ano: "3º ano", escola: "Colégio Aurora" },
    { id: 2, nome: "João Pedro", idade: 11, ano: "6º ano", escola: "Escola Horizonte" },
  ];

  useEffect(() => {
    // Mostra sempre os mockDependents até conectar com a API real
    setDependents(mockDependents);
    setLoading(false);
  }, []);

  const handleEdit = async (id) => {
    try {
      await axios.patch(`/api/dependents/${id}`, { touchedAt: new Date().toISOString() });
      alert(`Editar dependente #${id}`);
    } catch {
      alert(`Editar dependente #${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header />
      <div className="flex min-h-screen">
        <SideBar openNav={openNav} setOpenNav={setOpenNav} />
        <main className="flex-1 px-4 pb-16 pt-6 md:px-8 bg-slate-50 ml-60">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="rounded-full bg-[#8AD7E1] px-4 py-1 text-sm font-medium text-slate-700 shadow-sm">
              DEPENDENTES
            </div>
            <div className="text-xs text-slate-500">{new Date().toLocaleDateString()}</div>
          </div>
          {loading ? (
            <div className="py-12 text-center text-slate-500">Carregando…</div>
          ) : error ? (
            <div className="rounded-md bg-red-50 p-4 text-red-700">{error}</div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {dependents.map((d) => (
                <DependentCard key={d.id} d={d} onEdit={handleEdit} />
              ))}
              <button className="flex min-h-[340px] items-center justify-center rounded-3xl border-2 border-dashed border-[#8AD7E1] bg-white p-6 text-slate-500 hover:bg-[#8AD7E1]/20">
                + Adicionar dependente
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default HomeScreen;
