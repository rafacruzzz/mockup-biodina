

## Plano: Transformar botão existente de Assessoria Científica no mesmo padrão dos botões jurídicos

### Problema
O botão "Solicitar Análise da Assessoria Científica" já existe (linha 814), mas o campo "Análise Técnica" (linhas 828-842) está sempre visível. O comportamento deve ser igual aos botões jurídicos: o campo só aparece após clicar no botão.

### Alterações em `OportunidadeAvancadaForm.tsx`

**1. Tornar o campo "Análise Técnica" condicional (linhas 827-842)**
- Envolver o bloco do campo "Análise Técnica" com `{solicitouAnaliseCientifica && ( ... )}`, para que só apareça após o clique no botão.

**2. Agrupar o botão junto dos botões jurídicos (linhas 844-870)**
- Mover o botão "Solicitar Análise da Assessoria Científica" (linhas 814-825) para dentro do `div flex gap-3` dos botões jurídicos (linha 845), ficando os 3 botões lado a lado.
- O campo condicional de Análise Técnica fica logo abaixo, antes dos campos de Esclarecimento e Impugnação.

### Resultado
Três botões de solicitação juntos. Ao clicar em cada um, aparece o respectivo campo read-only preenchido pela aba correspondente (AC ou AJ).

