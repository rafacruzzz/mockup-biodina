

## Plano: Ajustar larguras e capitalização na tabela de Composição de Exames

### Alterações em `src/components/comercial/PropostaLicitacaoModal.tsx`

**1. Ajustar larguras das colunas (linhas 574-578):**
- Catser: de `w-[120px]` para `w-[150px]`
- Item: de `w-[80px]` para `w-[120px]`
- Descrição e Composição do Exame: adicionar `w-[300px]` (reduzir, pois hoje ocupa todo espaço restante)
- Valor Unit.: manter `w-[150px]`

**2. Capitalização dos nomes (linhas 574-577):**
- "CATSER" → "Catser"
- "Item" → já está correto
- "Descrição e Composição do Exame" → já está correto
- "Valor Unit." → já está correto

