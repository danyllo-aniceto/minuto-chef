import { Link, useNavigate } from "react-router-dom";
import { CreateReceitaForm } from "../../components/CreateReceitaForm";
import styles from "./CreateReceitaPage.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect } from "react";
import { useAuth } from "../../context/authContext";

export default function CreateReceitaPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // se não estiver logado, redireciona para login
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div className={styles.page}>
        <div className={styles.cardCenter}>
          <h2>Você precisa estar logado para criar uma receita.</h2>
          <p style={{ marginTop: 8 }}>
            <Link to="/login" className={styles.loginLink}>
              Ir para login
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.top}>
        <Link to="/receitas" className={styles.back}>
          <ArrowBackIcon />
        </Link>
        <h1 className={styles.title}>Criar Receita</h1>
      </div>

      <div className={styles.lead}>
        Preencha o formulário abaixo para adicionar uma nova receita. A receita
        será automaticamente vinculada à sua conta ({user.nome}).
      </div>

      <div className={styles.formWrap}>
        <CreateReceitaForm />
      </div>
    </div>
  );
}
