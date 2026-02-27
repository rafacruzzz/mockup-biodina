

## Plano: Corrigir interação do popover no Calendário

### Problema

O `Popover` do Radix fecha automaticamente quando o usuário interage com elementos internos (Switch, Select do banco, Calendar de data) porque esses componentes usam portais que tiram o foco do popover. Além disso, as alterações salvam automaticamente sem botão de confirmação.

### Solução

Substituir o `Popover` por um `Dialog` (modal) para os controles inline de cada conta no calendário. O Dialog não fecha ao interagir com elementos internos. Adicionar estado local temporário e botão "Salvar" para confirmar alterações.

### Arquivo a modificar

**`src/components/financeiro/CalendarioVencimentos.tsx`**

1. No componente `InlineControls`, trocar `Popover`/`PopoverContent` por `Dialog`/`DialogContent`
2. O clique no item do calendário abre o Dialog (mantém o card visual como trigger)
3. Dentro do Dialog, manter todos os controles existentes (Switch, data, BancoSelect, botões)
4. Adicionar estado local (`useState`) para armazenar alterações temporárias (pago, data, banco, agencia, conta)
5. Adicionar botão **"Salvar"** que chama `onUpdateConta` com todas as alterações de uma vez
6. Remover as chamadas diretas a `handlePagoNaData`, `handleDataPagamento`, `handleBancoChange` — essas passam a atualizar apenas o estado local
7. Manter o popover interno de data (CalendarPicker) como está, pois dentro de um Dialog funciona corretamente

