    import React, { useEffect, useState } from "react";
    import { HashRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
    import axios from "axios";

    // Este arquivo simula a sua aplicação inteira com todos os componentes
    // em um único lugar, para que a navegação funcione.

    // Componente reusável para o cabeçalho
    const Header = () => {
    const navigate = useNavigate();
    return (
        <header className="sticky top-0 z-30 w-full border-b border-slate-200 bg-cyan-200/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
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
    <div className="rounded-3xl bg-cyan-300/50 p-6 shadow-sm ring-1 ring-cyan-400/20">
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
    <aside className={`border-r border-slate-200 bg-cyan-100/60 md:block ${openNav ? "block" : "hidden"} md:sticky md:top-[68px]`}>
        <nav className="flex flex-col gap-2 p-4 md:p-6">
        <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-white">
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
        let mounted = true;
        (async () => {
        try {
            const res = await axios.get("/api/dependents");
            if (mounted) setDependents(res.data);
        } catch (e) {
            if (mounted) setDependents(mockDependents);
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
        <Header />
        <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-[240px_1fr]">
            <SideBar openNav={openNav} setOpenNav={setOpenNav} />
            <main className="px-4 pb-16 pt-6 md:px-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div className="rounded-full bg-cyan-100/70 px-4 py-1 text-sm font-medium text-slate-700 shadow-sm">
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
                <button className="flex min-h-[340px] items-center justify-center rounded-3xl border-2 border-dashed border-cyan-300 bg-white p-6 text-slate-500 hover:bg-cyan-50">
                    + Adicionar dependente
                </button>
                </div>
            )}
            </main>
        </div>
        </div>
    );
    }

    // Componente para a seleção do tipo de usuário
    const UserTypeSelection = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#E6F3F7] p-8">
        <div className="bg-white p-10 rounded-3xl shadow-2xl flex flex-col items-center">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Sou...</h1>
            <div className="space-y-4 w-full">
            <button
                onClick={() => navigate('/register/driver')}
                className="w-full py-4 bg-[#BDE0EE] text-gray-700 font-bold rounded-xl hover:bg-[#A1E3F4] transition duration-300"
            >
                Motorista
            </button>
            <button
                onClick={() => navigate('/register/responsible')}
                className="w-full py-4 bg-[#BDE0EE] text-gray-700 font-bold rounded-xl hover:bg-[#A1E3F4] transition duration-300"
            >
                Responsável
            </button>
            </div>
        </div>
        </div>
    );
    };

    // Componente para o formulário de login
    const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        alert("Login solicitado. Implemente a lógica de autenticação aqui.");
        navigate("/home"); // Redireciona para a tela inicial
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#A1E3F4] p-4">
        <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-xl border-2 border-gray-300">
            <div className="flex justify-center mb-6">
            <svg className="w-12 h-12 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
                type="submit"
                className="w-full py-3 mt-4 text-lg font-semibold text-white bg-gray-600 rounded-full shadow-md hover:bg-gray-700 transition duration-300"
            >
                Entrar
            </button>
            </form>
            <div className="text-center mt-6 text-gray-700">
            <a onClick={() => navigate('/register')} className="block text-sm font-medium hover:underline mb-1 cursor-pointer">
                Criar conta
            </a>
            </div>
        </div>
        </div>
    );
    };

    // Componentes de registro (placeholders)
    const RegisterResponsible = () => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Cadastro de Responsável</h1>
            <p className="mb-4">Este é o formulário para cadastro de responsáveis. A lógica de registro deve ser implementada aqui.</p>
            <button
            onClick={() => navigate('/login')}
            className="py-2 px-4 bg-blue-500 text-white rounded-md"
            >
            Voltar para o login
            </button>
        </div>
        </div>
    );
    };
    const RegisterDriver = () => <div>Cadastro de Motorista</div>;
    const RegisterSchool = () => <div>Cadastro de Escola</div>;
    const RegisterStudent = () => <div>Cadastro de Aluno</div>;

    export default HomeScreen;