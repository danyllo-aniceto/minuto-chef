// src/components/ReceitasList/index.tsx
import { Link } from "react-router-dom";
import { useReceitas } from "../../hooks/useReceitas";
import type { Receita } from "../../types/receita";
import styles from "./ReceitasList.module.css";

type Props = {
  recipes?: Receita[];
};

export function ReceitasList({ recipes }: Props) {
  const internal = useReceitas();
  const data = recipes ?? internal.data;
  const loading = recipes ? false : internal.loading;
  const error = internal.error;

  if (loading)
    return <div className={styles.status}>Carregando receitas...</div>;
  if (error) return <div className={styles.status}>Erro: {error}</div>;
  if (!data || !data.length)
    return <div className={styles.status}>Nenhuma receita encontrada.</div>;

  return (
    <div className={styles.grid}>
      {data.map((r) => (
        <article key={r.id} className={styles.card}>
          <div className={styles.imageWrapper}>
            {r.imagem ? (
              <img src={r.imagem} alt={r.nome} className={styles.image} />
            ) : (
              <div className={styles.noImage}>Sem imagem</div>
            )}
          </div>

          <div className={styles.cardBody}>
            <h3 className={styles.cardTitle}>{r.nome}</h3>
            <Link to={`/receitas/${r.id}`} className={styles.button}>
              Ver Receita
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
