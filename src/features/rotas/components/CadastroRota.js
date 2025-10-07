import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header'; // Assumindo que você tem um Header reutilizável
import SideBar from '../../../components/SideBar'; // Assumindo que você tem uma SideBar reutilizável

const CadastroRota = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [motorista, setMotorista] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [dependenteIds, setDependenteIds] = useState([]); // Lista de IDs de dependentes

  const navigate = useNavigate();
  const [openNav, setOpenNav] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar os dados da nova rota para a API
    console.log({ nome, descricao, motorista, capacidade, dependenteIds });
    
    // Simulação de sucesso
    alert('Rota cadastrada com sucesso!');
    navigate('/rotas'); // Redireciona para a lista de rotas
  };

  // Funções de mock para Motoristas e Dependentes (substituir por dados reais da API)
  const motoristasMock = [
    { id: 1, nome: 'João da Silva' },
    { id: 2, nome: 'Maria Oliveira' }
  ];
  const dependentesMock = [
    { id: 101, nome: 'Lucas F.' },
    { id: 102, nome: 'Julia M.' },
    { id: 103, nome: 'Pedro A.' }
  ];

  const handleToggleDependente = (id) => {
    setDependenteIds(prev =>
      prev.includes(id) ? prev.filter(depId => depId !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header />
      <div className="flex min-h-screen">
        <SideBar openNav={openNav} setOpenNav={setOpenNav} />
        <main className="flex-1 px-4 pb-16 pt-6 md:px-8 bg-slate-50 ml-60">
          
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Novo Cadastro de Rota</h2>

          <div className="bg-white p-8 rounded-xl shadow-lg max-w-3xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Informações Básicas da Rota */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">Nome da Rota</label>
                  <input
                    id="nome"
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="capacidade" className="block text-sm font-medium text-gray-700 mb-1">Capacidade de Alunos</label>
                  <input
                    id="capacidade"
                    type="number"
                    value={capacidade}
                    onChange={(e) => setCapacidade(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Descrição */}
              <div>
                <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">Descrição (Opcional)</label>
                <textarea
                  id="descricao"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Motorista Responsável */}
              <div>
                <label htmlFor="motorista" className="block text-sm font-medium text-gray-700 mb-1">Motorista Responsável</label>
                <select
                  id="motorista"
                  value={motorista}
                  onChange={(e) => setMotorista(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  required
                >
                  <option value="">Selecione um Motorista</option>
                  {motoristasMock.map(m => (
                    <option key={m.id} value={m.id}>{m.nome}</option>
                  ))}
                </select>
              </div>

              {/* Seleção de Dependentes (Lista) */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Dependentes na Rota ({dependenteIds.length})</h3>
                <div className="grid grid-cols-2 gap-4 max-h-40 overflow-y-auto p-3 border border-gray-200 rounded-lg">
                  {dependentesMock.map(dep => (
                    <div
                      key={dep.id}
                      className={`p-2 rounded-md cursor-pointer transition duration-150 ease-in-out ${
                        dependenteIds.includes(dep.id)
                          ? 'bg-cyan-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => handleToggleDependente(dep.id)}
                    >
                      {dep.nome}
                    </div>
                  ))}
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => navigate('/rotas')}
                  className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition duration-150"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-slate-800 text-white rounded-full font-semibold shadow-md hover:bg-slate-700 transition duration-150"
                >
                  Salvar Rota
                </button>
              </div>

            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CadastroRota;