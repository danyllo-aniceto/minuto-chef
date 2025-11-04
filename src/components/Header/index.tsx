// src/components/Header/index.tsx
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import Logo from "../../assets/logo_minutoChef.png";
import LogoWhite from "../../assets/logo_minutoChef_white.png";
import { ThemeToggle } from "../ThemeToggle";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../context/authContext";

export function Header() {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <div className={`${styles.inner} container`}>
        <NavLink to="/" className={styles.brand}>
          <img
            src={theme === "dark" ? LogoWhite : Logo}
            alt="Minuto Chef"
            className={styles.logo}
          />
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
            end
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Receitas
          </NavLink>

          {user && (
            <NavLink
              to="/minhas-receitas"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Minhas Receitas
            </NavLink>
          )}

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

          {/* login/logout */}
          {!user ? (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Login
            </NavLink>
          ) : (
            <>
              <span className={styles.userName}>👋 {user.nome}</span>
              <NavLink
                onClick={handleLogout}
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
                to="/login"
              >
                Sair
              </NavLink>
            </>
          )}

          <div className={styles.toggleDesktop}>
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile */}
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

      {/* Mobile Menu */}
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

        {user && (
          <NavLink
            to="/minhas-receitas"
            onClick={() => setOpen(false)}
            className={styles.mobileLink}
          >
            Minhas Receitas
          </NavLink>
        )}

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

        <div className={styles.mobileAuth}>
          {!user ? (
            <Button
              fullWidth
              variant="contained"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          ) : (
            <Button
              fullWidth
              color="error"
              variant="contained"
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
