# ADR-0001 — Fundação do monorepo e recorte de dados

- **Status:** aceito para a fundação inicial
- **Data:** 2026-08-17

## Contexto

O MVP precisa de uma base web/API com contratos e regras reutilizáveis pelo futuro cliente nativo, sem misturar o domínio com componentes de interface. O PRD define Next.js 16.2 + React 19.2 para a web, Node.js 24 e uma organização monorepo. A etapa de Supabase e migrations depende da reconstrução do ambiente de dados; a VPS foi formatada e não deve ser tratada como ambiente disponível ou como evidência de backup/restauração.

## Decisão

Nesta etapa, o repositório será uma workspace pnpm com uma aplicação web em `apps/web` e os pacotes independentes que já possuem um consumidor real:

- `packages/domain`: regras de negócio, sem dependência de Next.js, React ou Expo; a aderência funciona como tracer bullet dessa fronteira;
- `packages/contracts`: contratos REST/OpenAPI e schemas compartilhados;
- `packages/api-client`: cliente validado da API para os consumidores;
- `packages/design-tokens`: tokens visuais consumidos pela aplicação web.

`packages/database-types` será criado quando o primeiro schema gerar tipos reais.
`packages/test-factories` será criado quando dois ou mais pacotes compartilharem uma
fábrica; antecipá-los agora produziria somente placeholders sem contrato.

A aplicação web usa Next.js 16.2 e expõe a fronteira `/api/v1`. Dependências entre pacotes devem ser explícitas; a implementação de dados deve ficar atrás de repositórios e casos de uso. Supabase, `supabase/migrations`, seed, testes pgTAP e a configuração de infraestrutura ficam fora deste recorte e serão definidos na próxima etapa, após reconstituir e validar o ambiente da VPS.

## Motivos

- preserva domínio, contratos, validações e regras para o futuro Expo sem prometer compartilhamento de UI;
- permite que cada pacote tenha testes, tipos e dependências explícitos;
- evita criar migrations ou declarar deploy/backup quando o ambiente de dados foi perdido pela formatação da VPS;
- mantém a API como fronteira única, com RLS e isolamento por tenant a serem validados na etapa de dados.

## Consequências

- A fundação pode validar lint, tipos, testes e build sem depender de Supabase disponível.
- Pacotes devem evitar importações cíclicas e dependências de apresentação.
- Nenhuma conclusão sobre produção, Supabase, migrations, backup ou restauração decorre deste ADR.
- A próxima etapa deverá reconstruir o ambiente de dados, definir migrations forward-only e provar isolamento, backup restaurável e recuperação antes de qualquer lançamento.

## Fora de escopo e alternativas rejeitadas

- **Aplicação única sem pacotes:** rejeitada porque esconderia as fronteiras que o cliente nativo e a API precisarão reutilizar.
- **Criar o schema Supabase agora:** adiado porque a VPS foi formatada; sem ambiente reconstituído, a execução e a recuperação não são verificáveis.
- **Compartilhar toda a UI entre web e mobile:** rejeitado pelo PRD; a web administrativa e o futuro aplicativo nativo terão interfaces próprias.
