// src/features/motorista/components/RouteManagementScreen.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaChevronLeft, FaRoute, FaEdit, FaTrash } from "react-icons/fa";

import { getPontoById, updatePonto, deletePonto } from "../Services/PontoControllerService";
import { listarRotas, obterRotaPorId } from "../../rotas/services/RotaService";


const RouteManagementScreen = () => {
  const navigate = useNavigate();

  // -------------------------------
  // ESTADOS PRINCIPAIS
  // -------------------------------
  const [rota, setRota] = useState(null);
  const [pontos, setPontos] = useState([]);

  const [loadingRota, setLoadingRota] = useState(true);
  const [saving, setSaving] = useState(false);

  const [erro, setErro] = useState(null);

  // -------------------------------
  // CARREGAR A ROTA DO BACK-END
  // -------------------------------
  useEffect(() => {
    const carregarRota = async () => {
      try {
        setLoadingRota(true);
        setErro(null);

        // Obtém todas as rotas
        const rotas = await listarRotas();

        if (!rotas || !Array.isArray(rotas) || rotas.length === 0) {
          setErro("Nenhuma rota encontrada.");
          return;
        }

        // Seleciona a primeira (ou depois a gente busca pelo ID da URL)
        const rotaSelecionada = rotas[0];

        // Busca rota completa por ID
        const rotaCompleta = await obterRotaPorId(rotaSelecionada.id);

        setRota(rotaCompleta);
        setPontos(rotaCompleta.pontos || []);
      } catch (e) {
        console.error(e);
        setErro("Erro ao carregar rota.");
      } finally {
        setLoadingRota(false);
      }
    };

    carregarRota();
  }, []);

  // -------------------------------
  // EDITAR UM PONTO
  // -------------------------------
  const handleEditPonto = async (ponto) => {
    const novoHorario = window.prompt(
      "Informe o novo horário (HH:mm):",
      ponto.horario || ponto.hora || ""
    );

    if (novoHorario === null) return; // cancelado

    try {
      setSaving(true);

      // 1. Buscar dados atuais do ponto
      const pontoAtual = await getPontoById(ponto.id);

      // 2. Atualizar dados
      const payloadAtualizado = {
        ...pontoAtual,
        horario: novoHorario,
      };

      // 3. Enviar ao back
      const pontoNew = await updatePonto(ponto.id, payloadAtualizado);

      // 4. Atualizar frontend
      setPontos((prev) =>
        prev.map((p) => (p.id === ponto.id ? pontoNew : p))
      );
    } catch (e) {
      console.error(e);
      alert("Erro ao atualizar o ponto.");
    } finally {
      setSaving(false);
    }
  };

  // -------------------------------
  // EXCLUIR UM PONTO
  // -------------------------------
  const handleDeletePonto = async (ponto) => {
    const confirmar = window.confirm(
      `Deseja realmente excluir o ponto "${ponto.descricao || ponto.nome}"?`
    );

    if (!confirmar) return;

    try {
      setSaving(true);

      await deletePonto(ponto.id);

      // Remove do estado
      setPontos((prev) => prev.filter((p) => p.id !== ponto.id));
    } catch (e) {
      console.error(e);
      alert("Erro ao excluir o ponto.");
    } finally {
      setSaving(false);
    }
  };

  // -------------------------------
  // RENDER
  // -------------------------------
  const nomeRota = rota?.nome || rota?.name || "Rota sem nome";
  const vanLabel =
    rota?.veiculo?.placa ||
    rota?.placaVeiculo ||
    rota?.van ||
    "Não informado";

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
      {/* Voltar */}
      <button
        onClick={() => navigate("/home")}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium"
      >
        <FaChevronLeft className="mr-2" /> Voltar a Página Inicial
      </button>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
          <FaRoute className="mr-3 text-blue-600" />
          Gerenciamento de Rota
        </h1>

        <button
          disabled={saving}
          onClick={() => alert("Abrir modal para editar a rota")}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition shadow disabled:opacity-40"
        >
          <FaEdit className="mr-2" /> Editar Rota
        </button>
      </div>

      {/* Estados */}
      {loadingRota && <p className="text-gray-600">Carregando rota...</p>}
      {erro && <p className="text-red-600">{erro}</p>}
      {saving && <p className="text-gray-500">Salvando alterações...</p>}

      {/* CONTEÚDO */}
      {rota && (
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-2">{nomeRota}</h2>

          <p className="text-gray-700 mb-4">
            Van associada: <span className="font-medium">{vanLabel}</span>
          </p>

          {/* Mapa (placeholder) */}
          <div className="h-64 w-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 font-bold mb-6 border border-dashed border-gray-400">
            [ MAPA DA ROTA AQUI ]
          </div>

          {/* Lista de Paradas */}
          <h3 className="text-lg font-bold text-gray-700 mb-3 border-b pb-2">
            Paradas ({pontos.length})
          </h3>

          {pontos.length === 0 ? (
            <p className="text-gray-500">Nenhum ponto cadastrado.</p>
          ) : (
            <ul className="space-y-4">
              {pontos.map((ponto, index) => (
                <li
                  key={ponto.id || index}
                  className="p-4 bg-gray-50 rounded-lg shadow border-l-4 border-blue-500"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-base font-semibold text-gray-800">
                      {index + 1}. {ponto.descricao || ponto.nome}
                    </p>
                    <span className="text-sm font-bold text-blue-600">
                      {ponto.horario || ponto.hora || "--:--"}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600">
                    Endereço: {ponto.endereco || "Endereço não informado"}
                  </p>

                  <div className="flex gap-3 justify-end mt-3">
                    <button
                      disabled={saving}
                      onClick={() => handleEditPonto(ponto)}
                      className="px-3 py-1 border border-blue-500 text-blue-600 rounded-full text-xs hover:bg-blue-50 transition disabled:opacity-40"
                    >
                      <FaEdit className="mr-1 inline" />
                      Editar
                    </button>
                    <button
                      disabled={saving}
                      onClick={() => handleDeletePonto(ponto)}
                      className="px-3 py-1 border border-red-500 text-red-600 rounded-full text-xs hover:bg-red-50 transition disabled:opacity-40"
                    >
                      <FaTrash className="mr-1 inline" />
                      Excluir
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default RouteManagementScreen;
