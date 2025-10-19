import Banner from "../../assets/banner_home.png";
import LogoWhite from "../../assets/logowhite.png";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";

const HIGHLIGHTS = [
  {
    id: "fast",
    title: "Receitas Rápidas",
    desc: "Pratos prontos em até 30 minutos — perfeitas para o dia a dia.",
    emoji: "⏱️",
  },
  {
    id: "healthy",
    title: "Saudáveis",
    desc: "Opções balanceadas com ingredientes reais e saborosos.",
    emoji: "🥗",
  },
  {
    id: "dessert",
    title: "Sobremesas",
    desc: "Doces fáceis para terminar a refeição com chave de ouro.",
    emoji: "🍰",
  },
];

const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Buscar",
    text: "Encontre receitas por nome ou ingrediente.",
  },
  {
    step: 2,
    title: "Seguir",
    text: "Veja os passos claros e ingredientes listados.",
  },
  { step: 3, title: "Cozinhar", text: "Siga o modo de preparo e aproveite!" },
];

export default function HomePage() {
  return (
    <div>
      <section
        className={styles.hero}
        style={{ backgroundImage: `url(${Banner})` }}
        role="img"
        aria-label="Banner com prato de comida ao fundo"
      >
        <div className={styles.overlay} />
        <div className={`${styles.content} container`}>
          <img src={LogoWhite} alt="Minuto Chef" className={styles.logo} />
          <h1 className={styles.title}>Sua receita deliciosa em minutos</h1>
          <p className={styles.subtitle}>
            Encontre receitas rápidas, práticas e gostosas para aproveitar o dia
            a dia ou impressionar na refeição.
          </p>

          <div className={styles.actions}>
            <Link to="/receitas" className={styles.primary}>
              Ver Receitas
            </Link>
            <Link to="/receitas/novo" className={styles.secondary}>
              Adicionar Receita
            </Link>
          </div>
        </div>
      </section>

      <main className="container" style={{ padding: "2rem 0" }}>
        {/* Highlights cards */}
        <section
          className={styles.highlightsSection}
          aria-labelledby="highlightsTitle"
        >
          <h2 id="highlightsTitle" className={styles.sectionTitle}>
            Destaques
          </h2>

          <p className={styles.sectionSubtitle}>
            Explore categorias e tipos de receitas que você vai adorar.
          </p>

          <div className={styles.grid}>
            {HIGHLIGHTS.map((h) => (
              <article key={h.id} className={styles.card}>
                <div className={styles.cardIcon}>{h.emoji}</div>
                <h3 className={styles.cardTitle}>{h.title}</h3>
                <p className={styles.cardDesc}>{h.desc}</p>
                <Link to={`/receitas`} className={styles.cardCta}>
                  Ver receitas
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className={styles.howSection} aria-labelledby="howTitle">
          <h2 id="howTitle" className={styles.sectionTitle}>
            Como funciona
          </h2>
          <div className={styles.howGrid}>
            {HOW_IT_WORKS.map((h) => (
              <div key={h.step} className={styles.howCard}>
                <div className={styles.howStep}>{h.step}</div>
                <div>
                  <h4 className={styles.howTitle}>{h.title}</h4>
                  <p className={styles.howText}>{h.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
