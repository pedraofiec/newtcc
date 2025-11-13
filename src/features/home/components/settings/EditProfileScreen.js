// src/features/home/components/settings/EditProfileScreen.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaUser, FaSave, FaEdit } from "react-icons/fa";

const EditProfileScreen = () => {
  const navigate = useNavigate();

  // Dados salvos do perfil (mock – depois pode vir do backend / store)
  const [profile, setProfile] = useState({
    name: "João da Silva",
    email: "joao@gmail.com",
    phone: "(11) 98765-4321",
    role: "Motorista",
  });

  // Estado do modo (visualização x edição)
  const [isEditing, setIsEditing] = useState(false);

  // Estado do formulário de edição (inicia com os dados do perfil)
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // aqui entraria chamada real de API
    setTimeout(() => {
      // Atualiza o "perfil salvo" com os dados do formulário
      setProfile({
        ...profile,
        name,
        email,
        phone,
      });
      setLoading(false);
      setSuccess(true);
      setIsEditing(false);
    }, 1000);
  };

  const handleCancelEdit = () => {
    // Volta o formulário para os valores do perfil salvo
    setName(profile.name);
    setEmail(profile.email);
    setPhone(profile.phone);
    setIsEditing(false);
    setError(null);
  };

  return (
    <div className="w-full flex flex-col items-center font-sans">
      <div className="w-full max-w-3xl mt-6 px-4 md:px-0">
        {/* topo – link de voltar + título */}
        <button
          onClick={() => navigate("/home")}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium"
        >
          <FaChevronLeft className="mr-2" /> Voltar a Página Inicial
        </button>

        <div className="flex items-center gap-2 mb-1">
          <FaUser className="text-2xl text-[#8AD7E1]" />
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-800">
            {isEditing ? "Editar Perfil" : "Meu Perfil"}
          </h1>
        </div>
        <p className="text-sm text-slate-500 mb-4">
          {isEditing
            ? "Atualize seus dados pessoais e de contato utilizados na plataforma."
            : "Veja suas informações cadastradas na plataforma."}
        </p>
        <hr className="border-slate-200 mb-5" />

        {/* card principal */}
        <div className="bg-white rounded-3xl shadow-md p-5 md:p-7">
          {error && (
            <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
              Erro ao salvar: {error}
            </div>
          )}
          {success && (
            <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">
              Perfil atualizado com sucesso!
            </div>
          )}

          {/* ===================== MODO VISUALIZAÇÃO ===================== */}
          {!isEditing && (
            <div className="flex flex-col items-center gap-6">
              {/* Avatar + nome */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-20 h-20 rounded-full bg-sky-100 flex items-center justify-center">
                  <span className="text-3xl text-sky-700">👤</span>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-800">
                    {profile.name}
                  </p>
                  <p className="text-sm text-gray-500">{profile.role}</p>
                </div>
              </div>

              {/* Informações em cards */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-600 mb-1">
                    Nome completo
                  </span>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800">
                    {profile.name}
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-600 mb-1">
                    E-mail
                  </span>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 break-all">
                    {profile.email}
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-600 mb-1">
                    Telefone
                  </span>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800">
                    {profile.phone}
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-600 mb-1">
                    Tipo de conta
                  </span>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800">
                    {profile.role}
                  </div>
                </div>
              </div>

              {/* Botão Editar perfil */}
              <button
                onClick={() => {
                  setIsEditing(true);
                  setSuccess(false);
                }}
                className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#8AD7E1] text-sm font-semibold text-white hover:bg-[#7bc8d2] transition"
              >
                <FaEdit /> Editar perfil
              </button>
            </div>
          )}

          {/* ===================== MODO EDIÇÃO ===================== */}
          {isEditing && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-semibold text-slate-600 mb-1"
                >
                  Nome completo
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full border border-slate-200 rounded-lg px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#8AD7E1] focus:border-[#8AD7E1] outline-none"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold text-slate-600 mb-1"
                >
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full border border-slate-200 rounded-lg px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#8AD7E1] focus:border-[#8AD7E1] outline-none"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs font-semibold text-slate-600 mb-1"
                >
                  Telefone
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 block w-full border border-slate-200 rounded-lg px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#8AD7E1] focus:border-[#8AD7E1] outline-none"
                />
              </div>

              <div className="mt-2 flex flex-col-reverse md:flex-row md:justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  disabled={loading}
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
                      : "bg-[#8AD7E1] hover:bg-[#7bc8d2]"
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
    </div>
  );
};

export default EditProfileScreen;
