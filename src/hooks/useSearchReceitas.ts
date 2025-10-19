// src/hooks/useSearchReceitas.ts
import { useEffect, useState } from "react";
import type { Receita } from "../types/receita";
import { receitasService } from "../services/receitasService";

/**
 * Hook de busca que usa o endpoint /receitas?nome=...&ingredientes=a,b
 * Retorna null em data quando não há parâmetros (sinal para usar fallback de "tudo").
 */
export function useSearchReceitas(
  params: { nome?: string; ingredientes?: string[] },
  delay = 350
) {
  const [data, setData] = useState<Receita[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const hasParams =
      (params.nome && params.nome.trim().length > 0) ||
      (params.ingredientes && params.ingredientes.length > 0);

    if (!hasParams) {
      setData(null); // sinaliza que não há busca ativa
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    const t = setTimeout(async () => {
      try {
        const res = await receitasService.search({
          nome: params.nome,
          ingredientes: params.ingredientes,
        });
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
  }, [params.nome, params.ingredientes?.join(","), delay]);

  return { data, loading, error };
}
