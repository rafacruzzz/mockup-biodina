

## Plano: Adicionar tabela "Composição do Valor Ofertado" na Proposta Contratação

### Resumo
Adicionar uma nova tabela após a seção "Quantidade de Produtos" com linhas pré-definidas conforme a imagem: Testes (reagente), Equipamento, Acessórios, Manutenção preventiva e corretiva, Suporte técnico, Treinamento e Certificados. Colunas: Composição do valor ofertado | Valor unitário | Valor total.

### Alterações em `src/components/comercial/PropostaContratacaoModal.tsx`

**1. Novo estado:**
- `composicaoValor: Array<{ id: string, descricao: string, valorUnitario: number, valorTotal: number }>` — inicializado com as 6 linhas pré-definidas

**2. Nova seção após o card "Quantidade de Produtos" (antes dos botões de ação):**
- Card "Composição do Valor Ofertado"
- Tabela com colunas: Composição do valor ofertado (texto read-only) | Valor unitário (input number) | Valor total (input number)
- As 6 linhas fixas: Testes (reagente), Equipamento, Acessórios, Manutenção preventiva e corretiva, Suporte técnico, Treinamento e Certificados

