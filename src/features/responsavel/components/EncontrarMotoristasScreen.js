import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { listarMotoristas } from "../../motorista/Services/MotoristaService.js";

// você pode manter esses nomes de escolas estáticos só para os chips
const escolas = [
  "EMEB Profª Francisca Lucinda Bueno",
  "EMEB Milton Santos",
  "EMEB José Nunes",
];

export default function EncontrarMotoristasScreen() {
  const navigate = useNavigate();

  const [motoristas, setMotoristas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const [termoBusca, setTermoBusca] = useState("");
  const [escolaSelecionada, setEscolaSelecionada] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        setLoading(true);
        setErro(null);
        const data = await listarMotoristas(); // chama o back
        setMotoristas(data || []);
      } catch (e) {
        console.error("Erro ao buscar motoristas:", e);
        setErro("Não foi possível carregar os motoristas.");
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, []);

  // filtro por escola + texto
  const motoristasFiltrados = motoristas.filter((m) => {
    const nome = (m.nome || m.nomeMotorista || m.user?.nome || "").toLowerCase();
    const escola =
      (m.escola?.nome || m.escolaNome || m.nomeEscola || "").toLowerCase();

    const filtroTexto = termoBusca.toLowerCase();

    const matchTexto = filtroTexto
      ? escola.includes(filtroTexto) || nome.includes(filtroTexto)
      : true;

    const matchChip = escolaSelecionada
      ? escola === escolaSelecionada.toLowerCase()
      : true;

    return matchTexto && matchChip;
  });

  function irParaPerfilMotorista(m) {
    // tenta descobrir o campo correto de ID vindo do backend
    const idMotorista =
      m.id ||
      m.motoristaId ||
      m.uuid ||
      m.idMotorista;

    if (!idMotorista) {
      console.error("Motorista sem ID válido:", m);
      alert("Não foi possível abrir o perfil deste motorista (ID ausente).");
      return;
    }

    // 🔹 Usa rota ABSOLUTA para bater com App.js → "/motoristas/:id"
    navigate(`/motoristas/${idMotorista}`);
  }

  return (
    <div className="w-full min-h-full px-6 py-6 flex flex-col">
      {/* Header */}
      <div className="flex justify-center mb-10">
        <div className="bg-[#73C8D5] px-10 py-3 rounded-full text-white shadow text-lg font-semibold tracking-wide">
          ENCONTRAR MOTORISTAS
        </div>
      </div>

      {/* Área de busca */}
      <div className="max-w-3xl mx-auto w-full mb-8">
        <div className="flex items-center bg-white border border-[#73C8D5] rounded-full px-5 py-2 shadow-sm">
          <FaSearch className="text-[#73C8D5] text-lg" />
          <input
            type="text"
            placeholder="Buscar por escola..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            className="ml-3 flex-1 outline-none text-sm"
          />
        </div>
      </div>

      {/* Chips das escolas */}
      <div className="flex flex-wrap gap-3 justify-center mb-10">
        <button
          onClick={() => setEscolaSelecionada("")}
          className={`px-5 py-2 rounded-full border text-xs md:text-sm shadow-sm transition ${
            escolaSelecionada === ""
              ? "bg-[#73C8D5] text-white border-[#73C8D5]"
              : "bg-white border-[#73C8D5] text-[#73C8D5] hover:bg-[#73C8D5] hover:text-white"
          }`}
        >
          Todas
        </button>

        {escolas.map((e, idx) => (
          <button
            key={idx}
            onClick={() => setEscolaSelecionada(e)}
            className={`px-5 py-2 rounded-full border text-xs md:text-sm shadow-sm transition ${
              escolaSelecionada === e
                ? "bg-[#73C8D5] text-white border-[#73C8D5]"
                : "bg-white border-[#73C8D5] text-[#73C8D5] hover:bg-[#73C8D5] hover:text-white"
            }`}
          >
            {e}
          </button>
        ))}
      </div>

      {/* Estados de loading/erro */}
      {loading && (
        <div className="flex justify-center mt-6 text-sm text-slate-500">
          Carregando motoristas...
        </div>
      )}

      {erro && !loading && (
        <div className="flex justify-center mt-6">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
            {erro}
          </div>
        </div>
      )}

      {!loading && !erro && motoristasFiltrados.length === 0 && (
        <div className="flex justify-center mt-6 text-sm text-slate-500">
          Nenhum motorista encontrado.
        </div>
      )}

      {/* Lista de motoristas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {motoristasFiltrados.map((m) => {
          const nome =
            m.nome || m.nomeMotorista || m.user?.nome || "Motorista";

          // se o back ainda não manda distância, pode deixar vazio mesmo
          const dist = m.distancia || m.distanciaKm || m.dist || "";

          const avatar =
            m.fotoUrl ||
            m.user?.picture ||
            "https://i.pravatar.cc/150?img=3"; // fallback qualquer

          return (
            <div
              key={m.id || m.motoristaId || m.uuid || m.idMotorista}
              className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 hover:shadow-2xl transition"
            >
              <div className="flex flex-col items-center">
                {/* Avatar */}
                <img
                  src={avatar}
                  alt={nome}
                  className="w-24 h-24 rounded-full shadow mb-4 object-cover"
                />

                {/* Nome + distância */}
                <h3 className="text-lg font-semibold text-slate-700">{nome}</h3>
                {dist && (
                  <p className="text-sm text-slate-500">
                    {dist} de distância
                  </p>
                )}

                {/* Botão ver perfil */}
                <button
                  onClick={() => irParaPerfilMotorista(m)}
                  className="mt-6 w-full bg-[#73C8D5] text-white py-2 rounded-full shadow hover:bg-[#6abcca] text-sm"
                >
                  Ver perfil
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
