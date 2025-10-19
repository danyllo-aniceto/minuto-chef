type CardProps = { title: string; desc: string; accent?: boolean };

function Card({ title, desc, accent }: CardProps) {
  return (
    <article
      className={`rounded-2xl p-6 border border-border shadow-md card-float bg-bg
      ${accent ? "bg-primary text-white" : ""}`}
    >
      <h3
        className={`text-lg font-semibold ${
          accent ? "text-white" : "text-primary"
        }`}
      >
        {title}
      </h3>
      <p className={`${accent ? "text-white/90" : "text-text/90"} mt-3`}>
        {desc}
      </p>
      <div className="mt-4 flex gap-2">
        <button
          className={`px-3 py-1 rounded bg-transparent ${
            accent ? "border-white/30 text-white/90" : "border-border text-text"
          } border text-sm`}
        >
          Ver
        </button>
        <button
          className={`px-3 py-1 rounded ${
            accent ? "bg-white/10 text-white" : "bg-primary text-white"
          } text-sm`}
        >
          Ação
        </button>
      </div>
    </article>
  );
}

export function CardsGrid() {
  return (
    <section
      id="cards"
      className="w-full max-w-5xl mx-auto px-4 py-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <Card
        title="Receita Rápida"
        desc="30 minutos para uma refeição completa."
      />
      <Card
        title="Dica do Chef"
        desc="Segredos para saltear na temperatura certa."
        accent
      />
      <Card title="Sobremesa" desc="Doces práticos com 3 ingredientes." />
      <Card
        title="Jantar em família"
        desc="Porções que rendem e agradam todo mundo."
      />
      <Card title="Vegano" desc="Alternativas com proteína vegetal." />
      <Card title="Fácil" desc="Passo a passo simplificado." />
    </section>
  );
}
