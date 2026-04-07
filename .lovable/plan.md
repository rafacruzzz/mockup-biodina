

## Plano: Ajustes na Gestão de Não Conformidades (Qualidade)

Aplicar as mesmas alterações já feitas no módulo RT ao módulo Qualidade.

### 1. Adicionar setores em `src/data/qualidadeData.ts`
Acrescentar 'Regulatório', 'Institucional', 'Contabilidade' e 'Vendas' ao array `setoresEmpresa` (linha 71-85).

### 2. Mover tabela de Liberação de Produtos (linhas 736-824)
A tabela já está posicionada após "NC Solucionada?" (linha 734). Confirmar que a ordem está correta — ela já aparece logo após esse bloco. Nenhuma movimentação necessária.

### 3. Renomear colunas na tabela de Liberação de Produtos
- "Fabricante" (linha 755) → "Unidade Fabril"
- "Marca" (linha 756) → "Nome do Fabricante Legal/Marca"
- Código (linha 751/768): tornar editável com `Input` para "Código do Produto" (manual), removendo a geração automática `LIB-XXX` na função `adicionarProdutoLiberacao` (linha 152), deixando `codigo: ''`.

### 4. Substituir labels na seção CAPA DT (linhas 891-976)
Na subseção "CAPA — DT (Equipamentos do Cliente)":
- "Nome do Mantenedor" (linha 924) → "Nome do Mantenedor" (manter — puxado do cadastro do cliente)
- "CNPJ do Mantenedor" (linha 928) → "CNPJ do Mantenedor" (manter — puxado do cadastro do cliente)
- Todos os 8 campos de cliente (Nome, Tipo, Razão Social, Nome Fantasia, CNPJ/CPF, CIN/RG, Nome do Mantenedor, CNPJ do Mantenedor) já são read-only/disabled — confirmar que continuam assim, pois serão "puxados" do cadastro do cliente. O campo "Nome do Cliente" (linha 901) permanece editável para busca/seleção.

**Nota**: O usuário pediu para manter a seção CAPA no módulo Qualidade (diferente do RT onde foi removida) e substituir os campos dentro dela.

### Arquivos afetados
- `src/data/qualidadeData.ts` — adicionar setores
- `src/components/administrativo/qualidade/GestaoNCTab.tsx` — renomear colunas, código editável

