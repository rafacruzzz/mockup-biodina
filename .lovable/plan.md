

## Plano: Reorganizar botões e campos na aba Dados Gerais da Licitação

### Problema atual
Todos os 4 botões de solicitação (Assessoria Científica, Esclarecimento, Impugnação, Análise Gerencial) ficam juntos em um bloco após o "Resumo do Edital". O usuário quer uma sequência lógica diferente e remover o botão "Solicitar Análise Gerencial" desta área.

### Nova ordem dos elementos (após "Resumo do Edital")

1. **Botão "Solicitar Análise da Assessoria Científica"** (sozinho)
2. **Campo read-only "Análises Científicas"** (condicional, aparece após clicar - já existe)
3. **Campo "Análise Técnica"** (read-only, exibe o conteúdo da aba AC - novo aqui)
4. **Botões "Solicitar Análise Jurídica - Pedido de Esclarecimento"** e **"Solicitar Análise Jurídica - Impugnação do Edital"** (lado a lado)
5. **Campo read-only "Pedido de Esclarecimento"** (condicional, aparece após clicar - já existe, espelha aba AJ)
6. **Campo read-only "Impugnação do Edital"** (condicional, aparece após clicar - já existe, espelha aba AJ)

### Alterações em `src/components/comercial/OportunidadeAvancadaForm.tsx`

**1. Quebrar o bloco de botões (linhas ~826-883):**
- Manter apenas o botão "Solicitar Análise da Assessoria Científica" no primeiro grupo
- Logo abaixo, manter o bloco condicional das Análises Científicas (já existente)
- Adicionar novo campo read-only "Análise Técnica" mostrando o histórico de análises da aba AC
- Criar segundo grupo de botões com Esclarecimento e Impugnação
- Logo abaixo, manter os blocos condicionais de Esclarecimento e Impugnação (já existentes)

**2. Remover botão "Solicitar Análise Gerencial" deste bloco** (linhas ~871-882)

### Arquivo alterado
- `src/components/comercial/OportunidadeAvancadaForm.tsx`

