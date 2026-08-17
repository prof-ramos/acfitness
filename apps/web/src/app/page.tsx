import { calcularAderencia, type OcorrenciaAderencia } from "@acfitness/domain";

import { HealthCheck } from "./health-check";

const cenarioDeReferencia = [
  { tipo: "prevista", estado: "concluida", encerrada: true },
  { tipo: "prevista", estado: "concluida_com_atraso", encerrada: true },
  { tipo: "prevista", estado: "nao_realizada", encerrada: true }
] satisfies readonly OcorrenciaAderencia[];

const aderencia = calcularAderencia(cenarioDeReferencia);
const aderenciaFormatada = new Intl.NumberFormat("pt-BR", {
  style: "percent",
  maximumFractionDigits: 0
}).format(aderencia ?? 0);

export default function HomePage() {
  return (
    <main className="foundation-shell">
      <header className="site-header">
        <a className="brand" href="#conteudo" aria-label="AC Fitness — início">
          <span className="brand-mark" aria-hidden="true">AC</span>
          <span>Fitness</span>
        </a>
        <span className="build-label">Ambiente de desenvolvimento</span>
      </header>

      <section className="foundation-intro" id="conteudo" aria-labelledby="page-title">
        <div>
          <p className="eyebrow">Fundação operacional</p>
          <h1 id="page-title">Base pronta. Produto ainda não.</h1>
        </div>
        <p className="intro-copy">
          Esta tela verifica as fronteiras que serão compartilhadas pela web e
          pelo futuro aplicativo. Login, dados reais e prescrição entram nas
          próximas etapas.
        </p>
      </section>

      <section className="checks" aria-label="Verificações da fundação">
        <article className="check-row">
          <span className="check-marker" aria-hidden="true">01</span>
          <div className="check-heading">
            <p className="utility-label">Domínio compartilhado</p>
            <h2>Aderência de referência</h2>
          </div>
          <div className="domain-result">
            <strong>{aderenciaFormatada}</strong>
            <p>
              Duas ocorrências concluídas entre três previstas encerradas,
              calculadas pelo pacote de domínio.
            </p>
          </div>
        </article>

        <article className="check-row">
          <span className="check-marker" aria-hidden="true">02</span>
          <div className="check-heading">
            <p className="utility-label">Cliente OpenAPI gerado</p>
            <h2>Conexão da API</h2>
          </div>
          <HealthCheck />
        </article>
      </section>

      <section className="next-step" aria-labelledby="next-title">
        <p className="eyebrow">Próxima etapa</p>
        <h2 id="next-title">Identidade e isolamento.</h2>
        <p>
          Reconstruir o ambiente de dados, implementar autenticação, tenant e
          RLS e provar que um personal nunca acessa recursos de outro.
        </p>
      </section>

      <footer>
        <span>AC Fitness · fundação do MVP</span>
        <a href="/api/v1/health">Resposta JSON da API</a>
      </footer>
    </main>
  );
}
