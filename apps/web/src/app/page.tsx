const decisions = [
  {
    title: "Prescrição preservada",
    body: "Cada mudança publicará uma nova versão. O treino já realizado continua exatamente como aconteceu.",
  },
  {
    title: "Celular primeiro",
    body: "O mentorado registra séries durante o treino; o personal acompanha e ajusta em qualquer tela.",
  },
  {
    title: "Privacidade estrutural",
    body: "Dados de cada personal serão isolados por tenant e protegidos também no banco.",
  },
] as const;

export default function HomePage() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="AC Fitness — início">
          <span className="brand-mark" aria-hidden="true">
            AC
          </span>
          <span>Fitness</span>
        </a>
        <span className="build-label">Fundação em curso</span>
      </header>

      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Prescrever · executar · ajustar</p>
          <h1 id="hero-title">Treinos que continuam fazendo sentido.</h1>
          <p className="hero-lede">
            O AC Fitness está construindo uma forma simples de o personal organizar
            o plano e enxergar o que o mentorado realmente conseguiu fazer.
          </p>

          <div className="truth-strip" aria-label="Disponibilidade atual">
            <span>Sem login ainda</span>
            <span>Sem dados reais</span>
            <a href="/api/v1/health">Ver saúde da API</a>
          </div>
        </div>

        <div className="workout-ledger" aria-label="Exemplo conceitual de prescrição e execução">
          <div className="ledger-heading">
            <div>
              <span className="utility-label">Sessão A</span>
              <strong>Força de base</strong>
            </div>
            <span className="version-chip">v.03</span>
          </div>

          <div className="exercise-name">
            <span>01</span>
            <div>
              <strong>Agachamento livre</strong>
              <small>3 séries · descanso 90 s</small>
            </div>
          </div>

          <div className="set-table" role="table" aria-label="Prescrito e realizado">
            <div className="set-row set-header" role="row">
              <span role="columnheader">Série</span>
              <span role="columnheader">Prescrito</span>
              <span role="columnheader">Realizado</span>
            </div>
            <div className="set-row" role="row">
              <span role="cell">01</span>
              <span role="cell">10 × 42 kg</span>
              <span className="done" role="cell">10 × 42 kg</span>
            </div>
            <div className="set-row" role="row">
              <span role="cell">02</span>
              <span role="cell">10 × 42 kg</span>
              <span className="adjusted" role="cell">8 × 40 kg</span>
            </div>
            <div className="set-row muted" role="row">
              <span role="cell">03</span>
              <span role="cell">10 × 42 kg</span>
              <span role="cell">—</span>
            </div>
          </div>

          <p className="ledger-note">
            O planejado e o realizado convivem sem reescrever o histórico.
          </p>
        </div>
      </section>

      <section className="decisions" aria-labelledby="decisions-title">
        <div className="section-intro">
          <p className="eyebrow">Base do produto</p>
          <h2 id="decisions-title">O que já está decidido</h2>
        </div>

        <div className="decision-list">
          {decisions.map((decision, index) => (
            <article key={decision.title}>
              <span className="decision-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{decision.title}</h3>
              <p>{decision.body}</p>
            </article>
          ))}
        </div>
      </section>

      <footer>
        <p>AC Fitness · MVP em construção</p>
        <p>Primeira entrega: fundação web, contratos e regras compartilhadas.</p>
      </footer>
    </main>
  );
}
