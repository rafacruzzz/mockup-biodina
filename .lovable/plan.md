

## Plano: Adicionar seções de Especificação do Produto, Quantidade de Produtos e Composição do Valor Ofertado ao modal Proposta Licitação

### Resumo
Após a tabela "Composição de Exames", adicionar 3 novas seções no `PropostaLicitacaoModal.tsx`, replicando o mesmo padrão já existente no `PropostaContratacaoModal.tsx`:

1. **Especificação/Descrição do produto** — Card com 5 campos: Apresentação, Modelo, Marca/fabricante, Registro na Anvisa, Procedência
2. **Quantidade de Produtos** — Tabela editável: Unidade Hospitalar + Quant. de Itens, com botão adicionar/remover e linha TOTAL (conforme imagem)
3. **Composição do Valor Ofertado** — Tabela com 6 linhas fixas (Testes/reagente, Equipamento, Acessórios, Manutenção preventiva e corretiva, Suporte técnico, Treinamento e Certificados) com colunas Valor unitário e Valor total (conforme imagem)

### Alterações em `src/components/comercial/PropostaLicitacaoModal.tsx`

**1. Novos estados:**
- `apresentacao`, `modelo`, `marcaFabricante`, `registroAnvisa`, `procedencia` (strings)
- `unidadesHospitalares` (array com id, unidade, quantidade) + funções add/update/remove
- `composicaoValor` (array com 6 linhas pré-definidas, cada uma com descricao, valorUnitario, valorTotal)

**2. Inserir 3 novos cards após o card "Composição de Exames" (linha 628), antes dos botões (linha 630):**
- Código copiado/adaptado do `PropostaContratacaoModal` (linhas 528-660)

