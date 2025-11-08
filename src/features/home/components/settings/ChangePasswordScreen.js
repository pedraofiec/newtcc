// src/features/security/ChangePasswordScreen.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaLock, FaSave } from 'react-icons/fa';

// Importe o Header e SideBar do seu projeto (assumindo que estão acessíveis)
// IMPORTANTE: Ajuste este caminho se for diferente
import { Header, SideBar } from '../layout/LayoutComponents';

const ChangePasswordScreen = () => {
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        if (newPassword !== confirmPassword) {
            setError('A nova senha e a confirmação não coincidem.');
            return;
        }

        if (newPassword.length < 6) { // Exemplo de validação
            setError('A nova senha deve ter pelo menos 6 caracteres.');
            return;
        }

        setLoading(true);

        // 💡 Lógica de API: Aqui você chamaria um SecurityService.changePassword({ currentPassword, newPassword })
        setTimeout(() => {
            setLoading(false);
            if (currentPassword === '123456') { // Simulação de senha atual correta
                setSuccess(true);
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                setError('A senha atual está incorreta.');
            }
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
                        <h1 className="text-3xl font-bold text-slate-800">Alterar Senha</h1>
                    </div>

                    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg ring-1 ring-gray-100">
                        <h2 className="text-xl font-semibold text-slate-700 mb-6 flex items-center gap-2"><FaLock /> Segurança</h2>
                        
                        {error && <div className="p-3 mb-4 text-red-700 bg-red-100 rounded">Erro: {error}</div>}
                        {success && <div className="p-3 mb-4 text-green-700 bg-green-100 rounded">Senha alterada com sucesso!</div>}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">Senha Atual</label>
                                <input
                                    id="current-password"
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#8AD7E1] focus:border-[#8AD7E1]"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">Nova Senha</label>
                                <input
                                    id="new-password"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#8AD7E1] focus:border-[#8AD7E1]"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirmar Nova Senha</label>
                                <input
                                    id="confirm-password"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#8AD7E1] focus:border-[#8AD7E1]"
                                    required
                                />
                            </div>
                            
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full flex items-center justify-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition duration-150 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#8AD7E1] hover:bg-[#7bc8d2]'}`}
                            >
                                <FaSave />
                                {loading ? 'Atualizando...' : 'Alterar Senha'}
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ChangePasswordScreen;