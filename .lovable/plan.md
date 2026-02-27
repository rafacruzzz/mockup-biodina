

## Plano: Fluxo de Comissões — Contas a Receber → Contas a Pagar → Calendário

### Resumo do fluxo solicitado

1. Em **Contas a Receber**, adicionar botão "Enviar ao Contas a Pagar" em cada linha
2. **Comissões a Pagar** recebe a comissão com campos pré-preenchidos (Vendedor, Venda Relacionada, Cliente, Valor da Venda, Observações — conforme o print)
3. No modal de Nova Comissão, adicionar uma **4ª aba "Pagamento"** com: data de pagamento, banco, agência, conta, multa, juros, desconto
4. Ao receber/criar a comissão, ela é inserida no **Calendário de Vencimentos** do Contas a Pagar, onde banco/agência/conta são definidos e refletidos de volta na aba Pagamento

### Arquivos a criar

1. **`src/types/comissoesPagar.ts`**
   - Interface `ComissaoPagar` com todos os campos: id, vendedor, vendaId, cliente, valorVenda, percentualComissao, valorComissao, observacoes, status, dataPagamento, bancoPagamento, agenciaPagamento, contaPagamento, multa, juros, desconto, origemContasReceber (boolean)

### Arquivos a modificar

1. **`src/pages/Financeiro.tsx`**
   - Adicionar estado compartilhado `comissoesPendentes` para comissões enviadas do Contas a Receber
   - Na tabela de Contas a Receber, adicionar botão "Enviar ao Contas a Pagar" em cada linha com status "Recebido"
   - Ao clicar, criar objeto `ComissaoPagar` com dados pré-preenchidos e adicioná-lo ao estado
   - Passar `comissoesPendentes` como prop ao `ComissoesPagarView`
   - Exibir notificação/toast ao enviar

2. **`src/components/financeiro/ComissoesPagarView.tsx`**
   - Receber prop `comissoesPendentes` e mesclá-las com as comissões existentes
   - No modal `NovaComissaoModal`, adicionar **4ª aba "Pagamento"** com campos:
     - Data de Pagamento (input date)
     - Banco, Agência, Conta (selects/inputs — reutilizar padrão do NovaContaPagarModal)
     - Multa, Juros, Desconto (MoneyInput)
   - NÃO alterar as abas existentes (Dados Gerais, Cálculo, Documentos)
   - Adicionar badge "Recebido do Contas a Receber" nas comissões que vieram do fluxo
   - Ao salvar comissão, gerar entrada no formato `ContaPagar` para inclusão no Calendário

3. **`src/components/financeiro/APagarPagosView.tsx`**
   - Receber comissões salvas e convertê-las em itens do calendário (similar ao fluxo de contas recorrentes)
   - Sincronizar banco/agência/conta definidos no calendário de volta para a comissão

### Detalhes técnicos

- A aba "Pagamento" no modal reflete os dados definidos no Calendário (sincronização bidirecional)
- Campos multa/juros/desconto seguem o mesmo padrão já usado em contas a pagar e recorrentes
- As comissões enviadas do Contas a Receber chegam com status "Pendente Pagamento" e campos Vendedor, Cliente, Valor da Venda já preenchidos (campos disabled)

