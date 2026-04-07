
Objetivo: corrigir apenas o modal do Roteiro de Auditoria da aba "Auditoria da Qualidade - Interna", sem alterar as demais abas do sistema.

Diagnóstico
- O scroll horizontal das sub-abas A–O está montado com `ScrollArea`, mas o cabeçalho não segue o padrão mais estável já usado no projeto para muitas abas (`overflow-x-auto` + `TabsList` com largura expandida), então as últimas abas continuam inacessíveis.
- O conteúdo interno do modal está em uma cadeia flex que ainda não garante rolagem real da área central; faltam ajustes de `min-h-0`/`overflow-y-auto` no contêiner correto, então o conteúdo cresce em vez de rolar dentro do modal.
- Os últimos campos podem ficar “presos” perto do rodapé se o conteúdo não tiver folga inferior suficiente.

Plano de implementação

1. Ajustar o cabeçalho das abas em `RoteiroAuditoriaModal.tsx`
- Substituir o scroll atual das abas por um wrapper horizontal nativo no mesmo padrão do `ColaboradorModal`.
- Usar algo como: contêiner `flex-shrink-0 overflow-x-auto pb-2` + `TabsList` com `inline-flex w-max min-w-full`.
- Garantir que as abas A até O possam ser arrastadas/roladas horizontalmente sem depender de um scrollbar oculto.

2. Corrigir a rolagem vertical do conteúdo da aba em `RoteiroAuditoriaModal.tsx`
- Transformar a área central do modal em uma região de rolagem independente com `flex-1 min-h-0 overflow-y-auto`.
- Manter cabeçalho e botões do rodapé fixos.
- Adicionar espaçamento inferior (`pb-*`) para que os últimos campos e a legenda fiquem totalmente visíveis.

3. Deixar a estrutura do conteúdo mais previsível em `SecaoRoteiro.tsx`
- Garantir que cada seção fique em fluxo vertical simples, sem contêineres intermediários que atrapalhem a rolagem do modal.
- Se necessário, dar uma largura mínima útil para a tabela em telas menores, permitindo scroll horizontal da própria tabela sem cortar os campos.
- Preservar a compactação já feita nas colunas, sem mexer nas outras abas do sistema.

4. Ajustar a legenda para acompanhar a rolagem
- Manter a `LegendaClassificacao` dentro da área rolável do conteúdo.
- Se necessário, mover sua renderização para dentro do `TabsContent` ativo para que ela sempre apareça no final da aba atual, sem sobrepor campos.

Arquivos a alterar
- `src/components/administrativo/qualidade/auditoria-interna/RoteiroAuditoriaModal.tsx`
- `src/components/administrativo/qualidade/auditoria-interna/SecaoRoteiro.tsx`

Resultado esperado
- As abas A até O passam a ter scroll horizontal funcional.
- O conteúdo de cada aba passa a ter scroll vertical interno real.
- Todos os campos finais ficam acessíveis, inclusive auditor, auditado e legenda.
