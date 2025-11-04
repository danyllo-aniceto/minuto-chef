// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/authService";
import { setAuthToken } from "../services/api";
import type { ReactNode } from "react";

type User = { id: number; nome: string; email: string } | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  register: (nome: string, email: string, senha: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // tentar carregar token/usuario do storage
    const stored = authService.getStored();
    if (stored) {
      setAuthToken(stored.token);
      setUser(stored.usuario);
    }
    setLoading(false);
  }, []);

  async function login(email: string, senha: string) {
    const { token, usuario } = await authService.login({ email, senha });
    setUser(usuario);
    setAuthToken(token);
  }

  async function register(nome: string, email: string, senha: string) {
    const { token, usuario } = await authService.register({
      nome,
      email,
      senha,
    });
    setUser(usuario);
    setAuthToken(token);
  }

  function logout() {
    authService.logout();
    setUser(null);
    setAuthToken(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
