## Agent skills

### Issue tracker

Issues e PRDs são rastreados no GitHub Issues de `prof-ramos/acfitness`. See `docs/agents/issue-tracker.md`.

### Triage labels

Usamos as labels canônicas `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human` e `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Este é um repositório single-context, com `CONTEXT.md` na raiz e ADRs em `docs/adr/`. See `docs/agents/domain.md`.

### Subagent delegation

Sempre que houver subtarefas concretas, independentes e que possam avançar em paralelo, delegue-as profissionalmente a subagentes usando `gpt-5.6-luna` com reasoning effort `xhigh`. Defina para cada subagente um escopo delimitado, responsabilidade clara sobre arquivos ou resultados, evidências esperadas e a orientação de não reverter o trabalho de outros agentes. Mantenha no agente principal a integração final, decisões transversais e ações sensíveis. Não delegue tarefas triviais, estritamente sequenciais ou cuja coordenação custe mais do que a execução direta.
