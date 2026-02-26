

## Plano: Integrar Contas a Pagar com Calendário + Ações de Pagamento Inline

### Resumo

Transformar o calendário de vencimentos para exibir as contas salvas em "Nova Conta a Pagar" como links clicáveis por data de vencimento. Ao clicar, abrir modal com detalhes + documentos anexados. Adicionar campos inline no calendário: "Pago na data" (Sim/Não), data do pagamento (se Não), e banco/agência/conta (bidirecional com Nova Conta a Pagar).

### Arquivos a modificar

1. **`src/components/financeiro/CalendarioVencimentos.tsx`**
   - Receber `contasSalvas: ContaPagar[]` como prop (vindas de APagarPagosView)
   - Gerar os vencimentos dinamicamente a partir das contas (incluindo parcelas individuais com label "Parcela X de Y")
   - Manter mock data existente como fallback enquanto não houver contas reais
   - No card de cada conta no calendário: adicionar controles inline:
     - Switch "Pago na data" (Sim/Não)
     - Se Não: campo de data do pagamento
     - Campos banco, agência, conta (editáveis)
   - Ao alterar esses campos, chamar callback `onUpdateConta` para sincronizar com APagarPagosView

2. **`src/components/financeiro/DetalhesContaModal.tsx`**
   - Expandir interface para aceitar dados de `ContaPagar`
   - Mostrar documentos anexados (lista de anexos com ícone de visualização)
   - Mostrar campos "Pago na data", banco, agência, conta
   - Mostrar informações de parcelas quando aplicável

3. **`src/components/financeiro/APagarPagosView.tsx`**
   - Passar `contasSalvas` e `onUpdateConta` como props ao `CalendarioVencimentos`
   - Implementar handler `handleUpdateContaCalendario` que atualiza o estado da conta (pagamentoEfetuado, dataPagamento, dados bancários) e reflete na lista principal
   - Manter estado compartilhado entre a aba Programação e a aba Calendário

4. **`src/types/financeiro.ts`**
   - Verificar se `ContaPagar` já tem todos os campos necessários (pagamentoEfetuado, bancoPagamento, agenciaPagamento, contaPagamento) — já deve ter da implementação anterior

### Detalhes técnicos

- O calendário agrupará contas por `dataVencimento`. Para contas parceladas, cada parcela aparecerá na sua data de vencimento específica com label "Parcela X de Y"
- Ao clicar no link/card da conta no calendário, abre `DetalhesContaModal` com os dados completos + lista de anexos
- Os campos banco/agência/conta editados no calendário serão sincronizados de volta para a conta em APagarPagosView (bidirecional)
- O switch "Pago na data" no calendário atualizará o campo `pagamentoEfetuado` da conta

