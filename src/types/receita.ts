// src/types/receita.ts
export interface Ingrediente {
  ingrediente: string;
  medida?: string;
}

export interface Receita {
  id: number;
  nome: string;
  imagem?: string;
  modo_preparo?: string;
  ingredientes: Ingrediente[];
}

export type PaginatedResult<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};
export type NovaReceita = Omit<Receita, "id">;
