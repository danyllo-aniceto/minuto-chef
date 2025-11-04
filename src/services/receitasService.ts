// src/services/receitasService.ts
import { api } from "./api";
import type { Receita, NovaReceita } from "../types/receita";

export const receitasService = {
  async listAll(): Promise<Receita[]> {
    const res = await api.get<Receita[]>("/receitas");
    return res.data;
  },

  // GET /receitas/:id
  async getById(id: number | string): Promise<Receita> {
    const res = await api.get<Receita>(`/receitas/${id}`);
    return res.data;
  },

  async searchByName(nome: string): Promise<Receita[]> {
    const res = await api.get<Receita[]>(
      `/receitas/nome/${encodeURIComponent(nome)}`
    );
    return res.data;
  },

  async searchByIngredient(ingrediente: string): Promise<Receita[]> {
    const res = await api.get<Receita[]>(
      `/receitas/ingrediente/${encodeURIComponent(ingrediente)}`
    );
    return res.data;
  },

  /**
   * NOVO: search usando query params GET /receitas?nome=...&ingredientes=a,b,c
   * Recebe { nome?: string, ingredientes?: string[] } e transforma ingredientes em "a,b,c"
   */
  async search(params: {
    nome?: string;
    ingredientes?: string[];
  }): Promise<Receita[]> {
    const q: Record<string, string> = {};
    if (params.nome) q.nome = params.nome;
    if (params.ingredientes && params.ingredientes.length) {
      // backend espera "a,b,c"
      q.ingredientes = params.ingredientes.join(",");
    }

    // passa como query params
    const res = await api.get<Receita[]>("/receitas", { params: q });
    return res.data;
  },

  async create(
    receita: NovaReceita
  ): Promise<{ id: number; mensagem?: string }> {
    const res = await api.post<{ id: number; mensagem?: string }>(
      `/receitas`,
      receita
    );
    return res.data;
  },

  // lista apenas do usuário logado (aceita filtros ?nome=&ingrediente=)
  async minhas(params?: { nome?: string; ingrediente?: string }) {
    const q = new URLSearchParams();
    if (params?.nome) q.set("nome", params.nome);
    if (params?.ingrediente) q.set("ingrediente", params.ingrediente);
    const qs = q.toString();
    const res = await api.get<Receita[]>(
      `/minhas-receitas${qs ? `?${qs}` : ""}`
    );
    return res.data;
  },

  async delete(id: number | string): Promise<{ mensagem?: string }> {
    const res = await api.delete<{ mensagem?: string }>(`/receitas/${id}`);
    return res.data;
  },

  async update(
    id: number | string,
    receita: {
      nome: string;
      imagem?: string;
      modo_preparo?: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ingredientes: any[];
    }
  ): Promise<Receita> {
    const res = await api.put<Receita>(`/receitas/${id}`, receita);
    return res.data;
  },
};
