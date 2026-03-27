

## Plano: Acrescentar campos e tabela de Operadores no Cadastro de Contas Bancárias

### Alterações em `src/components/cadastro/ContaBancariaModal.tsx`

**1. Novos campos no `formData` (linha 17):**
- `codigo_banco: ""` — antes de "Instituição"
- `codigo_operacao: ""` — ao lado de "Conta Corrente"
- `chave_pix: ""`
- `nome_gerente: ""`
- `telefone_gerente: ""`
- `email_gerente: ""`
- `endereco_gerente: ""`
- `data_abertura: ""`
- `data_encerramento: ""`
- `operadores: []` — array de `{ operador, perfil, tipo, codigo }`

**2. Seção "Informações Básicas" — reorganizar grid:**
- Adicionar campo "Código do Banco" (Input) **antes** de "Instituição"
- Adicionar campo "Código de Operação" (Input) **ao lado** de "Conta Corrente"
- Adicionar campo "Chave Pix" (Input)

**3. Nova seção "Dados do Gerente":**
- Nome do Gerente (Input)
- Telefone (Input com máscara)
- E-mail (Input)
- Endereço do Gerente (Input, col-span-2)

**4. Nova seção "Datas":**
- Data de Abertura da Conta (Input type="date")
- Data de Encerramento da Conta (Input type="date")

**5. Nova seção "Operadores" — tabela com CRUD:**
- Tabela com colunas: Operador, Perfil, Tipo, Código, Ações (conforme imagem)
- Botão "Adicionar Operador" que insere linha editável
- Cada linha terá botão de remover nas Ações
- Estado `operadores` como array no formData

### Resultado
O modal de Conta Bancária terá todos os campos solicitados organizados em seções lógicas, incluindo a tabela de Operadores com possibilidade de adicionar/remover registros.

