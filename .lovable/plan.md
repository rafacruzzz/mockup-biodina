

## Plano: Passar prop `onConvertToClient` ao EntidadeModal no Cadastro e Comercial

### Problema
O botão "Converter em Cliente" exige 3 condições: `isLead && editData && onConvertToClient`. As duas páginas (Cadastro.tsx e Comercial.tsx) passam `editData` mas **nunca passam** `onConvertToClient`, então o botão nunca aparece.

### Alterações

**1. `src/pages/Cadastro.tsx` (linha ~306-314)**
- Adicionar handler `handleConvertLeadToClient` que:
  - Move o item da lista de leads para a lista de clientes (toast de sucesso)
  - Fecha o modal e limpa `editingEntidadeData`
- Passar `onConvertToClient={handleConvertLeadToClient}` ao `EntidadeModal`

**2. `src/pages/Comercial.tsx` (linha ~900-909)**
- Adicionar handler `handleConvertLeadToClient` com mesma lógica
- Passar `onConvertToClient={handleConvertLeadToClient}` ao `EntidadeModal`

### Resultado
O botão "Converter em Cliente" aparecerá no footer do modal ao editar um Lead, tanto no Cadastro quanto no Comercial.

