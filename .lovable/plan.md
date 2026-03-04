

## Plano: Adicionar aba "Empenho" na Contratação

### Alteração

**Arquivo: `src/components/comercial/ContratacaoSimplesForm.tsx`**

1. **Estado**: Adicionar `empenhoProdutos` e `empenhoServicos` como arrays no estado do componente, cada item contendo: `id`, `numeroEmpenho`, `produto/servico` (nome), `quantidade`, `valor`, `saldoEnviado`, `saldoDevedor` (calculado: valor - saldoEnviado).

2. **TabsTrigger (linha ~542)**: Inserir a aba "Empenho" entre "Dados Gerais" e "Saldo do Cliente":
   ```
   Dados Gerais → Empenho → Saldo do Cliente → ...
   ```
   Atualizar o grid-cols de 9/8 para 10/9 respectivamente.

3. **TabsContent**: Criar conteúdo da aba com dois Cards:

   **Card 1 — Produtos**:
   - Botão "Adicionar Produto" no header
   - Tabela com colunas: Nº Empenho, Produto, Quantidade, Valor, Saldo Enviado (pedido), Saldo Devedor, Ações (remover)
   - Cada linha é um item independente (não se misturam)
   - Saldo Devedor = Valor - Saldo Enviado (calculado automaticamente)

   **Card 2 — Serviços**:
   - Mesma estrutura do Card de Produtos
   - Tabela com: Nº Empenho, Serviço, Quantidade, Valor, Saldo Enviado, Saldo Devedor, Ações

   Ambos os quadros permitem adicionar múltiplos itens via botão "+". Campos não obrigatórios.

