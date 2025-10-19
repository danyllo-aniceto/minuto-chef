import { IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTheme } from "../../hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <IconButton
      onClick={toggleTheme}
      color="inherit"
      sx={{
        color: theme === "dark" ? "#fff" : "#333",
        transition: "color 0.3s ease",
      }}
    >
      {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}
