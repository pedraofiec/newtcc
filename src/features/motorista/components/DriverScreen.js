// src/features/motorista/components/DriverScreen.js
import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
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

/* ============== Modal Reutilizável ============== */
const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6">
      <h2 className="text-lg font-bold mb-4 text-slate-800">{title}</h2>
      {children}
      <div className="mt-4 text-right">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800"
        >
          Fechar
        </button>
      </div>
    </div>
  </div>
);

/* ============== DriverScreen ============== */
export default function DriverScreen() {
  const [showDisponibilidade, setShowDisponibilidade] = useState(false);
  const [showVeiculo, setShowVeiculo] = useState(false);

  // Handlers
  const handlePublicarDisponibilidade = () => setShowDisponibilidade(true);
  const handleCadastrarVeiculo = () => setShowVeiculo(true);

  const handleSubmitDisponibilidade = (e) => {
    e.preventDefault();
    alert("Disponibilidade publicada com sucesso!");
    setShowDisponibilidade(false);
  };

  const handleSubmitVeiculo = (e) => {
    e.preventDefault();
    alert("Veículo cadastrado com sucesso!");
    setShowVeiculo(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header />

      <div className="flex min-h-screen">
        <SideBar />

        <main className="flex-1 px-4 pb-16 pt-6 md:px-8 bg-slate-50 lg:ml-60">
          <div className="mb-6">
            <div className="inline-block px-8 py-2 rounded-full bg-[#92dbe1] text-[#02343F] font-semibold tracking-wide">
              Painel do Motorista
            </div>
          </div>

          {/* Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 */}
            <div className="rounded-2xl bg-white p-5 shadow ring-1 ring-slate-100">
              <h3 className="font-semibold text-slate-800 mb-2">Status da Rota</h3>
              <p className="text-sm text-slate-600 mb-4">
                Nenhuma rota em andamento.
              </p>
              <div className="flex gap-2">
                <NavLink
                  to="/rotas"
                  className="px-4 py-2 rounded-lg bg-[#92dbe1] text-[#02343F] font-medium hover:opacity-90"
                >
                  Ver Rotas
                </NavLink>
                <button
                  onClick={handlePublicarDisponibilidade}
                  className="px-4 py-2 rounded-lg border border-[#92dbe1] text-[#02343F] hover:bg-[#f6fbfc]"
                >
                  Publicar Disponibilidade
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl bg-white p-5 shadow ring-1 ring-slate-100">
              <h3 className="font-semibold text-slate-800 mb-2">Solicitações Pendentes</h3>
              <p className="text-sm text-slate-600">0 solicitações aguardando análise.</p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl bg-white p-5 shadow ring-1 ring-slate-100">
              <h3 className="font-semibold text-slate-800 mb-2">Veículo</h3>
              <p className="text-sm text-slate-600">Nenhum veículo cadastrado.</p>
              <button
                onClick={handleCadastrarVeiculo}
                className="mt-3 px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700"
              >
                Cadastrar Veículo
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* ============== MODAL: Publicar Disponibilidade ============== */}
      {showDisponibilidade && (
        <Modal title="Publicar Disponibilidade" onClose={() => setShowDisponibilidade(false)}>
          <form onSubmit={handleSubmitDisponibilidade} className="flex flex-col gap-3">
            <label className="text-sm text-slate-700">
              Data:
              <input
                type="date"
                required
                className="w-full border border-slate-300 rounded-lg p-2 mt-1"
              />
            </label>
            <label className="text-sm text-slate-700">
              Horário disponível:
              <input
                type="time"
                required
                className="w-full border border-slate-300 rounded-lg p-2 mt-1"
              />
            </label>
            <label className="text-sm text-slate-700">
              Local:
              <input
                type="text"
                placeholder="Ex: Centro - Bairro X"
                required
                className="w-full border border-slate-300 rounded-lg p-2 mt-1"
              />
            </label>
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-[#8AD7E1] text-[#02343F] font-semibold rounded-lg hover:opacity-90"
            >
              Publicar
            </button>
          </form>
        </Modal>
      )}

      {/* ============== MODAL: Cadastrar Veículo ============== */}
      {showVeiculo && (
        <Modal title="Cadastrar Veículo" onClose={() => setShowVeiculo(false)}>
          <form onSubmit={handleSubmitVeiculo} className="flex flex-col gap-3">
            <label className="text-sm text-slate-700">
              Modelo:
              <input
                type="text"
                placeholder="Ex: Renault Master"
                required
                className="w-full border border-slate-300 rounded-lg p-2 mt-1"
              />
            </label>
            <label className="text-sm text-slate-700">
              Placa:
              <input
                type="text"
                placeholder="ABC-1234"
                required
                className="w-full border border-slate-300 rounded-lg p-2 mt-1 uppercase"
              />
            </label>
            <label className="text-sm text-slate-700">
              Capacidade de passageiros:
              <input
                type="number"
                placeholder="Ex: 15"
                required
                className="w-full border border-slate-300 rounded-lg p-2 mt-1"
              />
            </label>
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700"
            >
              Salvar
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}
