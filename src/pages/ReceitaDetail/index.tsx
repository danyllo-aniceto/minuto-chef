import { Link, useParams } from "react-router-dom";
import { useReceita } from "../../hooks/useReceita";
import styles from "./ReceitaDetailPage.module.css";

export default function ReceitaDetailPage() {
  const { id } = useParams<{ id?: string }>();
  const { data, loading, error } = useReceita(id ?? "");

  async function handleShare() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: data?.nome ?? "Receita",
          text: data?.nome ?? "Receita",
          url,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        alert("Link copiado para a área de transferência!");
      } else {
        window.prompt("Copie o link abaixo:", url);
      }
    } catch (err) {
      console.error("Share erro:", err);
    }
  }

  function handlePrint() {
    window.print();
  }

  if (!id)
    return <div className={styles.center}>ID da receita não informado.</div>;
  if (loading) return <div className={styles.center}>Carregando...</div>;
  if (error) return <div className={styles.center}>Erro: {error}</div>;
  if (!data)
    return <div className={styles.center}>Receita não encontrada.</div>;

  return (
    <article className={styles.container}>
      <div className={styles.topbar}>
        <Link to="/receitas" className={styles.back}>
          ← Voltar
        </Link>

        <div className={styles.actions}>
          <button
            onClick={handleShare}
            className={styles.iconBtn}
            aria-label="Compartilhar receita"
          >
            Compartilhar
          </button>
          <button
            onClick={handlePrint}
            className={styles.iconBtn}
            aria-label="Imprimir receita"
          >
            Imprimir
          </button>
        </div>
      </div>

      <header className={styles.header}>
        <h1 className={styles.title}>{data.nome}</h1>
        <p className={styles.subtitle}>
          {data.ingredientes?.length ?? 0} ingrediente(s) •{" "}
          {data.modo_preparo
            ? `${Math.max(
                1,
                Math.ceil(data.modo_preparo.split("\n").length / 3)
              )} passo(s)`
            : "Modo de preparo não informado"}
        </p>
      </header>

      {data.imagem ? (
        <div className={styles.hero}>
          <img src={data.imagem} alt={data.nome} className={styles.heroImg} />
        </div>
      ) : (
        <div className={styles.heroPlaceholder}>Sem imagem</div>
      )}

      <div className={styles.grid}>
        <main className={styles.main}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Modo de preparo</h2>
            <div className={styles.prep}>
              {data.modo_preparo ? (
                <p className={styles.prepText}>{data.modo_preparo}</p>
              ) : (
                <p className={styles.empty}>Modo de preparo não disponível.</p>
              )}
            </div>
          </section>
        </main>

        <aside className={styles.sidebar}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Ingredientes</h3>

            {data.ingredientes && data.ingredientes.length ? (
              <ul className={styles.ingredients}>
                {data.ingredientes.map((ing, idx) => (
                  <li key={idx} className={styles.ingredient}>
                    <span className={styles.ingredientName}>
                      {ing.ingrediente}
                    </span>
                    {ing.medida && (
                      <span className={styles.ingredientMeasure}>
                        {ing.medida}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.empty}>Nenhum ingrediente cadastrado.</p>
            )}

            <div className={styles.cardFooter}>
              <Link to="/receitas/novo" className={styles.primaryBtn}>
                Criar Receita
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
