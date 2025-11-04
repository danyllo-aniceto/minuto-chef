import React, { useState, forwardRef, useImperativeHandle } from "react";
import type { Ingrediente, NovaReceita, Receita } from "../../types/receita";
import styles from "./EditReceitaForm.module.css";

type Props = { initial: Receita };

export const EditReceitaForm = forwardRef<
  { getValues: () => NovaReceita | null },
  Props
>(({ initial }, ref) => {
  const [nome, setNome] = useState(initial.nome ?? "");
  const [imagem, setImagem] = useState(initial.imagem ?? "");
  const [modoPreparo, setModoPreparo] = useState(initial.modo_preparo ?? "");
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>(
    initial.ingredientes ?? [{ ingrediente: "", medida: "" }]
  );
  const [error, setError] = useState<string | null>(null);

  useImperativeHandle(ref, () => ({
    getValues: () => {
      if (!nome.trim()) {
        setError("Nome é obrigatório");
        return null;
      }

      const cleanedIngredients = ingredientes
        .map((i) => ({
          ingrediente: (i.ingrediente || "").trim(),
          medida: (i.medida || "").trim(),
        }))
        .filter((i) => i.ingrediente.length > 0);

      if (!cleanedIngredients.length) {
        setError("Adicione pelo menos 1 ingrediente");
        return null;
      }

      setError(null);

      return {
        nome: nome.trim(),
        imagem: imagem.trim() || undefined,
        modo_preparo: modoPreparo.trim() || undefined,
        ingredientes: cleanedIngredients,
      };
    },
  }));

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

  return (
    <div className={styles.container}>
      <div className={styles.topbar}>
        <h3 className={styles.title}>Editar Receita</h3>
      </div>

      <div className={styles.grid}>
        {/* MAIN: FORM */}
        <main className={styles.main}>
          <div className={styles.card}>
            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.field}>
              <label className={styles.label}>Nome</label>
              <input
                className={styles.input}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite o nome da receita"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Imagem (URL)</label>
              <input
                className={styles.input}
                value={imagem}
                onChange={(e) => setImagem(e.target.value)}
                placeholder="https://..."
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Modo de preparo</label>
              <textarea
                className={styles.textarea}
                value={modoPreparo}
                onChange={(e) => setModoPreparo(e.target.value)}
                placeholder="Descreva o modo de preparo..."
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Ingredientes</label>
              <div className={styles.ingredientsList}>
                {ingredientes.map((ing, i) => (
                  <div key={i} className={styles.ingredienteRow}>
                    <input
                      className={styles.input}
                      value={ing.ingrediente}
                      onChange={(e) =>
                        handleIngredienteChange(
                          i,
                          "ingrediente",
                          e.target.value
                        )
                      }
                      placeholder="Ingrediente"
                    />
                    <input
                      className={`${styles.input} ${styles.inputMeasure}`}
                      value={ing.medida}
                      onChange={(e) =>
                        handleIngredienteChange(i, "medida", e.target.value)
                      }
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

              <div className={styles.rowActions}>
                <button
                  type="button"
                  onClick={addIngrediente}
                  className={styles.addBtn}
                >
                  + Adicionar ingrediente
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* SIDEBAR: preview / resumo */}
        <aside className={styles.sidebar}>
          <div className={styles.card}>
            <div className={styles.previewTitle}>Pré-visualização</div>

            <div className={styles.hero}>
              {imagem ? (
                <img
                  src={imagem}
                  alt={nome || "Pré-visualização"}
                  className={styles.heroImg}
                />
              ) : (
                <div className={styles.heroPlaceholder}>Sem imagem</div>
              )}
            </div>

            <div className={styles.cardSection}>
              <h4 className={styles.cardHeading}>Ingredientes</h4>
              {ingredientes && ingredientes.length ? (
                <ul className={styles.previewIngredients}>
                  {ingredientes
                    .filter((i) => (i.ingrediente || "").trim())
                    .map((ing, idx) => (
                      <li key={idx} className={styles.previewIngredient}>
                        <span className={styles.ingName}>
                          {ing.ingrediente}
                        </span>
                        {ing.medida && (
                          <span className={styles.ingMeasure}>
                            {ing.medida}
                          </span>
                        )}
                      </li>
                    ))}
                </ul>
              ) : (
                <div className={styles.empty}>Nenhum ingrediente</div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
});

EditReceitaForm.displayName = "EditReceitaForm";
export default EditReceitaForm;
