

## Plano: Expandir modal de Análise de Editais com campos da Licitação

### Problema atual
O modal de detalhes na aba "Análise de Editais" mostra apenas campos resumidos (Instituição, Localização, Data Abertura, Risco, Objeto, Resumo, Análise Técnica, Valores, Objetivo). O usuário quer que o modal reproduza os campos do formulário da Licitação (aba Dados Gerais) como read-only, mantendo os campos editáveis do assessor.

### Alteração

**Arquivo: `src/components/comercial/assessoria/AnaliseEditaisTab.tsx`**

Reestruturar o conteúdo do modal (`selectedLicitacao`) para exibir, nesta ordem, todos os campos oriundos da Licitação como **read-only**:

1. **Data da Licitação** + **Qual Natureza da Operação** (grid 2 colunas)
2. **Nº Pregão Eletrônico/ INEX / ATA / SRP** + **Nº Processo** (grid 2 colunas)
3. **Nº UASG** + **Qual Site?** (grid 2 colunas)
4. **Permite Adesão?** (radio read-only: Sim / Não / Não menciona)
5. **Produtos** (tabela read-only: Produto, Valor Estimado, Qtd Equip./Total Est., Qtd Exames/Total Est.)
6. **Fornecedor anterior?** (radio read-only) + campo "Qual" se sim
7. **Data da Assinatura e Envio da ATA**
8. **Resumo do Edital** (HTML renderizado, read-only)

Em seguida, o campo editável do assessor:

9. **Análise Técnica-Científica 1** (Textarea editável — já existe, é o `analiseTexto`)

Depois, a reprodução da parte jurídica (read-only):

10. **Pedido de Esclarecimento** (read-only, com label "Editável na aba AJ")
11. **Impugnação do Edital** (read-only, com label "Editável na aba AJ")

Por fim, o segundo campo editável:

12. **Análise Técnica-Científica 2** (novo Textarea editável para o assessor escrever)

Manter os botões "Fechar" e "Salvar Análise" no rodapé. A lógica de salvar atualizará ambos os campos de análise.

**Dados**: Todos os campos read-only vêm do objeto `selectedLicitacao` (tipo `Licitacao`) e dos dados mock em `licitacaoData.ts`. Campos como `naturezaOperacao`, `numeroProcesso`, `numeroUasg`, `qualSite`, `permiteAdesao`, `produtos`, `dataAssinaturaAta`, `pedidoEsclarecimento`, `impugnacaoEdital` precisarão ser adicionados aos dados mock (com valores de exemplo) para que apareçam preenchidos.

**Dados mock adicionais em `src/data/licitacaoData.ts`**: Acrescentar os campos faltantes nas licitações que possuem `solicitouAnaliseCientifica: true` (ids 1, 2, 3):
- `naturezaOperacao`, `numeroProcesso`, `numeroUasg`, `qualSite`, `permiteAdesao`, `produtos` (array), `dataAssinaturaAta`, `pedidoEsclarecimento`, `impugnacaoEdital`

### Arquivos afetados
- `src/components/comercial/assessoria/AnaliseEditaisTab.tsx` — reestruturar modal
- `src/data/licitacaoData.ts` — adicionar campos mock
- `src/types/licitacao.ts` — adicionar campos faltantes ao tipo (se necessário)

