

## Plano: Formulário preenchível "Notificação de Ação de Campo" na Seção 2

### Resumo

Transformar o documento "Formulário de Notificação de Ação de Campo" da seção 2 (Envio de Documentos para Anvisa) em um documento preenchível com botão "Preencher Formulário", igual ao Field Action Effectiveness da seção 3. O modal terá 6 abas correspondendo às seções do formulário oficial.

### Estrutura das Abas

**Aba 1 - Informações Gerais**
- 1.1 Empresa: CNPJ, Razão Social, Endereço, UF, Município
- 1.2 Responsável: Nome, Cargo, Telefone, E-mail
- 1.3 Ação de Campo: Data de Início da Ação, Código

**Aba 2 - Produto**
- 2.1 Tipo: Radio/Select (Equipamento Médico, Material de Uso em Saúde, Produto para Diagnóstico in vitro IVD, Software como Dispositivo Médico SaMD)
- 2.2 Dados do Produto (até 5 produtos, cada um com): Nome Comercial, Nome Técnico, Registro/Notificação, Classe de Risco, Código de Referência, Modelo, Lote/Série
- 2.3 Fabricante: Nome, País, Endereço
- 2.5 Quantidade dos produtos sob risco no Brasil: Quantidade total envolvidos, Nº total comercializada, Nº estoque, Quantidade implantada, Tipo de unidade informada
- 2.6 Distribuição do produto: Checkboxes (Em uso residencial, Implantados, Em serviços de saúde, Em estoque no fabricante)
- 2.7 Distribuição por UF: 27 checkboxes dos estados
- 2.7 Distribuição para outros países: tabela dinâmica (País, Lote/Série, Quantidade)

**Aba 3 - Ação de Campo**
- 3.1 Classificação do risco: Radio (Classe I, II, III)
- 3.2 Classificação da ação: Checkboxes (Recolhimento, Correção em Campo, Correção de partes/peças, Atualização/correção instruções de uso, Atualização/correção rotulagem, Comunicação aos clientes, Atualização de Software, Outra - Especificar)
- 3.2.1 Destinação final produtos recolhidos (condicional se Recolhimento): Radio (Destruição, Devolução para fabricante, Outra - Especificar)
- 3.3 Enquadramento: Checkboxes (Requer divulgação mídia, Séria ameaça saúde pública, Risco evento adverso grave, Ocorrência evento adverso não grave, Ocorrência queixa técnica, Outra situação - Especificar)

**Aba 4 - Descrição do Problema e Avaliação do Risco**
- Data da identificação do problema (date)
- Descrição sucinta do problema (textarea)
- Avaliação de risco (textarea)
- Possíveis consequências da utilização do produto sob risco (textarea)
- Recomendação aos usuários e pacientes (textarea)
- Foram feitas notificações no Notivisa? (Sim/Não radio)
- Se sim, números das notificações (texto livre)

**Aba 5 - Plano de Ação da Empresa**
- Tabela dinâmica com linhas adicionáveis: Ação (nº), Descrição da Ação, Início (date), Fim (date), Situação, Observações

**Aba 6 - Observações e Assinatura**
- Observações (textarea)
- Local, Data, Nome Legível (campos texto)

### Arquivos a criar/modificar

1. **`src/types/acaoCampo.ts`** — Adicionar novo enum `NOTIFICACAO_ACAO_CAMPO_PREENCHIVEL`, nova interface `NotificacaoAcaoCampoData` com todos os campos, adicionar `dadosNotificacao?: NotificacaoAcaoCampoData` ao `DocumentoAcaoCampo`

2. **`src/components/administrativo/qualidade/NotificacaoAcaoCampoForm.tsx`** (criar) — Modal com 6 abas usando Radix Tabs, cada aba renderiza os campos da seção correspondente

3. **`src/components/administrativo/qualidade/NotificacaoAcaoCampoCard.tsx`** (criar) — Card similar ao `DocumentoPreenchívelCard`, com botão "Preencher Formulário", preview dos dados e geração de PDF

4. **`src/components/administrativo/qualidade/utils/notificacaoAcaoCampoPDF.ts`** (criar) — Geração do PDF com jsPDF

5. **`src/data/acaoCampoData.ts`** — Alterar o tipo do documento "Formulário de Notificação de Ação de Campo" de `ADICIONAL` para `NOTIFICACAO_ACAO_CAMPO_PREENCHIVEL`

6. **`src/components/administrativo/qualidade/AcaoCampoTab.tsx`** — Adicionar condição no `renderDocumentoCard` para renderizar `NotificacaoAcaoCampoCard` quando o tipo for `NOTIFICACAO_ACAO_CAMPO_PREENCHIVEL`

