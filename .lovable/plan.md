

## Plano: Criar aba "Leads" no módulo Comercial > Vendas

### Objetivo
Adicionar uma nova aba "Leads" entre "Indicadores Comerciais" e "Licitação" no módulo Vendas. Essa aba exibirá os mesmos leads do Cadastro > Pessoas > Leads e permitirá cadastrar novos leads via o modal `EntidadeModal`.

### Alterações

**1. `src/pages/Comercial.tsx`**

- No array `tabs` dentro de `renderVendasModule`, adicionar `{ id: 'leads', label: 'Leads', icon: Users }` na posição 1 (após indicadores, antes de licitação)
- Importar `EntidadeModal` de `@/components/cadastro/EntidadeModal`
- Importar dados de leads de `@/data/cadastroModules` (módulo `pessoas > leads`)
- Adicionar estados: `showLeadModal` (boolean), `leadsData` (array inicializado com mock)
- No `renderContent`, adicionar case `'leads'` que renderiza um novo componente/bloco inline:
  - Header com título "Leads" + botão "+ Novo Lead"
  - Campo de busca para filtrar
  - Tabela com colunas: Nome, CNPJ, Cidade, UF, Telefone, E-mail, Ações (visualizar/editar)
  - Dados vindos de `cadastroModules.pessoas.subModules.leads.data`
  - Botão "Novo Lead" abre `EntidadeModal` com `tipoEntidade="leads"`

**2. Dados**
- Reutilizar os mock data já existentes em `src/data/cadastroModules.ts` (leads com id, nome, cnpj, cidade, uf, telefone, email)
- Sem duplicação de dados

### Layout visual esperado
```text
[Indicadores...] [Leads] [Licitação] [Contratação] [Importação...] [Empréstimos]

┌─────────────────────────────────────────────┐
│ Leads                        [+ Novo Lead]  │
│ [🔍 Buscar leads...]                        │
├─────────────────────────────────────────────┤
│ Nome          | CNPJ        | Cidade | UF   │
│ Tech Solutions| 12.345...   | SP     | SP   │
│ Saúde Plus    | 23.456...   | RJ     | RJ   │
└─────────────────────────────────────────────┘
```

