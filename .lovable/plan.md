

## Plano: Expandir tipos de chamado com todos os departamentos do sistema (exceto RH)

### Resumo
Adicionar todos os departamentos do sistema como opções no enum `TipoChamado` e no label correspondente, excluindo RH. Atualmente existem 5 tipos; serão adicionados os departamentos faltantes.

### Departamentos atuais no enum
- Assessoria Científica, Departamento Técnico, Interface (TI), Financeiro, Estoque

### Departamentos a adicionar (baseado nos módulos do sistema, exceto RH)
- Comercial, Compras (CPR), Contabilidade, Administrativo, Jurídico, Diretoria/Gerencial

### Alterações

**1. `src/types/chamado.ts` — Expandir enum e labels:**
- Adicionar ao `TipoChamado`: `COMERCIAL`, `COMPRAS`, `CONTABILIDADE`, `ADMINISTRATIVO`, `JURIDICO`, `DIRETORIA`
- Adicionar os labels correspondentes em `TIPOS_CHAMADO_LABELS`

**2. `src/components/comercial/ChamadosTab.tsx` — Nenhuma alteração necessária:**
- O componente já renderiza dinamicamente todos os valores de `TIPOS_CHAMADO_LABELS`, então os novos tipos aparecerão automaticamente no Select.

### Resultado
O select de "Tipo de Chamado" listará todos os departamentos do sistema (exceto RH): Assessoria Científica, Departamento Técnico, TI, Financeiro, Estoque, Comercial, Compras, Contabilidade, Administrativo, Jurídico e Diretoria.

