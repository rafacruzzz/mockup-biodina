

## Plano: Corrigir o Cadastro de Kits conforme o layout de referência

### Problema
O modal atual tem campos desnecessários (Descrição, Preço Base) e o campo "Incluir no Pedido" usa checkbox em vez de um Select Sim/Não. O seletor de produtos precisa ser mais funcional. A estrutura não bate com o print enviado.

### Alterações em `src/components/cadastro/KitModal.tsx`

**1. Simplificar "Informações do Kit":**
- Manter apenas **Nome do Kit** (campo obrigatório)
- Remover: Descrição, SKU, Preço Base
- Atualizar `KitFormData` para ter apenas `nome` e `produtos`

**2. Ajustar a tabela de Produtos do Kit:**
- Coluna "Código do Produto" -- texto (vem do produto cadastrado)
- Coluna "Produto" -- nome do produto (Anvisa)
- Coluna "Faz parte do pedido?" -- **Select com opções Sim/Não** (substituir o Checkbox atual)
- Coluna "Quantidade" -- input number editável (quantidade do produto neste kit)
- Coluna "Qtd. Itens" -- input number editável (quantidade de itens)
- Coluna ações -- botão remover (trash)

**3. Melhorar o ProductSelector:**
- Tornar o seletor mais usável: ao clicar "Adicionar Produto", abrir lista com busca e permitir clicar para adicionar diretamente
- Mostrar código + nome do produto na listagem

**4. Atualizar interface `KitProduto`:**
- `fazParteDoP edido: "sim" | "nao"` substituindo `incluirNoPedido: boolean`

**5. Limpar validação e estado:**
- Remover validação de SKU
- Ajustar `handleClose` e `handleSave` para a nova estrutura simplificada

### Arquivo alterado
- `src/components/cadastro/KitModal.tsx`

