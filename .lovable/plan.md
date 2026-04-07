

## Plano: Ocultar campos de Mantenedor para Fornecedor – Uso e Consumo

### Problema
No cadastro de Fornecedor – Uso e Consumo, os campos de "Mantenedor" (telefones, e-mails, redes sociais e contato comercial) são exibidos, mas não se aplicam a este tipo de fornecedor.

### Alterações em `src/components/cadastro/EntidadeModal.tsx` — aba Dados Gerais

Adicionar condição `!isFornecedorUsoConsumo` para ocultar os seguintes blocos:

1. **Telefones do Mantenedor** (linhas 811-828) — campos `telefone3` e `telefone4`
2. **Telefone Fixo do Mantenedor** (linhas 844-852) — campo `telefone_fixo2`
3. **WhatsApp do Mantenedor** (linhas 868-876) — campo `telefone_whatsapp_mantenedor`
4. **E-mails do Mantenedor** (linhas 891-898) — campos `email3` e `email4`
5. **Web e Redes Sociais do Mantenedor** (linhas 928-952) — bloco inteiro
6. **Contato Comercial do Mantenedor** (linhas 976-996) — bloco inteiro

Cada bloco será envolvido em `{!isFornecedorUsoConsumo && (...)}`. Os campos do próprio fornecedor (Telefone 1/2 do Fornecedor, Fixo, WhatsApp, E-mails, Web/Redes e Contato Comercial do Fornecedor) permanecem visíveis.

### Arquivo afetado
- `src/components/cadastro/EntidadeModal.tsx`

