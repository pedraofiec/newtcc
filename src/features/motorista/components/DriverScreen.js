import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaCog, FaSearch, FaUsers, FaCar } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";

/* Header (mesmo visual do Home) */
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
            onClick={() => navigate('/perfil')}
            className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-1.5 text-sm text-slate-700 hover:bg-gray-100 transition"
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

/* Sidebar — mapeia /dashboard -> / */
const SideBar = () => {
  const navigate = useNavigate();
  const nav = [
    { name: "Dashboard", path: "/dashboard", icon: MdOutlineDashboard },
    { name: "Motoristas", path: "/motoristas", icon: FaCar },
    { name: "Dependentes", path: "/dependentes", icon: FaUsers },
  ];

  const normalize = (p) => (p === "/dashboard" ? "/" : p);

  return (
    <aside className="fixed left-0 top-[64px] h-[calc(100%-64px)] w-60 border-r border-slate-200 bg-white shadow-xl">
      <nav className="flex flex-col gap-1 p-4 md:p-6">
        {nav.map((it) => {
          const target = normalize(it.path);
          const isActive = window.location.pathname === target;

          return (
            <button
              key={it.name}
              onClick={() => navigate(target)}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-left font-medium transition
                ${isActive
                  ? 'bg-[#8AD7E1] text-slate-800 shadow-md'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'}`}
            >
              <it.icon className="w-5 h-5" />
              <span>{it.name}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-8 border-t border-slate-100 p-4 md:p-6">
        <button
          onClick={() => navigate('/settings')}
          className="flex items-center gap-3 w-full rounded-lg px-4 py-3 text-left text-slate-600 hover:bg-slate-100 transition"
        >
          <FaCog className="w-5 h-5" />
          <span>Configurações</span>
        </button>
      </div>
    </aside>
  );
};

/* Card de motorista */
const DriverCard = ({ driver, onView }) => (
  <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-gray-100 transition hover:shadow-2xl hover:ring-[#8AD7E1]/50">
    <div className="flex flex-col items-center">
      <div className="mb-4 h-20 w-20 rounded-full overflow-hidden ring-4 ring-[#8AD7E1]/50 bg-[#8AD7E1]/20 flex items-center justify-center">
        <span className="text-4xl">{driver.avatar ?? "🧑‍✈️"}</span>
      </div>
      <h3 className="text-lg font-semibold text-slate-800">{driver.nome ?? "Nome"}</h3>
    </div>

    <div className="mt-4">
      <button
        onClick={() => onView(driver.id)}
        className="w-full rounded-full bg-[#8AD7E1] px-5 py-2 text-sm font-semibold text-slate-800 shadow hover:bg-[#7bc8d2] transition"
      >
        Visualizar perfil
      </button>
    </div>
  </div>
);

/* Página: Encontrar Motoristas */
const DriversScreen = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const escolaPlaceholder = "EMEB Profª Francisca Lucinda Bueno";

  const drivers = useMemo(() => ([
    { id: 1, nome: "Alex Lima", avatar: "🧑🏽‍✈️" },
    { id: 2, nome: "Bia Torres", avatar: "👩🏼‍✈️" },
    { id: 3, nome: "Carlos N.", avatar: "🧔🏾‍✈️" },
    { id: 4, nome: "Duda Reis", avatar: "👱🏻‍♀️" },
  ]), []);

  const filtered = drivers.filter(d =>
    (d.nome ?? "").toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header />
      <div className="flex min-h-screen">
        <SideBar />
        <main className="flex-1 px-4 pb-16 pt-6 md:px-8 bg-slate-50 lg:ml-60">
          {/* Título central, como no mock */}
          <div className="w-full flex justify-center">
            <div className="rounded-full bg-[#8AD7E1] px-6 py-3 text-slate-800 font-semibold shadow mb-6">
              Encontrar motoristas
            </div>
          </div>

          {/* Barra de busca */}
          <div className="w-full flex justify-center mb-8">
            <div className="flex items-center gap-3 w-full max-w-4xl bg-[#bfeaf0] rounded-full px-5 py-3 shadow-inner">
              <FaSearch className="text-slate-600" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={escolaPlaceholder}
                className="flex-1 bg-transparent outline-none placeholder:text-slate-700/80 text-slate-800"
              />
            </div>
          </div>

          {/* Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((driver) => (
              <DriverCard
                key={driver.id}
                driver={driver}
                onView={(id) => navigate(`/motoristas/${id}`)}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DriversScreen;
