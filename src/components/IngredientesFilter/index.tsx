import React, { useEffect, useMemo, useState } from "react";
import styles from "./IngredientsFilter.module.css";
import type { Receita } from "../../types/receita";

type Props = {
  allRecipes: Receita[] | null | undefined;
  selected: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
};

export function IngredientsFilter({
  allRecipes,
  selected,
  onChange,
  placeholder,
}: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(0);

  // extrai ingredientes únicos do conjunto de receitas
  const allIngredients = useMemo(() => {
    const set = new Set<string>();
    if (!allRecipes) return [] as string[];
    for (const r of allRecipes) {
      if (!r.ingredientes) continue;
      for (const ing of r.ingredientes) {
        if (!ing?.ingrediente) continue;
        set.add(ing.ingrediente.trim().toLowerCase());
      }
    }
    return Array.from(set).sort();
  }, [allRecipes]);

  // sugestões filtradas (exclui já selecionados)
  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    const lowerSelected = selected.map((s) => s.toLowerCase());
    return allIngredients
      .filter((i) => i.includes(q) && !lowerSelected.includes(i))
      .slice(0, 10);
  }, [allIngredients, query, selected]);

  // adiciona tag normalizada
  function addTag(text: string) {
    const t = text.trim();
    if (!t) return;
    const normalized = t;
    if (selected.some((s) => s.toLowerCase() === normalized.toLowerCase())) {
      setQuery("");
      setOpen(false);
      return;
    }
    onChange([...selected, normalized]);
    setQuery("");
    setOpen(false);
  }

  function removeTag(idx: number) {
    const next = [...selected];
    next.splice(idx, 1);
    onChange(next);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIdx((h) =>
        Math.min(h + 1, Math.max(0, suggestions.length - 1))
      );
      setOpen(true);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIdx((h) => Math.max(0, h - 1));
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      if (open && suggestions.length) {
        addTag(suggestions[highlightIdx]);
      } else if (query.trim()) {
        addTag(query);
      }
      return;
    }
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (e.key === "Backspace" && !query && selected.length) {
      removeTag(selected.length - 1);
    }
  }

  useEffect(() => {
    if (!query.trim()) {
      setOpen(false);
      setHighlightIdx(0);
    } else {
      setOpen(true);
      setHighlightIdx(0);
    }
  }, [query]);

  return (
    <div className={styles.root}>
      <label className={styles.label}>Pesquisar por ingredientes</label>

      <div className={styles.inputRow}>
        <div className={styles.tags}>
          {selected.map((t, i) => (
            <button
              key={t + i}
              type="button"
              className={styles.tag}
              onClick={() => removeTag(i)}
              aria-label={`Remover ingrediente ${t}`}
            >
              <span className={styles.tagText}>{t}</span>
              <span className={styles.tagRemove} aria-hidden>
                ✕
              </span>
            </button>
          ))}

          <input
            className={styles.input}
            placeholder={
              placeholder ?? "Digite um ingrediente e pressione Enter..."
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Filtro por ingrediente"
            onFocus={() => {
              if (query.trim()) setOpen(true);
            }}
          />
        </div>

        {selected.length > 0 && (
          <button
            type="button"
            className={styles.clearAll}
            onClick={() => onChange([])}
            title="Limpar ingredientes selecionados"
          >
            Limpar
          </button>
        )}
      </div>

      {open && suggestions.length > 0 && (
        <ul
          className={styles.suggestions}
          role="listbox"
          aria-label="Sugestões de ingredientes"
        >
          {suggestions.map((s, idx) => (
            <li
              key={s}
              className={`${styles.suggestion} ${
                idx === highlightIdx ? styles.highlight : ""
              }`}
              onMouseDown={(e) => {
                e.preventDefault(); // evita blur antes do click
                addTag(s);
              }}
              role="option"
              aria-selected={idx === highlightIdx}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
