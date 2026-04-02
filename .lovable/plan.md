

## Plano: Reestruturar aba "Não Conformidades Abertas" (Qualidade)

### Resumo
Reformulação completa do formulário de NC para funcionar como diálogo entre setores. O campo "Tipo" passa a ser multi-select com opções fixas, cada uma desencadeando campos condicionais específicos. Fluxo de validação com botões de aprovação RT/Qualidade. Tabela de Liberação de Produtos para tipos "Produto" e "Fornecedor". CAPA previsto no DT com dados de equipamentos por cliente.

---

### Detalhamento Técnico

#### 1. Atualizar tipos em `src/types/qualidade.ts`

Expandir a interface `NaoConformidade` com:
- `tipos: TipoNCEnum[]` (multi-select) em vez de `tipo: string`
- Tipo enum: `'Legal/Regulatória' | 'Processo/Operacional' | 'Produto' | 'Gestão' | 'Fornecedor' | 'Segurança/Meio Ambiente'`
- `responsaveis: string[]` (multi-select de setores)
- Campos condicionais Produto: `produtoCodigo`, `produtoMarca`, `produtoModelo`, `produtoNomeFabricante`
- Campos condicionais Fornecedor: `fornecedorNomeFabricanteLegal`, `fornecedorUnidadeFabril`
- Campos de tratamento: `acaoImediataValidada`, `acaoImediataValidadaPor`, `acaoImediataValidadaEm`
- `acoesComplementares`, `responsavelComplementar`, `evidenciasTexto`, `evidenciasArquivos: File[]`
- `observacoesArquivos: File[]`
- `acaoFinalValidada`, `acaoFinalValidadaPor`, `acaoFinalValidadaEm`
- `dataEncerramento`
- Tabela de liberação: `produtosLiberacao: ProdutoLiberacaoNC[]`

Nova interface `ProdutoLiberacaoNC`:
- `id`, `codigo` (auto), `referencia`, `nome`, `modelo`, `fabricante`, `marca`, `linhaProduto`
- `apresentacao: ('primaria' | 'secundaria' | 'terciaria')[]`
- `numeroSerieLote`, `status`, `liberadoRT`, `dataLiberacao`

Nova interface `EquipamentoCAPADT`:
- `equipamentoId`, `numeroSerie`, `modelo`, `marca`
- `dataAcaoPreventiva`, `dataAcaoCorretiva`
- `descricaoCorretiva`, `prazoFinal`, `solucionado: 'Sim'|'Não'|''`, `responsavel`

Expandir a interface de CAPA ou criar `CAPADT` com:
- `clienteNome`, `tipoCliente`, `razaoSocial`, `nomeFantasia`, `cnpjCpf`, `cinRg`, `nomeMantenedor`, `cnpjMantenedor`
- `equipamentos: EquipamentoCAPADT[]`

#### 2. Atualizar mock data em `src/data/qualidadeData.ts`

- Adicionar lista de setores da empresa: `setoresEmpresa = ['RT', 'Qualidade', 'DT', 'Comercial', 'RH', 'Importação', 'Estoque', 'Assessoria Científica', 'Assessoria Técnica', 'Compliance', 'Jurídico', 'TI', 'Financeiro']`
- Adicionar mock de fabricantes com unidades fabris
- Atualizar `naoConformidadesMockadas` com os novos campos

#### 3. Reescrever formulário em `src/components/administrativo/qualidade/GestaoNCTab.tsx`

**Campos do formulário (de cima para baixo):**

a) **Data da NC** + **Origem** (escrita livre) — preenchidos pelo setor que abre

b) **Tipo** — multi-select com checkboxes:
   - Legal/Regulatória, Processo/Operacional, Produto, Gestão, Fornecedor, Segurança/Meio Ambiente

c) **Campos condicionais por tipo selecionado:**
   - Se "Produto": Código do Produto, Marca, Modelo, Nome do produto (fabricante) — ao preencher um, autocompleta os demais via `produtosMock` / `mockLiberacaoProdutos`
   - Se "Fornecedor": Nome do Fabricante Legal/Marca (select) → ao selecionar, carrega opções de "Nome da Unidade Fabril" (segundo select)

d) **Impacto** + **Prazo de Execução** — (nota: "somente RT e/ou Qualidade")

e) **Responsável** — multi-select com todos os setores da empresa

f) **Descrição da NC** (textarea)

g) **Ação Imediata** (textarea)

h) **Botão "Validar Ação Imediata (RT/Qualidade)"** — ao clicar, registra quem validou e quando

i) **Ações Complementares** (textarea) + **Responsável** (escrita livre)

j) **Evidências** — textarea + input de arquivos

k) **Observações** (textarea + input de arquivos)

l) **Ação Final** (textarea)

m) **Botão "Validar Ação Final (RT/Qualidade)"**

n) **NC Solucionada?** (Sim/Não) + **Data de Encerramento** — preenchidos pelo RT

o) **Tabela de Liberação de Produtos** — aparece se tipo inclui "Produto" ou "Fornecedor":
   - Colunas: Código (auto), Referência, Nome, Modelo, Fabricante, Marca, Linha de Produto, Apresentação (multi-select: primária/secundária/terciária), Nº Série/Lote, Status, Liberado RT (botão), Data de Liberação (auto)
   - Ao digitar Referência/Nome/Modelo, autocompleta restante
   - Botão "Liberado RT" grava data automaticamente

p) **Seção CAPA** (mantida) — com adição de aba/seção DT:
   - Campos do cliente puxados do cadastro: Nome, Tipo de Cliente, Razão Social, Nome Fantasia, CNPJ/CPF, CIN/RG, Nome do Mantenedor, CNPJ do Mantenedor
   - Lista de Equipamentos do DT alocados nesse cliente
   - Para cada equipamento (nº de série): Data ação preventiva, Data ação corretiva
   - Para ação corretiva: Descrição (livre), Prazo Final, Solucionado (Sim/Não), Responsável (livre)

### Arquivos alterados
- `src/types/qualidade.ts`
- `src/data/qualidadeData.ts`
- `src/components/administrativo/qualidade/GestaoNCTab.tsx`

