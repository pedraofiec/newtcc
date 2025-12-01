// src/features/motorista/components/DriverScreen.js
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

import { listarContratos, listarContratosPorMotorista } from "./contrato/service/ContratosService";
import useUserStore from "../../shared/store/user-store";

const DriverScreen = () => {
  const navigate = useNavigate();
  const { me } = useUserStore(); // aqui você tem os dados do /users/me

  // tentar pegar ID do motorista de 2 lugares:
  const motoristaIdFromStore = me?.motoristaId || me?.userId || null;
  const motoristaIdFromStorage = localStorage.getItem("motoristaId") || null;
  const motoristaId = motoristaIdFromStore || motoristaIdFromStorage;

  const [contratos, setContratos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  // Carrega contratos na montagem
  useEffect(() => {
    let cancelado = false;

    async function carregarContratos() {
      setLoading(true);
      setErro(null);

      try {
        let data;

        // 1) Tenta buscar só contratos do motorista
        if (motoristaId) {
          try {
            data = await listarContratosPorMotorista(motoristaId);
          } catch (e) {
            console.warn(
              "Falha em listarContratosPorMotorista, usando fallback listarContratos():",
              e
            );
            // 2) Fallback: pega todos contratos
            data = await listarContratos();
          }
        } else {
          // se não temos motoristaId, pega todos
          data = await listarContratos();
        }

        if (cancelado) return;

        setContratos(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Erro ao carregar contratos:", e);
        if (!cancelado) {
          setErro("Não foi possível carregar os passageiros.");
        }
      } finally {
        if (!cancelado) setLoading(false);
      }
    }

    carregarContratos();

    return () => {
      cancelado = true;
    };
  }, [motoristaId]);

  // ----------------------------------------
  // Mapeia CONTRATOS -> PASSAGEIROS (dependentes)
  // ----------------------------------------
  const passageiros = useMemo(() => {
    return (contratos || []).map((contrato) => {
      // dependendo do seu back, ajuste esses nomes:
      const dep =
        contrato.dependente ||
        contrato.dependenteDTO ||
        contrato.aluno ||
        contrato.crianca ||
        {};

      return {
        // ids
        contratoId: contrato.id || contrato.contratoId,
        dependenteId:
          contrato.dependenteId ||
          dep.id ||
          dep.dependenteId ||
          contrato.alunoId ||
          contrato.id,

        // nome
        nome:
          dep.nome ||
          dep.nomeCrianca ||
          contrato.alunoNome ||
          contrato.nomeDependente ||
          "Passageiro",

        // email (se vier do dependente ou do responsável)
        email:
          dep.email ||
          contrato.emailDependente ||
          contrato.responsavel?.email ||
          "",

        // foto (se tiver)
        fotoUrl: dep.fotoUrl || dep.picture || contrato.fotoDependente || null,
      };
    });
  }, [contratos]);

  const handleVerPerfil = (p) => {
    // envia o id do dependente para a rota que você já tem no App.js
    navigate(`/driver/passengers/${p.dependenteId}`, {
      state: { passageiro: p },
    });
  };

  return (
    <div className="w-full flex flex-col items-center font-sans">
      {/* Título PASSAGEIROS em forma de pílula */}
      <div className="w-full max-w-5xl flex flex-col items-center mt-6">
        <div className="inline-flex px-12 py-3 rounded-full bg-[#8AD7E1] mb-10 shadow-md">
          <span className="text-base md:text-lg font-semibold tracking-wide text-slate-800">
            PASSAGEIROS
          </span>
        </div>

        {/* Estados básicos */}
        {loading && (
          <p className="text-sm text-slate-600 mb-4">
            Carregando passageiros...
          </p>
        )}

        {erro && !loading && (
          <p className="text-sm text-red-600 mb-4">{erro}</p>
        )}

        {!loading && !erro && passageiros.length === 0 && (
          <p className="text-sm text-slate-600 mb-4">
            Nenhum passageiro encontrado.
            <br />
            Assim que você tiver contratos ativos, eles aparecerão aqui. 😉
          </p>
        )}

        {/* Grid de cards de passageiros */}
        {!loading && !erro && passageiros.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {passageiros.map((p) => (
              <div
                key={`${p.contratoId}-${p.dependenteId}`}
                className="w-64 h-72 bg-[#8AD7E1] rounded-[32px] flex flex-col items-center pt-8 shadow-lg"
              >
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full bg-[#B9C4FF] flex items-center justify-center mb-6 overflow-hidden">
                  {p.fotoUrl ? (
                    <img
                      src={p.fotoUrl}
                      alt={p.nome}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUser className="text-3xl text-slate-700" />
                  )}
                </div>

                {/* Nome */}
                <div className="w-44 h-8 rounded-full bg-[#CFF4F7] flex items-center justify-center mb-1 px-2">
                  <span className="text-sm font-medium text-slate-700 truncate">
                    {p.nome}
                  </span>
                </div>

                {/* Email (se existir) */}
                {p.email && (
                  <div className="w-48 text-center text-[11px] text-slate-700 mb-3 px-2 truncate">
                    {p.email}
                  </div>
                )}

                {/* Botão Visualizar perfil */}
                <button
                  onClick={() => handleVerPerfil(p)}
                  className="mt-2 px-6 py-2 rounded-full bg-white text-sm font-semibold text-slate-700 shadow hover:bg-slate-100 transition"
                >
                  Visualizar perfil
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverScreen;
