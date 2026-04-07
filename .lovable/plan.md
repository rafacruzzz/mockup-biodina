

## Plano: Remover "Marcas" de Produtos e mover "Empresa Detentora" para Pessoas

### Alterações

#### 1. `src/data/cadastroModules.ts`
- **Remover** o submódulo `marcas` de dentro de `produtos.subModules`
- **Remover** o submódulo `empresas_detentoras` de dentro de `produtos.subModules`
- **Adicionar** `empresas_detentoras` (com nome "Empresas Detentoras de Registro") dentro de `pessoas.subModules`

#### 2. `src/pages/Cadastro.tsx`
- **Remover** o state `isMarcaModalOpen` e toda a lógica associada (condição no `handleNew`, label no `getNewButtonText`, renderização do `<MarcaModal>`)
- **Remover** o import de `MarcaModal`
- **Ajustar** a condição de abertura do `EmpresaDetentoraModal`: trocar de `activeModule === 'produtos' && activeSubModule === 'empresas_detentoras'` para `activeModule === 'pessoas' && activeSubModule === 'empresas_detentoras'`
- **Ajustar** o `getNewButtonText` para refletir o novo módulo pai

#### Arquivos afetados
- `src/data/cadastroModules.ts`
- `src/pages/Cadastro.tsx`

O `MarcaModal.tsx` e `EmpresaDetentoraModal.tsx` permanecem intactos (o modal da empresa detentora continua funcionando, apenas muda de seção na sidebar).

