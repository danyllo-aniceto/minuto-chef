export function Reader() {
  return (
    <section id="reader" className="w-full max-w-3xl mx-auto px-4 py-8">
      <div className="rounded-xl p-6 bg-[color:var(--reader-bg)] border border-border shadow-inner">
        <h4 className="text-2xl font-bold mb-3 text-primary">Leitura rápida</h4>
        <p className="text-base leading-relaxed text-[color:var(--color-text)]/95">
          Aqui vai um resumo rápido, com contraste e espaçamento para testar
          legibilidade. No tema escuro as variáveis mudam e o leitor continua
          com boa leitura graças aos ajustes de <strong>--reader-bg</strong> e{" "}
          <strong>--color-text</strong>.
        </p>
        <div className="mt-4 flex gap-3">
          <button className="px-4 py-2 rounded bg-primary text-white shadow hover:shadow-lg">
            Salvar
          </button>
          <button className="px-4 py-2 rounded border border-border text-text">
            Compartilhar
          </button>
        </div>
      </div>
    </section>
  );
}
