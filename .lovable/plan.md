

## Plano: Corrigir botões cortados e modal se mexendo ao abrir Select

### Problemas identificados

1. **Botões cortados**: O container do modal usa `max-h-[90vh]` com `overflow-hidden`, e a área de conteúdo usa `max-h-[calc(90vh-140px)]`. Os 140px não são suficientes para o header (p-6 + border) + footer (p-6 + border + botões), cortando os botões.

2. **Modal se mexendo ao abrir Select**: O `SelectContent` do Radix UI pode causar reposicionamento do modal quando abre/fecha, pois altera o layout interno.

### Alterações em `src/components/cadastro/EntidadeModal.tsx`

**1. Corrigir layout do modal (linhas 235-244):**
- Trocar a estrutura para usar `flex flex-col` no container principal com `max-h-[90vh]`
- Header: `flex-shrink-0`
- Conteúdo: `flex-1 overflow-y-auto min-h-0` (sem max-h fixo calculado)
- Footer: `flex-shrink-0`

**2. Evitar que o modal se mova ao abrir Selects:**
- Adicionar `position="popper"` e `sideOffset={4}` nos `SelectContent` da aba Dados Gerais (onde o problema ocorre)
- Alternativa mais simples: adicionar `className="overflow-hidden"` no container e garantir que o scroll container não recalcule altura

### Estrutura corrigida:
```
div.fixed (overlay)
  div.flex.flex-col.max-h-[90vh] (modal)
    div.flex-shrink-0 (header)
    div.flex-1.overflow-y-auto.min-h-0 (content com scroll)
    div.flex-shrink-0 (footer com botões)
```

