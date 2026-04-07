

## Plano: Corrigir Layout e Scroll do Roteiro de Auditoria Interna

### Problemas identificados
1. **Abas (tabs) sem scroll horizontal** — abas de I em diante não são visíveis
2. **Conteúdo da tabela sem scroll vertical** — campos ficam cortados, não é possível ver todos os itens
3. **Coluna Descrição ocupa espaço demais** — sobra espaço entre Descrição e OM/NC/C
4. **Campos Evidência Objetiva e Plano de Ação muito pequenos** — precisam ser maiores
5. **Legenda colapsável sobrepõe campos** — deve ficar dentro da área de scroll, abaixo do conteúdo

### Alterações

#### 1. `RoteiroAuditoriaModal.tsx`
- **Tabs ScrollArea**: adicionar `ScrollBar orientation="horizontal"` para scroll horizontal nas abas
- **Mover LegendaClassificacao para dentro do ScrollArea do conteúdo** (dentro do TabsContent area), para que fique abaixo de todo o conteúdo e não sobreponha campos
- Garantir que o ScrollArea do conteúdo tenha altura fixa calculada para ocupar o espaço disponível

#### 2. `SecaoRoteiro.tsx`
- **Coluna Descrição**: adicionar `max-w-[280px]` e permitir quebra de linha (`whitespace-normal`, `break-words`) em vez de expandir
- **Colunas OM/NC/C**: reduzir largura para `w-10` (compactar checkboxes)
- **Colunas Nº e Quesito**: manter compactas (`w-10` e `w-24`)
- **Colunas Evidência Objetiva e Plano de Ação**: aumentar para `min-w-[180px]` e textarea com `rows={2}` e `min-h-[60px]`
- Usar `table-fixed` no Table para forçar distribuição controlada das colunas

#### Arquivos modificados
- `src/components/administrativo/qualidade/auditoria-interna/RoteiroAuditoriaModal.tsx`
- `src/components/administrativo/qualidade/auditoria-interna/SecaoRoteiro.tsx`

