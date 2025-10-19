// src/components/Header/index.tsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import Logo from "../../assets/logo_minutoChef.png";
import { ThemeToggle } from "../ThemeToggle";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={`${styles.inner} container`}>
        <NavLink to="/" className={styles.brand}>
          <img src={Logo} alt="Minuto Chef" className={styles.logo} />
          {/* opcional: exibir título se quiser */}
          {/* <span className={styles.title}>Minuto Chef</span> */}
        </NavLink>

        {/* Desktop nav */}
        <nav className={styles.navDesktop}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Início
          </NavLink>
          <NavLink
            to="/receitas"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Receitas
          </NavLink>
          <NavLink
            to="/receitas/novo"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Criar Receita
          </NavLink>
          <NavLink
            to="/sobre"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Sobre
          </NavLink>

          <div className={styles.separator} />
          <div className={styles.toggleDesktop}>
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile: ThemeToggle + hamburger (MUI IconButton) */}
        <div className={styles.mobileRight}>
          <div className={styles.toggleMobile}>
            <ThemeToggle />
          </div>

          <IconButton
            onClick={() => setOpen((s) => !s)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className={styles.hamburgerBtn}
            size="medium"
          >
            {open ? (
              <CloseIcon
                fontSize="small"
                style={{ color: "rgb(var(--color-text))" }}
              />
            ) : (
              <MenuIcon
                fontSize="small"
                style={{ color: "rgb(var(--color-text))" }}
              />
            )}
          </IconButton>
        </div>
      </div>

      {/* mobile menu panel */}
      <div className={`${styles.mobilePanel} ${open ? styles.open : ""}`}>
        <NavLink
          to="/"
          onClick={() => setOpen(false)}
          className={styles.mobileLink}
        >
          Início
        </NavLink>
        <NavLink
          to="/receitas"
          onClick={() => setOpen(false)}
          className={styles.mobileLink}
        >
          Receitas
        </NavLink>
        <NavLink
          to="/receitas/novo"
          onClick={() => setOpen(false)}
          className={styles.mobileLink}
        >
          Criar Receita
        </NavLink>
        <NavLink
          to="/sobre"
          onClick={() => setOpen(false)}
          className={styles.mobileLink}
        >
          Sobre
        </NavLink>
      </div>
    </header>
  );
}
