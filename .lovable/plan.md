

## Plano: Múltiplos Produtos na Licitação

### Objetivo
Transformar o campo único "Produto" em uma lista dinâmica, permitindo adicionar vários produtos com valor estimado individual.

### Alterações em `OportunidadeAvancadaForm.tsx`

**1. Novo estado para lista de produtos (~linha 214)**
- Substituir `produto: string` e `valorEstimado: number` por `produtos: Array<{ id: string; produto: string; valorEstimado: number }>` inicializado com 1 item vazio.

**2. Substituir o bloco de Produto + Valor Estimado (linhas 663-692)**
- Renderizar a lista `formData.produtos.map(...)`, cada item com:
  - Select "Produto" (mesmo catálogo atual)
  - Input "Valor Estimado"
  - Botão de remover (ícone X, visível quando há mais de 1 item)
- Após a lista, botão "+ Adicionar Produto"
- Layout: cada produto em uma row com grid 2 colunas + botão remover

**3. Manter os campos "Quantidade Equipamentos" e "Quantidade Exames" abaixo da lista, como estão hoje (linhas 693-714).**

### Resultado
O usuário poderá adicionar quantos produtos quiser à licitação, cada um com seu valor estimado, conforme a imagem de referência.

