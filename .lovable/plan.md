

## Plano: Melhorar visual da seção "Por Item" no Empenho/OF

### Problema
A seção que aparece ao clicar no pedido vinculado (cabeçalho Empenho/Pedido + tabela "Por Item") está visualmente "solta" — sem fundo, sem borda, sem destaque.

### Alteração

**Arquivo: `src/components/comercial/ContratacaoSimplesForm.tsx`**

Aplicar nos dois locais (Empenho ~linha 1585 e OF ~linha 1867):

1. **Envolver a seção expansível** em um container com fundo claro, borda arredondada e padding (`bg-slate-50 border rounded-lg p-4 mt-4`)

2. **Cabeçalho Empenho/Pedido**: Estilizar cada campo com um mini-card de fundo colorido (Empenho em `bg-blue-50 border-blue-200 rounded-md p-3`, Pedido em `bg-amber-50 border-amber-200 rounded-md p-3`) com label em cor temática

3. **Título "Por Item"**: Adicionar um separador visual (`border-t pt-3 mt-3`) e ícone ou badge antes do texto

4. **Tabela**: Envolver em `border rounded-md overflow-hidden` com header em `bg-muted/50` para dar contraste

### Arquivos afetados
- `src/components/comercial/ContratacaoSimplesForm.tsx`

