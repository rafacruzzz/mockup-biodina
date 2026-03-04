

## Plano: Adicionar campos "Número da ação de campo" e "Produto" ao formulário Planilha de Ação de Campo

### Alterações

1. **`src/types/acaoCampo.ts`** — Adicionar dois novos campos à interface `PlanilhaAcaoCampoData`:
   - `numeroAcaoCampo: string`
   - `produtoId: string` / `produtoNome: string`

2. **`src/components/administrativo/qualidade/PlanilhaAcaoCampoForm.tsx`**:
   - Importar `produtosMock` de `@/data/produtos`
   - Adicionar `numeroAcaoCampo: ''` e `produtoId: ''`, `produtoNome: ''` ao estado inicial
   - Inserir como **primeiro campo** do formulário um Input "Número da ação de campo"
   - Inserir um Select "Produto" logo após o campo "Cliente", puxando opções de `produtosMock` (cadastro de produtos existente)
   - Ordem final dos campos: Número da ação de campo → Cliente → UF → Produto → Modelo → NS/Lote → restante

