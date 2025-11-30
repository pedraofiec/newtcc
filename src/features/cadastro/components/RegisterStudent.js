// src/features/cadastro/components/RegisterStudent.jsx
import React, { useEffect } from 'react';
import { FaUser, FaPlus } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { createDependente } from '../../responsavel/services/ResponsavelService';
import './Register.css';
import { listarEscolas } from '../../escola/service/EscolaService';

const RegisterStudent = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = React.useState('');
  const [cpf, setCpf] = React.useState('');
  const [dob, setDob] = React.useState('');
  const [nivelEscolar, setNivelEscolar] = React.useState('');
  const [school, setSchool] = React.useState('');
  const [schools, setSchools] = React.useState([]);

  useEffect(() => {
    listarEscolas().then(setSchools).catch(console.log)
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();


    const dependente = {
      nome: fullName,
      cpf: cpf,
      dataNascimento: dob,
      nivelEscolar: nivelEscolar,
      escolaId: school
    };

    try {
      await createDependente(dependente);

      alert("Dependente cadastrado com sucesso!");

      // 🔥 Redireciona para lista de dependentes
      navigate("/home");

    } catch (error) {
      console.error("Erro ao cadastrar dependente:", error);
      alert("Erro ao cadastrar dependente.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#8AD7E1] p-4 relative overflow-hidden">
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-2xl mt-16 form-container is-visible">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">CADASTRO DE ALUNO</h2>

        <div className="relative mb-6">
          <FaUser className="text-8xl text-gray-800" />
          <FaPlus className="absolute bottom-0 right-0 text-3xl text-gray-600 bg-white border-2 border-white rounded-full" />
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Nome completo"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 bg-gray-200 placeholder-gray-500"
          />

          <input
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 bg-gray-200 placeholder-gray-500"
          />

          <input
            type="date"
            placeholder="Data de nascimento"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 bg-gray-200 text-gray-500"
          />
          <input
            type="text"
            placeholder="Ano escolar"
            value={nivelEscolar}
            onChange={(e) => setNivelEscolar(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300 bg-gray-200 placeholder-gray-500"
          />
          <select
            className="w-full p-3 mb-6 border rounded-lg shadow-sm bg-teal-500 text-white text-lg font-semibold"
            value={school}
            onChange={e => setSchool(e.target.value)}
          >
            <option key={""} value={""} >Escolha a Escola</option>
            {schools.map(s => (

              <option key={s.id} value={s.id} >{s.nome}</option>
            ))}
          </select>


          <button onClick={handleSubmit}
            type="submit"
            className="w-full py-3 mt-4 text-lg font-semibold text-white bg-[#4DD0E1] rounded-full shadow-md hover:bg-[#34A4B5]"
          >
            Criar dependente
          </button>

        </form>
      </div>
    </div>
  );
};

export default RegisterStudent;
