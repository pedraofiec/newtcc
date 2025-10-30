// src/features/home/components/HomeScreen.jsx (CORREÇÃO DE ERRO: Substituindo react-icons por SVGs inline)
import React, { useEffect, useState, memo } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

import {
  FaUserCircle,
  FaSignOutAlt,
  FaCog,
  FaMapMarkedAlt,
  FaCar
} from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";

// --------------------------------------------------------------------------------------
// ÍCONES SVG INLINE (Substituindo react-icons/fa e react-icons/md para evitar erros de dependência)
// --------------------------------------------------------------------------------------

// Equivalente a FaPlus
const IconPlus = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);

// Equivalente a FaUsers
const IconUsers = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline><path d="M19 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
);

// Equivalente a FaCar
const IconCar = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 17H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4"></path><line x1="16" y1="5" x2="16" y2="8"></line><line x1="8" y1="5" x2="8" y2="8"></line><circle cx="5.5" cy="17.5" r="2.5"></circle><circle cx="18.5" cy="17.5" r="2.5"></circle></svg>
);

// Equivalente a FaUserCircle
const IconUserCircle = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);

// Equivalente a FaMapMarkedAlt (usando FaMap)
const IconMap = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>
);

// Equivalente a FaSignOutAlt (usando LogOut)
const IconSignOut = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
);

// Equivalente a FaCog (usando Settings)

// Equivalente a MdOutlineDashboard (usando LayoutGrid)
const IconDashboard = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
);

// --------------------------------------------------------------------------------------
// FIM DOS ÍCONES SVG INLINE
// --------------------------------------------------------------------------------------


/* Header */
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
            <IconUserCircle className="text-lg text-slate-500 w-4 h-4" />
            Perfil
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("accessToken");
              navigate("/login");
            }}
            className="flex items-center rounded-full bg-green-500 px-4 py-1.5 text-sm text-white shadow hover:bg-green-600"
          >
            <IconSignOut className="mr-2 w-4 h-4" />
            Login / Criar Conta
          </button>
        </div>
      </div>
    </header>
  );
};

/* SideBar */
const SideBar = () => {
  const navigate = useNavigate();
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: MdOutlineDashboard },
    { name: "Rotas", path: "/rotas", icon: FaMapMarkedAlt },
    { name: "Motoristas", path: "/motoristas", icon: FaCar },
    { name: "Responsáveis", path: "/responsaveis", icon: FaUserCircle }
  ];

  return (
    <aside className="fixed left-0 top-[64px] h-[calc(100%-64px)] w-60 border-r border-slate-200 bg-white shadow-xl">
      <nav className="flex flex-col gap-1 p-4 md:p-6">
        {navItems.map((item) => {
          const target = item.path; 
          const IconComponent = item.icon;

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
              end={target === "/"}
            >
              <IconComponent className="w-5 h-5" />
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

/* Card de dependente */
const DependentCard = ({ d, onEdit }) => (
  <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-gray-100 transition duration-300 hover:shadow-2xl hover:ring-[#8AD7E1]/50">
    <div className="flex flex-col items-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#8AD7E1]/30 text-[#8AD7E1] border-4 border-[#8AD7E1]/50">
        <svg
          className="w-8 h-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c2.5-4 13.5-4 16 0" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-4">
        {d?.nome ?? "Dependente sem nome"}
      </h3>
    </div>

    <div className="space-y-3 border-t border-gray-100 pt-4">
      <div className="flex justify-between items-center text-sm">
        <span className="font-semibold text-gray-500">Idade:</span>
        <span className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full">
          {d?.idade ?? "—"} anos
        </span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="font-semibold text-gray-500">Ano Escolar:</span>
        <span className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full">
          {d?.ano ?? "—"}
        </span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="font-semibold text-gray-500">Escola:</span>
        <span className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full max-w-[60%] truncate">
          {d?.escola ?? "—"}
        </span>
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

/* --- Componente de Campo de Input (Memoizado e estável) --- */
// A memoização evita que o input perca o foco no modal
const InputField = memo(({ label, name, type = "text", value, onChange }) => (
    <input
        type={type}
        name={name}
        placeholder={label}
        value={value}
        onChange={onChange}
        required
        className="w-full h-12 rounded-lg bg-gray-200 px-4 text-slate-800 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-[#8AD7E1] focus:outline-none transition duration-150 shadow-inner"
    />
));

/* --- Modal de Cadastro de Dependentes --- */
const DependentFormModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        dataNascimento: '',
        anoEscolar: '',
        escola: ''
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        // Usa o callback de prev para garantir a atualização correta
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simula dados adicionais para o card
        const newDependent = {
            id: Date.now(), 
            nome: formData.nome,
            idade: Math.floor(Math.random() * 10) + 5, 
            ano: "Simulado", 
            escola: formData.escola,
            ...formData 
        };
        onSave(newDependent);
        setFormData({ nome: '', cpf: '', dataNascimento: '', escola: '' }); // Limpa o formulário
        onClose();
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={onClose} 
        >
            <div 
                className="w-full max-w-lg rounded-xl bg-white p-8 shadow-2xl"
                onClick={e => e.stopPropagation()} 
            >
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-slate-800 tracking-tight">CADASTRO DE DEPENDENTES</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Placeholder de Imagem/Ícone de Perfil */}
                    <div className="flex justify-center mb-6">
                        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-gray-500 border border-gray-300">
                            <IconUserCircle className="w-10 h-10 text-gray-500" />
                            <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 text-xl border border-gray-300 shadow">
                                <IconPlus className="w-4 h-4 text-[#8AD7E1]" />
                            </div>
                        </div>
                    </div>
                    
                    {/* Campos de Input - O uso de memo aqui previne o problema de perda de foco */}
                    <InputField label="Nome completo" name="nome" value={formData.nome} onChange={handleChange} />
                    <InputField label="CPF" name="cpf" value={formData.cpf} onChange={handleChange} />
                    <InputField label="Data de nascimento" name="dataNascimento" type="date" value={formData.dataNascimento} onChange={handleChange} />
                    <InputField label="Ano Escolar" name="anoEscolar" type="anoEscolar" value={formData.anoEscolar}onChange={handleChange} />
                    <InputField label="Escola" name="escola" value={formData.escola} onChange={handleChange} />

                    {/* Botão Adicionar Mais (Ícone) */}
                    <div className="flex justify-center pt-2">
                        <button type="button" className="text-gray-500 hover:text-[#8AD7E1] transition">
                            <IconPlus className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Botão Principal */}
                    <button
                        type="submit"
                        className="w-full rounded-full bg-[#8AD7E1] px-5 py-3 text-base font-semibold text-slate-800 shadow-md hover:bg-[#7bc8d2] transition duration-150 mt-6"
                    >
                        Criar conta
                    </button>
                </form>
            </div>
        </div>
    );
};

/* HomeScreen */
const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [dependents, setDependents] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const navigate = useNavigate();

  const mockDependents = [
    { id: 1, nome: "Ana Clara", idade: 8, ano: "3º ano", escola: "Colégio Aurora" },
    { id: 2, nome: "João Pedro", idade: 11, ano: "6º ano", escola: "Escola Horizonte" },
    { id: 3, nome: "Mariana Souza", idade: 5, ano: "Jardim I", escola: "Escola Arco-Íris" }
  ];

  useEffect(() => {
    setTimeout(() => {
      setDependents(mockDependents);
      setLoading(false);
    }, 500);
  }, []);

  const handleEdit = async (id) => {
    navigate(`/dependentes/editar/${id}`);
  };

  const handleAddDependent = (newDependent) => {
    setDependents([newDependent, ...dependents]); 
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header />
      <div className="flex min-h-screen">
        <SideBar />
        <main className="flex-1 px-4 pb-16 pt-6 md:px-8 bg-slate-50 lg:ml-60">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b pb-4 border-gray-200">
            <h1 className="text-3xl font-bold text-slate-800">Meus Dependentes</h1>
            <button
              onClick={() => setIsModalOpen(true)} 
              className="flex items-center gap-2 rounded-full bg-[#8AD7E1] px-5 py-2 text-sm font-semibold text-slate-800 shadow-lg hover:bg-[#7bc8d2] transition duration-150"
            >
              <IconPlus className="w-4 h-4" />
              Adicionar Novo
            </button>
          </div>

          {loading ? (
            <div className="py-12 text-center text-slate-500">Carregando dados...</div>
          ) : error ? (
            <div className="rounded-md bg-red-50 p-4 text-red-700">{error}</div>
          ) : dependents.length === 0 ? (
             <div className="py-12 text-center text-slate-500">
                Nenhum dependente cadastrado. Adicione um para começar!
             </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {dependents.map((d) => (
                <DependentCard key={d.id} d={d} onEdit={handleEdit} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Componente Modal */}
      <DependentFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddDependent}
      />
    </div>
  );
};

export default HomeScreen;
