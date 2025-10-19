// src/hooks/useReceita.ts
import { useEffect, useState } from "react";
import type { Receita } from "../types/receita";
import { receitasService } from "../services/receitasService";

export function useReceita(id?: number | string) {
  const [data, setData] = useState<Receita | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id == null) return;
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const r = await receitasService.getById(id);
        if (mounted) setData(r);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (mounted) setError(err.message ?? String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  return { data, loading, error };
}
