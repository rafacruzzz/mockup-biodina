

## Plano: Reformular aba Empenho com visão consolidada por valor e alertas de vinculação

### Resumo
Reestruturar a aba Empenho para ter uma visão consolidada "por valor" (conforme a imagem de referência), com colunas: Nº Empenho, Valor do Empenho, Nº Pedidos Vinculados, Valor Faturado e Saldo do Empenho. Adicionar alertas automáticos quando houver empenho sem pedido vinculado (e vice-versa), além de um painel de resumo mostrando totais empenhados, faturados e pendentes.

### Alterações em `src/components/comercial/ContratacaoSimplesForm.tsx`

**1. Reestruturar o estado de empenhos (linhas 117-135):**
- Substituir os dois arrays separados (`empenhoProdutos` e `empenhoServicos`) por um array unificado `empenhos`:
  ```
  { id, numeroEmpenho, valorEmpenho, pedidosVinculados: string[], valorFaturado, itens: Array<{tipo, descricao, quantidade, valor}> }
  ```

**2. Substituir o conteúdo da aba Empenho (linhas 1280-1528):**

- **Painel de Alertas** (topo): Card com alertas automáticos:
  - Alerta amarelo/laranja quando há empenho sem pedido vinculado: "Empenho Nº XXXX sem pedido vinculado - Cobrar pedido do cliente"
  - Alerta vermelho quando há pedido sem empenho: "Pedido sem empenho vinculado - Solicitar empenho à administração pública"
  - Contador de alertas no TabsTrigger do Empenho (badge)

- **Tabela principal "CC Empenhos - Por Valor"**:
  - Colunas: Nº Empenho | Valor do Empenho | Nº Pedidos Vinculados | Valor Faturado | Saldo do Empenho
  - Saldo do Empenho = Valor do Empenho - Valor Faturado (calculado automaticamente)
  - Na coluna "Nº Pedidos Vinculados": se não houver pedido, exibir Badge vermelha "Sem pedido - Cobrar cliente"
  - Botão para adicionar novo empenho e botão para remover

- **Painel de resumo** (rodapé):
  - Total empenhado, Total faturado, Saldo total pendente
  - Quantidade de empenhos sem pedido / Quantidade de pedidos sem empenho

- **Seção de detalhamento** (expansível por empenho):
  - Ao clicar em um empenho, expande para mostrar os itens (produtos/serviços) com quantidade e valor individual
  - Mostra o saldo de quantidades dos itens daquele empenho

### Resultado
A aba Empenho funciona como painel de controle: visão consolidada por valor com alertas proativos para cobrar empenhos e pedidos pendentes, garantindo que nenhum recurso liberado fique sem ser cobrado.

