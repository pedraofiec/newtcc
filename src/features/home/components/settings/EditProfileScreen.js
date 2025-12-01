// src/features/home/components/settings/EditProfileScreen.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaUser, FaSave, FaEdit } from "react-icons/fa";

import { getMe } from "../../../shared/utils/UserService";
import { listarMotoristas } from "../../../motorista/Services/MotoristaService.js";

const EditProfileScreen = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // campos editáveis
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // campos só exibição
  const [cnh, setCnh] = useState("");
  const [valCnh, setValCnh] = useState("");
  const [userId, setUserId] = useState("");

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // 🔹 carrega dados do usuário logado ao abrir a tela
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoadingProfile(true);
        setError(null);

        // 1) dados básicos a partir do token (getMe -> JWT decodificado)
        const me = await getMe();
        // me = { userId, nome, email, role, ... }

        // 2) busca todos os motoristas no backend
        const motoristas = await listarMotoristas();

        // 3) tenta achar o motorista correspondente ao usuário logado
        const motorista = motoristas.find((m) => {
          return m.userId === me.userId || m.email === me.email;
        });

        // 4) monta o perfil com o máximo de dados possível
        const perfil = {
          userId: me.userId,
          name:
            (motorista && (motorista.nomeMotorista || motorista.nome)) ||
            me.nome ||
            "",
          email: me.email || (motorista && motorista.email) || "",
          role: me.role || "MOTORISTA",
          cnh: (motorista && motorista.cnh) || "",
          valCnh: (motorista && motorista.valCnh) || "",
        };

        setProfile(perfil);
        setUserId(perfil.userId);
        setName(perfil.name);
        setEmail(perfil.email);
        setCnh(perfil.cnh);
        setValCnh(perfil.valCnh);
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar os dados do motorista.");
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, []);

  // 🔹 por enquanto NÃO existe PUT de motorista no back,
  // então só atualizamos o estado local e avisamos o usuário
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // atualiza apenas o state local (pra refletir na tela)
    const perfilAtualizado = {
      userId,
      name,
      email,
      cnh,
      valCnh,
      role: profile?.role || "MOTORISTA",
    };

    setProfile(perfilAtualizado);
    setSuccess(true);
    setLoading(false);
    setIsEditing(false);

    console.warn(
      "Ainda não existe endpoint de atualização de motorista no backend (PUT /motoristas)."
    );
  };

  const handleCancelEdit = () => {
    if (profile) {
      setName(profile.name);
      setEmail(profile.email);
      setCnh(profile.cnh);
      setValCnh(profile.valCnh);
      setUserId(profile.userId);
    }
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
            ? "Atualize seus dados pessoais utilizados na plataforma (apenas localmente, ainda sem salvar no servidor)."
            : "Veja suas informações cadastradas na plataforma."}
        </p>
        <hr className="border-slate-200 mb-5" />

        {/* card principal */}
        <div className="bg-white rounded-3xl shadow-md p-5 md:p-7">
          {loadingProfile && (
            <div className="text-sm text-slate-600 mb-3">
              Carregando dados do motorista...
            </div>
          )}

          {error && (
            <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">
              Perfil atualizado localmente!
              <br />
              (quando existir endpoint de atualização no back, vamos salvar lá
              também 😉)
            </div>
          )}

          {/* ===================== MODO VISUALIZAÇÃO ===================== */}
          {!isEditing && profile && !loadingProfile && (
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
                <InfoField label="Nome completo" value={profile.name} />
                <InfoField label="E-mail" value={profile.email} />
                <InfoField label="CNH" value={profile.cnh || "-"} />
                <InfoField
                  label="Validade da CNH"
                  value={profile.valCnh || "-"}
                />
              </div>

              {/* Botão Editar perfil */}
              <button
                onClick={() => {
                  setIsEditing(true);
                  setSuccess(false);
                }}
                className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#8AD7E1] text-sm font-semibold text-white hover:bg-[#7bc8d2] transition"
                disabled={loadingProfile}
              >
                <FaEdit /> Editar perfil
              </button>
            </div>
          )}

          {/* ===================== MODO EDIÇÃO ===================== */}
          {isEditing && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormInput
                id="name"
                label="Nome completo"
                type="text"
                value={name}
                onChange={setName}
                required
              />

              <FormInput
                id="email"
                label="E-mail"
                type="email"
                value={email}
                onChange={setEmail}
                required
              />

              {/* CNH e validade só leitura por enquanto */}
              <InfoField label="CNH (somente leitura)" value={cnh || "-"} />
              <InfoField
                label="Validade da CNH (somente leitura)"
                value={valCnh || "-"}
              />

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

          {!loadingProfile && !profile && !error && (
            <p className="text-sm text-slate-600">
              Nenhum dado de motorista encontrado.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// componentes auxiliares

function InfoField({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs font-semibold text-slate-600 mb-1">
        {label}
      </span>
      <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 break-all">
        {value}
      </div>
    </div>
  );
}

function FormInput({ id, label, type, value, onChange, required }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-semibold text-slate-600 mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="mt-1 block w-full border border-slate-200 rounded-lg px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#8AD7E1] focus:border-[#8AD7E1] outline-none"
      />
    </div>
  );
}

export default EditProfileScreen;
