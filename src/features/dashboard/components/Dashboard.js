// src/features/dashboard/components/Dashboard.jsx (NOVA TELA)
import React from 'react';
import { FaMapMarkedAlt, FaCar, FaUsers, FaUserCircle } from 'react-icons/fa';
// Importe os componentes Header e SideBar do seu HomeScreen (ou crie um arquivo base para eles)
// Para este exemplo, vou assumir que você os copiou do HomeScreen.js ou os criou em um arquivo separado.

// IMPORTANTE: Se você já extraiu Header e SideBar para outro arquivo, ajuste o caminho aqui.
import { Header, SideBar } from '../../home/components/HomeScreen'; 
// OBS: Você deve extrair Header e SideBar para um componente reusável (ex: src/components/Layout.jsx) 
// para evitar repetição, mas aqui estou importando da HomeScreen para simplificar.

// Card de Métrica
const MetricCard = ({ title, value, icon: Icon, bgColor, textColor }) => (
    <div className={`p-6 rounded-2xl shadow-xl transition duration-300 hover:shadow-2xl hover:scale-[1.02] ${bgColor}`}>
        <div className="flex items-center justify-between">
            <div className={`flex h-12 w-12 items-center justify-center rounded-full ${textColor} bg-white/30`}>
                <Icon className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium text-white/90">Total de {title}</span>
        </div>
        <p className="mt-4 text-4xl font-extrabold text-white">{value}</p>
        <p className="mt-1 text-sm text-white/80">Monitoramento ativo</p>
    </div>
);


const Dashboard = () => {
  const [openNav, setOpenNav] = React.useState(false);
  
  // Dados Mock para o Dashboard (Substituir por dados reais da API)
  const metrics = [
    { title: "Rotas", value: 5, icon: FaMapMarkedAlt, bgColor: 'bg-indigo-600', textColor: 'text-indigo-600' },
    { title: "Motoristas", value: 12, icon: FaCar, bgColor: 'bg-[#8AD7E1]', textColor: 'text-[#8AD7E1]' },
    { title: "Dependentes", value: 45, icon: FaUsers, bgColor: 'bg-green-600', textColor: 'text-green-600' },
    { title: "Responsáveis", value: 32, icon: FaUserCircle, bgColor: 'bg-yellow-600', textColor: 'text-yellow-600' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header />
      <div className="flex min-h-screen">
        <SideBar openNav={openNav} setOpenNav={setOpenNav} />
        <main className="flex-1 px-4 pb-16 pt-6 md:px-8 bg-slate-50 lg:ml-60">
          <h1 className="text-3xl font-bold text-slate-800 mb-8 border-b pb-4 border-gray-200">Dashboard de Gerenciamento</h1>

          {/* Cartões de Métricas */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
            {metrics.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </div>

          {/* Seção de Rotas Ativas (Exemplo de Tabela) */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-slate-800">Rotas em Andamento</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rota</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Motorista</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alunos</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-800">Rota Centro/Norte</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">João Silva</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">15 / 20</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Em Viagem
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-800">Rota Leste/Sul</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Maria Oliveira</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">8 / 15</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                    Pendente
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </div>

          {/* Outros gráficos/widgets aqui... */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;