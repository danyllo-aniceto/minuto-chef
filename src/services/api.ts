// src/services/api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000",
  timeout: 10000,
});

// helper para setar token (usado ao logar / ao carregar app)
export function setAuthToken(token?: string | null) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

// Interceptor básico (opcional) para extrair mensagem de erro
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.mensagem ||
      error?.response?.data?.error ||
      error?.message ||
      "Erro desconhecido";
    return Promise.reject(new Error(message));
  }
);
