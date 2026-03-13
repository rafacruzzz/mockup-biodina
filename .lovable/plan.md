

## Plano: Atualizar módulos e submódulos no Personalizar Navegação

### Problema
O `initialModules` e `initialTreeStructure` em `PersonalizarNavegacao.tsx` estão desatualizados. Faltam módulos (Solicitações, Configuração) e a maioria dos submódulos/sub-submódulos não está representada na árvore.

### Varredura: O que existe no sistema vs o que está no Personalizar Navegação

**Módulos faltantes na lista:**
- Solicitações (id: `solicitacoes`)
- Configuração (id: `configuracao`)

**Submódulos incompletos ou ausentes na árvore (`initialTreeStructure`):**

| Módulo | Hoje na árvore | O que existe no sistema (submódulos reais) |
|--------|---------------|-------------------------------------------|
| **Pessoal** | Colaboradores, Folha de Pagamento | (mantém como está - é o perfil pessoal) |
| **BI** | vazio | (Dashboard único, sem submódulos - mantém vazio) |
| **Cadastro** | Parcialmente ok | Falta: Empresas (com Filiais). Cadastros Financeiros falta: Cartões Corporativos, Categorias de Despesas. Pessoas falta sub-itens (Leads, Clientes, Fornecedores, Fabricantes, Representantes, Transportadoras, Contatos). Produtos falta sub-itens. |
| **Administrativo** | vazio | RT (Integração RT/CQ, Gestão NC, Monitoramento e Auditoria), Regulatório (Dashboard, Registro Produtos, Atualizações, Due Diligence, Rastreabilidade, Boas Práticas), Institucional (Links SM, Imóveis, Veículos, Documentos), Jurídico (Processos, Chamados), Compliance, Qualidade (Estrutura e Padrões, Coleta de Dados, Gestão NC, Análise Indicadores, Ação de Campo) |
| **Comercial** | Indicadores, Licitação, Contratação, Importação Direta | Falta sub-nível Vendas com: Empréstimos, Meus Pedidos. Falta: Assessoria Científica (Agenda, Chamados, OS, Rastreabilidade, Análise Editais, Repositório), Departamento Técnico (Agenda, Chamados, OS, Rastreabilidade, Empréstimos) |
| **Financeiro** | Contas a Pagar, Contas a Receber, Fluxo de Caixa | Faturamento (Dashboard, Entrada, Saída, Serviços, Cartas, Config Fiscais), Contas a Receber (Conciliação, A Receber, Canhotos, Pedidos, Cadastros, Relatórios), Contas a Pagar (A Pagar/Pagos, Uso e Consumo, Despesas Viagem, Doc Fiscais, Comissões), Tesouraria (Caixa, Empréstimos, Investimentos, Seguros, Consórcios, Cadastros, Extratos, Doc Fin, Saldos, Despesas Serviço, Relatórios) |
| **Estoque** | vazio | Posição de Estoque (Visão Geral, Est. Administrativo, Est. Expedição), Movimentações (Movimentação de Estoque) |
| **Compras** | vazio | Mercadoria para Revenda (Pedidos), Importação/DI (DI, Pagamentos, Fechamento Câmbio, Custos) |
| **Contabilidade** | vazio | Cenários Fiscais, ICMS DIFAL, Naturezas Entrada, Naturezas Saída |
| **RH** | vazio | Processo Seletivo (Visão Geral, Banco de Currículos, Etapas, Admissão, Rescisão), Departamentos (Setores, Cargos), Expedientes, Planos de Carreira (Planos, Cargos, Níveis) |
| **TI** | vazio | Visão Geral, Chamados (Painel, Abrir Chamado), Inventário, Rede, Políticas, Segurança, Conformidade, E-mails, Usuários de Rede, Telefonia, Interfaceamento |
| **Solicitações** | NÃO EXISTE | (Dashboard único) |
| **Configuração** | NÃO EXISTE | Perfil da Empresa |

### Alterações

**Arquivo: `src/pages/PersonalizarNavegacao.tsx`**

1. **`initialModules`**: Adicionar `solicitacoes` e `configuracao` antes de `personalizar-navegacao`. Importar ícones necessários.

2. **`initialTreeStructure`**: Reescrever completamente para refletir a estrutura real do sistema:

   - **Cadastro**: Adicionar sub-itens em Pessoas (Leads, Clientes, Fornecedores, Fabricantes, Representantes, Transportadoras, Contatos), sub-itens em Cadastros Financeiros (Cartões Corporativos, Categorias de Despesas, Prazos de Pagamento, Contas Bancárias), e o grupo Empresas (Filiais).
   - **Administrativo**: Criar grupos para RT, Regulatório, Institucional, Jurídico, Compliance, Qualidade, cada um com seus sub-itens conforme tabs existentes.
   - **Comercial**: Criar grupos Vendas (Indicadores, Licitação, Contratação, Importação Direta, Empréstimos, Meus Pedidos), Assessoria Científica (6 sub-itens), Departamento Técnico (5 sub-itens).
   - **Financeiro**: Criar grupos Faturamento (6 sub-itens), Contas a Receber (6), Contas a Pagar (5), Tesouraria (11).
   - **Estoque**: Criar grupos Posição de Estoque (3 sub-itens), Movimentações (1).
   - **Compras**: Criar grupos Mercadoria para Revenda, Importação/DI (4 sub-itens).
   - **Contabilidade**: 4 itens diretos.
   - **RH**: Criar grupos Processo Seletivo (5), Departamentos (2), Expedientes (1), Planos de Carreira (3).
   - **TI**: Criar grupos para cada módulo principal com seus sub-itens.
   - **Solicitações**: Array vazio (módulo é dashboard único).
   - **Configuração**: Item Perfil da Empresa.

