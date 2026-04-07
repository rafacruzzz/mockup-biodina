

## Plano: Ajustes de Labels no Cadastro de Fornecedor – Mercadoria para Revenda

### Contexto
O `entityLabel` para fornecedor revenda já é "Unidade Fabril". Os labels genéricos usam `do {entityLabel}` = "do Unidade Fabril" (artigo errado) e "Mantenedor" (deve ser "Fabricante Legal/Marca"). Também são necessárias alterações na aba ISO.

### Alterações em `src/components/cadastro/EntidadeModal.tsx`

**Aba Dados Gerais** (única aba afetada):

#### 1. CNPJ do Mantenedor (linha 750)
- Trocar label de `CNPJ do Mantenedor` para `{isFornecedorRevenda ? "CNPJ do Fabricante Legal/Marca" : "CNPJ do Mantenedor"}`

#### 2. TIN (linhas 761-771)
- Trocar label de `TIN (Tax Id Number)` para `TIN (Tax Id Number) da Unidade Fabril`
- Adicionar novo campo `tin_tax_id_fabricante` com label `TIN (Tax Id Number) do Fabricante Legal/Marca` (visível apenas para fornecedor revenda)
- Adicionar `tin_tax_id_fabricante: ""` ao estado `formData`

#### 3. Telefones (linhas 780-814) — condicionar labels com `isFornecedorRevenda`
- `Telefone 1 do {entityLabel}` → `Telefone 1 da Unidade Fabril` (quando revenda)
- `Telefone 2 do {entityLabel}` → `Telefone 2 da Unidade Fabril`
- `Telefone 1 do Mantenedor` → `Telefone 1 do Fabricante Legal/Marca`
- `Telefone 2 do Mantenedor` → `Telefone 2 do Fabricante Legal/Marca`

#### 4. Telefones Fixos (linhas 822-837)
- `Telefone Fixo do {entityLabel}` → `Telefone Fixo da Unidade Fabril`
- `Telefone Fixo do Mantenedor` → `Telefone Fixo do Fabricante Legal/Marca`

#### 5. WhatsApp (linhas 846-861)
- `Telefone WhatsApp do {entityLabel}` → `Telefone WhatsApp da Unidade Fabril`
- `Telefone WhatsApp do Mantenedor` → `Telefone WhatsApp do Fabricante Legal/Marca`

#### 6. E-mails (linhas 870-883)
- `E-mail 1/2 do {entityLabel}` → `E-mail 1/2 da Unidade Fabril`
- `E-mail 1/2 do Mantenedor` → `E-mail 1/2 do Fabricante Legal/Marca`

#### 7. Web e Redes Sociais (linhas 889, 915)
- `Web e Redes Sociais do {entityLabel}` → `Web e Redes Sociais da Unidade Fabril`
- `Web e Redes Sociais do Mantenedor` → `Web e Redes Sociais do Fabricante Legal/Marca`

#### 8. Contato Comercial (linhas 941, 963)
- `Contato Comercial do {entityLabel}` → `Contato Comercial da Unidade Fabril`
- `Contato Comercial do Mantenedor` → `Contato Comercial do Fabricante Legal/Marca`

**Aba ISO** (afetada separadamente):

#### 9. Cabeçalhos da tabela ISO (linhas 1673, 1676-1677)
- `Vencimento das ISOs` → `Vencimento`
- `Anexar ISO` → `ISO`
- `Anexar Tradução` → `Tradução Juramentada`

#### 10. Status da ISO — tornar campo manual com Select
- Substituir o cálculo automático `getISOStatus` na coluna Status por um `Select` com as opções:
  - Pedido à fábrica
  - Aguardando envio da fábrica
  - Tradução Juramentada
  - Junta Comercial
  - Finalizado
- Adicionar campo `status` ao objeto ISO no estado

### Padrão de implementação para labels condicionais
Usar ternário inline: `{isFornecedorRevenda ? "Label específico" : "Label genérico"}` em cada label afetado. Isso garante que apenas o fornecedor revenda vê os novos labels, sem afetar outros tipos de entidade.

### Arquivo afetado
- `src/components/cadastro/EntidadeModal.tsx`

