// src/hooks/useCreateReceita.ts
import { useCallback, useState } from "react";
import type { NovaReceita } from "../types/receita";
import { receitasService } from "../services/receitasService";

export function useCreateReceita() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    id: number;
    mensagem?: string;
  } | null>(null);

  const create = useCallback(async (payload: NovaReceita) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await receitasService.create(payload);
      setResult(res);
      return res;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const msg = err?.message ?? String(err);
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error, result };
}
