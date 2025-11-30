// src/pages/driver/EditarContratoPage.js
import React, { useEffect, useState } from "react";
import { getContratoById, atualizarContrato } from "../service/ContratosService";
import { useParams, useNavigate } from "react-router-dom";
import ContratoForm from "./ContratoForm";
import toast from "react-hot-toast";
import axios from "axios";

const EditarContratoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contrato, setContrato] = useState(null);
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    async function carregar() {
      try {
        const c = await getContratoById(id);
        setContrato(c);
      } catch (err) {
        console.error(err);
        toast.error("Erro ao buscar contrato.");
      }
    }
    carregar();

    // opcional: carregar lista de alunos (mesma lógica do NovoContratoPage)
    async function carregarAlunos() {
      try {
        const motoristaId = localStorage.getItem("motoristaId");
        const res = await axios.get(`/v1/api/motoristas/${motoristaId}/alunos`);
        setAlunos(res.data || []);
      } catch (err) {
        // silently ignore if not available
      }
    }
    carregarAlunos();
  }, [id]);

  async function handleUpdate(payload) {
    try {
      await atualizarContrato(id, payload);
      toast.success("Contrato atualizado.");
      navigate("/driver/contratos");
    } catch (err) {
      console.error(err);
      toast.error("Falha ao atualizar contrato.");
    }
  }

  if (!contrato) return <div>Carregando...</div>;

  // normalizar initialValues conforme a estrutura retornada
  const initialValues = {
    dataInicio: contrato.dataInicio,
    dataFim: contrato.dataFim,
    valorMensal: contrato.valorMensal,
    status: contrato.status,
    alunoId: contrato.alunoId || contrato.aluno?.id || ""
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Editar Contrato</h1>
      <ContratoForm initialValues={initialValues} onSubmit={handleUpdate} alunos={alunos} />
    </div>
  );
};

export default EditarContratoPage;
