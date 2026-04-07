

## Plano: Melhorias no Novo Chamado da Assessoria Científica

### Resumo
Duas alterações principais: (1) auto-preenchimento cruzado dos campos Equipamento, Nº Série/Lote e Projeto-Mãe; (2) reestruturar o fluxo para que o formulário termine com um botão "Enviar" após o motivo, e a resposta de Vendas/DT apareça no detalhamento do chamado.

### Alterações

#### 1. Auto-preenchimento cruzado — `NovoChamadoAssessoriaModal.tsx`

Criar mapeamento bidirecional entre equipamento, nº série/lote e projeto-mãe nos dados mock:

```
EQUIPAMENTO_SERIE_PROJETO_MAP = {
  "eq-001": { modelo: "ABL800", serie: "SN-20250101", projetoId: "proj-001", projetoNumero: "PROJ-HC-2024-089" },
  "eq-002": { ... },
  ...
}
```

- Ao selecionar **Equipamento**: preencher automaticamente `numeroSerieLote` e `projetoId`
- Ao digitar **Nº Série/Lote** (match exato): preencher `equipamentoId` e `projetoId`
- Ao selecionar **Projeto-Mãe**: preencher `equipamentoId` e `numeroSerieLote`

#### 2. Botão "Enviar para [Destino]" — `NovoChamadoAssessoriaModal.tsx`

- Renomear o botão de "Abrir Chamado" para "Enviar para Vendas" ou "Enviar para DT" dinamicamente com base no campo `destino` selecionado
- Manter o botão no `DialogFooter` mas com texto dinâmico

#### 3. Exibir resposta de Vendas/DT no detalhamento — `DetalhesChamadoSheet.tsx`

A seção "Estratégia e Resultado" (linhas 214-265) já exibe `estrategiaResolucao` e `resultadoFinal` — que são os campos onde a resposta de Vendas/DT aparece. Renomear:
- "Estratégia de Resolução" → "Resposta / Estratégia de Resolução (Vendas/DT)"
- Manter "Resultado Final" como está

Já funciona: os dados mock do chamado `cham-001` já possuem `estrategiaResolucao` preenchido. O fluxo é: Assessoria abre → Vendas/DT responde (preenche estratégia/resultado) → aparece no detalhamento.

### Arquivos afetados
- `src/components/comercial/assessoria/NovoChamadoAssessoriaModal.tsx` — auto-preenchimento + botão dinâmico
- `src/components/comercial/assessoria/DetalhesChamadoSheet.tsx` — renomear label da resposta

