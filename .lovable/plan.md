

## Plano: Ajustes na Nova OS (DT) — Contratação, campo obrigatório e Registro de Treinamento

### Alterações

**1. Remover "Simples" de "Contratação Simples" — `src/components/comercial/assessoria/FormularioOS.tsx`:**
- Linha 227: `"Contratação Simples"` → `"Contratação"`
- Linha 406: `<SelectItem value="contratacao">Contratação Simples</SelectItem>` → `"Contratação"`

**2. Tornar Vinculação de Projeto obrigatória — `src/components/comercial/assessoria/FormularioOS.tsx`:**
- Linha 393: Remover "(Opcional)" do título → `"Vinculação de Projeto *"`
- Na função `handleSave` (~linha 230): adicionar validação que exige `selectedProjeto` preenchido, com `toast.error("Vinculação de Projeto é obrigatória")`

**3. Seção "Registro de Treinamento" com seleção de template — `src/components/comercial/assessoria/FormularioOS.tsx`:**

Quando tipo de OS incluir `treinamento_inicial` ou `treinamento_nova_equipe`:

- Substituir a lógica atual de `renderTemplateTrainamento()` (que auto-seleciona pelo equipamento) por uma seção "Registro de Treinamento" com:
  - Lista de registros disponíveis (DxH 520, ABL800, ABL90, ABL9, AQT 90 FLEX, OsmoTECH, Excelsior Thermo Fisher Epredia) como botões/cards selecionáveis
  - Ao selecionar, o template correspondente aparece na tela com campos editáveis (data do treinamento, nome do instrutor, observações)
  - Abaixo do template: seção de **Assinatura do Instrutor** (usando `AssinaturaPad`)
  - Seção de **Assinaturas dos Participantes** — cada participante da lista de participantes terá seu próprio pad de assinatura

**4. Novos templates placeholder — `src/components/comercial/assessoria/templates/`:**
- Criar `TemplateTrainamentoOsmoTECH.tsx` — placeholder com estrutura igual aos existentes (tópicos genéricos, badge, carga horária)
- Criar `TemplateTrainamentoExcelsior.tsx` — placeholder com mesma estrutura

Os templates serão atualizados quando o usuário enviar os arquivos com o conteúdo real.

**5. Refatorar templates para aceitar campos editáveis:**
- Todos os templates passam a receber props: `dataRegistro`, `nomeInstrutor`, `observacoes` e callbacks `onChange`
- Cada template exibe seus tópicos (checklist) + campos editáveis de data e instrutor no topo

### Arquivos criados
- `src/components/comercial/assessoria/templates/TemplateTrainamentoOsmoTECH.tsx`
- `src/components/comercial/assessoria/templates/TemplateTrainamentoExcelsior.tsx`

### Arquivos alterados
- `src/components/comercial/assessoria/FormularioOS.tsx`
- `src/components/comercial/assessoria/templates/TemplateTrainamentoDxH520.tsx`
- `src/components/comercial/assessoria/templates/TemplateTrainamentoABL800.tsx`
- `src/components/comercial/assessoria/templates/TemplateTrainamentoABL90.tsx`
- `src/components/comercial/assessoria/templates/TemplateTrainamentoABL9.tsx`
- `src/components/comercial/assessoria/templates/TemplateTrainamentoAQT90.tsx`

