

## Plano: Melhorias no módulo de Chamados da Assessoria Científica

### Alterações

**1. Renomear aba e título — `src/pages/Comercial.tsx`:**
- Linha 751: trocar texto da aba de `"Chamados Ativos por Assessor"` para `"Chamados"`
- Mesma alteração na aba do Departamento Técnico (se houver)

**2. Renomear título do card — `src/components/comercial/assessoria/ChamadosAssessoriaTab.tsx`:**
- Linha 172: trocar `"Chamados Ativos por Assessor"` para `"Chamados"`

**3. Botão "Novo Chamado" — `src/components/comercial/assessoria/ChamadosAssessoriaTab.tsx`:**
- Adicionar botão "Novo Chamado" no header do card
- Abre um modal `NovoChamadoAssessoriaModal`

**4. Novo componente `src/components/comercial/assessoria/NovoChamadoAssessoriaModal.tsx`:**

Modal de abertura de chamado com os campos:
- **Destino** (Select: "Vendas" ou "Departamento Técnico") — define para quem o chamado é direcionado
- **Cliente** (Select com lista de clientes)
- **Equipamento/Modelo** (Select vinculado ao cliente)
- **Nº Série/Lote** (Input)
- **Projeto-Mãe** (Select vinculado ao cliente)
- **Tipo do Chamado** (Select: técnico, científico, comercial, calibração, manutenção, software, contratual, movimentação de material, outro)
- **Urgência** (Select: Baixa, Média, Alta, Urgente)
- **Motivo / Descrição da Ocorrência** (Textarea obrigatório)

Ao salvar:
- Gera número de chamado automático (CH-YYYY-XXXX)
- Gera número de OS vinculado ao nº série/lote e projeto-mãe
- Registra quem abriu (assessor logado), data/hora, departamento de origem ("Assessoria Científica")
- Status inicial: "ABERTO"
- Adiciona o chamado ao array mock

**5. Chamados nos Alertas do Sistema — `src/components/comercial/assessoria/DashboardAssessoria.tsx`:**
- Na página inicial (aba Agenda), o `PainelAlertas` já exibe alertas
- Adicionar alertas automáticos para chamados ativos do assessor logado (chamados com status ativo atribuídos a ele)
- Cada alerta mostra: número do chamado, cliente, urgência, e ao clicar navega para a aba Chamados

**6. Dados mock — `src/data/assessoria-cientifica.ts`:**
- Adicionar 1-2 chamados de exemplo com `origem: "Assessoria Científica"` e `destino: "Vendas"` para demonstrar o fluxo bidirecional

### Resumo da rastreabilidade no histórico
O detalhamento do chamado (`DetalhesChamadoSheet`) já exibe: quem abriu, data/motivo, urgência, estratégia de resolução, responsável, data de fechamento/resultado final e histórico cronológico de interações. Nenhuma alteração necessária nesse componente.

### Arquivos criados
- `src/components/comercial/assessoria/NovoChamadoAssessoriaModal.tsx`

### Arquivos alterados
- `src/pages/Comercial.tsx`
- `src/components/comercial/assessoria/ChamadosAssessoriaTab.tsx`
- `src/components/comercial/assessoria/DashboardAssessoria.tsx`
- `src/data/assessoria-cientifica.ts`

