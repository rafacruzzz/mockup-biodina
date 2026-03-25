

## Plano: Restaurar aba Interfaceamento no formulário de Contratação

### Resumo
Restaurar a aba "Interfaceamento" que foi removida. O componente `InterfaceamentoTab` já existe e está importado — só precisa adicionar o TabsTrigger e o TabsContent de volta.

### Alterações em `src/components/comercial/ContratacaoSimplesForm.tsx`

**1. Adicionar TabsTrigger (após Chamados, ~linha 674):**
- Nova aba com ícone Network e label "Interfaceamento"

**2. Substituir o comentário `{/* Interfaceamento removido */}` (linha 2421) por TabsContent:**
- Renderizar `<InterfaceamentoTab>` passando `oportunidade`, `formData` e `onInputChange` como props (mesmo padrão anterior)

### Resultado
A aba Interfaceamento volta a aparecer no formulário de Contratação, com toda a funcionalidade já existente no componente `InterfaceamentoTab`.

