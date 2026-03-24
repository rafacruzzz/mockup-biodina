

## Plano: Campo de anexo do documento do empenho + criação do TabsContent Empenho + replicação no Pedido

### Problema identificado
O `TabsContent value="empenho"` não existe no arquivo — apenas o `TabsTrigger` foi criado, mas o conteúdo da aba nunca foi renderizado. Precisamos criar todo o conteúdo da aba Empenho e incluir as novas funcionalidades solicitadas.

### Alterações

**1. `ContratacaoSimplesForm.tsx` — Adicionar campo `documentoEmpenho` ao estado:**
- Expandir o tipo do array `empenhos` para incluir `documentoEmpenho: File | null` e `nomeDocumento: string`

**2. `ContratacaoSimplesForm.tsx` — Criar `TabsContent value="empenho"` (antes da aba Pedidos, ~linha 1971):**
Conteúdo completo da aba com:
- **Painel de Alertas**: empenhos sem pedido vinculado (alerta amarelo)
- **Tabela principal "Empenhos - Por Valor"**: Nº Empenho | Valor do Empenho | Nº Pedidos Vinculados | Valor Faturado | Saldo do Empenho (= Valor Empenho - Valor Faturado)
- **Campo de upload do documento do empenho** abaixo do campo Nº Empenho (em cada linha/card de empenho), com input file para anexar PDF/DOC
- **Seção expansível por empenho**: itens (produto/serviço) com quantidade e valor
- **Botão "+ Adicionar Empenho"** e botão de remover
- **Painel de resumo**: Total empenhado, Total faturado, Saldo total pendente

**3. `PedidoModal.tsx` — Adicionar campo read-only "Documento do Empenho" na aba "Geral":**
- Novo Card "Documento do Empenho" mostrando o arquivo anexado no empenho vinculado (read-only, com botão de download/visualização)
- Como os dados são locais (mock), por ora será um campo placeholder indicando que o documento virá do empenho vinculado

### Detalhe técnico sobre o Saldo
O **Saldo do Empenho** é calculado como: `valorEmpenho - valorFaturado` (conforme solicitado pelo usuário).

### Resultado
A aba Empenho terá conteúdo funcional com tabela, alertas, upload de documento por empenho e painel de resumo. O documento anexado será replicado (read-only) na aba Geral do Novo Pedido.

