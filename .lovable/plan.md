

## Plano: Expandir modal da Transportadora e corrigir layout das abas

### Problema
O modal da Transportadora tem 8 abas em `grid-cols-8` dentro de `max-w-6xl`, causando sobreposição/empilhamento dos textos das abas.

### Alterações em `src/components/cadastro/EntidadeModal.tsx`

#### 1. Aumentar largura do modal para Transportadora (linha 497)
- Trocar `max-w-6xl` por `max-w-7xl` quando `isTransportadora`, usando classe condicional

#### 2. Corrigir grid das abas da Transportadora (linha 487)
- Trocar `grid grid-cols-8` por `flex flex-wrap gap-1` para que as abas se ajustem naturalmente sem empilhar, seguindo o mesmo padrão já usado para `isFornecedorRevenda`

### Arquivo afetado
- `src/components/cadastro/EntidadeModal.tsx`

