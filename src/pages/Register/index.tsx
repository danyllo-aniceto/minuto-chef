// src/pages/Register.tsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./../../styles/AuthPage.module.css";
import { useAuth } from "../../context/authContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register(nome, email, senha);
      navigate("/receitas");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.message ?? String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h2 className={styles.heading}>Criar conta</h2>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>Nome</label>
          <input
            className={styles.input}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome"
            required
          />

          <label className={styles.label}>E-mail</label>
          <input
            className={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            required
          />

          <label className={styles.label}>Senha</label>
          <input
            className={styles.input}
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Crie uma senha"
            required
          />

          <div className={styles.actionsRow}>
            <Link to="/login" className={styles.ghostBtn}>
              Já tem conta? Entrar
            </Link>

            <button
              className={styles.primaryBtn}
              type="submit"
              disabled={loading}
            >
              {loading ? "Criando..." : "Criar conta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
