# AC Fitness

Plataforma de acompanhamento de treinos para personal trainers e seus mentorados.

## Estado atual

A fundação técnica do MVP está em desenvolvimento. O repositório contém o app
web responsivo, a API REST inicial e pacotes TypeScript compartilháveis com o
futuro aplicativo Expo. Funcionalidades de autenticação, prescrição e execução
serão entregues nas próximas etapas do PRD.

A fundação já inclui o contrato OpenAPI da rota de saúde, um cliente Fetch/SDK
gerado e consumido pela web, tokens visuais compartilhados e uma regra de
aderência usada pela aplicação como tracer bullet do domínio independente.

## Desenvolvimento

Requisitos: Node.js 24 e pnpm 11.

```bash
pnpm install
pnpm dev
```

Validação completa:

```bash
pnpm check
```

Regeneração e verificação dos artefatos OpenAPI:

```bash
pnpm generate
pnpm check:generated
```

## Documentação

- [PRD do MVP](docs/PRD.md)
