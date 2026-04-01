
Objetivo: deixar tudo que é alerta dessa demanda dentro da aba "Análise de Editais", em vez de ficar dividido/confuso entre Agenda e Análise.

O que encontrei no código:
- A aba `Análise de Editais` já mostra um `PainelAlertas`, mas ele recebe só `alertasPainel` gerados em `AnaliseEditaisTab.tsx`.
- A aba `Agenda` (`DashboardAssessoria.tsx`) ainda monta outro bloco de alertas próprio com:
  - `alertasMock`
  - alertas de chamados
  - alertas de análise de edital vindos da licitação
- Por isso a sensação é de que os alertas estão espalhados e não “tudo dentro” da aba Análise de Editais.

Plano de ajuste

1. Centralizar os alertas de Análise de Edital
- Criar uma única lógica/fonte para os alertas relacionados à Análise de Edital.
- Essa lógica deve considerar as licitações com `solicitouAnaliseCientifica === true` e status diferente de `finalizada`.

2. Deixar a aba `Análise de Editais` como a tela principal dos alertas dessa funcionalidade
- Em `src/components/comercial/assessoria/AnaliseEditaisTab.tsx`, manter no topo:
  - `PainelAlertas` com título “Alertas do Sistema”
  - a listagem/tabela logo abaixo
- Ajustar o conteúdo do painel para contemplar tudo que o usuário espera ver nessa aba:
  - os alertas de pedido vindos da licitação
  - a visão de “alertas para análise” incorporada no mesmo painel, sem bloco separado duplicado

3. Remover duplicidade da Agenda para essa funcionalidade
- Em `src/components/comercial/assessoria/DashboardAssessoria.tsx`, retirar os alertas de Análise de Edital do conjunto da Agenda.
- A Agenda continua com os alertas próprios dela (OS/chamados), mas não será mais o lugar principal dos pedidos de análise de edital.
- Assim, “Análise de Editais” vira o único lugar dessa demanda.

4. Manter o componente visual padrão
- Reutilizar `PainelAlertas.tsx` sem criar outro layout.
- Se necessário, apenas ajustar as descrições dos alertas para deixar claro que são solicitações vindas da Licitação.

5. Validar consistência de comportamento
- Garantir que:
  - ao solicitar análise na Licitação, o item apareça no topo da aba `Análise de Editais`
  - a mesma solicitação apareça também na tabela dessa aba
  - não fique duplicada indevidamente entre blocos diferentes da própria aba

Arquivos envolvidos
- `src/components/comercial/assessoria/AnaliseEditaisTab.tsx`
- `src/components/comercial/assessoria/DashboardAssessoria.tsx`

Resultado esperado
- Dentro da aba `Análise de Editais`, fica tudo junto:
  - `Alertas do Sistema`
  - os pedidos/alertas para análise
  - a tabela com as licitações correspondentes
- Sem espalhar essa mesma funcionalidade na aba Agenda.
