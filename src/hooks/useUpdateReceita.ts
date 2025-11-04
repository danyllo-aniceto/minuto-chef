// src/hooks/useUpdateReceita.ts
import { useState } from "react";
import type { Receita, NovaReceita } from "../types/receita";
import { receitasService } from "../services/receitasService";

export function useUpdateReceita() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Receita | null>(null);

  async function update(id: number | string, payload: NovaReceita) {
    setLoading(true);
    setError(null);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updated = await receitasService.update(id, payload as any);
      setResult(updated);
      setLoading(false);
      return updated;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.message ?? String(err));
      setLoading(false);
      throw err;
    }
  }

  return { update, loading, error, result };
}
