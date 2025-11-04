import styles from "./AboutPage.module.css";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

type Creator = {
  id: string;
  name: string;
  photo?: string; // caminho para a imagem em /src/assets/...
  linkedin?: string;
  github?: string;
  role?: string;
};

const CREATORS: Creator[] = [
  {
    id: "c1",
    name: "Danyllo Aniceto",
    photo:
      "https://media.licdn.com/dms/image/v2/D4D03AQEQpNk0cDDJeg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1708571825431?e=1762387200&v=beta&t=Yl0aMLtCBfY8NZmFpnU_xm1-lE9r_p3mekY2zyz2F5A",
    linkedin: "https://www.linkedin.com/in/danyllo-aniceto-564610267/",
    github: "https://github.com/danyllo-aniceto",
    role: "Desenvolvedor FullStack | React | Angular | Spring Boot | Node.js",
  },
  {
    id: "c2",
    name: "Davi Amaral",
    photo:
      "https://media.licdn.com/dms/image/v2/D4D03AQEzy5zYP6IyRA/profile-displayphoto-crop_800_800/B4DZlVKp2dH4AI-/0/1758070482114?e=1762387200&v=beta&t=_uB8CJkSTQ3uKm-IDPx9ReBdYoJ5O2FdLg1ALkAxAX8",
    linkedin: "https://www.linkedin.com/in/davi-amaral-34b668169/",
    github: "https://github.com/Amaraldavi",
    role: "DataBase Administrator | Desenvolvedor Backend | NodeJs | SQLite | Python",
  },
  {
    id: "c3",
    name: "Flávio Barbieri",
    photo:
      "https://media.licdn.com/dms/image/v2/D4D35AQEWhNIQyw08Mg/profile-framedphoto-shrink_800_800/profile-framedphoto-shrink_800_800/0/1723846506495?e=1762905600&v=beta&t=11aVV6SFP_321Z-oybBAKv0NwWrHA9kQr55UleNraog",
    linkedin: "https://www.linkedin.com/in/flavio-henrique-2753612b4/",
    github: "https://github.com/FlavioBarbieri",
    role: "SQLServer | Python | MySQL | Redes | Back-end | Banco de Dados",
  },
  {
    id: "c4",
    name: "Higor Batista",
    photo:
      "https://media.licdn.com/dms/image/v2/D4D03AQH0SI2D1pqyLg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1720133499408?e=1762387200&v=beta&t=kjNJPU739zHS0QU7WRFZizNIKNyLOx9gDu3tkQjIgZw",
    linkedin: "https://www.linkedin.com/in/higor-batista-de-oliveira/",
    github: "https://github.com/higorolv21",
    role: "Design UI/UX | Análise de dados | Business Intelligence",
  },
  {
    id: "c5",
    name: "Matheus Barbosa",
    photo:
      "https://media.licdn.com/dms/image/v2/D4D03AQE0OntJGzR4Ig/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1709908350575?e=1762387200&v=beta&t=fS-T97fQOHucyPUnk2mkcrpRBTsIVLmx-9nSG6Zkz9s",
    linkedin: "https://www.linkedin.com/in/matheusbarbosa00/",
    github: "https://github.com/elmbarbosa",
    role: "Desenvolvedor de Software | Python | SQL",
  },
  {
    id: "c6",
    name: "Pedro Cruz",
    photo:
      "https://media.licdn.com/dms/image/v2/D4E03AQH8TPx2OFMQgQ/profile-displayphoto-crop_800_800/B4EZkRULFwIkAM-/0/1756932125665?e=1762387200&v=beta&t=E2VfF21pNCU_yVHv2faW7SSJZz29FK8h0aFbV7I7Zas",
    linkedin: "https://www.linkedin.com/in/pedro-henrique-cruzbb92872b7/",
    github: "https://github.com/pedro-cruzz",
    role: "Desenvolvedor Backend em Formação | Python, Django, SQL | Backend, APIs e Desenvolvimento Web",
  },
];

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Sobre o Minuto Chef</h1>
        <p className={styles.lead}>
          O Minuto Chef é um projeto simples e prático para compartilhar e
          consultar receitas rápidas — organizado para quem quer cozinhar sem
          complicação. Você pode buscar por nome, filtrar por ingredientes,
          visualizar detalhes e adicionar suas próprias receitas.
        </p>

        <div className={styles.meta}>
          <p>
            <strong>Projeto:</strong> Minuto Chef — site de receitas simples e
            prático.
          </p>
          <p>
            <strong>Curso / Instituição:</strong> Centro Universitário de
            Itajubá - FEPI. — Curso de Análise e Desenvolvimento de Sistemas
            (Projeto de Extensão).
          </p>
          <p>
            <strong>Período:</strong> 4º período — Ano: 2025.
          </p>
        </div>
      </header>

      <section className={styles.teamSection}>
        <h2 className={styles.sectionTitle}>Equipe</h2>
        <p className={styles.sectionLead}>
          Desenvolvido pelos alunos do curso. Clique nos ícones para ver os
          perfis no LinkedIn e GitHub.
        </p>

        <div className={styles.grid}>
          {CREATORS.map((c) => (
            <article key={c.id} className={styles.card}>
              <div className={styles.avatarWrap}>
                {c.photo ? (
                  // se quiser usar import estático, substitua o path acima
                  // por import direto e passe a variável aqui
                  // ex: <img src={Logo} ... />
                  <img src={c.photo} alt={c.name} className={styles.avatar} />
                ) : (
                  <div className={styles.avatarFallback}>
                    {c.name
                      .split(" ")
                      .map((s) => s[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()}
                  </div>
                )}
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.name}>{c.name}</h3>
                {c.role && <p className={styles.role}>{c.role}</p>}

                <div className={styles.links}>
                  {c.linkedin ? (
                    <a
                      href={c.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`LinkedIn de ${c.name}`}
                      className={styles.iconLink}
                    >
                      <LinkedInIcon fontSize="small" />
                    </a>
                  ) : (
                    <span className={styles.iconPlaceholder} />
                  )}

                  {c.github ? (
                    <a
                      href={c.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`GitHub de ${c.name}`}
                      className={styles.iconLink}
                    >
                      <GitHubIcon fontSize="small" />
                    </a>
                  ) : (
                    <span className={styles.iconPlaceholder} />
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <p className={styles.footerText}>
          © {new Date().getFullYear()} Minuto Chef — Projeto de Extensão —
          Centro Universitário de Itajubá - FEPI.
        </p>
      </footer>
    </div>
  );
}
