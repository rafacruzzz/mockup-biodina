

## Plano: Criar card "Propostas" ao lado de "Departamento Técnico" com 3 sub-abas

### Resumo
Adicionar um novo card "Propostas" na grid de módulos do Comercial (ao lado de Departamento Técnico). Ao clicar, abre um módulo com 3 abas internas: "Propostas - Licitação", "Propostas - Contratação" e "Propostas - DT". Cada aba terá conteúdo placeholder por enquanto.

### Alterações em `src/pages/Comercial.tsx`

**1. Novo card "Propostas" (após o card Departamento Técnico, linha 683):**
- Card com ícone (FileText ou ClipboardList), título "Propostas", descrição "Gestão de propostas comerciais"
- onClick: `setActiveModule('propostas')`

**2. Novo estado `propostasTab` (junto dos outros estados de tab):**
- `useState<'licitacao' | 'contratacao' | 'dt'>('licitacao')`

**3. Nova função `renderPropostasModule()` (junto das outras funções render):**
- Header "Comercial / Propostas" com botão Voltar
- 3 abas (Tabs): "Propostas - Licitação", "Propostas - Contratação", "Propostas - DT"
- Cada aba com Card placeholder: título, descrição e mensagem "Em desenvolvimento"

**4. Renderização condicional (linha 1381):**
- `{activeModule === 'propostas' && renderPropostasModule()}`

### Resultado
Novo módulo "Propostas" acessível pela tela principal do Comercial, com 3 abas internas prontas para receber conteúdo futuro.

