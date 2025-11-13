import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaUserPlus, FaUserMinus, FaRoute } from 'react-icons/fa';

const StudentAssignmentScreen = () => {
  const navigate = useNavigate();
  // Simulação de alunos atualmente na rota
  const [studentsOnRoute, setStudentsOnRoute] = React.useState([
    { id: 1, name: 'João da Silva', school: 'Escola A', address: 'Rua A, 123' },
    { id: 2, name: 'Maria Souza', school: 'Escola B', address: 'Av. B, 456' },
    { id: 3, name: 'Pedro Santos', school: 'Escola A', address: 'Rua C, 789' },
  ]);
  // Simulação de todos os alunos disponíveis
  const [availableStudents] = React.useState([
    { id: 4, name: 'Ana Oliveira', school: 'Escola C', address: 'Rua D, 10' },
    { id: 5, name: 'Lucas Costa', school: 'Escola A', address: 'Av. E, 20' },
  ]);

  const handleRemoveStudent = (id) => {
    setStudentsOnRoute(prev => prev.filter(s => s.id !== id));
    alert(`Aluno #${id} removido da rota.`);
  };

  const handleAddStudent = (student) => {
    setStudentsOnRoute(prev => [...prev, student]);
    alert(`Aluno ${student.name} adicionado à rota.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
      {/* Botão de Voltar */}
      <button
        onClick={() => navigate('/home')}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium"
      >
        <FaChevronLeft className="mr-2" /> Voltar a Página Inicial
      </button>

      <h1 className="text-3xl font-bold text-gray-800 flex items-center mb-8 border-b pb-4">
        <FaRoute className="mr-3 text-purple-600" /> Gerenciamento de Alunos na Rota
      </h1>

      {/* Lista de Alunos Atuais na Rota */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
          <FaUserMinus className="mr-2 text-red-500" /> Alunos Atuais na Rota ({studentsOnRoute.length})
        </h2>
        <ul className="space-y-3">
          {studentsOnRoute.map((student) => (
            <li key={student.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg shadow-sm border-l-4 border-red-500">
              <div>
                <p className="font-medium text-gray-800">{student.name}</p>
                <p className="text-xs text-gray-500">{student.school} | {student.address}</p>
              </div>
              <button
                onClick={() => handleRemoveStudent(student.id)}
                className="text-red-600 hover:text-red-800 text-sm font-medium transition duration-200 px-3 py-1 rounded-full border border-red-600 hover:bg-red-100"
                aria-label={`Remover ${student.name} da rota`}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Lista de Alunos Disponíveis para Adicionar */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
          <FaUserPlus className="mr-2 text-green-500" /> Alunos Disponíveis para Adicionar ({availableStudents.length})
        </h2>
        <ul className="space-y-3">
          {availableStudents.map((student) => (
            <li key={student.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg shadow-sm border-l-4 border-green-500">
              <div>
                <p className="font-medium text-gray-800">{student.name}</p>
                <p className="text-xs text-gray-500">{student.school} | {student.address}</p>
              </div>
              <button
                onClick={() => handleAddStudent(student)}
                className="text-green-600 hover:text-green-800 text-sm font-medium transition duration-200 px-3 py-1 rounded-full border border-green-600 hover:bg-green-100"
                aria-label={`Adicionar ${student.name} à rota`}
              >
                Adicionar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentAssignmentScreen;