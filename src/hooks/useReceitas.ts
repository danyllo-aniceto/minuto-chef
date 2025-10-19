// src/hooks/useReceitas.ts
import { useEffect, useState } from "react";
import type { Receita } from "../types/receita";
import { receitasService } from "../services/receitasService";

export function useReceitas() {
  const [data, setData] = useState<Receita[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const r = await receitasService.listAll();
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
  }, []);

  return { data, loading, error };
}
