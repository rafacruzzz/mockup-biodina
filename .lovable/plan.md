

## Plano: Cadastro de Marcas Concorrentes no módulo Pessoas

### Contexto
Criar um submódulo "Marcas Concorrentes" dentro de "Pessoas" no Cadastro. A assessoria preenche o cadastro completo, mas a licitação pode adicionar dados básicos (nome da marca) e um alerta é enviado à assessoria para completar. O alerta persiste até tudo ser preenchido.

### Alterações

**1. `src/data/cadastroModules.ts`** — Adicionar submódulo `marcas_concorrentes` dentro de `pessoas.subModules` (após `transportadoras`):
- `name: "Marcas Concorrentes"`
- Dados de exemplo com campos básicos (nome, empresa fabricante, status, etc.)

**2. Novo componente `src/components/cadastro/MarcaConcorrenteModal.tsx`:**

Modal completo com as seguintes seções organizadas em abas ou seções colapsáveis:

**Seção 1 — Identificação:**
- Nome da marca (obrigatório)
- Empresa fabricante
- País de origem
- Site oficial
- Status da marca (Select: Ativa, Descontinuada, Em Teste)

**Seção 2 — Classificação:**
- Categoria do produto (multi-select com checkboxes: Gasometria, Imunoensaio, Consumíveis, Reagentes, Equipamentos, Outra → campo de texto livre ao selecionar "Outra")
- Segmento de mercado (multi-select com checkboxes: Hospitalar, Laboratorial, Público, Privado, Outro → campo de texto livre ao selecionar "Outro")

**Seção 3 — Posicionamento Comercial:**
- Produto da Biodina com o qual concorre
- Faixa de preço
- Posicionamento (Select: Premium, Intermediário, Baixo Custo)
- Condições comerciais relevantes (Textarea)

**Seção 4 — Informações Técnicas:**
- Descrição do produto (Textarea)
- Principais características técnicas (Textarea)
- Diferenciais (Textarea)
- Pontos fracos percebidos (Textarea)
- Compatibilidade com quais equipamentos (Textarea)
- Registro ANVISA

**Seção 5 — Mercado:**
- Principais clientes ou hospitais que utilizam (Textarea)
- Regiões de atuação (Textarea)
- Participação estimada de mercado
- Histórico de substituição em contratos (Textarea)

**Seção 6 — Análise Competitiva:**
- Forças (Textarea)
- Fraquezas (Textarea)
- Nível de ameaça competitiva (Select: Baixo, Médio, Alto)
- Nível de concorrência (Select: Baixo, Médio, Alto)
- Observações estratégicas (Textarea)

**Seção 7 — Contato e Distribuição:**
- Representante ou contato comercial
- Distribuidor no Brasil

**Seção 8 — Documentos e Controle:**
- Documentos anexos (área de upload / lista de arquivos)
- Responsável pelo cadastro (preenchido automaticamente com usuário logado)
- Data de inclusão (automática)
- Data da última atualização (automática)

**Campo `preenchimentoCompleto`** — boolean calculado: `true` quando todos os campos obrigatórios estão preenchidos. Enquanto `false`, gera alerta visual para a assessoria.

**3. `src/pages/Cadastro.tsx`:**
- Novo estado `isMarcaConcorrenteModalOpen`
- Em `handleNewRecord`: condição `activeModule === 'pessoas' && activeSubModule === 'marcas_concorrentes'` abre o modal específico (antes do bloco genérico de `pessoas`)
- Em `getButtonText`: retornar `"Nova Marca Concorrente"` para esse submódulo
- Renderizar `<MarcaConcorrenteModal>` no JSX

**4. Sistema de alertas para assessoria:**
- No modal, campo `pendente` (boolean) indica cadastro incompleto
- Na listagem (DataTable), marcas com `pendente: true` terão badge visual "Pendente" em vermelho
- Componente de notificação existente pode ser estendido para mostrar alertas de marcas concorrentes pendentes

### Arquivos criados
- `src/components/cadastro/MarcaConcorrenteModal.tsx`

### Arquivos alterados
- `src/data/cadastroModules.ts`
- `src/pages/Cadastro.tsx`

