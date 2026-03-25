

## Plano: Adicionar campos finais ao modal Proposta Contratação

### Resumo
Adicionar após a tabela "Composição do Valor Ofertado" os campos de texto livre que completam o formulário: Declaração, Prazo de validade, Pagamento, Prazo de entrega, Garantia, Local de entrega, Frete e Impostos, Observações e Local/Data/Assinatura. Mesmo padrão já existente no `PropostaDTModal`.

### Alterações em `src/components/comercial/PropostaContratacaoModal.tsx`

**1. Novos estados:**
- `declaracao`, `prazoValidade`, `pagamento`, `prazoEntrega`, `garantia`, `localEntrega`, `freteImpostos`, `observacoes`, `localAssinatura`, `dataAssinatura` — todos `string`, inicializados vazios

**2. Novas seções após "Composição do Valor Ofertado" (antes dos botões):**
- Card "Declaração": label "A empresa XXXXX declara que:" + Textarea
- Campos em cards individuais ou agrupados: Prazo de validade da proposta (Input), Pagamento (Textarea), Prazo de entrega e/ou instalação (Input), Garantia (Textarea), Local de entrega (Input), Frete e Impostos (Textarea), Observações (Textarea)
- Card "Local, Data e Assinatura": inputs para Local e Data

**3. Incluir novos campos no `handleSave`** para persistir no objeto da proposta salva.

