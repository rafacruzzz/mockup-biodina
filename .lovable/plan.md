

## Plano: Criar aba "Meus Pedidos" no módulo Comercial > Vendas

### Contexto

Usuários criam pedidos dentro de contratações (projetos), mas não têm uma visão consolidada de todos os seus pedidos. A nova aba "Meus Pedidos" reunirá todos os pedidos do usuário logado, de todas as contratações, com filtros para facilitar o acompanhamento.

### Arquivos a criar

1. **`src/data/meusPedidosMock.ts`**
   - Array mock de pedidos simulando pedidos criados por diferentes usuários em diferentes contratações
   - Cada pedido terá: `id`, `numeroPedido`, `contratacaoNome`, `contratacaoCodigo`, `cliente`, `dataCriacao`, `valorTotal`, `statusAtual` (usando `StatusPedido` existente), `criadoPor` (nome do usuário), `produtos` (resumo), `ultimaAtualizacao`

2. **`src/components/comercial/MeusPedidosView.tsx`**
   - Componente principal da aba
   - **Cards de resumo** no topo: Total de pedidos, Em andamento, Faturados, Entregues
   - **Filtros**: por contratação (Select), por status do pedido (Select), por período/data (inputs de data)
   - **Tabela** com colunas: Nº Pedido, Contratação, Cliente, Data, Valor, Status (badge colorido), Ações (botão ver detalhes)
   - Filtra pedidos pelo usuário logado (usando `useUser()` do contexto existente)
   - Status com badges coloridos reutilizando o padrão de cores do `AcompanhamentoPedidoTab`

### Arquivos a modificar

1. **`src/pages/Comercial.tsx`**
   - Adicionar tab `{ id: 'meus-pedidos', label: 'Meus Pedidos', icon: ClipboardList }` após "Gestão de Empréstimos" no array `tabs` (~linha 743)
   - Adicionar `case 'meus-pedidos': return <MeusPedidosView />;` no `renderContent` (~linha 752)
   - Import do `MeusPedidosView`

