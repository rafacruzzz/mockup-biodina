

## Plano: Auto-preencher dados do cliente a partir do cadastro no modal Proposta DT

### Resumo
Substituir o campo de texto livre "Cliente" por um Select com os clientes cadastrados. Ao selecionar um cliente, os campos Endereço, CNPJ, Inscrição Estadual e Inscrição Municipal são preenchidos automaticamente.

### Alterações em `src/components/comercial/PropostaDTModal.tsx`

**1. Adicionar array de clientes cadastrados (mesmo mock usado na Contratação):**
- Array `clientesCadastrados` com os 6 clientes existentes
- Adicionar campos `inscricaoEstadual` e `inscricaoMunicipal` aos objetos do mock (hoje não existem — serão adicionados como dados mock)

**2. Substituir Input "Cliente" por Select:**
- Select com opções dos clientes cadastrados (exibindo nome fantasia + CNPJ)
- Ao selecionar, preencher automaticamente: `enderecoCliente`, `cnpjCliente`, `ieCliente`, `imCliente`

**3. Campos auto-preenchidos ficam read-only:**
- Endereço, CNPJ, IE e IM ficam como inputs desabilitados (readOnly) após seleção do cliente
- Podem ser limpos se o Select for resetado

### Resultado
O campo Cliente vira um Select que puxa do cadastro, e os dados do cliente são preenchidos automaticamente ao selecionar.

