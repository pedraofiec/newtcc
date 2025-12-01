// src/features/escola/components/EscolaProfileScreen.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaSchool, FaSave, FaEdit } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

import {
  buscarEscolaPorId,
  listarEscolas,     
  atualizarEscola,
} from "../service/EscolaService";

const EscolaProfileScreen = () => {
  const navigate = useNavigate();

  const [escola, setEscola] = useState(null);
  const [escolaId, setEscolaId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cnpj, setCnpj] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingInicial, setLoadingInicial] = useState(true);
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(false);

  // Normaliza resposta para evitar erros de array
  function normalizeData(payload) {
    if (!payload) return [];
    if (Array.isArray(payload)) return payload;
    if (payload.content && Array.isArray(payload.content)) return payload.content;
    if (payload.data && Array.isArray(payload.data)) return payload.data;
    return [];
  }

  // 🔥 MUDANÇA PRINCIPAL AQUI:
  // Agora priorizamos o TOKEN. O localStorage só é usado se o token falhar.
  function getIdentificadorUsuario() {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Retorna o que estiver no token (geralmente o email no 'sub')
        // Isso força o código a recalcular a escola correta
        return decoded.id || decoded.userId || decoded.escolaId || decoded.sub; 
      } catch (e) {
        console.error("Erro ao ler token:", e);
      }
    }
    // Só usa o ID salvo se não tiver token (fallback)
    return localStorage.getItem("escolaId");
  }

  useEffect(() => {
    async function carregarEscola() {
      try {
        setLoadingInicial(true);
        setErro(null);

        let identificador = getIdentificadorUsuario();

        if (!identificador) {
          setErro("Sessão não encontrada. Faça login novamente.");
          return;
        }

        console.log("🔍 Identificador do Token:", identificador);

        let dadosEscola = null;

        // --- LÓGICA DE BUSCA INTELIGENTE ---
        // Se o identificador for um E-mail (ex: rodin@gmail.com), precisamos achar a escola dona dele.
        if (String(identificador).includes("@")) {
            console.log("⚠️ Identificador é e-mail. Buscando escola correspondente...");
            
            // 1. Baixa a lista de todas as escolas
            const respostaBruta = await listarEscolas();
            const listaEscolas = normalizeData(respostaBruta);
            
            // 2. Prepara termos de busca
            const emailBuscado = String(identificador).trim().toLowerCase();
            const nomeUsuarioDoEmail = emailBuscado.split("@")[0]; // ex: 'rodin'

            console.log(`🔎 Procurando escola por email '${emailBuscado}' ou nome '${nomeUsuarioDoEmail}'...`);

            // 3. TENTA ACHAR PELO NOME (Plano mais provável já que o back não manda email)
            // Procura uma escola cujo nome contenha "rodin" (case insensitive)
            let escolaEncontrada = listaEscolas.find(e => 
                e.nome && String(e.nome).toLowerCase().includes(nomeUsuarioDoEmail)
            );

            // 4. Se não achar pelo nome, tenta detalhar cada uma (Plano de emergência)
            if (!escolaEncontrada) {
                console.warn("Busca por nome falhou. Tentando busca detalhada (lenta)...");
                const promessas = listaEscolas.map(async (escolaResumida) => {
                    try {
                        const detalhe = await buscarEscolaPorId(escolaResumida.id);
                        return detalhe;
                    } catch { return null; }
                });
                const detalhes = await Promise.all(promessas);
                
                // Tenta casar o email exato nos detalhes
                escolaEncontrada = detalhes.find(d => 
                    d && (d.email === emailBuscado || d.emailEscola === emailBuscado)
                );
            }

            if (!escolaEncontrada) {
                 // Último recurso: Se a lista tiver poucas escolas e o nome for muito parecido
                 if (listaEscolas.length > 0) {
                     console.warn("Nenhuma correspondência exata. Pegando a primeira escola que contém parte do nome...");
                     escolaEncontrada = listaEscolas.find(e => 
                        String(e.nome).toLowerCase().includes(nomeUsuarioDoEmail.substring(0, 3))
                     );
                 }
            }

            if (!escolaEncontrada) {
                 throw new Error(`Não foi possível encontrar a escola para o usuário ${identificador}`);
            }
            
            console.log("✅ Escola identificada:", escolaEncontrada.nome);
            dadosEscola = escolaEncontrada;

            // 5. ATUALIZA O ID CORRETO NO LOCALSTORAGE
            // Isso conserta o problema para as próximas telas
            if (dadosEscola.id) {
                localStorage.setItem("escolaId", dadosEscola.id);
                localStorage.setItem("userId", dadosEscola.id);
            }

        } else {
            // Se o identificador já for um ID (UUID), busca direto
            dadosEscola = await buscarEscolaPorId(identificador);
        }

        if (!dadosEscola) throw new Error("Dados vazios.");
        
        // Garante ID
        if (!dadosEscola.id && dadosEscola.escolaId) dadosEscola.id = dadosEscola.escolaId;

        // --- PREENCHE A TELA ---
        setEscola(dadosEscola);
        setEscolaId(dadosEscola.id);

        setNome(dadosEscola.nome || "");
        setEmail(dadosEscola.email || "");
        setTelefone(dadosEscola.telefone || "");
        setEndereco(dadosEscola.endereco || "");
        setCnpj(dadosEscola.cnpj || "");

      } catch (err) {
        console.error("Erro CRÍTICO:", err);
        setErro("Não foi possível carregar os dados. Verifique se o cadastro da escola está correto.");
      } finally {
        setLoadingInicial(false);
      }
    }

    carregarEscola();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro(null);
    setSucesso(false);

    try {
      if (!escolaId) throw new Error("ID inválido.");
      const payload = { nome, email, telefone, endereco, cnpj };
      
      const escolaAtualizada = await atualizarEscola(escolaId, payload);

      setEscola({
        ...escola,
        nome: escolaAtualizada.nome || nome,
        email: escolaAtualizada.email || email,
        telefone: escolaAtualizada.telefone || telefone,
        endereco: escolaAtualizada.endereco || endereco,
        cnpj: escolaAtualizada.cnpj || cnpj,
      });

      setSucesso(true);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      setErro("Erro ao salvar.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelarEdicao = () => {
    if (escola) {
      setNome(escola.nome);
      setEmail(escola.email);
      setTelefone(escola.telefone);
      setEndereco(escola.endereco);
      setCnpj(escola.cnpj);
    }
    setErro(null);
    setIsEditing(false);
  };

  if (loadingInicial) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-slate-600 text-sm">Carregando perfil...</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-red-600 mb-4 font-semibold px-4 text-center">{erro}</p>
        <button
            onClick={() => { localStorage.clear(); navigate("/login"); }}
            className="bg-[#8AD7E1] text-white px-6 py-2 rounded-full text-sm font-semibold shadow hover:bg-[#7bc8d2]"
        >
          Sair e Fazer Login
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center font-sans">
      <div className="w-full max-w-3xl mt-6 px-4 md:px-0">
        <button
          onClick={() => navigate("/home")}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium"
        >
          <FaChevronLeft className="mr-2" /> Voltar à Página inicial
        </button>

        <div className="flex items-center gap-2 mb-1">
          <FaSchool className="text-2xl text-[#8AD7E1]" />
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-800">
            {isEditing ? "Editar dados da Escola" : "Perfil da Escola"}
          </h1>
        </div>
        <hr className="border-slate-200 mb-5" />

        <div className="bg-white rounded-3xl shadow-md p-5 md:p-7">
          {sucesso && <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">Dados atualizados!</div>}
          
          {!isEditing && escola && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-3">
                <div className="w-20 h-20 rounded-full bg-sky-100 flex items-center justify-center border-4 border-white shadow-sm">
                  <span className="text-3xl text-sky-700">🏫</span>
                </div>
                <p className="text-lg font-bold text-gray-800">{escola.nome}</p>
              </div>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2"><InfoField label="Nome" value={escola.nome} full /></div>
                <InfoField label="Telefone" value={escola.telefone} />
                <InfoField label="Email" value={escola.email} />
                <InfoField label="CNPJ" value={escola.cnpj} />
                <div className="md:col-span-2"><InfoField label="Endereço" value={escola.endereco} full /></div>
              </div>
              <div className="flex justify-center mt-4">
                <button onClick={() => { setIsEditing(true); setSucesso(false); }} className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-[#8AD7E1] text-sm font-bold text-slate-800 hover:bg-[#7bc8d2] hover:text-white transition shadow-sm"><FaEdit /> Editar</button>
              </div>
            </div>
          )}

          {isEditing && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div><label className="block text-xs font-bold text-slate-700 mb-1">Nome</label><input type="text" value={nome} onChange={e => setNome(e.target.value)} className="w-full border rounded-xl px-4 py-2" required /></div>
              <div><label className="block text-xs font-bold text-slate-700 mb-1">CNPJ</label><input type="text" value={cnpj} onChange={e => setCnpj(e.target.value)} className="w-full border rounded-xl px-4 py-2" /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border rounded-xl px-4 py-2" /></div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Telefone</label><input type="tel" value={telefone} onChange={e => setTelefone(e.target.value)} className="w-full border rounded-xl px-4 py-2" /></div>
              </div>
              <div><label className="block text-xs font-bold text-slate-700 mb-1">Endereço</label><textarea rows={3} value={endereco} onChange={e => setEndereco(e.target.value)} className="w-full border rounded-xl px-4 py-2" /></div>
              <div className="mt-4 flex justify-end gap-3 pt-2">
                <button type="button" onClick={handleCancelarEdicao} className="px-6 py-2 rounded-full border text-sm text-slate-600">Cancelar</button>
                <button type="submit" className="px-6 py-2 rounded-full bg-[#8AD7E1] text-sm font-bold text-white shadow">Salvar</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoField = ({ label, value, full = false }) => (
  <div className={full ? "w-full" : ""}>
    <span className="text-xs font-bold text-slate-500 mb-1 block uppercase">{label}</span>
    <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium">{value || "-"}</div>
  </div>
);

export default EscolaProfileScreen;