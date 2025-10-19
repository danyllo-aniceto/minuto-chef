// src/pages/ReceitasPage/index.tsx
import { useMemo, useState } from "react";
import styles from "./ReceitasPage.module.css";
import { useReceitas } from "../../hooks/useReceitas";
import { useSearchReceitas } from "../../hooks/useSearchReceitas";
import { ReceitasList } from "../../components/ReceitasList";
import type { Receita } from "../../types/receita";
import { IngredientsFilter } from "../../components/IngredientesFilter";

export default function ReceitasPage() {
  const [nameQuery, setNameQuery] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  // fallback: todas as receitas (quando não houver busca ativa)
  const { data: all, loading: loadingAll, error: errorAll } = useReceitas();

  // hook que chama a API com nome + ingredientes (retorna null se nenhum filtro ativo)
  const {
    data: searched,
    loading: loadingSearch,
    error: errorSearch,
  } = useSearchReceitas({ nome: nameQuery, ingredientes: selectedIngredients });

  // Decide quais receitas mostrar:
  // - se searched === null => nenhum filtro ativo => mostra `all`
  // - else mostra `searched` (pode ser [])
  const recipesToShow: Receita[] | null = useMemo(() => {
    if (searched === null) return all ?? null;
    return searched ?? [];
  }, [all, searched]);

  // status combinado
  const loading = (searched !== null ? loadingSearch : loadingAll) || false;
  const error = errorSearch ?? errorAll ?? null;

  function clearAllFilters() {
    setNameQuery("");
    setSelectedIngredients([]);
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h2 className={styles.title}>Receitas</h2>
        <p className={styles.subtitle}>
          Explore receitas criadas pela comunidade.
        </p>
      </header>

      <section className={styles.filters}>
        <div className={styles.filtersInner}>
          {/* Pesquisa por nome */}
          <div className={styles.searchGroup}>
            <label htmlFor="search-name" className={styles.label}>
              Pesquisar por nome
            </label>
            <div className={styles.inputWrap}>
              <input
                id="search-name"
                value={nameQuery}
                onChange={(e) => setNameQuery(e.target.value)}
                placeholder="Digite o nome da receita..."
                className={styles.input}
                aria-label="Pesquisar por nome"
              />
              <button
                type="button"
                className={styles.clearBtn}
                onClick={() => setNameQuery("")}
                aria-hidden={nameQuery === ""}
                style={{ display: nameQuery ? "inline-flex" : "none" }}
                title="Limpar busca por nome"
              >
                ✕
              </button>
            </div>
          </div>

          {/* IngredientsFilter (autocomplete multi) */}
          <div className={styles.ingredientsBlock}>
            <IngredientsFilter
              allRecipes={all}
              selected={selectedIngredients}
              onChange={setSelectedIngredients}
              placeholder="Ex: ovo, farinha, tomate..."
            />
          </div>

          {/* Clear all button */}
          <div className={styles.clearBlock}>
            <button className={styles.clearAllBtn} onClick={clearAllFilters}>
              Limpar filtros
            </button>
          </div>
        </div>

        <div className={styles.hintRow}>
          <p className={styles.hint}>
            Dica: combine nome + ingredientes para refinar.
          </p>
          <p className={styles.status}>
            {loading
              ? "Carregando..."
              : error
              ? `Erro: ${error}`
              : recipesToShow
              ? `${recipesToShow.length} resultado(s)`
              : ""}
          </p>
        </div>
      </section>

      <section className={styles.listSection}>
        <ReceitasList recipes={recipesToShow ?? undefined} />
      </section>
    </div>
  );
}
