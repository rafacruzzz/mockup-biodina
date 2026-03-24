

## Plano: Ajustar aba Empenho — itens só via pedido vinculado

### Resumo
Os itens de um empenho só existem se houver pedido vinculado. Portanto: remover o botão de expandir (chevron) e a seção de "Itens do Empenho" com "Adicionar Item". Em vez disso, quando houver pedidos vinculados, o número do pedido será um botão clicável que, ao ser clicado, expande abaixo mostrando os itens/produtos daquele pedido. Sem pedido = sem itens para ver.

### Alterações em `src/components/comercial/ContratacaoSimplesForm.tsx`

**1. Remover da seção de cada empenho (linhas 1476-1612):**
- Remover o botão de expandir/chevron (linhas 1478-1488)
- Remover toda a seção expansível "Itens do Empenho" com tabela e botão "Adicionar Item" (linhas 1500-1612)
- Remover o campo `expandido` e `itens` do estado `empenhos` (não são mais geridos aqui)

**2. Tornar os números de pedido clicáveis (linhas 1399-1407):**
- Na coluna "Nº Pedidos Vinculados", cada Badge de pedido vira um botão clicável
- Novo estado `pedidoExpandido: string | null` (id do empenho + pedido expandido)
- Ao clicar no número do pedido, expande uma seção abaixo do card do empenho mostrando os itens/produtos daquele pedido (dados mock read-only: código, descrição, quantidade, valor)

**3. Manter o botão de remover empenho (X)** no lugar do chevron removido.

### Resultado
A aba Empenho mostra a tabela por valor sem botão de expandir itens. Os itens só aparecem ao clicar no número de um pedido vinculado. Sem pedido = sem itens para visualizar.

