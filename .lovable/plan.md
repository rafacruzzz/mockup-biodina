

## Plano: Campo de Análise Científica no detalhe do Alerta para Análise (espelhado na Licitação)

### O que muda

No modal de detalhes que abre ao clicar no olho (👁) nos "Alertas para Análise" da aba Análise de Editais:

1. **Remover** o botão "Ver Edital" do rodapé
2. **Adicionar** um campo `Textarea` com label "Análise Técnica-Científica" + botão "Salvar Análise"
3. Ao salvar, o texto é gravado no campo `analiseTecnica` da licitação correspondente no array `licitacoes` (mock mutável)
4. Assim, ao abrir a mesma licitação em Comercial > Licitação > aba "Análise Técnica", o campo já aparece preenchido com o que o assessor escreveu

### Alteração em `src/components/comercial/assessoria/AnaliseEditaisTab.tsx`

**No modal de detalhes (linha ~292-417):**
- Adicionar estado local `analiseTexto` inicializado com `selectedLicitacao.analiseTecnica || ""`
- Remover o botão "Ver Edital" (linhas 403-411)
- No lugar, inserir antes do rodapé:
  - Label "Análise Técnica-Científica"
  - `Textarea` com `rows={6}` ligado a `analiseTexto`
  - Botão "Salvar Análise" que:
    - Encontra a licitação no array `licitacoes` importado e atualiza `analiseTecnica`
    - Exibe toast de confirmação
    - Fecha o modal
- Manter botão "Fechar"

### Arquivo alterado
- `src/components/comercial/assessoria/AnaliseEditaisTab.tsx`

