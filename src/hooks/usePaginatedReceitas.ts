// // src/hooks/usePaginatedReceitas.ts
// import { useEffect, useState } from "react";
// import type { PaginatedResult, Receita } from "../types/receita";
// import { receitasService } from "../services/receitasService";

// export function usePaginatedReceitas(
//   params: {
//     nome?: string;
//     ingredientes?: string[];
//     page?: number;
//     limit?: number;
//   },
//   delay = 300
// ) {
//   const { nome, ingredientes, page = 1, limit = 12 } = params;
//   const [data, setData] = useState<PaginatedResult<Receita> | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     let mounted = true;

//     setLoading(true);
//     setError(null);

//     const t = setTimeout(async () => {
//       try {
//         const res = await receitasService.search({
//           nome,
//           ingredientes,
//           page,
//           limit,
//         });
//         if (mounted) setData(res);
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       } catch (err: any) {
//         if (mounted) setError(err.message ?? String(err));
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     }, delay);

//     return () => {
//       mounted = false;
//       clearTimeout(t);
//     };
//   }, [nome, (ingredientes || []).join(","), page, limit, delay]);

//   return { data, loading, error };
// }
