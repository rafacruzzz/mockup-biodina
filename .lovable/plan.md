

## Plano: Adicionar tabela "Quantidade de Produtos" após o campo Procedência

### Resumo
Adicionar uma nova seção "Quantidade de Produtos" logo após o card de Especificação/Detalhes do Produto, com uma tabela editável contendo colunas: Unidade Hospitalar e Quant. de Itens, com botão para adicionar linhas e linha de TOTAL calculada automaticamente.

### Alterações em `src/components/comercial/PropostaContratacaoModal.tsx`

**1. Novo estado (~junto dos outros estados):**
- `unidadesHospitalares: Array<{ id: string, unidade: string, quantidade: number }>` — inicializado com uma linha vazia

**2. Inserir nova seção após o card "Especificação / Detalhes do Produto" (após linha 515, antes dos botões):**
- Card "Quantidade de Produtos" com:
  - Tabela com colunas: Unidade Hospitalar (input) | Quant. de Itens (input number) | Botão remover
  - Botão "Adicionar Unidade"
  - Linha de TOTAL (soma automática das quantidades)

