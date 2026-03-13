

## Plano: Reorganizar abas do projeto e atualizar pesquisa

### Alterações

**1. `src/pages/Comercial.tsx`** (linha ~941)
- Alterar placeholder da lupa de `"Pesquisar oportunidades..."` para `"Pesquisar Projetos..."`

**2. `src/components/comercial/ContratacaoSimplesForm.tsx`** (linhas 554-598)
- Reorganizar as TabsTrigger na ordem solicitada:
  1. Dados Gerais (existe)
  2. Documentos (existe, mover para posição 2)
  3. AC - Assessoria Científica (existe como `analise-tecnica`, mover)
  4. DT (existe, mover)
  5. **AJ - Análise Jurídica** (novo - adicionar tab + conteúdo placeholder)
  6. **AG - Análise Gerencial** (novo - adicionar tab + conteúdo placeholder)
  7. Histórico/Chat (existe, mover)
  8. Empenho (existe, mover)
  9. Pedidos (existe, mover)
  10. Chamados (existe, mover)
- Remover: `Saldo do Cliente`, `Interfaceamento`
- Adicionar TabsContent para AJ e AG com cards placeholder (título + área para conteúdo futuro)

**3. `src/components/comercial/OportunidadeAvancadaForm.tsx`** (se aplicável)
- Aplicar a mesma reorganização de abas para consistência no modal de edição avançado

### Novas abas (conteúdo)
- **AJ (Análise Jurídica)**: Card com título "Análise Jurídica" e campos placeholder (Parecer Jurídico textarea, Status select, Responsável, Data da Análise)
- **AG (Análise Gerencial)**: Card com título "Análise Gerencial" e campos placeholder (Parecer Gerencial textarea, Aprovação select, Responsável, Data)

