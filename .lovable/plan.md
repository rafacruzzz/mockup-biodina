

## Plano: Ajustar aba Pedidos — layout separado e dados mock de serviço

### Alterações em `src/components/comercial/ContratacaoSimplesForm.tsx`

**1. Reestruturar layout da aba Pedidos (linhas 2258-2408):**
- Remover os dois botões do CardHeader — cada botão vai para sua respectiva seção
- Seção **Produtos**: título "Produtos" com ícone Package + botão "Adicionar Produto" (cor `bg-biodina-gold`) ao lado direito do título, seguido da tabela de produtos
- Seção **Serviços**: título "Serviços" com ícone Wrench + botão "Adicionar Serviço" (mesma cor `bg-biodina-gold`) ao lado direito do título, seguido da tabela de serviços
- Separar visualmente as duas seções com espaçamento adequado

**2. Mudar cor do botão "Adicionar Serviço":**
- De `variant="outline"` para `className="bg-biodina-gold hover:bg-biodina-gold/90"` (igual ao de Produto)

**3. Adicionar dados mock de serviço (linhas 62-71):**
- Inicializar `pedidosServico` com 2 registros mock para demonstração:
  - `{ id: 'srv-001', numeroPedido: 'Nº PEDIDO', dataFaturamento: '13/03/2025', periodoCompetencia: 'MÊS COMPETENCIA', nfs: 'NFS', empenho: 'Nº EMPENHO', processo: 'Nº PROCESSO', valorNfs: 0 }`
  - `{ id: 'srv-002', numeroPedido: 'Nº PEDIDO', dataFaturamento: '13/02/2026', periodoCompetencia: 'MÊS COMPETENCIA', nfs: 'NFS', empenho: 'Nº EMPENHO', processo: 'Nº PROCESSO', valorNfs: 0 }`

**4. Remover coluna "Ações" das tabelas** para ficar mais limpo como no print de referência

### Arquivo alterado
- `src/components/comercial/ContratacaoSimplesForm.tsx`

