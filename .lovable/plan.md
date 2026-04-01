

## Plano: Alertas de Empenho/OF nos Pedidos + Aba "Ordem de Fornecimento" para Privados

### Contexto
Três demandas:
1. Na aba **Pedidos**, se um pedido não tem empenho vinculado, exibir alerta visual (badge/ícone vermelho) na coluna "Empenho" — o alerta só desaparece quando o empenho for anexado/vinculado
2. Ao clicar no número do empenho na tabela de pedidos, abrir/baixar o documento do empenho (que foi anexado na aba Empenho)
3. Para clientes **Privados**, reproduzir a mesma lógica da aba "Empenho" e da coluna de empenho nos Pedidos, mas com nomenclatura "Ordem de Fornecimento" (OF)

### Alterações em `src/components/comercial/ContratacaoSimplesForm.tsx`

**1. Variável de segmento Privado (junto da `isSegmentoPublico`, linha ~341):**
- Adicionar `isSegmentoPrivado` baseado em `tipoContratacao === 'privado'` ou segmento do lead
- Adicionar `isSegmentoFilantropico` para garantir que Filantrópico use "Empenho" (igual ao Público)

**2. Estado para Ordens de Fornecimento (junto dos `empenhos`, linhas ~129-156):**
- Criar `ordensFornecimento` com mesma estrutura do `empenhos`, mas campos renomeados: `numeroOF`, `valorOF`, `documentoOF`, etc.
- Mock com 1-2 registros para demonstração

**3. Aba condicional na TabsList (linha ~659-669):**
- Manter aba "Empenho" para `isSegmentoPublico || isSegmentoFilantropico`
- Adicionar aba "Ordem de Fornecimento" para segmento Privado, mesma estrutura visual

**4. TabsContent da aba "Ordem de Fornecimento" (após o bloco da aba Empenho, ~linha 1550):**
- Duplicar o conteúdo da aba Empenho com nomenclatura adaptada:
  - "Empenho" → "Ordem de Fornecimento" / "OF"
  - "Nº Empenho" → "Nº OF"
  - "Valor do Empenho" → "Valor da OF"
  - "Documento do Empenho" → "Documento da OF"
  - "Cobrar pedido" → "Cobrar ordem de fornecimento"
  - Botão "Adicionar Empenho" → "Adicionar OF"

**5. Alertas na coluna "Empenho" / "OF" da aba Pedidos (linhas ~2292-2312 e ~2356-2372):**
- Na tabela de **Produtos**: coluna "Empenho" mostra:
  - Se tem empenho vinculado: número clicável (link/botão) que abre o documento anexado na aba Empenho
  - Se não tem: badge vermelho `AlertTriangle` + "Sem empenho" (para Público/Filantrópico) ou "Sem OF" (para Privado)
- Na tabela de **Serviços**: mesma lógica na coluna "Empenho"
- Para clientes Privados: renomear header da coluna de "Empenho" para "Ordem de Fornecimento"

**6. Função para abrir documento do empenho/OF ao clicar no número:**
- Buscar no array `empenhos` ou `ordensFornecimento` o registro cujo número corresponde
- Se tem `documentoEmpenho`/`documentoOF` (File), criar URL via `URL.createObjectURL` e abrir em nova aba
- Se não tem documento anexado: toast informando "Documento não anexado — anexe na aba Empenho/OF"

### Arquivo alterado
- `src/components/comercial/ContratacaoSimplesForm.tsx`

