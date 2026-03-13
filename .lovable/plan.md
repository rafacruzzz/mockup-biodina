

## Plano: Adicionar botão "Solicitar Análise Gerencial" e condicionar exibição dos campos AG

### Alterações em `src/components/comercial/OportunidadeAvancadaForm.tsx`

**1. Novo estado (~linha 102)**
- Adicionar `solicitouAnaliseGerencial` (boolean, false)

**2. Novo botão na Card de Solicitações (~linha 810, após o botão de Análise Científica)**
- Botão "Solicitar Análise Gerencial" com ícone `BarChart3` (ou similar)
- Ao clicar: `setSolicitouAnaliseGerencial(true)` + toast de confirmação
- Desabilitado após clicado

**3. Condicionar exibição dos campos AG read-only (linhas 984-1022)**
- Envolver os 3 blocos (Estratégia Comercial, Valor de Entrada, Valor Limite) com `{solicitouAnaliseGerencial && (...)}`
- Também incluir os campos de Empresa Participante (se existirem como read-only em Dados Gerais)
- Os campos só aparecem após o gerente comercial ser solicitado e preencher a aba AG

