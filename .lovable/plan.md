

## Plano: Ajustes no Monitoramento e Auditoria do módulo RT

### 1. Alertas Criticos - Adicionar notas de origem dos dados

**Em `src/components/administrativo/rt/AlertasCriticosSection.tsx`:**
- Adicionar nota informativa (amber box com icone Info): "Origem dos dados: Não Conformidades (RT e Qualidade), CAPA (Qualidade) e Coleta de Dados e Inspeção (Qualidade)"

### 2. Dashboard de KPIs - Ajustar descrições e lógica

**Em `src/components/administrativo/rt/DashboardKPIsSection.tsx`:**
- No card "Índice de Performance": alterar texto explicativo para "Índice calculado com base na proporção de manutenções preventivas vs. corretivas (quanto mais preventivas e menos corretivas, melhor)"
- Adicionar nota: "Os índices de performance estão relacionados aos CAPAs"

### 3. KPIs Indicadores de Performance - Adicionar notas de origem

**Em `src/components/administrativo/rt/DashboardKPIsSection.tsx`:**
- **Qualidade do Produto:**
  - TNC: nota "Origem: N° de Não Conformidades"
  - Acuracidade do Laudo/Certificado: nota "Origem: verificação se a empresa possui AFE"
  - Adesão às Boas Práticas: nota "Origem: verificação se fornecedores e empresa possuem BP"
- **Qualidade da Entrega:** nota geral "Origem: módulo Estoque"
- **Qualidade do Suporte:** nota geral "Origem: módulos DT, Qualidade e Comercial"

### 4. Trilha de Auditoria - Adicionar filtro de Período e remover "Liberação de Produtos"

**Em `src/components/administrativo/rt/TrilhaAuditoriaSection.tsx`:**
- Adicionar um novo `Select` de "Período" ao lado do filtro de módulos, com opções: "Todos", "6 meses", "9 meses", "12 meses"
- Adicionar estado `filtroPeriodo` e lógica de filtragem por data (comparar `dataHora` com a data atual menos o período selecionado)
- No select de módulos, filtrar para excluir "Liberação de Produtos" da lista `modulosUnicos`

**Em `src/data/rtModules.ts`:**
- No registro `audit-003`, alterar `modulo` de "Liberação de Produtos" para outro módulo válido (ex: "Gestão de NC")

### Arquivos alterados
- `src/components/administrativo/rt/AlertasCriticosSection.tsx`
- `src/components/administrativo/rt/DashboardKPIsSection.tsx`
- `src/components/administrativo/rt/TrilhaAuditoriaSection.tsx`
- `src/data/rtModules.ts`

