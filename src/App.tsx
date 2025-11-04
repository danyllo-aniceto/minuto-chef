import { Routes, Route, Navigate } from "react-router-dom";
import { BaseLayout } from "./components/BaseLayout";
import ReceitasPage from "./pages/Receitas";
import HomePage from "./pages/HomePage";
import ReceitaDetailPage from "./pages/ReceitaDetail";
import CreateReceitaPage from "./pages/CreateReceita";
import AboutPage from "./pages/About";
import { ThemeProvider } from "./context/themeContext";
import EditReceitaPage from "./pages/ReceitaEdit";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import MinhasReceitasPage from "./pages/MinhasReceitas";
import { AuthProvider } from "./context/authContext";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/receitas" element={<ReceitasPage />} />
            <Route path="/receitas/novo" element={<CreateReceitaPage />} />
            <Route path="/receitas/:id" element={<ReceitaDetailPage />} />
            <Route path="/sobre" element={<AboutPage />} />
            <Route path="/receitas/:id/editar" element={<EditReceitaPage />} />
            {/* redirect unknown */}
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/minhas-receitas" element={<MinhasReceitasPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}
