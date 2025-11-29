import React, { useEffect, useState } from "react";
import { listarVeiculos, cadastrarVeiculo } from "../Services/VeiculosService";

export default function MotoristaVehiclesScreen() {
    const [veiculos, setVeiculos] = useState([]);
    const [form, setForm] = useState({
        placa: "",
        capacidade: "",
        modelo: ""
    });

    useEffect(() => {
        carregarVeiculos();
    }, []);

    const carregarVeiculos = async () => {
        const dados = await listarVeiculos();
        setVeiculos(dados);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await cadastrarVeiculo(form);
        carregarVeiculos();

        setForm({
            placa: "",
            capacidade: "",
            modelo: ""
        });
    };

    return (
        <div className="max-w-3xl mx-auto mt-6">
            <h1 className="text-2xl font-bold mb-4">Meus Veículos</h1>

            {/* Formulário */}
            <form 
                className="bg-white p-4 rounded-lg shadow-md mb-6"
                onSubmit={handleSubmit}
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <input
                        type="text"
                        placeholder="Placa"
                        value={form.placa}
                        onChange={(e) => setForm({...form, placa: e.target.value})}
                        className="border p-2 rounded-md"
                        required
                    />

                    <input
                        type="number"
                        placeholder="Capacidade"
                        value={form.capacidade}
                        onChange={(e) => setForm({...form, capacidade: e.target.value})}
                        className="border p-2 rounded-md"
                        required
                    />

                    <input
                        type="text"
                        placeholder="Modelo"
                        value={form.modelo}
                        onChange={(e) => setForm({...form, modelo: e.target.value})}
                        className="border p-2 rounded-md"
                        required
                    />

                </div>

                <button 
                    className="mt-4 bg-[#8AD7E1] text-white px-4 py-2 rounded-md hover:bg-[#6cc1ce]"
                >
                    Cadastrar Veículo
                </button>
            </form>

            {/* Lista de veículos */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-3">Veículos cadastrados</h2>

                {veiculos.length === 0 ? (
                    <p className="text-gray-500">Nenhum veículo cadastrado.</p>
                ) : (
                    <ul className="space-y-3">
                        {veiculos.map((v) => (
                            <li 
                                key={v.id} 
                                className="border p-3 rounded-md flex justify-between"
                            >
                                <div>
                                    <p><strong>Placa:</strong> {v.placa}</p>
                                    <p><strong>Modelo:</strong> {v.modelo}</p>
                                    <p><strong>Capacidade:</strong> {v.capacidade} lugares</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}