

## Plano: Reestruturar tela de detalhes ao clicar em Pedido Vinculado na aba Empenho

### Problema atual
Ao clicar em um pedido vinculado na aba Empenho, aparece uma tabela simples com Código, Descrição, Qtd e Valor (R$). O usuário quer que essa tela seja substituída pelo layout da "Segunda Tela" (imagem 4).

### Alteração

**Arquivo: `src/components/comercial/ContratacaoSimplesForm.tsx`**

Substituir a seção expansível dos itens do pedido (linhas ~1578-1612) pelo novo layout:

1. **Cabeçalho**: Grid 2 colunas mostrando:
   - **Empenho**: Nº do empenho vinculado ao pedido
   - **Pedido**: Nº do pedido clicado

2. **Tabela "Por Item"**: Colunas:
   - **Produto** — nome/descrição do item
   - **Quantidade Inicial** — quantidade empenhada do item
   - **Enviado no Pedido** — quantidade enviada nesse pedido
   - **Saldo do Pedido (QNT)** — diferença (Inicial - Enviado)

3. **Atualizar mock `itensPorPedido`** (linha 192-196) para incluir os novos campos: `quantidadeInicial`, `enviadoNoPedido` (o saldo é calculado).

### Arquivo afetado
- `src/components/comercial/ContratacaoSimplesForm.tsx`

