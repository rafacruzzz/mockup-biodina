

## Plano: Auditoria da Qualidade — Interna (Roteiro de Auditoria)

### Resumo
Criar uma nova aba "Auditoria da Qualidade - Interna" dentro da aba "Coleta de Dados e Inspeção" do módulo Qualidade. A aba existente de auditoria será renomeada para "Auditoria da Qualidade - Externa". Ao clicar em "Nova Auditoria Interna", abre um modal com o Roteiro de Auditoria completo, dividido em abas por seção (A a O), com legenda e classificação fixas no rodapé do modal.

### Estrutura das abas do Roteiro (dentro do modal)

Cada aba contém uma tabela com colunas: **Nº | Quesito da Norma | Descrição | OM | NC | C | Evidência Objetiva | Plano de Ação**, além de campos **Auditor** e **Auditado** no final.

| Aba | Título | Itens |
|-----|--------|-------|
| A | Requisitos Gerais / Admin. | 1–14 |
| B | Controle de Projetos (B.1–B.3) | 15–36 |
| C | Controle de Projetos | 37–46 |
| D | Controle de Documentos e Registros | 47–51 |
| E | Controle de Compras | 52–57 |
| F | Identificação e Rastreabilidade | 58–62 |
| G | Controle de Processo de Produção (G.1–G.2) | 63–72 |
| H | Inspeção e Testes (H.1–H.3) | 73–82 |
| I | Componentes e Produtos Não Conforme | 83 (itens I) |
| J | Ação Corretiva | 83–85 (J.1–J.3) |
| K | Manuseio, Armazenamento (K.1–K.2) | 86–95 |
| L | Controle de Embalagem e Rotulagem | 96–99 |
| M | Registros do Sistema da Qualidade (M.1–M.3) | 100–108 |
| N | Assistência Técnica | 109–111 |
| O | Técnicas de Estatística | 112–114 |

### Legenda e Classificação
Renderizada no rodapé do modal (abaixo de todas as abas), em um componente colapsável/accordion moderno:
- **Legenda**: OM – Oportunidade de Melhoria | NC – Não Conforme | C – Conforme
- **Classificação**: IMPRESCINDÍVEL (IM), NECESSÁRIO (N), RECOMENDÁVEL (R), INFORMATIVO (I), NÃO CORRESPONDE (NC)

### Arquivos a criar/modificar

1. **`src/components/administrativo/qualidade/auditoria-interna/`** — nova pasta
   - `AuditoriaInternaTab.tsx` — componente principal (listagem + botão "Nova Auditoria Interna")
   - `RoteiroAuditoriaModal.tsx` — modal com abas do roteiro
   - `SecaoRoteiro.tsx` — componente reutilizável para cada seção (tabela com itens, campos Auditor/Auditado)
   - `LegendaClassificacao.tsx` — componente colapsável com legenda e classificações
   - `dadosRoteiro.ts` — dados estáticos de todas as seções (A–O) com itens numerados

2. **`src/components/administrativo/qualidade/ColetaDadosTab.tsx`** — adicionar a nova aba "Auditoria da Qualidade - Interna" e renomear a existente para "Externa". Ajustar grid para 7 colunas.

### Detalhes técnicos

- Cada item do roteiro terá: `numero`, `quesito`, `descricao`, e campos editáveis para `om` (checkbox), `nc` (checkbox), `c` (checkbox), `evidenciaObjetiva` (textarea), `planoAcao` (textarea)
- Campos Auditor e Auditado: inputs de texto no final de cada seção
- Modal usa `Dialog` com `ScrollArea` para conteúdo extenso
- Abas internas usam `Tabs` do shadcn/ui com scroll horizontal se necessário
- Legenda no rodapé usa `Collapsible` do shadcn com ícone de info, estilizado com badges coloridas para cada classificação
- O estado do formulário é gerenciado localmente no modal; ao salvar, adiciona ao histórico

