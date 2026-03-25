

## Plano: Criar modal "Nova Proposta Contratação" com tabela e especificações de produto

### Resumo
Criar um componente `PropostaContratacaoModal.tsx` seguindo o mesmo padrão do `PropostaDTModal`, mas com a tabela de proposta comercial ajustada (colunas: Item, Especificação/Descrição, Referência/Código, Unidade, Marca/Fabricante, Qtd, Valor Unitário, Valor Total, Valor Mensal, Valor Anual) e uma seção adicional de "Especificação/Detalhes do produto" com campos: Apresentação, Modelo, Marca/fabricante, Registro na Anvisa, Procedência.

### Novo componente: `src/components/comercial/PropostaContratacaoModal.tsx`

Baseado no `PropostaDTModal`, com as seguintes diferenças:

**Tabela de Proposta Comercial — colunas conforme imagem:**
- Item (numeração automática) | Especificação/Descrição | Referência/Código | Unidade | Marca/Fabricante | Qtd | Valor Unitário | Valor Total (Qtd × Unitário) | Valor Mensal | Valor Anual
- Linha de Valor Final (soma dos totais)
- Desconto opcional (mesmo padrão toggle do DT)

**Seção adicional após a tabela — "Especificação/Detalhes do produto":**
- Apresentação (input)
- Modelo (input)
- Marca/fabricante (input)
- Registro na Anvisa (input)
- Procedência (input)

**Demais seções idênticas ao DT:**
- Dados do Cliente (Select com auto-preenchimento)
- Dados da Empresa (preenchidos automaticamente + banco)
- Representante Legal (preenchido automaticamente)
- Objeto da Proposta
- Declaração, Prazo de validade, Pagamento, Prazo de entrega, Garantia, Local de entrega, Frete e Impostos, Observações, Local/Data/Assinatura

### Alterações em `src/pages/Comercial.tsx`

**1. Novos estados:** `propostasContratacao` (array) e `propostaContratacaoModalOpen` (boolean)

**2. Substituir placeholder da aba Contratação (linhas 1428-1444):**
- Botão "Nova Proposta Contratação" + tabela listando propostas criadas
- Importar e renderizar `PropostaContratacaoModal`

### Resultado
Aba "Propostas - Contratação" funcional com modal completo, tabela com colunas extras (Unidade, Valor Mensal, Valor Anual) e seção de especificações do produto.

