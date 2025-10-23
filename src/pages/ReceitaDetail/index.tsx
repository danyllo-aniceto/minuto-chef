import { Link, useNavigate, useParams } from "react-router-dom";
import { useReceita } from "../../hooks/useReceita";
import styles from "./ReceitaDetailPage.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useDeleteReceita } from "../../hooks/useDeleteReceita";

export default function ReceitaDetailPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { data, loading, error } = useReceita(id ?? "");
  const { remove, loading: deleting, error: deleteError } = useDeleteReceita();

  const [confirmOpen, setConfirmOpen] = useState(false);

  async function handleConfirmDelete() {
    if (!id) return;
    const ok = await remove(id);
    if (ok) {
      // opcional: mostrar mensagem curta
      alert("Receita deletada com sucesso.");
      navigate("/receitas");
    } else {
      alert(`Erro ao deletar: ${deleteError ?? "erro desconhecido"}`);
    }
  }

  // share/print code stays the same...
  async function handleShare() {
    /* ... */
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
          <ArrowBackIcon />
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

          {/* botão de deletar */}
          <IconButton
            onClick={() => setConfirmOpen(true)}
            aria-label="Excluir receita"
            size="small"
            title="Excluir receita"
            style={{ color: "var(--color-text)" }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>

      {/* resto do layout (header, hero, grid etc) permanece igual */}
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

      {/* DIALOG de confirmação */}
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        aria-labelledby="confirm-delete-title"
      >
        <DialogTitle id="confirm-delete-title">Confirmar exclusão</DialogTitle>
        <DialogContent>
          Tem certeza que deseja excluir a receita "<strong>{data.nome}</strong>
          "? Esta ação não pode ser desfeita.
          {deleteError && (
            <div style={{ color: "red", marginTop: 8 }}>{deleteError}</div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} disabled={deleting}>
            Cancelar
          </Button>
          <Button
            color="error"
            onClick={async () => {
              await handleConfirmDelete();
              setConfirmOpen(false);
            }}
            disabled={deleting}
          >
            {deleting ? "Excluindo..." : "Excluir"}
          </Button>
        </DialogActions>
      </Dialog>
    </article>
  );
}
