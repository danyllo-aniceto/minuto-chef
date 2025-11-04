import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateReceitaForm.module.css";
import type { Ingrediente, NovaReceita } from "../../types/receita";
import { useCreateReceita } from "../../hooks/useCreateReceita";
import { useAuth } from "../../context/authContext";

export function CreateReceitaForm() {
  const navigate = useNavigate();
  const { create, loading, error, result } = useCreateReceita();
  const { user } = useAuth();

  const [nome, setNome] = useState("");
  const [imagem, setImagem] = useState("");
  const [modoPreparo, setModoPreparo] = useState("");
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([
    { ingrediente: "", medida: "" },
  ]);

  function handleIngredienteChange(
    index: number,
    field: keyof Ingrediente,
    value: string
  ) {
    setIngredientes((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  }

  function addIngrediente() {
    setIngredientes((prev) => [...prev, { ingrediente: "", medida: "" }]);
  }

  function removeIngrediente(i: number) {
    setIngredientes((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nome.trim()) return alert("Nome é obrigatório");

    const cleanedIngredients = ingredientes
      .map((i) => ({
        ingrediente: (i.ingrediente || "").trim(),
        medida: (i.medida || "").trim(),
      }))
      .filter((i) => i.ingrediente.length > 0);

    if (!cleanedIngredients.length)
      return alert("Adicione pelo menos 1 ingrediente");

    const payload: NovaReceita = {
      nome: nome.trim(),
      imagem: imagem.trim() || undefined,
      modo_preparo: modoPreparo.trim() || undefined,
      ingredientes: cleanedIngredients,
    };

    try {
      // Tenta usar o valor retornado por create()
      const ret = await create(payload);
      // ret pode ser undefined dependendo do hook; tenta extrair id de várias formas
      const newId =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (ret && (ret as any).id) ?? (result && (result as any).id) ?? null;

      if (newId) {
        // navega para a página de detalhe da nova receita
        navigate(`/receitas/${newId}`);
        return;
      }

      // se não houver id retornado, apenas notifica e limpa (comportamento antigo)
      alert(`Receita criada com id ${result?.id ?? "?"}`);
      setNome("");
      setImagem("");
      setModoPreparo("");
      setIngredientes([{ ingrediente: "", medida: "" }]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(`Erro: ${err?.message ?? String(err)}`);
    }
  }

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <h3 className={styles.formTitle}>Adicionar Receita</h3>
      {user && (
        <p style={{ fontSize: "0.9rem", marginBottom: "1rem", color: "#888" }}>
          Criando como <strong>{user.nome}</strong>
        </p>
      )}
      <div className={styles.field}>
        <label className={styles.label}>Nome</label>
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className={styles.input}
          placeholder="Ex: Bolo de Chocolate"
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Imagem (URL)</label>
        <input
          value={imagem}
          onChange={(e) => setImagem(e.target.value)}
          className={styles.input}
          placeholder="https://..."
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Modo de preparo</label>
        <textarea
          value={modoPreparo}
          onChange={(e) => setModoPreparo(e.target.value)}
          className={styles.textarea}
          placeholder="Passo a passo..."
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Ingredientes</label>

        <div className={styles.ingredients}>
          {ingredientes.map((ing, i) => (
            <div key={i} className={styles.ingredientRow}>
              <input
                value={ing.ingrediente}
                onChange={(e) =>
                  handleIngredienteChange(i, "ingrediente", e.target.value)
                }
                className={`${styles.input} ${styles.inputFlex}`}
                placeholder="Ingrediente"
              />
              <input
                value={ing.medida}
                onChange={(e) =>
                  handleIngredienteChange(i, "medida", e.target.value)
                }
                className={`${styles.input} ${styles.inputSmall}`}
                placeholder="Medida"
              />
              <button
                type="button"
                onClick={() => removeIngrediente(i)}
                className={styles.removeBtn}
                aria-label={`Remover ingrediente ${i + 1}`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className={styles.addRow}>
          <button
            type="button"
            onClick={addIngrediente}
            className={styles.addBtn}
          >
            + Adicionar ingrediente
          </button>
        </div>
      </div>

      <div className={styles.actions}>
        <button type="submit" disabled={loading} className={styles.submitBtn}>
          {loading ? "Salvando..." : "Salvar Receita"}
        </button>

        {error && <span className={styles.errorText}>{error}</span>}
        {result && <span className={styles.successText}>ID: {result.id}</span>}
      </div>
    </form>
  );
}
