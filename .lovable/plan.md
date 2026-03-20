

## Plano: Mover botões de Esclarecimento e Impugnação para após Análise Técnica

### Contexto
Os botões "Solicitar Análise Jurídica - Pedido de Esclarecimento" e "Solicitar Análise Jurídica - Impugnação do Edital" já existem como estados (`solicitouEsclarecimento`, `solicitouImpugnacao`) e seus campos read-only já estão implementados (linhas 925-954). Precisamos apenas adicionar os botões visíveis e reposicionar os campos.

### Alterações em `OportunidadeAvancadaForm.tsx`

**1. Após o campo "Análise Técnica" (linha 842), inserir dois botões:**
- "Solicitar Análise Jurídica - Pedido de Esclarecimento" — ao clicar, seta `solicitouEsclarecimento = true` e exibe toast
- "Solicitar Análise Jurídica - Impugnação do Edital" — ao clicar, seta `solicitouImpugnacao = true` e exibe toast

**2. Mover os blocos read-only de Esclarecimento (linhas 925-938) e Impugnação (linhas 941-954) para logo abaixo dos respectivos botões** (após linha 842, junto dos botões). Cada campo só aparece após o clique no botão correspondente.

**3. Layout:** Botões lado a lado com `flex gap-3 flex-wrap`, seguidos dos campos condicionais.

### Resultado
Após "Análise Técnica" aparecem os dois botões de solicitação jurídica. Ao clicar, surge o campo read-only que replica o conteúdo preenchido na aba AJ.

