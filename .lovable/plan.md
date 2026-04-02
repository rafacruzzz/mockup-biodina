

## Plano: Mover campos de quantidade para dentro de cada produto na Licitação

### Problema atual
Os campos "Quantidade Equipamentos / Total Estimado" e "Quantidade Exames / Total Estimado" estão como campos globais separados abaixo da lista de produtos. Conforme o requisito, cada produto deve ter seus próprios valores de "Valor Estimado", "Qtd Equipamentos / Total Estimado" e "Qtd Exames / Total Estimado".

### Alterações em `src/components/comercial/OportunidadeAvancadaForm.tsx`

**1. Expandir a interface do produto:**
- Adicionar `quantidadeEquipamentos: number` e `quantidadeExames: number` a cada item do array `produtos`
- Atualizar o valor inicial ao adicionar produto para incluir esses campos

**2. Mover campos para dentro de cada linha de produto:**
- Cada linha terá: Select (Produto) | Input (Valor Estimado) | Input (Qtd Equipamentos/Total Estimado) | Input (Qtd Exames/Total Estimado) | Botão remover
- Labels exibidas apenas na primeira linha (padrão já existente)

**3. Remover campos globais:**
- Remover os inputs `quantidadeEquipamentos` e `quantidadeExames` que estão no `grid grid-cols-2` abaixo dos produtos (linhas ~742-765)

### Arquivo alterado
- `src/components/comercial/OportunidadeAvancadaForm.tsx`

