// src/hooks/useBuscarPorIngrediente.ts
import { useEffect, useState } from "react";
import type { Receita } from "../types/receita";
import { receitasService } from "../services/receitasService";

/**
 * Busca por ingrediente com debounce.
 */
export function useBuscarPorIngrediente(ingrediente: string, delay = 350) {
  const [data, setData] = useState<Receita[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    if (!ingrediente.trim()) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    const t = setTimeout(async () => {
      try {
        const res = await receitasService.searchByIngredient(ingrediente);
        if (mounted) setData(res);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (mounted) setError(err.message ?? String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    }, delay);

    return () => {
      mounted = false;
      clearTimeout(t);
    };
  }, [ingrediente, delay]);

  return { data, loading, error };
}
