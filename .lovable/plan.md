

## Plano: Adicionar "Análise Técnica 2" condicional em Dados Gerais e na aba AC

### Contexto
Atualmente existe um campo "Análise Técnica" (read-only em Dados Gerais, editável na aba AC). O usuário quer que, ao clicar "Solicitar Análise da Assessoria Científica", apareça um segundo campo "Análise Técnica 2" em Dados Gerais (read-only) e na aba AC (editável). O segundo campo na aba AC só aparece quando a solicitação é feita.

### Alterações em `src/components/comercial/OportunidadeAvancadaForm.tsx`

**1. Novo campo no formData:**
- Adicionar `analiseTecnica2: string` (inicializado com `''`)

**2. Aba Dados Gerais (linhas ~849-860):**
- Renomear label do campo existente para "Análise Técnica 1"
- Após ele, adicionar condicionalmente (`{solicitouAnaliseCientifica && ...}`) o campo read-only "Análise Técnica 2" espelhando `formData.analiseTecnica2`, com placeholder "Preenchido pela Assessoria Científica (aba AC)"

**3. Aba AC - `renderAnaliseTecnica()` (linhas ~1420-1463):**
- Renomear o campo existente para "Análise Técnica-Científica 1"
- Adicionar condicionalmente (`{solicitouAnaliseCientifica && ...}`) um segundo campo editável "Análise Técnica-Científica 2" com seu próprio botão "Salvar Análise" e lógica de histórico (usando `analiseTecnica2` e um novo array `historicoAnalisesCientificas2`)

**4. Novo estado e handler:**
- `historicoAnalisesCientificas2` (useState array)
- `handleSalvarAnalise2()` — mesma lógica do handler existente, mas para `analiseTecnica2` e `historicoAnalisesCientificas2`

### Arquivo alterado
- `src/components/comercial/OportunidadeAvancadaForm.tsx`

