

## Plano: Formulário preenchível "Planilha de Ação de Campo" na Seção 2

### Resumo

Transformar o documento "Planilha de Ação de Campo" da Seção 2 em documento preenchível (igual ao Field Action e Notificação), com botões Preencher, Editar e Baixar.

### Campos do formulário

- **Cliente** — Select com clientes do sistema (mock list)
- **UF** — Preenchido automaticamente ao selecionar o cliente
- **Modelo** — Texto livre
- **NS/Lote** — Texto livre
- **Setor** — Texto livre
- **E-mail** — Texto livre (type email)
- **Telefone** — Texto livre
- **Versão do Windows** — Texto livre
- **Versão do Software** — Texto livre

### Arquivos a criar/modificar

1. **`src/types/acaoCampo.ts`** — Adicionar enum `PLANILHA_ACAO_CAMPO_PREENCHIVEL`, interface `PlanilhaAcaoCampoData` com os 9 campos + `pdfGerado?` e `dataPdfGerado?`, adicionar `dadosPlanilha?: PlanilhaAcaoCampoData` ao `DocumentoAcaoCampo`

2. **`src/components/administrativo/qualidade/PlanilhaAcaoCampoForm.tsx`** (criar) — Formulário simples com Select de clientes, campo UF auto-preenchido, e campos de texto para os demais

3. **`src/components/administrativo/qualidade/PlanilhaAcaoCampoCard.tsx`** (criar) — Card com botões Preencher/Editar/Baixar, seguindo o padrão do `DocumentoPreenchívelCard`

4. **`src/data/acaoCampoData.ts`** — Alterar o documento "Planilha de Ação de Campo" (`anv-5`) de `ADICIONAL` para `PLANILHA_ACAO_CAMPO_PREENCHIVEL`, adicionar label no `tipoDocumentoLabels`

5. **`src/components/administrativo/qualidade/AcaoCampoTab.tsx`** — Adicionar condição no `renderDocumentoCard` para renderizar `PlanilhaAcaoCampoCard`, adicionar handlers `handleSalvarPlanilha` e `handleGerarPDFPlanilha`

