

## Plano: Reestruturar Cadastro de Kits

### Problema atual
O KitModal usa um conceito de "Slots" com agrupamentos de produtos. O usuário precisa de uma estrutura mais simples e direta: uma tabela flat de produtos com colunas para Codigo, Nome (Anvisa), checkbox Sim/Nao (para marcar se entra no pedido), Quantidade, e seletor de quantidade de itens. Deve ser possivel adicionar novos produtos ao kit.

### Nova estrutura do Kit (conforme imagens de referencia)

Cada kit terá:
- **Informações basicas**: Nome, SKU, Descrição, Preço Base (manter)
- **Tabela de Produtos do Kit** (substituir toda a logica de Slots):
  - Coluna "Código do Produto"
  - Coluna "Nome do Produto (Anvisa)"
  - Coluna "Incluir no Pedido" (checkbox sim/nao)
  - Coluna "Quantidade" (display da quantidade cadastrada)
  - Coluna "Qtd. Itens" (input number para selecionar quantidade de itens)
  - Botão "Adicionar Produto" para vincular novos produtos da base cadastrada
  - Botão de remover produto (trash icon)

### Alterações

**Em `src/components/cadastro/KitModal.tsx`:**

1. **Substituir interfaces**: remover `Slot`, `SlotProduto`. Criar `KitProduto` com campos: `id`, `codigo`, `nome`, `incluirNoPedido` (boolean), `quantidade` (string), `qtdItens` (string)

2. **Substituir `slots` por `produtos`** no `KitFormData`: `produtos: KitProduto[]`

3. **Remover toda logica de slots**: `addSlot`, `removeSlot`, `updateSlot`, `toggleSlotExpand`, `toggleProductSelector`, `addProductToSlot`, `removeProductFromSlot`

4. **Nova logica**:
   - `addProduto(product)`: adiciona produto da base ao kit
   - `removeProduto(id)`: remove produto do kit
   - `updateProduto(id, field, value)`: atualiza campo do produto (checkbox, qtd)
   - `showProductSelector` / `toggleProductSelector`: controla visibilidade do seletor

5. **Nova UI**: substituir cards de slots por uma `Table` com as colunas da imagem de referencia:
   - `TableHeader`: Código | Nome do Produto (Anvisa) | Incluir no Pedido | Quantidade | Qtd. Itens | Ações
   - `TableBody`: uma row por produto com inputs inline
   - Estado vazio com mensagem "Nenhum produto adicionado ao kit"
   - Botão "Adicionar Produto" abre o `ProductSelector` (reutilizar com ajustes para mostrar codigo)

6. **Atualizar `ProductSelector`**: mostrar codigo do produto alem do nome; ao selecionar, retornar `{ id, codigo, nome }`

7. **Resumo**: atualizar para mostrar total de produtos e total marcados para pedido

### Arquivo alterado
- `src/components/cadastro/KitModal.tsx`

