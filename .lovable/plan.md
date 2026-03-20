

## Plano: Tipo de contratação (Licitação vs Particular) com seleção de cliente

### Resumo
Substituir o bloco fixo "Vincular Licitação Ganha" por um seletor de tipo de contratação. Se for "Licitação", mantém o select de licitação atual. Se for "Particular", exibe um select de cliente da base cadastrada. Em ambos os casos, ao selecionar, os dados do cliente são preenchidos automaticamente na seção "Dados do Cliente".

### Alterações em `src/components/comercial/ContratacaoSimplesForm.tsx`

**1. Novo estado `tipoContratacao`:**
- `'licitacao' | 'particular'`, default vazio (ou sem seleção)
- Novo estado `clienteSelecionado` para armazenar o cliente escolhido no modo particular

**2. Mock de clientes cadastrados:**
- Criar array local `clientesCadastrados` com 4-5 clientes de exemplo contendo: id, cpfCnpj, nomeFantasia, razaoSocial, endereco, uf, email, telefone, segmento

**3. Substituir o bloco "Vincular Licitação Ganha" (linhas 572-616):**
- Card com título "Origem da Contratação"
- Dois botões/radio ou Select com opções: "Licitação" e "Particular"
- Se **Licitação**: mostra o Select de licitações ganhas (código atual)
- Se **Particular**: mostra um Select/Combobox de clientes cadastrados. Ao selecionar, preenche automaticamente formData (cpfCnpj, nomeFantasia, razaoSocial, endereco, uf, email, telefone)

**4. Seção "Dados do Cliente" (linhas 618-653):**
- Permanece read-only, preenchida automaticamente tanto por licitação quanto por cliente particular
- Sem alteração de layout, apenas a fonte dos dados muda

### Resultado
O usuário escolhe se a contratação vem de uma licitação ou de um cliente particular. Em ambos os casos, os dados do cliente são preenchidos automaticamente ao selecionar.

