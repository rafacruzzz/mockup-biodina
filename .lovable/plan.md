

## Plano: Completar formulário de Clientes com endereços do Mantenedor e labels corretos

### Problema
A maioria das alterações solicitadas (WhatsApp, E-mails, Web/Redes Sociais, Contato Comercial, Dados Bancários múltiplos) já está implementada corretamente usando `entityLabel`. Porém:

1. **Aba Endereços**: os 4 blocos de endereço do Mantenedor só aparecem para Leads (`isLead`), mas também devem aparecer para Clientes
2. **Aba Endereços**: os headers dos 2 primeiros blocos para clientes dizem "Endereço de Faturamento" / "Endereço de Entrega" sem "do Cliente"
3. **Aba Observações**: manter como está

### Alterações em `src/components/cadastro/EntidadeModal.tsx`

**1. Headers de endereço (linhas 782 e 862):**
- `{isLead ? 'Endereço de Faturamento do Lead' : 'Endereço de Faturamento'}` → `Endereço de Faturamento do ${entityLabel}`
- `{isLead ? 'Endereço de Entrega do Lead' : 'Endereço de Entrega'}` → `Endereço de Entrega do ${entityLabel}`

**2. Condição dos endereços do Mantenedor (linha 941):**
- `{isLead && (` → `{(isLead || isCliente) && (`

Isso faz os 4 blocos de endereço do Mantenedor aparecerem tanto para Leads quanto para Clientes.

### Resultado
- Clientes terão: "Endereço de Faturamento do Cliente", "Endereço de Entrega do Cliente", "Endereço de Faturamento do Mantenedor", "Endereço de Entrega do Mantenedor"
- Todas as demais abas (Dados Gerais, Dados Bancários, Observações) permanecem inalteradas

