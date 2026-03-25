

## Plano: Criar modal "Nova Proposta Licitação" com campos específicos e tabela comercial

### Resumo
Criar componente `PropostaLicitacaoModal.tsx` seguindo o padrão dos modais DT e Contratação, mas com campos específicos de licitação (UASG, Edital, Pregão, Processo, Abertura com dia/horário). A tabela comercial segue a imagem: Item, Especificação/Descrição, Referência/Código, Unidade, Marca/Fabricante, Qtd, Valor Unitário sem ICMS, Valor Unitário com ICMS, Valor Total Sem ICMS, Valor Total Com ICMS, Valor Mensal, Valor Anual. Cliente puxa do cadastro com auto-preenchimento.

### Novo componente: `src/components/comercial/PropostaLicitacaoModal.tsx`

**Seções:**

1. **Dados do Cliente** (Select com auto-preenchimento):
   - Cliente (Select do cadastro), Endereço (auto), CNPJ (auto), UASG (input), Edital de Pregão Eletrônico Nº (input), Pregão Eletrônico Nº (input), Processo Nº (input), Inscrição Estadual (auto), Inscrição Municipal (auto), Abertura (input), Dia (input date), Horário (input time + label "Horário de Brasília"), Proposta Nº (input)

2. **Dados da Empresa** (preenchidos automaticamente — mesmo mock):
   - Razão Social, Endereço, CNPJ, IE, IM, Telefone, E-mail
   - Select Banco → auto-preenche Código, Agência, Conta Corrente + Código de Operação (input)

3. **Representante Legal** (preenchido automaticamente — mesmo mock):
   - Nome, RG, CPF, Naturalidade, Nacionalidade, Endereço, E-mail, Cargo/Função

4. **Objeto da Proposta** (Textarea)

5. **Proposta Comercial** (tabela conforme imagem):
   - Colunas: Item | Especificação/Descrição | Referência/Código | Unidade | Marca/Fabricante | Qtd | Valor Unitário sem ICMS | Valor Unitário com ICMS | Valor Total Sem ICMS (calc) | Valor Total Com ICMS (calc) | Valor Mensal | Valor Anual
   - Botão adicionar/remover itens
   - Linha Valor Final + campo OBS
   - Desconto opcional (toggle)

### Alterações em `src/pages/Comercial.tsx`

1. Novos estados: `propostasLicitacao` (array) e `propostaLicitacaoModalOpen` (boolean)
2. Substituir placeholder da aba Licitação (linhas 1413-1428): botão "Nova Proposta Licitação" + tabela listando propostas
3. Importar e renderizar `PropostaLicitacaoModal`

