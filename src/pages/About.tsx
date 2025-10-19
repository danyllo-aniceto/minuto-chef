export default function AboutPage() {
  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-bold mb-4 text-primary">
        Sobre o Minuto Chef
      </h2>
      <p className="mb-2">
        Projeto simples para gerenciar e consultar receitas. Front-end em React
        + Vite + TypeScript + Tailwind; backend em Express + SQLite.
      </p>
      <p className="text-sm text-[color:var(--color-text)]/80">
        Use as rotas no header para navegar entre listagens, criação de receitas
        e detalhes.
      </p>
    </div>
  );
}
