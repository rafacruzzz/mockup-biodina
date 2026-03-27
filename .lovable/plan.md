

## Plano: Adaptar labels da aba Dados Gerais para Clientes

### Problema
Todos os labels de telefone, e-mail, WhatsApp, redes sociais e contato comercial dizem "do Lead" e "do Mantenedor" independentemente do tipo de entidade. Para clientes, devem dizer "do Cliente" e "do Mantenedor". Além disso, o campo "Segmento do Lead" (readonly) deve aparecer apenas ao editar um cliente que veio de conversão de Lead.

### Alterações em `src/components/cadastro/EntidadeModal.tsx` (aba Dados Gerais apenas)

**1. Criar variável de label dinâmico:**
```
const entityLabel = isLead ? "Lead" : "Cliente";
```

**2. Campo "Segmento do Cliente" (novo, condicional):**
- Adicionar entre o bloco de campos especiais de lead e o campo `tipo_cliente`
- Visível apenas quando `tipoEntidade === 'clientes' && editData && editData.segmento_lead`
- Select readonly/disabled mostrando o segmento que veio do lead
- Usa a mesma lista `segmentos` do hook `useSegmentoLeadManager`

**3. Labels do campo `tipo_cliente` e `nome_cliente` (linhas 434, 447):**
- "Tipo de Lead" → `Tipo de ${entityLabel}` (mostra "Tipo de Cliente" para clientes)
- "Nome do Lead" → `Nome do ${entityLabel}`

**4. Seção Telefones (linhas 545-578):**
- "Telefone 1 do Lead" → `Telefone 1 do ${entityLabel}`
- "Telefone 2 do Lead" → `Telefone 2 do ${entityLabel}`
- "Telefone 1 do Mantenedor" e "Telefone 2 do Mantenedor" permanecem iguais

**5. Seção Telefones Fixos (linhas 587-603):**
- "Telefone Fixo 1 do Lead" → `Telefone Fixo 1 do ${entityLabel}`
- "Telefone Fixo 2 do Mantenedor" permanece igual
- Excluir "Telefone Fixo 3" (se existir) -- já foi removido anteriormente

**6. Seção WhatsApp (linhas 611-626):**
- "Telefone WhatsApp do Lead" → `Telefone WhatsApp do ${entityLabel}`
- "Telefone WhatsApp do Mantenedor" permanece igual

**7. Seção E-mails (linhas 635-649):**
- "E-mail 1 do Lead" → `E-mail 1 do ${entityLabel}`
- "E-mail 2 do Lead" → `E-mail 2 do ${entityLabel}`
- "E-mail 1 do Mantenedor" e "E-mail 2 do Mantenedor" permanecem iguais

**8. Seções "Web e Redes Sociais" (linhas 654, 680):**
- "Web e Redes Sociais do Lead" → `Web e Redes Sociais do ${entityLabel}`
- "Web e Redes Sociais do Mantenedor" permanece igual

**9. Seções "Contato Comercial" (linhas 706, 728):**
- "Contato Comercial do Lead" → `Contato Comercial do ${entityLabel}`
- "Contato Comercial do Mantenedor" permanece igual

**10. Conversão de Lead → Cliente:**
- Na função `onConvertToClient`, garantir que `segmento_lead` é passado nos dados para que ao editar o cliente convertido, o campo "Segmento do Cliente" apareça preenchido

### Resultado
- Cadastro/edição de Lead: labels mostram "do Lead"
- Cadastro de Cliente novo: labels mostram "do Cliente", sem campo de Segmento
- Edição de Cliente convertido de Lead: labels mostram "do Cliente" + campo "Segmento do Cliente" readonly preenchido

