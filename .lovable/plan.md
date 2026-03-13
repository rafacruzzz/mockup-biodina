

## Plano: Adicionar botão "Nova Não Conformidade" nas abas de Gestão de NC (Qualidade e RT)

### Resumo
Adicionar um botão "Nova Não Conformidade" em ambas as abas de Gestão de NC (módulos Qualidade e RT). Ao clicar, abre o mesmo modal de detalhes já existente, porém com todos os campos editáveis e vazios para criação.

### Alterações

**1. `src/components/administrativo/qualidade/GestaoNCTab.tsx`**
- Adicionar estado `modoNovo` (boolean) para distinguir criação vs edição
- Adicionar botão "Nova Não Conformidade" ao lado do título do Card da tabela (com ícone `Plus`)
- Ao clicar, setar `ncSelecionada` com um objeto vazio/defaults (novo ID, data atual, campos vazios) e abrir o modal
- No modal, quando `modoNovo`: todos os campos editáveis (incluindo Data da NC como input date, Origem como Select em vez de disabled)
- Gerar `numeroNC` automático (ex: `NC-{ano}-{sequencial}`)
- No "Salvar", adicionar a nova NC à lista `ncs` em vez de atualizar existente

**2. `src/components/administrativo/rt/GestaoNCTab.tsx`**
- Mesma lógica: estado `modoNovo`, botão "Nova Não Conformidade"
- Ao clicar, criar objeto `NaoConformidadeRT` com defaults vazios e abrir modal
- No modal em modo novo: Data e Origem editáveis (selects com as opções de `OrigemNCRT`)
- No "Salvar", adicionar à lista `naoConformidades`

### Detalhes técnicos
- O modal reutiliza a mesma estrutura já existente de "Ver Detalhes"
- A diferença no modo criação: campos Data e Origem ficam editáveis (não `disabled`), e o título do modal muda para "Nova Não Conformidade"
- Botão de salvar muda texto para "Criar Não Conformidade" no modo novo
- Os campos de CAPA iniciam vazios mas editáveis, permitindo já definir ações preventivas/corretivas na criação

