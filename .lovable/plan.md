

## Plano: Substituir campos de texto de Banco por Select com dados mock de bancos cadastrados

### Contexto

Atualmente, em vários locais do módulo financeiro, o campo "Banco" é um `Input` de texto livre. O usuário quer que seja um `Select` que puxa de uma lista de bancos cadastrados (mock), e ao selecionar o banco, agência e conta sejam preenchidos automaticamente.

### Abordagem

Criar um arquivo de dados mock com bancos cadastrados (cada um com agência e conta) e um componente reutilizável `BancoSelect` que, ao selecionar um banco, preenche automaticamente agência e conta.

### Arquivos a criar

1. **`src/data/bancosCadastrados.ts`**
   - Array mock de bancos cadastrados: `{ id, nome, codigo, agencia, conta }`
   - Exemplos: Banco do Brasil (001, ag 1234-5, conta 56789-0), Itaú, Bradesco, Santander, Caixa, Nubank, Inter, C6 Bank

2. **`src/components/financeiro/BancoSelect.tsx`**
   - Componente reutilizável com Select de banco
   - Props: `value`, `onBancoSelect(banco, agencia, conta)` 
   - Ao selecionar banco, chama callback com agência e conta do banco cadastrado
   - Campos de agência e conta ficam read-only (preenchidos automaticamente)

### Arquivos a modificar

1. **`src/components/financeiro/CalendarioVencimentos.tsx`** (linhas 358-376)
   - Substituir Input de "Banco" por `BancoSelect`
   - Ao selecionar, preencher agência e conta automaticamente via `handleBancoChange`

2. **`src/components/financeiro/NovaContaPagarModal.tsx`** (linhas 488-493)
   - Substituir Input de "Banco" por `BancoSelect`
   - Agência e conta preenchidos automaticamente

3. **`src/components/financeiro/NovaContaRecorrenteModal.tsx`** (linhas 429-435)
   - Substituir Input de "Banco" por `BancoSelect`
   - Agência e conta preenchidos automaticamente

4. **`src/components/financeiro/ComissoesPagarView.tsx`** (linhas 416-427)
   - Já usa Select mas com lista hardcoded — substituir por `BancoSelect` com dados do mock
   - Agência e conta preenchidos automaticamente

