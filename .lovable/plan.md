

## Plano: Criar aba "AG" (Análise Gerencial) e mover "Situação/Status do Pregão" para o início

### Alterações em `src/components/comercial/OportunidadeAvancadaForm.tsx`

**1. Adicionar campos no `formData`**
- `estrategiaComercialAG: ''` (estratégia comercial da AG)
- `valorEntradaAG: 0` (valor de entrada R$)
- `valorLimiteAG: 0` (valor limite R$)

**2. Adicionar TabsTrigger "AG" após "AJ"**
```
[Dados Gerais] [AC] [AJ] [AG] [Histórico/Chat] [Documentos]
```

**3. Criar função `renderAnaliseGerencial()`** com:
- **Empresa Participante 1** — reutilizar `EmpresaParticipanteSelect` (mesmo componente já usado em Dados Gerais), com `valorMinimoFinal` (Valor mínimo Final - Empresa 1)
- **Empresa Participante 2 (Opcional)** — idem, com `valorMinimoFinal2`
- **Estratégia Comercial** — Textarea de livre escrita → `formData.estrategiaComercialAG`
- **Valor de Entrada (R$)** — Input numérico → `formData.valorEntradaAG`
- **Valor Limite (R$)** — Input numérico → `formData.valorLimiteAG`

Os campos de Empresa Participante e Valor Mínimo já existem no `formData` e são os mesmos usados em Dados Gerais — a sincronização é automática.

**4. Espelhar campos da AG em Dados Gerais (read-only)**
- Adicionar campos read-only para Estratégia Comercial, Valor de Entrada e Valor Limite na aba Dados Gerais, com nota "Editável na aba AG".

**5. Mover "Situação/Status do Pregão" para o primeiro campo da aba Dados Gerais**
- Atualmente está na linha ~703, após vários campos. Será movido para antes de "Data da Licitação" (linha ~497), tornando-se o **primeiro campo visível** ao abrir a licitação.

