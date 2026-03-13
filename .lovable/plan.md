

## Plano: Mover "Meus Pedidos" para dentro da aba Contratação como sub-aba

### Resumo
Remover "Meus Pedidos" como aba independente do módulo Vendas e colocá-lo como sub-aba dentro de "Contratação". A aba Contratação passará a ter duas sub-abas: "Contratações" (conteúdo atual) e "Meus Pedidos".

### Alterações

**Arquivo: `src/pages/Comercial.tsx`**

1. **Remover** a entrada `{ id: 'meus-pedidos', label: 'Meus Pedidos', icon: ClipboardList }` do array `tabs` em `renderVendasModule` e remover o `case 'meus-pedidos'` do switch.

2. **Modificar** o `case 'contratacao'` no switch para renderizar um novo componente/bloco que contém duas sub-abas internas:
   - Sub-aba **"Contratações"**: renderiza o conteúdo atual de `renderOportunidadesPorModalidade('contratacao_simples')`
   - Sub-aba **"Meus Pedidos"**: renderiza `<MeusPedidosView />`

3. Usar um **estado local** (ex: `subAbaContratacao`) com `useState` para controlar qual sub-aba está ativa dentro de Contratação. As sub-abas terão estilo visual diferenciado (menor/secundário) para indicar hierarquia.

**Arquivo: `src/pages/PersonalizarNavegacao.tsx`**
- Remover o item `vendas-meus-pedidos` da árvore e adicioná-lo como filho de `vendas-contratacao` (ou simplesmente manter a referência atualizada).

