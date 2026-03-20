

## Plano: Adicionar botão "Voltar para Contratações" na tela Meus Pedidos

### Alteração em `src/pages/Comercial.tsx`

**Na função `renderContratacaoComSubAbas` (linha 879-886):**
- Quando `subAbaContratacao === 'pedidos'`, adicionar um botão "Voltar para Contratações" acima do componente `<MeusPedidosView />` com ícone `ArrowLeft`, que seta `subAbaContratacao` para `'contratacoes'`.

### Resultado
O usuário ao entrar em "Meus Pedidos" verá um botão de voltar no topo para retornar à listagem de contratações.

