

## Plano: Categorias de Receitas, Formas de Pagamento e desativar módulo Categorias

### 1. Novos submódulos em Cadastros Financeiros

**`src/data/cadastroModules.ts`** — Adicionar após `categorias_despesas`:
- `categorias_receitas` com mesma estrutura (nome, codigo, tipo, status) e dados de exemplo
- `formas_pagamento` com campos (nome, codigo, descricao, status) e dados de exemplo (PIX, Boleto, Cartão de Crédito, Transferência Bancária, etc.)

### 2. Botões de criação em `src/pages/Cadastro.tsx`

**`getButtonText()`** — Adicionar:
- `categorias_receitas` → "Nova Categoria de Receita"
- `formas_pagamento` → "Nova Forma de Pagamento"

### 3. Desativar módulo "Categorias" para não-SUPER

**`src/components/SidebarLayout.tsx`** (linha 83):
- Adicionar `'categorias'` ao filtro: `['solicitacoes', 'personalizar-navegacao', 'categorias']`

**`src/components/LoginForm.tsx`** (linha 25):
- Adicionar `'categorias'` à lista: `['solicitacoes', 'personalizar-navegacao', 'categorias']`

**`src/components/cadastro/ModuleAccessTree.tsx`** (linha 28):
- Adicionar `'categorias'` à constante: `['solicitacoes', 'personalizar-navegacao', 'categorias']`

**`src/data/superModules.ts`** — Remover `'categorias'` dos `modulosHabilitados` de todas as empresas (se existir)

### 4. Definição do sistema

**`src/data/sistemaModulosCompletos.ts`** — Adicionar `categorias_receitas` e `formas_pagamento` como submódulos de `cadastros_financeiros` (key `financeiro` ou `cadastro`), mantendo `categorias` na definição global para o SUPER poder reativar

### Resultado
- Cadastros Financeiros ganha 2 novos submódulos: Categorias de Receitas e Formas de Pagamento
- Módulo "Categorias" fica invisível para todos exceto SUPER, igual a Solicitações e Personalizar Navegação

