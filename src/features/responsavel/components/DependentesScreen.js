import React, {useState, useEffect} from "react";
import { FaUserCircle, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getDependentes } from "../services/ResponsavelService";

export default function DependentesScreen() {
  const navigate = useNavigate();

   const [dependentes, setDependentes] = useState([]);
  const [loading, setLoading] = useState(true);

  const calculateAge = (birthdate) => {
    console.log(birthdate)
    if (!birthdate) {
      return 0;
    }

    const today = new Date();
    const birthdateDate = new Date(birthdate); // Converte a string de data (YYYY-MM-DD) para objeto Date.

    let calculatedAge = today.getFullYear() - birthdateDate.getFullYear();
    const monthDiff = today.getMonth() - birthdateDate.getMonth();

    // Ajusta a idade se o aniversário ainda não ocorreu este ano
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdateDate.getDate())) {
      calculatedAge--;
    }

    return calculatedAge
  };

  useEffect(() => {
    async function carregarDependentes() {
      try {
        const data = await getDependentes(); // chamada ao service
        setDependentes(data);
      } catch (error) {
        console.error("Erro ao carregar dependentes:", error);

      
      } finally {
        setLoading(false);
      }
    }

    carregarDependentes();
  }, []);



  return (
    <div className="w-full min-h-full px-6 py-6 flex flex-col">

      {/* Título */}
      <div className="flex justify-center mb-10">
        <div className="bg-[#73C8D5] px-10 py-3 rounded-full text-white shadow-md text-lg font-semibold tracking-wide">
          DEPENDENTES
        </div>
      </div>

      {/* Botão adicionar */}
      <div className="flex justify-end mb-8">
        <button
          onClick={() => navigate("/register/student")}
          className="flex items-center gap-2 bg-[#73C8D5] text-white px-5 py-2 rounded-full shadow hover:bg-[#6abcca] transition"
        >
          <FaPlus size={14} /> Cadastrar dependente
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {dependentes.map((dep) => (
          <div
            key={dep.id}
            className="bg-white rounded-3xl shadow-xl p-6 border border-slate-200 flex flex-col items-center"
          >
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-[#73C8D5] flex items-center justify-center shadow mb-4">
              <FaUserCircle className="text-white text-5xl" />
            </div>

            {/* Nome */}
            <h3 className="text-xl font-semibold text-slate-700">{dep.nome}</h3>

            <div className="w-full mt-4 space-y-2 text-sm text-slate-600">

              <Field label="Idade" value={calculateAge(dep.dataNascimento) + " anos"} />
              <Field label="Nível escolar" value={dep.nivelEscolar} />
              <Field label="Escola" value={dep.escola.nome} />

            </div>

            <button
              onClick={() => navigate(`/students/${dep.id}`)}
              className="mt-6 w-full bg-[#73C8D5] text-white py-2 rounded-full shadow hover:bg-[#6abcca]"
            >
              Editar perfil
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-[11px] text-slate-400 uppercase font-semibold tracking-wide">
        {label}
      </span>
      <div className="w-full bg-slate-100 py-2 px-3 rounded-xl border border-slate-200 text-sm">
        {value}
      </div>
    </div>
  );
}
