export function Hero() {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-12">
      <div className="rounded-2xl p-8 md:p-12 shadow-xl bg-bg border border-border">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
          Receitas rápidas. Resultados incríveis.
        </h2>
        <p className="text-lg md:text-xl text-[color:var(--color-text)] mb-6 max-w-2xl">
          Dicas, truques e receitas expressas para quem ama cozinhar, mesmo com
          pouco tempo. Teste o tema claro/escuro e veja como as cores e sombras
          se adaptam.
        </p>
        <div className="flex gap-4 flex-wrap">
          <button className="px-6 py-3 rounded-lg bg-primary text-white font-semibold shadow hover:shadow-2xl transition">
            Começar
          </button>
          <button className="px-6 py-3 rounded-lg border border-border text-text hover:bg-border/30 transition">
            Ver exemplos
          </button>
        </div>
      </div>
    </section>
  );
}
