

## Plano: Botões de Solicitação Jurídica e Científica na aba Dados Gerais

### Objetivo
Na aba "Dados Gerais", após o Resumo do Edital:
1. Substituir o checkbox "Solicitar análise técnica" por **3 botões** distintos
2. Os campos read-only associados só aparecem **após clicar** no botão correspondente
3. Adicionar campo read-only de Análise Científica (réplica da aba AC) que também só aparece após solicitar

### Alterações em `src/components/comercial/OportunidadeAvancadaForm.tsx`

**1. Adicionar estados de solicitação no componente (~linha 97)**
- `solicitouEsclarecimento: boolean` (false)
- `solicitouImpugnacao: boolean` (false)  
- `solicitouAnaliseCientifica: boolean` (false)

**2. Substituir o checkbox existente (linhas 763-778) por 3 botões:**
- **"Solicitar Análise Jurídica - Pedido de Esclarecimento"** → seta `solicitouEsclarecimento = true`, exibe toast
- **"Solicitar Análise Jurídica - Impugnação do Edital"** → seta `solicitouImpugnacao = true`, exibe toast
- **"Solicitar Análise da Assessoria Científica"** → seta `solicitouAnaliseCientifica = true`, exibe toast

**3. Condicionar exibição dos campos read-only:**
- **Pedido de Esclarecimento** (linha 890-902): só renderiza se `solicitouEsclarecimento === true`
- **Impugnação do Edital** (linha 904-916): só renderiza se `solicitouImpugnacao === true`
- **Análise Científica** (linha 986-1023): só renderiza se `solicitouAnaliseCientifica === true`

**4. Manter os demais campos read-only** (Razões para Recurso, Contrarrazões, Estratégia Comercial, Valores AG) sempre visíveis como estão.

### Resultado
O fluxo fica: equipe de licitação preenche dados do pregão → clica nos botões para solicitar análises → os campos/retângulos de resposta aparecem com o conteúdo preenchido pelas equipes jurídica e científica nas respectivas abas.

