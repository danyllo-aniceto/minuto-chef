// src/pages/ReceitaDetail/index.tsx
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
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "../../context/authContext";

export default function ReceitaDetailPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { data, loading, error } = useReceita(id ?? "");
  const { remove, loading: deleting, error: deleteError } = useDeleteReceita();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackSeverity, setSnackSeverity] = useState<"success" | "error">(
    "success"
  );

  const { user } = useAuth();
  const isCreator = user && data && Number(user.id) === Number(data.usuario_id);

  async function handleConfirmDelete() {
    if (!id) return;
    const ok = await remove(id);
    if (ok) {
      // redireciona para /receitas e passa mensagem via state para a list
      navigate("/receitas", {
        state: {
          toast: {
            message: "Receita deletada com sucesso.",
            severity: "success",
          },
        },
      });
    } else {
      // mostra snackbar de erro aqui mesmo
      setSnackMsg(`Erro ao deletar: ${deleteError ?? "erro desconhecido"}`);
      setSnackSeverity("error");
      setSnackOpen(true);
    }
  }

  // share/print (mantive stub)
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
        setSnackMsg("Link copiado para a área de transferência!");
        setSnackSeverity("success");
        setSnackOpen(true);
      } else {
        window.prompt("Copie o link abaixo:", url);
      }
    } catch (err) {
      console.error("Share erro:", err);
      setSnackMsg("Erro ao compartilhar.");
      setSnackSeverity("error");
      setSnackOpen(true);
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
    <>
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
            {/* botão editar */}
            {isCreator && (
              <>
                <IconButton
                  aria-label="Editar receita"
                  size="small"
                  title="Editar receita"
                  style={{ color: "var(--color-text)" }}
                  onClick={() => navigate(`/receitas/${id}/editar`)}
                >
                  <EditIcon />
                </IconButton>

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
              </>
            )}
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
                  <p className={styles.empty}>
                    Modo de preparo não disponível.
                  </p>
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

      {/* DIALOG de confirmação - adaptado ao tema usando CSS vars para background e color */}
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        aria-labelledby="confirm-delete-title"
        PaperProps={{
          sx: {
            backgroundColor: "rgb(var(--color-bg))",
            color: "rgb(var(--color-text))",
            // opcional: borda suave
            border: "1px solid",
            borderColor: "rgb(var(--color-border))",
          },
        }}
      >
        <DialogTitle
          id="confirm-delete-title"
          sx={{ color: "rgb(var(--color-primary))" }}
        >
          Confirmar exclusão
        </DialogTitle>
        <DialogContent sx={{ color: "rgb(var(--color-text))" }}>
          Tem certeza que deseja excluir a receita{" "}
          <strong style={{ color: "inherit" }}>{data.nome}</strong>? Esta ação
          não pode ser desfeita.
          {deleteError && (
            <div style={{ color: "red", marginTop: 8 }}>{deleteError}</div>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 2, pb: 2 }}>
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

      {/* Snackbar local (error / info) */}
      <Snackbar
        open={snackOpen}
        autoHideDuration={4000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackOpen(false)}
          severity={snackSeverity}
          variant="filled"
          sx={{
            // usar variáveis para manter consistência com tema
            bgcolor:
              snackSeverity === "success"
                ? "rgb(var(--color-primary))"
                : undefined,
            color: "rgb(var(--color-bg))",
          }}
        >
          {snackMsg}
        </Alert>
      </Snackbar>
    </>
  );
}
