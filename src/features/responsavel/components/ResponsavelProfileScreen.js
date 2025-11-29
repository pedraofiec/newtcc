import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaUser, FaSave, FaEdit } from "react-icons/fa";

import {
  getResponsavel,
  updateResponsavel,
  getDependentes,
} from "../services/ResponsavelService"; // ajuste o caminho se precisar

const ResponsavelProfileScreen = () => {
  const navigate = useNavigate();

  // Perfil completo vindo da API
  const [profile, setProfile] = useState(null);

  // Campos editáveis
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [endereco, setEndereco] = useState("");
  const [dependentes, setDependentes] = useState(0); // apenas exibição (quantidade)

  // Estados de controle
  const [isEditing, setIsEditing] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingSave, setLoadingSave] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Carregar dados do responsável e dos dependentes ao montar
  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoadingProfile(true);
        setErrorMsg(null);

        const [respData, depsData] = await Promise.all([
          getResponsavel(),
          getDependentes().catch(() => null), // se der erro aqui, ainda usamos as crianças do respData
        ]);

        // Quantidade de dependentes: prefere endpoint específico, senão usa criancas do responsavel
        const dependentesQtd = Array.isArray(depsData)
          ? depsData.length
          : Array.isArray(respData.criancas)
          ? respData.criancas.length
          : 0;

        // Mapeia campos do Swagger para o modelo usado na tela
        const perfil = {
          id: respData.id,
          nome: respData.nomeResponsavel || "",
          cpf: respData.cpfResponsavel || "",
          endereco: respData.enderecoCasa || "",
          email:
            respData.emailResponsavel ||
            respData.email ||
            "",
          telefone:
            respData.telefoneResponsavel ||
            respData.telefone ||
            "",
          dependentes: dependentesQtd,
          role: "Responsável",
        };

        setProfile(perfil);

        // Preenche campos de edição
        setNome(perfil.nome);
        setEmail(perfil.email);
        setTelefone(perfil.telefone);
        setCpf(perfil.cpf);
        setEndereco(perfil.endereco);
        setDependentes(perfil.dependentes);
      } catch (error) {
        console.error(error);
        setErrorMsg("Não foi possível carregar seus dados. Tente novamente.");
      } finally {
        setLoadingProfile(false);
      }
    };

    carregarDados();
  }, []);

  const salvar = async (e) => {
    e.preventDefault();

    setLoadingSave(true);
    setSuccess(false);
    setErrorMsg(null);

    try {
      // Payload alinhado com o DTO do backend (nomes do Swagger)
      const payload = {
        nomeResponsavel: nome,
        cpfResponsavel: cpf,
        enderecoCasa: endereco,
        emailResponsavel: email,
        telefoneResponsavel: telefone,
      };

      const updated = await updateResponsavel(payload);

      // Atualiza estado do profile com o retorno (fallback nos valores do formulário)
      const perfilAtualizado = {
        id: updated?.id ?? profile?.id,
        nome: updated?.nomeResponsavel ?? nome,
        cpf: updated?.cpfResponsavel ?? cpf,
        endereco: updated?.enderecoCasa ?? endereco,
        email: updated?.emailResponsavel ?? email,
        telefone: updated?.telefoneResponsavel ?? telefone,
        dependentes, // quantidade continua igual; gestão é em outra tela
        role: "Responsável",
      };

      setProfile(perfilAtualizado);
      setSuccess(true);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      setErrorMsg("Erro ao salvar alterações. Tente novamente.");
    } finally {
      setLoadingSave(false);
    }
  };

  const cancelar = () => {
    if (profile) {
      setNome(profile.nome);
      setEmail(profile.email);
      setTelefone(profile.telefone);
      setCpf(profile.cpf);
      setEndereco(profile.endereco);
      setDependentes(profile.dependentes);
    }
    setIsEditing(false);
    setErrorMsg(null);
  };

  return (
    <div className="w-full flex flex-col items-center font-sans">
      <div className="w-full max-w-3xl mt-6 px-4 md:px-0">
        {/* Voltar */}
        <button
          onClick={() => navigate("/home")}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium"
        >
          <FaChevronLeft className="mr-2" /> Voltar ao Painel
        </button>

        {/* Header da página */}
        <div className="flex items-center gap-2 mb-1">
          <FaUser className="text-2xl text-[#8AD7E1]" />
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-800">
            {isEditing ? "Editar Perfil do Responsável" : "Meu Perfil de Responsável"}
          </h1>
        </div>

        <p className="text-sm text-slate-500 mb-4">
          {isEditing
            ? "Atualize suas informações pessoais."
            : "Veja suas informações cadastradas na plataforma."}
        </p>

        <hr className="border-slate-200 mb-5" />

        {/* Card principal */}
        <div className="bg-white rounded-3xl shadow-md p-5 md:p-7">
          {loadingProfile && (
            <div className="text-sm text-slate-600 mb-3">
              Carregando suas informações...
            </div>
          )}

          {errorMsg && (
            <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
              {errorMsg}
            </div>
          )}

          {success && !loadingProfile && (
            <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">
              Perfil atualizado com sucesso!
            </div>
          )}

          {/* =================== VISUALIZAÇÃO =================== */}
          {!isEditing && profile && (
            <div className="flex flex-col items-center gap-6">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-sky-100 flex items-center justify-center">
                <span className="text-3xl text-sky-700">👩‍👧</span>
              </div>

              {/* Nome e role */}
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-800">{profile.nome}</p>
                <p className="text-sm text-gray-500">{profile.role}</p>
              </div>

              {/* Cards dos dados */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Nome Completo" value={profile.nome} />
                <Field label="E-mail" value={profile.email || "-"} />
                <Field label="Telefone" value={profile.telefone || "-"} />
                <Field label="CPF" value={profile.cpf} />
                <Field
                  label="Dependentes cadastrados"
                  value={profile.dependentes}
                />
                <Field label="Endereço" value={profile.endereco} full />
              </div>

              {/* Botão Editar */}
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#8AD7E1] text-sm font-semibold text-white hover:bg-[#7bc8d2] transition"
                disabled={loadingProfile}
              >
                <FaEdit /> Editar perfil
              </button>
            </div>
          )}

          {/* =================== EDIÇÃO =================== */}
          {isEditing && (
            <form onSubmit={salvar} className="space-y-4">
              <Input label="Nome completo" value={nome} setter={setNome} />
              <Input label="E-mail" type="email" value={email} setter={setEmail} />
              <Input label="Telefone" value={telefone} setter={setTelefone} />
              <Input label="CPF" value={cpf} setter={setCpf} />
              <Input label="Endereço da casa" value={endereco} setter={setEndereco} />

              {/* Dependentes: só leitura, baseado no back */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Dependentes cadastrados (somente leitura)
                </label>
                <input
                  type="number"
                  value={dependentes}
                  readOnly
                  className="mt-1 block w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50 text-slate-800"
                />
              </div>

              {/* Botões */}
              <div className="flex flex-col-reverse md:flex-row md:justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={cancelar}
                  className="w-full md:w-auto px-5 py-2.5 rounded-full border border-slate-300 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                  disabled={loadingSave}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={loadingSave}
                  className={`w-full md:w-auto flex items-center justify-center gap-2 py-2.5 px-5 rounded-full text-sm font-semibold text-white shadow-md transition ${
                    loadingSave
                      ? "bg-slate-400 cursor-not-allowed"
                      : "bg-[#8AD7E1] hover:bg-[#7bc8d2]"
                  }`}
                >
                  <FaSave />
                  {loadingSave ? "Salvando..." : "Salvar alterações"}
                </button>
              </div>
            </form>
          )}

          {/* Se não estiver carregando e não tiver profile (falha total) */}
          {!loadingProfile && !profile && !errorMsg && (
            <p className="text-sm text-slate-600">
              Nenhum dado de responsável encontrado.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// COMPONENTES REUTILIZADOS
function Field({ label, value, full }) {
  return (
    <div className={full ? "md:col-span-2 flex flex-col" : "flex flex-col"}>
      <span className="text-xs font-semibold text-slate-600 mb-1">{label}</span>
      <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800">
        {value}
      </div>
    </div>
  );
}

function Input({ label, value, setter, type = "text" }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => setter(e.target.value)}
        className="mt-1 block w-full border border-slate-200 rounded-lg px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#8AD7E1] focus:border-[#8AD7E1] outline-none"
      />
    </div>
  );
}

export default ResponsavelProfileScreen;
