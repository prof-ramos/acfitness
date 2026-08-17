# Contexto do domínio — AC Fitness

## Vocabulário

- **Tenant:** espaço isolado de um personal; no MVP há um tenant por personal.
- **Personal (P), mentorado (M) e administrador global (A):** os três papéis do produto. O papel não substitui a autorização sobre o recurso.
- **Vínculo:** relação entre personal e mentorado, com histórico e no máximo um vínculo ativo por mentorado.
- **Plano:** ficha atribuída ao mentorado; há um plano principal ativo por mentorado.
- **Versão:** fotografia publicada de um plano. Rascunhos são editáveis; versões publicadas são imutáveis.
- **Prescrição e realizado:** o que foi planejado e o que aconteceu, mantidos separadamente.
- **Ocorrência:** instância prevista de uma sessão em uma data; **sessão** é a execução dessa ocorrência.
- **Aderência:** `ocorrências concluídas válidas / ocorrências previstas encerradas`; a semana corrente é parcial, extras não elevam o resultado e pausas/cancelamentos justificados saem do denominador.
- **Solicitação de mudança:** pedido do mentorado que passa por análise; nunca altera o plano automaticamente.
- **Snapshot:** cópia histórica de exercício, instrução ou prescrição usada por uma versão publicada.
- **Outbox:** registro transacional de efeito assíncrono, processado com idempotência.

## Limites do MVP

- Lançamento como PWA responsiva, mobile-first para o mentorado e responsiva para o painel do personal.
- Web/API em Next.js 16.2 + React 19.2; domínio, contratos e regras devem permanecer independentes da UI para o futuro Expo.
- Público adulto, pt-BR e sistema métrico; o produto não é prontuário médico. Dor, restrições e condicionamento são dados sensíveis.
- Escopo inicial: piloto de 5 personais e até 50 mentorados; desenho para 100 personais, 5.000 mentorados e cerca de 1.000 inícios de sessão por dia.
- Não fazem parte do MVP: nutrição, pagamentos, marketplace, IA, chat em tempo real, wearables, agenda por hora, lojas, múltiplos profissionais, white label, relatórios avançados e WhatsApp.
- A execução pode continuar parcialmente offline somente para conteúdo já carregado; mídia externa e histórico não carregado exigem internet. Não se depende de Background Sync.
- O backend planejado é uma API REST modular; clientes não acessam tabelas diretamente. A infraestrutura de dados e as migrations Supabase estão fora da fundação atual e serão retomadas conforme o ADR correspondente.

## Invariantes

- Toda operação exige relação válida com o recurso e isolamento por tenant; RLS é uma segunda barreira, não a única autorização.
- Publicar, corrigir ou mudar uma ficha preserva o passado: cria nova versão, mantém snapshots e não edita sessão iniciada nem sessão concluída.
- Sessão concluída pelo mentorado é imutável. Reabertura pelo personal é excepcional, limitada a 24 horas, com motivo, auditoria e nova revisão.
- Uma gravação usa UUID e `Idempotency-Key`; concorrência explícita usa `revision`/`If-Match` e conflito retorna `409`, sem merge silencioso.
- Semana e calendário usam o fuso IANA do mentorado; timestamps são UTC. Treino atrasado na mesma semana conta como realizado; depois do fechamento é atividade extra.
- Omissão de exercício inteiro exige justificativa; dor severa interrompe o exercício, alerta imediatamente e não produz diagnóstico.
- Alertas, auditoria e histórico são append-only. E-mails não carregam informação sensível.
- Backup restaurável é requisito bloqueador de produção; este documento não afirma que backup, deploy ou ambiente de produção estejam concluídos.
