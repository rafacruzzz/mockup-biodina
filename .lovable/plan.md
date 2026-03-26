

## Plano: Adicionar "Chave Pix" e remover "Código do Banco" nos Dados Bancários da Proposta Licitação

### Alterações em `src/components/comercial/PropostaLicitacaoModal.tsx`

**1. Estado:**
- Remover `codigoBanco` e `setCodigoBanco`
- Adicionar `chavePix` e `setChavePix` (string, editável)

**2. Função `handleBancoChange` (linha ~232):**
- Remover `setCodigoBanco(banco.codigo)`

**3. Layout dos Dados Bancários (linhas 426-430):**
- Remover o campo "Código do Banco"
- Adicionar campo "Chave Pix" (Input editável, placeholder "CPF, e-mail, telefone ou aleatória") antes da Agência

**4. `handleSave`:**
- Substituir `codigoBanco` por `chavePix` nos dados salvos

### Resultado
O bloco de dados bancários terá: Nome do Banco (select), Chave Pix (input editável), Agência (readOnly), Conta Corrente (readOnly), Código de Operação (editável).

