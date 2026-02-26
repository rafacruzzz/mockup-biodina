

## Plano: Aprimorar Nova Conta a Pagar com pagamento efetuado, parcelamento, multa/juros/desconto e dados bancários

### Resumo

Adicionar ao modal "Nova Conta a Pagar" e à interface `ContaPagar`:
1. Campo "Pagamento Efetuado" (Sim/Não) — se Não, campo para data futura do pagamento
2. Dados bancários do pagamento (banco, agência, conta)
3. Campos de multa, juros e desconto no valor total
4. Opção pagamento único vs parcelado — se parcelado: número de parcelas, e para cada parcela: data, valor, multa, juros, desconto
5. No calendário, exibir "Parcela X de Y" quando parcelado

### Arquivos a modificar

1. **`src/types/financeiro.ts`**
   - Adicionar à interface `ContaPagar`: `pagamentoEfetuado: boolean`, `dataPagamentoEfetuado?: Date`, `bancoPagamento?: string`, `agenciaPagamento?: string`, `contaPagamento?: string`, `multa?: number`, `juros?: number`, `desconto?: number`, `tipoPagamento: 'unico' | 'parcelado'`, `numeroParcelas?: number`, `parcelas?: ParcelaConta[]`
   - Criar interface `ParcelaConta`: `numero: number`, `dataVencimento: Date`, `valor: number`, `multa?: number`, `juros?: number`, `desconto?: number`, `pago?: boolean`, `dataPagamento?: Date`

2. **`src/components/financeiro/NovaContaPagarModal.tsx`**
   - Adicionar campo Switch/RadioGroup "Pagamento Efetuado" (Sim/Não)
   - Se Não: mostrar date picker para data do pagamento
   - Adicionar campos banco, agência, conta (inputs texto)
   - Adicionar campos multa, juros, desconto (MoneyInput)
   - Adicionar RadioGroup "Pagamento Único / Parcelado"
   - Se parcelado: input número de parcelas + tabela dinâmica com colunas (Parcela, Data, Valor, Multa, Juros, Desconto) para cada parcela
   - Ao alterar número de parcelas, gerar linhas automaticamente dividindo o valor total

3. **`src/components/financeiro/CalendarioVencimentos.tsx`**
   - Na exibição das contas no calendário, quando a conta for parcelada, exibir "Parcela X de Y" na descrição

4. **`src/components/financeiro/PagarContaModal.tsx`**
   - Adicionar campos multa, juros, desconto ao confirmar pagamento
   - Adicionar campos banco, agência, conta

