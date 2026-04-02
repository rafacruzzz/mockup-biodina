

## Plano: Remover Liberação de Produtos, ajustar tipos de mudança e adicionar notas de integração

### 1. Remover tabela "Liberação de Produtos" do módulo RT

**Em `src/components/administrativo/rt/DocumentacaoTab.tsx`:**
- Remover import de `LiberacaoProdutosTable`
- Remover import de `mockLiberacaoProdutos`
- Remover import do tipo `LiberacaoProduto`
- Remover estado `produtos` e o bloco `<LiberacaoProdutosTable />`

### 2. Ajustar tipos de mudança — remover C e E, reletrar

**Em `src/types/rt.ts`:**
- Alterar `TipoMudanca` de `'A' | 'B' | 'C' | 'D' | 'E' | 'F'` para `'A' | 'B' | 'C' | 'D'`
- A = Dados Empresariais, B = Dados Mestres de Produtos, C = Atualizações Regulatórias (ANVISA), D = Outros

**Em `src/components/administrativo/rt/ControleMudancasTable.tsx`:**
- Atualizar `getTipoMudancaLabel` com as 4 opções reletradas (A-D)

**Em `src/components/administrativo/rt/NovaMudancaModal.tsx`:**
- Remover opções C (Processos de Negócio) e E (Melhorias de Performance)
- Reletrar D→C, F→D nas opções do Select e no display do SelectValue

**Em `src/data/rtModules.ts`:**
- Atualizar mock de mudanças: remover a de tipo C, reletrar D→C
- Atualizar `descricoesTipoMudanca` com as 4 chaves corretas

### 3. Adicionar notas de integração (origem dos dados)

**Em `src/components/administrativo/rt/ControleMudancasTable.tsx`:**
- Substituir o texto de integração existente por uma nota mais completa:
  - "A - Dados Empresariais": dados vindos do módulo Institucional
  - "B - Dados Mestres de Produtos": dados vindos do módulo Regulatório
  - "C - Atualizações Regulatórias": dados vindos do módulo Regulatório
  - "D - Outros": registro manual

**Em `src/components/administrativo/rt/ListaMestraSection.tsx`:**
- Adicionar nota: "Os itens LTCAT, PCMSO e PGR são alimentados pelo módulo RH"

**Em `src/components/administrativo/rt/TreinamentosSection.tsx`:**
- Adicionar nota: "Seção alimentada pelos módulos RT e RH"

**Em `src/components/administrativo/rt/DocumentacaoTab.tsx` (seção POP):**
- Adicionar nota: "Alterações em POP são sincronizadas com a seção 'POP - Procedimentos Operacionais Padrão' de 'Estrutura e Padrões' do módulo Qualidade, e vice-versa"

### Arquivos alterados
- `src/types/rt.ts`
- `src/data/rtModules.ts`
- `src/components/administrativo/rt/DocumentacaoTab.tsx`
- `src/components/administrativo/rt/ControleMudancasTable.tsx`
- `src/components/administrativo/rt/NovaMudancaModal.tsx`
- `src/components/administrativo/rt/ListaMestraSection.tsx`
- `src/components/administrativo/rt/TreinamentosSection.tsx`

