

## Plano: Ajustes na Gestão de Não Conformidades (RT)

### 1. Adicionar setores faltantes em `src/data/rtModules.ts`
Acrescentar 'Regulatório', 'Institucional', 'Contabilidade' e 'Vendas' ao array `setoresEmpresaRT` (linha 289-303). "Assessoria Científica" já existe.

### 2. Mover tabela de Liberação de Produtos para após "NC Solucionada?" / "Data de Encerramento"
No arquivo `src/components/administrativo/rt/GestaoNCTab.tsx`, mover o bloco da tabela de Liberação de Produtos (linhas 723-811) para logo depois do bloco "NC Solucionada? / Data de Encerramento" (após linha 721). Atualmente a tabela fica antes do CAPA; agora ficará entre "NC Solucionada?" e o final do formulário.

### 3. Renomear colunas na tabela de Liberação de Produtos
- "Fabricante" (linha 742) → "Unidade Fabril"
- "Marca" (linha 743) → "Nome do Fabricante Legal/Marca"
- O "Código" (linha 738) já é editável — alterar para que o código seja digitado pelo usuário (código do cadastro de produto), removendo a geração automática `LIB-001` no `adicionarProdutoLiberacao` (linha 146-149), deixando o campo vazio e editável.

### 4. Remover seção CAPA inteira
Remover o bloco CAPA (linhas 813-965) e o código auxiliar relacionado (`updateCapa`, `getStatusCAPABadge`, `mostrarCAPADT`). Também remover a inicialização do `capa` no `handleNovaNC`.

### Arquivos afetados
- `src/data/rtModules.ts` — adicionar setores
- `src/components/administrativo/rt/GestaoNCTab.tsx` — reordenar tabela, renomear colunas, remover CAPA

