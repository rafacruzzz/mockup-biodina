

## Plano: Reestruturar formulário de Reclamação de Clientes

### Resumo
Reorganizar o formulário para mostrar campos do cliente (puxados do cadastro), campos de contato (preenchidos na hora), dados do produto e depois data/descrição do problema — tudo antes da seção "Tratamento" que se mantém.

### Alterações em `src/components/administrativo/qualidade/ReclamacaoClientesTab.tsx`

**1. Após o seletor "Buscar Cliente", substituir o `ClienteDataPanel` por campos read-only inline:**
- Grid com: Tipo de Cliente, Razão Social, Nome Fantasia, CNPJ/CPF, CIN/RG, Nome do Mantenedor, CNPJ do Mantenedor
- Todos preenchidos automaticamente ao selecionar cliente (dados já existem no estado)

**2. Nova seção "Contato" (campos editáveis, preenchidos na hora):**
- Nome, Telefone, E-mail (3 inputs em grid)
- Adicionar `contatoNomeReclamacao`, `contatoTelefoneReclamacao`, `contatoEmailReclamacao` ao estado

**3. Nova seção "Dados do Produto":**
- Campos editáveis: Código do Produto, Nome do Produto, Lote/Nº de Série, Quantidade, Nota Fiscal, Data de Emissão da Nota Fiscal
- Adicionar ao estado: `codigoProduto`, `nomeProduto`, `loteNumSerie`, `quantidade`, `notaFiscal`, `dataEmissaoNF`

**4. Seção "Registro da Reclamação" (já existe, manter):**
- Data + Descrição do Problema (como está)

**5. Seção "Tratamento" (manter como está no print):**
- Solução, Gera NC?, Observações

**6. Atualizar interface `Reclamacao` e `emptyClienteData`** com os novos campos

**7. Remover import e uso do `ClienteDataPanel`** (substituído pelos campos inline)

### Arquivos alterados
- `src/components/administrativo/qualidade/ReclamacaoClientesTab.tsx`

