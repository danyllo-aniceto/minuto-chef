import { useCallback, useState } from "react";
import { receitasService } from "../services/receitasService";

export function useDeleteReceita() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const remove = useCallback(async (id: number | string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await receitasService.delete(id);
      setSuccess(true);
      return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.message ?? String(err));
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error, success };
}
