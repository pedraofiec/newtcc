import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaUserCircle, FaEdit, FaSave } from "react-icons/fa";

export default function StudentProfileScreen() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Dados atuais do dependente (mock – depois vem da API)
  const [aluno, setAluno] = useState({
    id,
    nome: "Nome do Estudante",
    idade: "10 anos",
    nivel: "5º ano",
    escola: "EMEB Profª Francisca Lucinda Bueno",
    endereco: "Rua das Flores, 123 - Jardim Primavera, Indaiatuba",
    observacoes: "Nenhuma observação registrada.",
  });

  // Estado de edição
  const [isEditing, setIsEditing] = useState(false);

  // Form editável
  const [nome, setNome] = useState(aluno.nome);
  const [idade, setIdade] = useState(aluno.idade);
  const [nivel, setNivel] = useState(aluno.nivel);
  const [escola, setEscola] = useState(aluno.escola);
  const [endereco, setEndereco] = useState(aluno.endereco);
  const [observacoes, setObservacoes] = useState(aluno.observacoes);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const salvarAlteracoes = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setAluno({
        id,
        nome,
        idade,
        nivel,
        escola,
        endereco,
        observacoes,
      });
      setLoading(false);
      setSuccess(true);
      setIsEditing(false);
    }, 800);
  };

  const cancelarEdicao = () => {
    setNome(aluno.nome);
    setIdade(aluno.idade);
    setNivel(aluno.nivel);
    setEscola(aluno.escola);
    setEndereco(aluno.endereco);
    setObservacoes(aluno.observacoes);
    setIsEditing(false);
  };

  return (
    <div className="w-full min-h-full px-6 py-6 flex flex-col">

      {/* Botão voltar */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 w-fit bg-white px-4 py-2 rounded-full shadow border hover:bg-slate-50 mb-6"
      >
        <FaArrowLeft className="text-slate-600" />
        <span className="text-slate-600 text-sm">Voltar</span>
      </button>

      {/* Título */}
      <div className="flex justify-center mb-10">
        <div className="bg-[#73C8D5] px-10 py-3 rounded-full text-white shadow text-lg font-semibold tracking-wide">
          PERFIL DO DEPENDENTE
        </div>
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8 border border-slate-100">

        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-28 h-28 rounded-full bg-[#73C8D5] flex items-center justify-center shadow mb-3">
            <FaUserCircle className="text-white text-6xl" />
          </div>

          <h2 className="text-2xl font-semibold text-slate-700">
            {aluno.nome}
          </h2>
          <p className="text-sm text-slate-500 mt-1">ID: {id}</p>
        </div>

        {success && (
          <div className="p-3 mb-4 text-green-700 bg-green-100 rounded-lg text-sm">
            Alterações salvas com sucesso!
          </div>
        )}

        {/* ======================= VISUALIZAÇÃO ======================== */}
        {!isEditing && (
          <div className="space-y-6 text-sm text-slate-700">
            <Info label="Idade" value={aluno.idade} />
            <Info label="Nível escolar" value={aluno.nivel} />
            <Info label="Escola" value={aluno.escola} />
            <Info label="Endereço" value={aluno.endereco} />
            <Info label="Observações" value={aluno.observacoes} />

            <button
              onClick={() => setIsEditing(true)}
              className="mt-6 w-full bg-[#73C8D5] text-white py-3 rounded-full shadow hover:bg-[#6abcca] flex items-center justify-center gap-2 text-sm font-semibold"
            >
              <FaEdit /> Editar perfil
            </button>
          </div>
        )}

        {/* ======================= EDIÇÃO ======================== */}
        {isEditing && (
          <form onSubmit={salvarAlteracoes} className="space-y-5 text-sm">

            <Edit label="Nome completo" value={nome} setValue={setNome} />
            <Edit label="Idade" value={idade} setValue={setIdade} />
            <Edit label="Nível escolar" value={nivel} setValue={setNivel} />
            <Edit label="Escola" value={escola} setValue={setEscola} />
            <Edit label="Endereço" value={endereco} setValue={setEndereco} />
            <Edit label="Observações" value={observacoes} setValue={setObservacoes} />

            <div className="flex flex-col md:flex-row md:justify-end gap-3 mt-4">

              <button
                type="button"
                onClick={cancelarEdicao}
                className="w-full md:w-auto px-5 py-2.5 rounded-full border border-slate-300 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={loading}
                className={`w-full md:w-auto flex items-center justify-center gap-2 py-2.5 px-5 rounded-full text-sm font-semibold text-white shadow-md transition ${
                  loading
                    ? "bg-slate-400 cursor-not-allowed"
                    : "bg-[#73C8D5] hover:bg-[#6abcca]"
                }`}
              >
                <FaSave />
                {loading ? "Salvando..." : "Salvar alterações"}
              </button>

            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <span className="text-[11px] text-slate-400 uppercase font-semibold tracking-wide">
        {label}
      </span>
      <div className="w-full bg-slate-100 py-3 px-4 rounded-xl border border-slate-200 mt-1">
        {value}
      </div>
    </div>
  );
}

function Edit({ label, value, setValue }) {
  return (
    <div>
      <label className="text-[11px] text-slate-400 uppercase font-semibold tracking-wide mb-1 block">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full bg-white py-3 px-4 rounded-xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-[#73C8D5] focus:border-[#73C8D5] outline-none"
      />
    </div>
  );
}
