

## Plano: Atualizar colunas da tabela de Contratação

### Problema
A tabela de oportunidades em Contratação exibe a coluna "Termômetro" e não possui "Data Encerramento" nem botão de Excluir.

### Alterações

**Arquivo: `src/pages/Comercial.tsx`**

1. **Adicionar campo `dataEncerramento`** nos dados mock das oportunidades de contratação (string opcional, ex: `'20/06/2024'` para as ganhas/perdidas, vazio para em andamento).

2. **Atualizar cabeçalho da tabela** no `renderOportunidadesPorModalidade` — substituir a coluna "Termômetro" por "Valor do Projeto" (renomear label de "Valor") e adicionar "Data Encerramento" entre "Data Abertura" e "Ações":
   - Código | Cliente | Responsável | Status | Fonte | Segmento | Valor do Projeto | Data Abertura | Data Encerramento | Ações

3. **Atualizar corpo da tabela**:
   - Remover a célula do Termômetro (ícone + indicador colorido)
   - Mover a célula de valor para a posição correta (renomear header para "Valor do Projeto")
   - Adicionar célula `dataEncerramento` (exibe `'-'` quando vazio)
   - Adicionar botão **Excluir** (ícone `Trash2`) nas Ações, ao lado de Editar, com `onClick` que remove a oportunidade do estado

4. **Adicionar função `handleExcluirOportunidade`** que filtra a oportunidade do array `oportunidades` via `setOportunidades`.

