

## Plano: Renomear módulo CPR — remover "(Compras para Revenda)"

Trocar todas as ocorrências de `"CPR (Compras para Revenda)"` por apenas `"CPR"` nos seguintes arquivos:

1. **`src/components/SidebarLayout.tsx`** (linha 46): sidebar name
2. **`src/data/sistemaModulosCompletos.ts`** (linha 77): definição do módulo
3. **`src/data/superModules.ts`** (linha 20): config de módulos
4. **`src/data/solicitacoes.ts`** (linha 40): solicitações
5. **`src/pages/Index.tsx`** (linha 24): card na home
6. **`src/components/compras/ComprasDashboard.tsx`** (linha 71): título do dashboard → `"Dashboard CPR"`
7. **`src/components/compras/ComprasSidebar.tsx`** (linha 36): título da sidebar → `"CPR"`

