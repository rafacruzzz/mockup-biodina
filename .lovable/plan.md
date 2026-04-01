

## Plano: Integrar pedidos de Análise de Edital da Licitação na Assessoria Científica

### Contexto
Quando a Licitação clica "Solicitar Análise da Assessoria Científica" no formulário de oportunidade, esse pedido precisa "cair" na Assessoria Científica em duas telas:
1. **Alertas do Sistema** (aba Agenda) — como alerta de análise de edital pendente
2. **Aba Análise de Editais** — na seção "Alertas para Análise"

Atualmente, o botão no `OportunidadeAvancadaForm` apenas muda um estado local (`solicitouAnaliseCientifica`) sem persistir. A `AnaliseEditaisTab` lê diretamente de `licitacaoData.ts` filtrando por data/status genérico, sem saber quais licitações pediram análise AC.

### Alterações

**1. Novo campo nas licitações — `src/data/licitacaoData.ts`:**
- Adicionar `solicitouAnaliseCientifica: true` e `dataSolicitacaoAC: "2025-01-12"` nas licitações mock (IDs 1, 2, 3) para simular pedidos enviados

**2. Tipo atualizado — `src/types/licitacao.ts`:**
- Adicionar campos opcionais `solicitouAnaliseCientifica?: boolean` e `dataSolicitacaoAC?: string` na interface `Licitacao`

**3. `AnaliseEditaisTab.tsx` — Filtrar somente licitações com solicitação AC:**
- Trocar o filtro genérico de alertas para mostrar apenas licitações com `solicitouAnaliseCientifica === true`
- Mensagem do alerta: "Análise de Edital solicitada pela Licitação em DD/MM/AAAA"
- Manter a tabela abaixo filtrando somente licitações que solicitaram AC

**4. `DashboardAssessoria.tsx` — Adicionar alertas de análise de edital:**
- Importar `licitacoes` de `licitacaoData`
- Gerar alertas para licitações com `solicitouAnaliseCientifica === true` e status diferente de `finalizada`
- Tipo de alerta: `prazo`, título: "Análise de Edital - [Nº Pregão] - [Instituição]", prioridade alta
- Concatenar com os alertas existentes no `PainelAlertas`

**5. `OportunidadeAvancadaForm.tsx` — Persistir a solicitação (mock):**
- Ao clicar "Solicitar Análise da Assessoria Científica", além do estado local, marcar a licitação nos dados mock (importar e mutar o array `licitacoes`) para que os componentes da Assessoria Científica consigam ler

### Arquivos alterados
- `src/types/licitacao.ts`
- `src/data/licitacaoData.ts`
- `src/components/comercial/assessoria/AnaliseEditaisTab.tsx`
- `src/components/comercial/assessoria/DashboardAssessoria.tsx`
- `src/components/comercial/OportunidadeAvancadaForm.tsx`

