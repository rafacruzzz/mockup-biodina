

## Plano: Sistema de Solicitações de Pagamento entre Departamentos

### Resumo

Criar um sistema onde departamentos enviam solicitações de pagamento ao "Contas a Pagar". Um novo botão "Solicitações" (com badge de contagem) fica ao lado dos botões existentes. O sistema alerta automaticamente sobre urgência quando a data de pagamento é hoje ou já passou.

### Arquivos a criar

1. **`src/types/solicitacaoPagamento.ts`**
   - Interface `SolicitacaoPagamento`: id, departamentoSolicitante, solicitadoPor, autorizadoPor, fornecedor, descricao, valor, dataVencimento, status (`pendente_analise` | `aceita` | `rejeitada`), notaFiscalUrl, emailsTrocados (string[]), anexos (string[]), urgente (boolean — calculado automaticamente se dataVencimento <= hoje), createdAt

2. **`src/components/financeiro/SolicitacoesPagamentoModal.tsx`**
   - Modal full-width listando todas as solicitações recebidas de outros departamentos
   - Cada solicitação mostra: departamento, quem pediu, quem autorizou, NF, e-mails, valor, data de pagamento
   - Badge vermelho "URGENTE: pagamento deve ser feito hoje" quando `dataVencimento <= hoje` (cálculo automático, sem botão manual)
   - Botões "Aceitar" e "Rejeitar" em cada linha
   - Ao aceitar: converte em `ContaPagar` e insere no calendário

3. **`src/components/financeiro/NovaSolicitacaoModal.tsx`**
   - Modal para criar solicitação (simulação de envio por outro departamento)
   - Campos: departamento, solicitante, autorizador, fornecedor, descrição, valor, data de pagamento, NF (upload), e-mails trocados (upload/texto)

### Arquivos a modificar

1. **`src/components/financeiro/APagarPagosView.tsx`**
   - Adicionar estado `solicitacoesPendentes` e `solicitacoesRecebidas`
   - Ao lado dos botões "Pagamentos Recorrentes" e "Nova Conta a Pagar", adicionar botão **"Solicitações"** com badge numérico (contagem de pendentes)
   - Badge pisca/destaca quando há novas solicitações
   - Ao aceitar solicitação, converter em `ContaPagar` e adicionar a `contasSalvas` (entra no calendário)
   - Toast de alerta ao receber nova solicitação

### Alerta de urgência

- O sistema calcula automaticamente: se `dataVencimento <= new Date()`, marca como urgente
- Exibe badge vermelho "URGENTE" na listagem e no botão de solicitações
- Sem botão manual de urgência — evita abuso pelos solicitantes

