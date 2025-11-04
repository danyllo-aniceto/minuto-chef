import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./MinhasReceitas.module.css";
import { useAuth } from "../../context/authContext";
import { receitasService } from "../../services/receitasService";
import { useReceitas } from "../../hooks/useReceitas";
import { IngredientsFilter } from "../../components/IngredientesFilter";
import { ReceitasList } from "../../components/ReceitasList";
import type { Receita } from "../../types/receita";

export default function MinhasReceitasPage() {
  const { user, loading: authLoading } = useAuth();

  const [nameQuery, setNameQuery] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const [list, setList] = useState<Receita[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // usamos todas as receitas para popular o autocomplete do IngredientsFilter
  const { data: all } = useReceitas();

  // Debounce simples para reduzir requests enquanto digita
  useEffect(() => {
    if (!user) {
      setList([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    const t = setTimeout(() => {
      async function load() {
        try {
          // passamos ingrediente como string (você pode adaptar seu backend para aceitar join)
          const ingredienteParam =
            selectedIngredients && selectedIngredients.length
              ? selectedIngredients.join(",")
              : undefined;

          const r = await receitasService.minhas({
            nome: nameQuery || undefined,
            ingrediente: ingredienteParam,
          });
          setList(r);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          console.error("Erro ao carregar minhas receitas:", err);
          setError(err?.message ?? String(err));
          setList([]);
        } finally {
          setLoading(false);
        }
      }
      load();
    }, 330);

    return () => clearTimeout(t);
  }, [user, nameQuery, selectedIngredients]);

  // status text
  const statusText = useMemo(() => {
    if (authLoading) return "Verificando autenticação...";
    if (!user) return "Você precisa entrar para ver suas receitas.";
    if (loading) return "Carregando...";
    if (error) return `Erro: ${error}`;
    if (!list) return "";
    return `${list.length} resultado(s)`;
  }, [authLoading, user, loading, error, list]);

  // se não logado, mostra sugestão para logar/registrar
  if (!user && !authLoading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.emptyCard}>
          <h2 className={styles.title}>Minhas Receitas</h2>
          <p className={styles.lead}>
            Você precisa estar logado para ver receitas criadas por você.
          </p>

          <div className={styles.authActions}>
            <Link to="/login" className={styles.primaryBtn}>
              Entrar
            </Link>
            <Link to="/register" className={styles.secondaryBtn}>
              Registrar
            </Link>
          </div>

          <div style={{ marginTop: 18, color: "var(--color-text-muted)" }}>
            Ainda assim você pode ver{" "}
            <Link to="/receitas">todas as receitas</Link> publicadas pela
            comunidade.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h2 className={styles.title}>Minhas Receitas</h2>
        <p className={styles.subtitle}>
          Aqui estão as receitas que você criou. Use os filtros para encontrar
          rapidamente.
        </p>
      </header>

      <section className={styles.filters}>
        <div className={styles.filtersInner}>
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

          <div className={styles.ingredientsBlock}>
            <IngredientsFilter
              allRecipes={all}
              selected={selectedIngredients}
              onChange={setSelectedIngredients}
              placeholder="Filtrar por ingrediente (multi)"
            />
          </div>

          <div className={styles.clearBlock}>
            <button
              className={styles.clearAllBtn}
              onClick={() => {
                setNameQuery("");
                setSelectedIngredients([]);
              }}
            >
              Limpar filtros
            </button>
          </div>
        </div>

        <div className={styles.hintRow}>
          <p className={styles.hint}>Dica: combine nome + ingredientes.</p>
          <p className={styles.status}>{statusText}</p>
        </div>
      </section>

      <section className={styles.listSection}>
        <ReceitasList recipes={list ?? undefined} />
      </section>
    </div>
  );
}
