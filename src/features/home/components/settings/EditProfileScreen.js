// src/features/home/components/settings/EditProfileScreen.js
// src/features/home/components/settings/EditProfileScreen.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUser, FaSave } from 'react-icons/fa';

// 🚀 NOVA IMPORTAÇÃO: Do arquivo de layout centralizado
import { Header, SideBar } from '../layout/LayoutComponents';

const EditProfileScreen = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('João da Silva');
    const [email, setEmail] = useState('joao.silva@rotavan.com.br');
    const [phone, setPhone] = useState('(11) 99876-5432');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        // Lógica de API: Chamada de ProfileService.updateProfile({ name, email, phone })
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Header />
            <div className="flex min-h-screen">
                <SideBar />
                
                <main className="flex-1 px-4 pb-16 pt-6 md:px-8 bg-slate-50 lg:ml-60">
                    <div className="mb-8 flex flex-wrap items-center gap-4 border-b pb-4 border-gray-200">
                        <button
                            onClick={() => navigate("/settings")}
                            className="flex items-center gap-2 text-slate-500 hover:text-[#8AD7E1] transition duration-150"
                        >
                            <FaArrowLeft className="w-5 h-5" />
                        </button>
                        <h1 className="text-3xl font-bold text-slate-800">Editar Perfil</h1>
                    </div>

                    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg ring-1 ring-gray-100">
                        <h2 className="text-xl font-semibold text-slate-700 mb-6 flex items-center gap-2"><FaUser /> Dados Pessoais</h2>
                        
                        {error && <div className="p-3 mb-4 text-red-700 bg-red-100 rounded">Erro: {error}</div>}
                        {success && <div className="p-3 mb-4 text-green-700 bg-green-100 rounded">Perfil atualizado com sucesso!</div>}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome Completo</label>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#8AD7E1] focus:border-[#8AD7E1]"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#8AD7E1] focus:border-[#8AD7E1]"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefone</label>
                                <input
                                    id="phone"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#8AD7E1] focus:border-[#8AD7E1]"
                                />
                            </div>
                            
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full flex items-center justify-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition duration-150 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#8AD7E1] hover:bg-[#7bc8d2]'}`}
                            >
                                <FaSave />
                                {loading ? 'Salvando...' : 'Salvar Alterações'}
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default EditProfileScreen;