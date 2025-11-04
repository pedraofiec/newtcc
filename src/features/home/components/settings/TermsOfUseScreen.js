// src/features/info/TermsOfUseScreen.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaInfoCircle } from 'react-icons/fa';

// Importe o Header e SideBar do seu projeto (assumindo que estão acessíveis)
// IMPORTANTE: Ajuste este caminho se for diferente
import { Header, SideBar } from '../layout/LayoutComponents';

const TermsOfUseScreen = () => {
    const navigate = useNavigate();

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
                        <h1 className="text-3xl font-bold text-slate-800">Termos de Uso e Política de Privacidade</h1>
                    </div>

                    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg ring-1 ring-gray-100 space-y-6">
                        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2"><FaInfoCircle /> Introdução</h2>
                        <p className="text-slate-600">
                            Bem-vindo ao Rotavan. Ao acessar ou usar nossos serviços, você concorda em cumprir estes Termos de Uso. Por favor, leia-os atentamente.
                        </p>

                        <h3 className="text-xl font-semibold text-slate-700">1. Aceitação dos Termos</h3>
                        <p className="text-slate-600">
                            Estes Termos se aplicam a todos os usuários e outros que acessam ou usam o Serviço. Se você discordar de qualquer parte dos termos, não deverá acessar o Serviço.
                        </p>

                        <h3 className="text-xl font-semibold text-slate-700">2. Serviços</h3>
                        <p className="text-slate-600">
                            O Rotavan fornece uma plataforma para gestão de rotas escolares, conectando responsáveis, motoristas e escolas. Os serviços incluem rastreamento, notificações e comunicação.
                        </p>

                        <h3 className="text-xl font-semibold text-slate-700">3. Política de Privacidade</h3>
                        <p className="text-slate-600">
                            Sua privacidade é importante para nós. Nossa Política de Privacidade detalha como coletamos, usamos e protegemos suas informações pessoais. Ao usar o Rotavan, você consente com o processamento de suas informações conforme descrito nesta política.
                        </p>
                        
                        <div className="pt-4 border-t border-gray-100">
                            <p className="text-sm text-gray-500">Última atualização: 30 de Outubro de 2025.</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TermsOfUseScreen;