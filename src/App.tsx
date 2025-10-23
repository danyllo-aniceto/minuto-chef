import { Routes, Route, Navigate } from "react-router-dom";
import { BaseLayout } from "./components/BaseLayout";
import ReceitasPage from "./pages/Receitas";
import HomePage from "./pages/HomePage";
import ReceitaDetailPage from "./pages/ReceitaDetail";
import CreateReceitaPage from "./pages/CreateReceita";
import AboutPage from "./pages/About";
import { ThemeProvider } from "./context/themeContext";

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/receitas" element={<ReceitasPage />} />
          <Route path="/receitas/novo" element={<CreateReceitaPage />} />
          <Route path="/receitas/:id" element={<ReceitaDetailPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          {/* redirect unknown */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
