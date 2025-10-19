import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} container`}>
        <div className={styles.left}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} Minuto Chef
          </p>
        </div>

        <div className={styles.right}>
          <nav className={styles.links} aria-label="Links do rodapé">
            <Link to="/sobre" className={styles.link}>
              Sobre
            </Link>
            <Link to="/privacidade" className={styles.link}>
              Privacidade
            </Link>
            <a
              href="mailto:contato@minutochef.example"
              className={styles.link}
              rel="noopener noreferrer"
            >
              Contato
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
