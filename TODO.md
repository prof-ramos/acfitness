# TODO — AC Fitness

Atualizado em 17 de agosto de 2026.

Este arquivo é a visão operacional do trabalho. O [PRD](docs/PRD.md) define o
escopo e os critérios de aceite; o GitHub Issues é o rastreador oficial. Uma
tarefa só deve ser marcada como concluída após implementação, teste e evidência
proporcional ao risco.

## Estado atual

- [x] Criar monorepo pnpm com Next.js, TypeScript e Turbo.
- [x] Separar domínio, contratos, cliente de API e tokens visuais.
- [x] Implementar contrato OpenAPI e cliente Fetch/SDK gerado.
- [x] Adicionar gate de deriva dos artefatos gerados à CI.
- [x] Provar consumidores reais de `domain` e `api-client` na aplicação web.
- [x] Validar lint, tipos, testes, build e smoke test responsivo da fundação.
- [ ] Comprovar deploy de homologação e separar suas variáveis das de produção.

## Agora — identidade e isolamento

Objetivo do próximo corte: um personal autenticado convida um mentorado e não
consegue acessar dados pertencentes a outro tenant.

- [ ] Reconstituir o Supabase não produtivo na VPS com release fixado.
- [ ] Documentar acesso operacional sem expor Postgres ou Studio publicamente.
- [ ] Criar estrutura `supabase/migrations`, seed sintético e testes pgTAP.
- [ ] Modelar usuários, perfis, tenants, personal, mentorado e vínculo.
- [ ] Implementar migrations forward-only com constraints e auditoria mínima.
- [ ] Configurar Supabase Auth, recuperação de conta e revogação de sessões.
- [ ] Implementar papéis `personal`, `mentorado` e `admin_global`.
- [ ] Centralizar autorização por recurso nos casos de uso da API.
- [ ] Aplicar RLS em todas as tabelas expostas; `anon` não acessa o domínio.
- [ ] Testar IDOR e isolamento cruzado entre dois personais e seus mentorados.
- [ ] Implementar convite único, expiração, reenvio e ativação do mentorado.
- [ ] Entregar um E2E executável do convite ao primeiro acesso.
- [ ] Registrar decisão e limites da arquitetura de identidade em ADR.

## Depois — backlog P0

### Mentorados

- [ ] Cadastro, edição, ativação e inativação.
- [ ] Objetivos, restrições mínimas e observações, sem criar prontuário médico.
- [ ] Perfil com histórico relevante e trilha de auditoria.

### Exercícios

- [ ] Definir o mapeamento do catálogo inicial de aproximadamente 1.200 exercícios.
- [ ] Criar importador idempotente com relatório de rejeições e duplicidades.
- [ ] Implementar exercícios padrão, privados por personal e arquivamento.
- [ ] Adicionar pesquisa e filtros antes de mídia demonstrativa avançada.
- [ ] Arquivar a prova de autorização de uso comercial antes da publicação.

### Modelos e planos

- [ ] Criar modelos reutilizáveis e construtor de sessões/dias.
- [ ] Suportar métricas aplicáveis por repetição, tempo, distância ou combinação.
- [ ] Implementar ordenação, grupos, alternativas e autosave de rascunho.
- [ ] Publicar versões imutáveis com vigência, snapshots e ocorrências.
- [ ] Garantir que uma atualização nunca altere prescrições passadas.

### Execução do mentorado

- [ ] Entregar treino do dia mobile-first e navegação exercício por exercício.
- [ ] Registrar séries prescritas e realizadas separadamente.
- [ ] Implementar timer, observações, RPE, dor, dificuldade e substituição permitida.
- [ ] Tratar conclusão, abandono, repetição, treino atrasado e sessão imutável.
- [ ] Implementar fila offline para sessão já carregada, com idempotência.
- [ ] Retornar conflito `409` por `revision`/`If-Match`, sem merge silencioso.

### Acompanhamento e administração

- [ ] Criar dashboard acionável do personal, histórico e solicitações de mudança.
- [ ] Implementar alertas de dor, dificuldade e ausência prolongada.
- [ ] Entregar painel global mínimo com suspensão e auditoria.
- [ ] Implementar exportação e anonimização/exclusão conforme política de retenção.

### Operação

- [ ] Adicionar logs estruturados, monitoramento, alertas e runbooks.
- [ ] Separar homologação e produção em dados, credenciais e armazenamento.
- [ ] Definir o fornecedor e implementar backup externo criptografado.
- [ ] Comprovar restore mensal, RPO de 15 minutos e RTO de quatro horas.
- [ ] Executar testes E2E, acessibilidade, segurança, carga e recuperação.

## Gates do piloto real

- [ ] Resolver a [issue #1 — revisão jurídica e LGPD](https://github.com/prof-ramos/acfitness/issues/1).
- [ ] Publicar e versionar termos, política de privacidade e consentimentos.
- [ ] Disponibilizar canal do titular e runbook de resposta a incidentes.
- [ ] Exigir TOTP para administradores globais.
- [ ] Demonstrar zero falha conhecida de isolamento entre tenants.
- [ ] Validar backup externo e restore integral dentro do RTO.
- [ ] Aprovar jornadas críticas em Chromium, WebKit e viewport Android.
- [ ] Aprovar WCAG AA nas telas críticas e manter nenhum defeito crítico aberto.

## Pós-MVP

- [ ] Evolution API/WhatsApp, sempre desacoplada e não crítica ao produto.
- [ ] Relatórios simples, catálogo ampliado e melhorias de retenção na versão 1.1.
- [ ] Expo para iOS/Android, push/background e expansão SaaS na versão 2.0.
- [ ] Pagamentos, múltiplos profissionais e integrações somente após validar o MVP.

## Regra de conclusão

Para fechar uma tarefa:

1. critérios de aceite estão explícitos;
2. implementação e migrations estão versionadas;
3. testes relevantes passam na CI;
4. riscos de tenant, LGPD e histórico foram exercitados quando aplicáveis;
5. documentação e issue correspondente refletem o estado real;
6. deploy ou operação só são declarados concluídos com evidência direta.
