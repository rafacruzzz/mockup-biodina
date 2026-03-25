

## Plano: Adicionar tabela "Composição de Exames" ao modal Proposta Licitação

### Resumo
Adicionar após a seção de Proposta Comercial (após OBS) uma nova seção "Informações Adicionais: Tabela 1 - Composição de Exames" conforme os prints. A tabela tem estrutura hierárquica: linhas de EXAME (cabeçalho de grupo) seguidas por linhas de PARÂMETROS (itens numerados). Colunas: CATSER | Item | Descrição e Composição do Exame | Valor Unit. No final: linha A (Somatória dos valores unitários) e linha B (Quantidade de exames).

### Alterações em `src/components/comercial/PropostaLicitacaoModal.tsx`

**1. Novo estado para a tabela de exames:**
- Array de objetos com estrutura: `{ id, tipo: 'exame' | 'parametro', catser, item, descricao, valorUnitario }`
- Funções para adicionar exame (linha cabeçalho) e parâmetro (linha item), e remover linhas
- Campos calculados: Somatória dos valores unitários (A) e Quantidade de exames (B = contagem de linhas tipo 'exame')

**2. Nova seção após o card de Proposta Comercial (após linha 529, antes dos botões):**
- Card "Informações Adicionais: Tabela 1 - Composição de Exames"
- Tabela com colunas: CATSER | Item | Descrição e Composição do Exame | Valor Unit.
- Linhas de EXAME em destaque (fundo cinza, fonte bold)
- Linhas de PARÂMETROS numeradas sequencialmente
- Botões: "Adicionar Exame" e "Adicionar Parâmetro"
- Linha A: "Somatória dos valores unitários dos exames" (soma automática)
- Linha B: "Quantidade de exames" (contagem automática)

