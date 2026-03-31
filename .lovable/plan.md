

## Plano: Voltar filtro de Departamento na agenda de OS da Assessoria Científica

### Problema
O componente `FiltrosAgendaOS` recebe `departamento` como prop fixa mas não exibe um filtro de departamento na UI. A lógica de filtragem no `DashboardAssessoria` já suporta `filtros.departamentos` (linha 112), só falta a interface.

### Alterações

**1. `src/components/comercial/assessoria/FiltrosAgendaOS.tsx`:**
- Adicionar nova seção "Departamento" nos filtros (antes de Assessor/Técnico)
- Dois checkboxes: "Assessoria Científica" e "Departamento Técnico"
- Toggle altera `filtros.departamentos` via `onFiltrosChange`
- Remover dependência do prop `departamento` para fixar filtro — agora o usuário escolhe
- Ajustar grid para `lg:grid-cols-4` (4 colunas: Departamento, Assessor, Cliente, Status)
- Manter o prop `departamento` opcional para filtrar a lista de clientes/equipamentos

**2. `src/components/comercial/assessoria/DashboardAssessoria.tsx`:**
- Inicializar `filtros.departamentos` com ambos os departamentos selecionados por padrão: `['Assessoria Científica', 'Departamento Técnico']`

### Resultado
O filtro de departamento volta a aparecer na agenda, permitindo visualizar OSs da Assessoria Científica, do Departamento Técnico, ou ambos.

