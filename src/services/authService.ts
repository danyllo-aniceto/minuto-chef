// src/services/authService.ts
import { api, setAuthToken } from "./api";

type ApiUser = { id: number; nome: string; email: string };
type Stored = { token: string; usuario: ApiUser };

const STORAGE_KEY = "minuto_chef_auth";

export const authService = {
  async register(payload: { nome: string; email: string; senha: string }) {
    const res = await api.post("/register", payload);
    const { token, usuario } = res.data as { token: string; usuario: ApiUser };
    this.persist(token, usuario);
    setAuthToken(token);
    return { token, usuario };
  },

  async login(payload: { email: string; senha: string }) {
    const res = await api.post("/login", payload);
    const { token, usuario } = res.data as { token: string; usuario: ApiUser };
    this.persist(token, usuario);
    setAuthToken(token);
    return { token, usuario };
  },

  logout() {
    localStorage.removeItem(STORAGE_KEY);
    setAuthToken(null);
  },

  getStored(): Stored | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as Stored;
    } catch {
      return null;
    }
  },

  persist(token: string, usuario: ApiUser) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, usuario }));
  },

  getToken(): string | null {
    const s = this.getStored();
    return s?.token ?? null;
  },

  getUser(): ApiUser | null {
    const s = this.getStored();
    return s?.usuario ?? null;
  },
};
