

## Plano: Remover seção de Lead do formulário de Licitação

### Contexto
Com a criação da aba dedicada "Leads" em Comercial > Vendas, os dados de Lead não precisam mais estar no formulário de Licitação (`OportunidadeAvancadaForm.tsx`). O usuário quer separar as responsabilidades: leads ficam na aba Leads, licitação foca apenas nos dados da licitação.

### Alterações em `src/components/comercial/OportunidadeAvancadaForm.tsx`

**Remover da aba "Dados Gerais" (`renderDadosGerais`):**

1. **Remover o card "Dados do Cliente/Lead"** (linhas ~542-677)
   - Seletor de cliente/lead com dropdown (Popover/Command)
   - Campo CPF/CNPJ auto-preenchido
   - Checkbox "Ativo"
   - Botão "Solicitação de cadastro"

2. **Remover o card "Dados do Lead/Negócio"** (linhas ~679-834)
   - Fonte do Lead
   - Segmento do Lead (com gerenciador de segmentos)
   - Valor do Negócio
   - Método de contato
   - Tags
   - Características
   - Fluxo de Trabalho
   - Descrição da Oportunidade

3. **Limpar código órfão:**
   - Remover estados: `entidadesDisponiveis`, `clienteSelecionadoCadastroIncompleto`, `clienteDropdownOpen`, `showSolicitacaoCadastro`, `showGerenciarSegmentos`
   - Remover handlers: `handleClienteSelect`, `handleClienteCriadoViaSolicitacao`
   - Remover campos do `formData`: `cliente`, `clienteId`, `cpfCnpj`, `tipoEntidade`, `ativo`, `fonteLead`, `segmentoLead`, `valorNegocio`, `metodoContato`, `tags`, `caracteristicas`, `fluxoTrabalho`, `descricao`
   - Remover imports não mais utilizados (ex: `useSegmentoLeadManager`, `SolicitacaoCadastroModal`, `GerenciarSegmentosModal` se não usados em outro lugar)
   - Remover `mockEntidades` e `EntidadeItem` interface se não usados em outro lugar

A aba "Dados Gerais" começará diretamente com "Dados Específicos da Licitação" (linha ~836+).

