// src/features/shared/utils/api.js
import axios from "axios";
import { useStatusModalStore } from "../store/modal-store";

const { showLoading, showSuccess, showError, closeModal } =
  useStatusModalStore.getState();

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/v1/api`,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    showLoading("Loading...");

    const token = localStorage.getItem("accessToken");

    // NÃO mandar Authorization em login/registro
    const isAuthEndpoint =
      config.url?.startsWith("/v1/api/auth/login") ||
      config.url?.startsWith("/v1/api/auth/register");

    if (token && !isAuthEndpoint) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    closeModal();
    const httpMethod = response.config.method?.toLowerCase();
    if (httpMethod !== "get") {
      showSuccess(`Status ${response.status}: Sucesso na operação.`);
    }
    return response;
  },
  async (error) => {
    closeModal();
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    if (status) {
      showError(`Erro ${status}: ${message}`);
    } else {
      showError(`Falha de Conexão: ${message}`);
    }

    if (status === 401) {
      // TODO: tratar token expirado se quiser
    }

    return Promise.reject(error);
  }
);

export default api;
