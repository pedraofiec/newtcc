// src/features/home/components/settings/EditProfileScreen.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaUser, FaSave } from "react-icons/fa";

const EditProfileScreen = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("João");
  const [email, setEmail] = useState("joao@gmail.com");
  const [phone, setPhone] = useState("(11) 98765-4321");
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
      setLoading(false);
      setSuccess(true);
    }, 1000);
  };

  return (
    <div className="w-full flex flex-col items-center font-sans">
      <div className="w-full max-w-3xl mt-6 px-4 md:px-0">
        {/* topo – link de voltar + título */}
        <button
                onClick={() => navigate('/home')}
                className="flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium"
              >
                <FaChevronLeft className="mr-2" /> Voltar a Página Inicial
              </button>

        <div className="flex items-center gap-2 mb-1">
          <FaUser className="text-2xl text-[#8AD7E1]" />
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-800">
            Editar Perfil
          </h1>
        </div>
        <p className="text-sm text-slate-500 mb-4">
          Atualize seus dados pessoais e de contato utilizados na plataforma.
        </p>
        <hr className="border-slate-200 mb-5" />

        {/* card do formulário */}
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

            <button
              type="submit"
              disabled={loading}
              className={`mt-2 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-sm font-semibold text-white shadow-md transition ${
                loading
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-[#8AD7E1] hover:bg-[#7bc8d2]"
              }`}
            >
              <FaSave />
              {loading ? "Salvando..." : "Salvar alterações"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileScreen;
