

## Plano: Simplificar aba AC e criar histórico de análises científicas

### Resumo
Remover as seções "Análise Científica do Produto" (6 questões) e "Resumo da Análise Científica" da aba AC. Manter apenas o campo "Análise Técnica-Científica" e "Análise da Concorrência". Implementar um sistema de versionamento: cada vez que o assessor científico salva, gera uma entrada numerada (Análise 1, Análise 2, etc.) que aparece tanto na aba AC quanto no campo read-only em Dados Gerais.

### Alterações em `OportunidadeAvancadaForm.tsx`

**1. Remover da aba AC (função `renderAnaliseTecnica`):**
- Bloco "Análise Científica do Produto" com as 6 questões (linhas 1459-1552)
- Bloco "Resumo da Análise Científica" (linhas 1554-1584)
- Código auxiliar: `perguntasCientificas`, `handleAnaliseCientificaChange`, `getACStatusIcon`, `getACStatusColor` (podem ser removidos se não usados em outro lugar)

**2. Adicionar sistema de histórico na aba AC:**
- Novo estado `historicoAnalises` (array de objetos `{id, texto, data, autor}`)
- O campo "Análise Técnica-Científica" continua editável
- Botão "Salvar Análise" abaixo do campo: ao clicar, cria uma nova entrada no histórico com o texto atual, data/hora e número sequencial, limpa o campo
- Abaixo do botão, listar o histórico em cards colapsáveis: "Análise 1 - DD/MM/AAAA", "Análise 2 - DD/MM/AAAA", etc., cada um mostrando o texto salvo (read-only)

**3. Atualizar campo read-only em Dados Gerais (linhas 869-883):**
- Em vez de um único textarea, exibir a lista de análises do histórico como cards read-only numerados (Análise 1, Análise 2, etc.)
- Cada card mostra data e texto da análise

**4. Remover do formData:**
- `analiseCientifica` (array de questões) e `conclusaoAnaliseCientifica` — substituídos por `historicoAnalisesCientificas` (array de versões)

### Resultado
A aba AC fica com: campo de escrita + botão salvar + histórico numerado + Análise da Concorrência. Em Dados Gerais, o campo read-only mostra todas as análises versionadas.

