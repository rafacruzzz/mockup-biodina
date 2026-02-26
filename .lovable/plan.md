

## Plano: Expandir Nova Conta Recorrente com todos os campos de Nova Conta a Pagar + integração com Calendário

### Resumo

1. Expandir o modal `NovaContaRecorrenteModal` para incluir todos os campos que existem em `NovaContaPagarModal` (tipo requisição, departamento, vincular a projeto/departamento, descrição, pagamento efetuado, dados bancários, multa/juros/desconto)
2. Adicionar campo "Há alteração de valor?" (Sim/Não) — se Não, valor fixo repetido; se Sim, valor vem em branco a cada mês (mas editável em ambos os casos)
3. Salvar contas recorrentes em estado compartilhado e gerar ocorrências no calendário com base na periodicidade
4. No calendário, exibir contas recorrentes como links clicáveis com controles inline (pago na data, dados bancários, documentos anexados)

### Arquivos a modificar

1. **`src/types/financeiro.ts`**
   - Expandir `ContaRecorrenteEnhanced` com os campos: `tipo`, `departamentoSolicitante`, `vincularA`, `projetoCliente`, `departamento`, `descricao`, `pagamentoEfetuado`, `bancoPagamento`, `agenciaPagamento`, `contaPagamento`, `multa`, `juros`, `desconto`, `alteracaoValor: boolean`
   - Adicionar interface `OcorrenciaRecorrente` para representar cada mês gerado: `{ id, contaRecorrenteId, dataVencimento, valor, pago, dataPagamento, bancoPagamento, agenciaPagamento, contaPagamento, multa, juros, desconto }`

2. **`src/components/financeiro/NovaContaRecorrenteModal.tsx`**
   - Adicionar todos os campos que existem em `NovaContaPagarModal`: tipo requisição, departamento solicitante, vincular a (projeto/departamento), fornecedor, descrição, valor, forma de pagamento, data primeiro vencimento, periodicidade
   - Adicionar campo Switch "Há alteração de valor?" (Sim/Não)
   - Adicionar campos: pagamento efetuado (Sim/Não), dados bancários, multa/juros/desconto
   - Manter campo de anexos existente
   - Atualizar `onSave` para incluir todos os novos campos

3. **`src/components/financeiro/APagarPagosView.tsx`**
   - Criar estado `contasRecorrentesSalvas: ContaRecorrenteEnhanced[]`
   - No `onSave` do `NovaContaRecorrenteModal`, salvar no estado e gerar ocorrências para os próximos meses
   - Converter contas recorrentes em `ContaPagar[]` para passar ao `CalendarioVencimentos` junto com `contasSalvas`
   - Implementar handler para atualizar ocorrências recorrentes vindas do calendário

4. **`src/components/financeiro/CalendarioVencimentos.tsx`**
   - Receber contas recorrentes convertidas junto com as contas normais (já recebe `contasSalvas`)
   - Exibir contas recorrentes com badge identificador "Recorrente" no calendário
   - Manter os controles inline existentes (pago na data, dados bancários) funcionando para recorrentes

### Detalhes técnicos

- O campo "Há alteração de valor?" controla se, ao gerar a próxima ocorrência no calendário, o valor vem preenchido (repetido) ou em branco para preenchimento manual
- Mesmo quando "Não" (valor fixo), o campo permanece editável para casos de atraso/multa
- As contas recorrentes serão convertidas em objetos `ContaPagar` com um campo extra para identificá-las como recorrentes, permitindo reutilizar toda a lógica do calendário já implementada

