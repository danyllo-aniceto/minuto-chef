import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { Footer } from "../Footer";

export function BaseLayout() {
  return (
    <div className="min-h-screen bg-bg text-text transition-colors duration-300 flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
