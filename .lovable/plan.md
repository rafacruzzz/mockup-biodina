

## Plano: Adicionar campos finais ao modal Proposta Licitação

### Resumo
Após a tabela "Composição do Valor Ofertado", adicionar as seções finais: Declaração de Código Alfandegário (4 campos + Registro/Código agrupados), Declaração da empresa, campos de condições comerciais e Local/Data/Assinatura. Mesmo padrão usado no `PropostaContratacaoModal`.

### Alterações em `src/components/comercial/PropostaLicitacaoModal.tsx`

**1. Novos estados:**
- `modeloProdutoAlf`, `marcaFabricanteAlf`, `procedenciaAlf`, `registroProdutoAlf`, `codigoAlfandegario` (strings — seção alfandegária)
- `declaracao`, `prazoValidade`, `pagamento`, `prazoEntrega`, `garantia`, `localEntrega`, `freteImpostos`, `observacoes`, `localAssinatura`, `dataAssinatura` (strings)

**2. Inserir após o card "Composição do Valor Ofertado" (linha 811), antes dos botões (linha 813):**

- **Card "Declaração de Código Alfandegário"**: inputs para Modelo do produto, Marca/Fabricante, Procedência, e linha com Registro do produto + Código Alfandegário lado a lado
- **Card "Declaração"**: label "A empresa XXXXX declara que:" + Textarea
- **Cards de condições comerciais**: Prazo de validade (Input), Pagamento (Textarea), Prazo de entrega e/ou instalação (Input), Garantia (Textarea), Local de entrega (Input), Frete e Impostos (Textarea), Observações (Textarea)
- **Card "Local, Data e Assinatura"**: inputs para Local e Data

**3. Incluir novos campos no `handleSave`**

