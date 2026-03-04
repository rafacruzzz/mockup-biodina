

## Plano: Replicar modal de NC da Qualidade no RT

### Problema
O modal "Ver Detalhes" da Gestão de NC no RT tem todos os campos bloqueados (`disabled`), está envolto em Cards separados ("Informações Gerais" e "CAPA"), e só tem botão "Fechar". O da Qualidade tem campos editáveis, layout sem Card wrapper nos campos básicos, e botões "Cancelar" + "Salvar Alterações".

### Alteração

**Arquivo único: `src/components/administrativo/rt/GestaoNCTab.tsx`**

Reescrever o modal (linhas ~160-270) para replicar a estrutura da Qualidade:

1. **Remover os Cards** "Informações Gerais" e "CAPA" como wrappers — campos básicos ficam diretamente no `div.space-y-6`; seção CAPA fica em um Card com borda `border-2 border-primary/20`
2. **Tornar campos editáveis** — remover `disabled` de todos os campos e adicionar `onChange` handlers que atualizam `selectedNC` via `setSelectedNC`
3. **Layout dos campos** igual ao da Qualidade:
   - Linha 1: Data da NC (disabled) + Origem (disabled)
   - Linha 2: Tipo (Select editável, sozinho)
   - Linha 3: Impacto (Select editável) + Responsável (Select editável)
   - Prazo de Execução (Input date editável)
   - Descrição da NC (Textarea editável)
   - Ação Imediata (Textarea editável)
   - Observações (Textarea editável)
4. **Seção CAPA** com Card `border-2 border-primary/20`:
   - Ação Preventiva e Corretiva editáveis
   - Gerenciamento de Tarefas (se existir)
   - Prazo Final (editável) + Status CAPA (badge, grid-cols-2)
   - Responsável CAPA (Select editável)
5. **Botões** no final: "Cancelar" + "Salvar Alterações" (substituindo o "Fechar")
6. **Adicionar função `atualizarNC`** que salva as alterações no state local (como faz a Qualidade)

