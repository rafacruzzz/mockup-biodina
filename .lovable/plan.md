

## Plano: Replicar funcionalidades da NC do módulo Qualidade para o módulo RT

### Resumo
Reescrever completamente o `GestaoNCTab` do módulo RT para ter a mesma estrutura e funcionalidades do `GestaoNCTab` do módulo Qualidade, adaptando imports e dados para usar os tipos/mocks do RT.

### Alterações

#### 1. Atualizar tipos em `src/types/rt.ts`

Expandir `NaoConformidadeRT` para incluir todos os campos que existem em `NaoConformidade` (qualidade):
- `tipos: TipoNCEnumRT[]` (multi-select) — mesmos valores: Legal/Regulatória, Processo/Operacional, Produto, Gestão, Fornecedor, Segurança/Meio Ambiente
- `responsaveis: string[]` (multi-select setores)
- `acaoImediataValidada`, `acaoImediataValidadaPor`, `acaoImediataValidadaEm`
- `acoesComplementares`, `responsavelComplementar`
- `evidenciasTexto`, `evidenciasArquivos`
- `acaoFinalValidada`, `acaoFinalValidadaPor`, `acaoFinalValidadaEm`
- `dataEncerramento`
- Campos condicionais Produto: `produtoCodigo`, `produtoMarca`, `produtoModelo`, `produtoNomeFabricante`
- Campos condicionais Fornecedor: `fornecedorNomeFabricanteLegal`, `fornecedorUnidadeFabril`
- `produtosLiberacao: ProdutoLiberacaoNC[]` (reutilizar tipo de qualidade)
- Adicionar tipo `TipoNCEnumRT`

#### 2. Atualizar mocks em `src/data/rtModules.ts`

- Adicionar `setoresEmpresaRT` (mesma lista de setores)
- Atualizar `naoConformidadesRTMockadas` para incluir os novos campos (`tipos`, `responsaveis`, etc.)
- Exportar `fabricantesComUnidades` e `produtosMockNC` (ou reutilizar os de qualidadeData)

#### 3. Reescrever `src/components/administrativo/rt/GestaoNCTab.tsx`

Replicar toda a estrutura do modal do Qualidade:
- **Tabela**: colunas Tipo(s) com badges multi-select, Responsável(eis) com badges
- **Modal com todos os campos na mesma ordem**:
  - a) Data + Origem (escrita livre)
  - b) Tipo — multi-select checkboxes (6 opções)
  - c) Campos condicionais Produto (autocomplete) e Fornecedor (selects cascata)
  - d) Impacto + Prazo de Execução (nota "somente RT e/ou Qualidade")
  - e) Responsável — multi-select setores (checkboxes)
  - f) Descrição da NC
  - g) Ação Imediata
  - h) Botão "Validar Ação Imediata (RT/Qualidade)"
  - i) Ações Complementares + Responsável
  - j) Evidências (textarea + anexo)
  - k) Observações (textarea + anexo)
  - l) Ação Final
  - m) Botão "Validar Ação Final (RT/Qualidade)"
  - n) NC Solucionada + Data de Encerramento
  - o) Tabela de Liberação de Produtos (condicional)
  - p) Seção CAPA com subseção DT (condicional)

Usar `format` de `date-fns`, `toast` de `sonner`, `Checkbox`, `ShieldCheck`, `Paperclip` — mesmos imports do Qualidade.

### Arquivos alterados
- `src/types/rt.ts`
- `src/data/rtModules.ts`
- `src/components/administrativo/rt/GestaoNCTab.tsx`

