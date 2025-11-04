import React, { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useReceita } from "../../hooks/useReceita";
import { useUpdateReceita } from "../../hooks/useUpdateReceita";
import { EditReceitaForm } from "../../components/EditReceitaForm";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import type { NovaReceita } from "../../types/receita";
import styles from "./ReceitaEditPage.module.css"; // ✅ importamos o CSS

export default function EditReceitaPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { data, loading, error } = useReceita(id ?? "");
  const { update, loading: updating, error: updateError } = useUpdateReceita();

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackSeverity, setSnackSeverity] = useState<"success" | "error">(
    "success"
  );

  const formRef = useRef<{ getValues: () => NovaReceita | null }>(null);

  if (!id) return <div>ID não informado.</div>;
  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!data) return <div>Receita não encontrada.</div>;

  async function handleSave() {
    if (!formRef.current) return;
    const payload = formRef.current.getValues();
    if (!payload) return;

    try {
      await update(id!, payload);
      setSnackMsg("Receita atualizada com sucesso!");
      setSnackSeverity("success");
      setSnackOpen(true);
      navigate(`/receitas/${id}`);
    } catch {
      setSnackMsg(updateError ?? "Erro ao atualizar");
      setSnackSeverity("error");
      setSnackOpen(true);
    }
  }

  return (
    <div className={styles.container}>
      <EditReceitaForm ref={formRef} initial={data} />

      <div className={styles.actions}>
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => navigate(-1)}
          disabled={updating}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={updating}
        >
          {updating ? "Salvando..." : "Salvar alterações"}
        </Button>
      </div>

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
        >
          {snackMsg}
        </Alert>
      </Snackbar>
    </div>
  );
}
