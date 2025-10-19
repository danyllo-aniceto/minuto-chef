// src/services/receitasService.ts
import { api } from "./api";
import type { Receita, NovaReceita } from "../types/receita";

export const receitasService = {
  /**
   * GET /receitas
   * retorna todas as receitas
   */
  async listAll(): Promise<Receita[]> {
    const res = await api.get<Receita[]>("/receitas");
    return res.data;
  },

  /**
   * GET /receitas/id/:id
   * retorna uma receita por id
   */
  async getById(id: number | string): Promise<Receita> {
    const res = await api.get<Receita>(`/receitas/id/${id}`);
    return res.data;
  },

  /**
   * GET /receitas/nome/:nome
   * busca por nome (LIKE %nome%)
   */
  async searchByName(nome: string): Promise<Receita[]> {
    const res = await api.get<Receita[]>(
      `/receitas/nome/${encodeURIComponent(nome)}`
    );
    return res.data;
  },

  /**
   * GET /receitas/ingrediente/:ingrediente
   * busca por ingrediente (filtra JSON de ingredientes)
   */
  async searchByIngredient(ingrediente: string): Promise<Receita[]> {
    const res = await api.get<Receita[]>(
      `/receitas/ingrediente/${encodeURIComponent(ingrediente)}`
    );
    return res.data;
  },

  /**
   * POST /receitas
   * cria uma nova receita
   * body: { nome, imagem?, modo_preparo?, ingredientes: [] }
   */
  async create(
    receita: NovaReceita
  ): Promise<{ id: number; mensagem?: string }> {
    const res = await api.post<{ id: number; mensagem?: string }>(
      " /receitas".trim(),
      receita
    );
    return res.data;
  },

  /**
   * Busca combinada usando query params:
   *  - nome?: string
   *  - ingredientes?: string[]  (será serializado como "a,b,c")
   */
  async search(params: {
    nome?: string;
    ingredientes?: string[];
  }): Promise<Receita[]> {
    const query = new URLSearchParams();
    if (params.nome) query.set("nome", params.nome);
    if (params.ingredientes && params.ingredientes.length) {
      // join por vírgula -> backend aceita "a,b,c"
      query.set("ingredientes", params.ingredientes.join(","));
    }
    const q = query.toString();
    const res = await api.get<Receita[]>(`/receitas${q ? `?${q}` : ""}`);
    return res.data;
  },

  /**
   * Alternativa: POST /receitas/search (aceita body com array)
   */
  async searchPost(body: {
    nome?: string;
    ingredientes?: string[];
  }): Promise<Receita[]> {
    const res = await api.post<Receita[]>("/receitas/search", body);
    return res.data;
  },
};
