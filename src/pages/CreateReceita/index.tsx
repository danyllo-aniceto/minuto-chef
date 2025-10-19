// src/pages/CreateReceitaPage/index.tsx
import React from "react";
import { Link } from "react-router-dom";
import { CreateReceitaForm } from "../../components/CreateReceitaForm";
import styles from "./CreateReceitaPage.module.css";

export default function CreateReceitaPage() {
  return (
    <div className={styles.page}>
      <div className={styles.top}>
        <Link to="/receitas" className={styles.back}>
          ← Voltar às receitas
        </Link>
        <h1 className={styles.title}>Criar Receita</h1>
      </div>

      <div className={styles.lead}>
        Preencha o formulário abaixo para adicionar uma nova receita. Você pode
        incluir imagem (URL), modo de preparo e lista de ingredientes.
      </div>

      <div className={styles.formWrap}>
        <CreateReceitaForm />
      </div>
    </div>
  );
}
