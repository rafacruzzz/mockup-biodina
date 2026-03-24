

## Plano: Dividir aba Pedidos em duas tabelas (Produtos e Serviços)

### Resumo
Substituir a tabela única de pedidos por duas tabelas separadas: **Pedido Produto** e **Pedido Serviço**. Trocar o botão "Criar Novo Pedido" por dois botões: "Adicionar Produto" (abre o modal existente) e "Adicionar Serviço" (placeholder por enquanto). As colunas seguem a imagem de referência.

### Alterações em `src/components/comercial/ContratacaoSimplesForm.tsx`

**1. Novo estado `pedidosServico` (~junto dos outros estados):**
- Array similar ao `pedidos`, mas para serviços: `{ id, numeroPedido, dataFaturamento, periodoCompetencia, nfs, empenho, processo, valorNfs }`
- Inicializado vazio

**2. Substituir conteúdo da aba Pedidos (linhas 2243-2331):**

- **Header**: Título "Gerenciamento de Pedidos" com dois botões:
  - "Adicionar Produto" (abre `setPedidoModalOpen(true)`)
  - "Adicionar Serviço" (placeholder — toast "Em desenvolvimento" por enquanto)

- **Tabela 1 — "Pedido Produto"**:
  - Colunas: Nº Pedido | Data Faturamento | Período Competência | NFE | Empenho | Processo | Valor da NFE
  - Renderiza os `pedidos` existentes mapeando os campos disponíveis
  - Ações: Visualizar, Enviar Expedição (mantém lógica atual)

- **Tabela 2 — "Pedido Serviço"**:
  - Colunas: Nº Pedido | Data Faturamento | Período Competência | NFS | Empenho | Processo | Valor da NFS
  - Renderiza `pedidosServico` (inicialmente vazio, com estado vazio estilizado)

### Resultado
A aba Pedidos mostra duas tabelas distintas para produtos e serviços, com botões separados para adicionar cada tipo. A tabela de serviço fica preparada para quando o modal de serviço for criado.

