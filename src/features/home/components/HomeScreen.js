import React, { useEffect, useState } from "react";
import axios from "axios";

const mockDependents = [
  { id: 1, nome: "Ana Clara", idade: 8, ano: "3º ano", escola: "Colégio Aurora" },
  { id: 2, nome: "João Pedro", idade: 11, ano: "6º ano", escola: "Escola Horizonte" },
];

const Chip = ({ children }) => (
  <div className="rounded-full bg-cyan-100/70 px-4 py-1 text-sm font-medium text-slate-700 shadow-sm">
    {children}
  </div>
);

const Icon = ({ name }) => {
  const base = "w-6 h-6";
  if (name === "home")
    return (
      <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 11.5 12 4l9 7.5" />
        <path d="M5 10v10h14V10" />
      </svg>
    );
  if (name === "search")
    return (
      <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
    );
  if (name === "user")
    return (
      <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c2.5-4 13.5-4 16 0" />
      </svg>
    );
  return (
    <svg className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 19l8-14 8 14H4Z" />
      <path d="M12 13v6" />
    </svg>
  );
};

const DependentCard = ({ d, onEdit }) => (
  <div className="rounded-3xl bg-cyan-300/50 p-6 shadow-sm ring-1 ring-cyan-400/20">
    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-200 text-indigo-700">
      <Icon name="user" />
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

function HomeScreen() {
  const [openNav, setOpenNav] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dependentes, setDependentes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await axios.get("/api/dependents");
        if (mounted) setDependentes(res.data);
      } catch (e) {
        if (mounted) setDependentes(mockDependents);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
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
      {/* Header */}
      <header className="sticky top-0 z-30 w-full border-b border-slate-200 bg-cyan-200/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow">
              <span className="text-xl">🚐</span>
            </div>
            <span className="text-xl font-semibold tracking-wide text-slate-800">ROTAVAN</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="rounded-full bg-white/10 px-4 py-1.5 text-sm text-slate-800 hover:bg-white/20">Fazer login</button>
            <button className="rounded-full bg-cyan-500 px-4 py-1.5 text-sm font-semibold text-slate-900 hover:brightness-110">Criar conta</button>
            <button
              onClick={() => setOpenNav((v) => !v)}
              className="rounded-lg p-2 ring-1 ring-slate-300 md:hidden"
              aria-label="Abrir menu"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside className={`border-r border-slate-200 bg-cyan-100/60 md:block ${openNav ? "block" : "hidden"} md:sticky md:top-[68px]`}>
          <nav className="flex flex-col gap-2 p-4 md:p-6">
            <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-white">
              <Icon name="home" />
              <span>Página inicial</span>
            </a>
            <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-white">
              <Icon name="search" />
              <span>Encontrar motoristas</span>
            </a>
            <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-white">
              <Icon name="user" />
              <span>Perfil</span>
            </a>
            <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-white">
              <Icon name="route" />
              <span>Rota</span>
            </a>
          </nav>
        </aside>

        {/* Main */}
        <main className="px-4 pb-16 pt-6 md:px-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <Chip>DEPENDENTES</Chip>
            <div className="text-xs text-slate-500">{new Date().toLocaleDateString()}</div>
          </div>

          {loading ? (
            <div className="py-12 text-center text-slate-500">Carregando…</div>
          ) : error ? (
            <div className="rounded-md bg-red-50 p-4 text-red-700">{error}</div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {dependentes.map((d) => (
                <DependentCard key={d.id} d={d} onEdit={handleEdit} />
              ))}
              {/* Add card */}
              <button className="flex min-h-[340px] items-center justify-center rounded-3xl border-2 border-dashed border-cyan-300 bg-white p-6 text-slate-500 hover:bg-cyan-50">
                + Adicionar dependente
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-around border-t border-slate-200 bg-white px-4 py-2 md:hidden">
        <button className="flex flex-col items-center text-xs">
          <Icon name="home" />
          Início
        </button>
        <button className="flex flex-col items-center text-xs">
          <Icon name="search" />
          Motoristas
        </button>
        <button className="flex flex-col items-center text-xs">
          <Icon name="user" />
          Perfil
        </button>
        <button className="flex flex-col items-center text-xs">
          <Icon name="route" />
          Rota
        </button>
      </div>
    </div>
  );
}

export default HomeScreen;
