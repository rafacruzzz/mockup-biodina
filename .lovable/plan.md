

## Plano: Formulário preenchível "Sumário de Alerta" na Seção 2

### Resumo

Transformar o documento "Sumário de Alerta" (anv-6) da Seção 2 de um documento estático (ADICIONAL) em um documento preenchível com 22 campos, seguindo o mesmo padrão dos outros formulários (Preencher, Editar, Baixar).

### Campos do formulário

1. **Título** — textarea (padrão "Alerta XXXX...")
2. **Identificação do produto** — textarea (separar por ponto-e-vírgula)
3. **Local de distribuição do produto** — textarea (UFs)
4. **Nome Comercial** — input texto
5. **Nome Técnico** — input texto
6. **Nº registro/notificação ANVISA** — input texto
7. **Tipo de produto** — select (Equipamento médico, Material de uso em saúde, IVD, SaMD)
8. **Classe de Risco** — select (I, II, III, IV)
9. **Modelo/apresentação afetado** — input texto
10. **Números de série/lote ou versão de software** — textarea
11. **Problema** — textarea (max 1500 chars)
12. **Data identificação do problema** — input date
13. **Ação** — textarea
14. **Histórico** — textarea
15. **Empresa detentora do registro** — textarea (nome, CNPJ, endereço, telefone, e-mail)
16. **Fabricante do produto** — textarea (nome, endereço, país)
17. **Recomendações ao público-alvo** — textarea (max 1000 chars)
18. **Anexos do alerta** — textarea
19. **Link SISTEC** — input texto
20. **Link Painéis Tecnovigilância** — input texto
21. **Informações Complementares** — textarea
22. **TAG/Descritores** — textarea

### Arquivos a criar/modificar

1. **`src/types/acaoCampo.ts`** — Adicionar enum `SUMARIO_ALERTA_PREENCHIVEL`, interface `SumarioAlertaData` com os 22 campos, adicionar `dadosSumarioAlerta?: SumarioAlertaData` ao `DocumentoAcaoCampo`

2. **`src/components/administrativo/qualidade/SumarioAlertaForm.tsx`** (criar) — Formulário simples com os 22 campos, sem abas

3. **`src/components/administrativo/qualidade/SumarioAlertaCard.tsx`** (criar) — Card com botões Preencher/Editar/Baixar, seguindo padrão do `PlanilhaAcaoCampoCard`

4. **`src/data/acaoCampoData.ts`** — Alterar documento `anv-6` de `ADICIONAL` para `SUMARIO_ALERTA_PREENCHIVEL`, adicionar label no `tipoDocumentoLabels`

5. **`src/components/administrativo/qualidade/AcaoCampoTab.tsx`** — Adicionar condição no `renderDocumentoCard` para `SUMARIO_ALERTA_PREENCHIVEL`, adicionar handlers `handleSalvarSumarioAlerta` e `handleGerarPDFSumarioAlerta`, importar novos componentes e tipos

