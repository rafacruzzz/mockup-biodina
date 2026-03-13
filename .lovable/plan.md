

## Plano: Criar aba "AJ" (Análise Jurídica) e renomear "Análise Técnica" para "AC"

### Objetivo
Adicionar a aba "AJ" após "AC" no formulário de Licitação. Os campos da AJ são editáveis e sincronizam bidireccionalmente com campos read-only na aba "Dados Gerais". Também criar o campo "Contrarrazões" na aba Dados Gerais.

### Alterações em `src/components/comercial/OportunidadeAvancadaForm.tsx`

**1. Renomear aba**
- `Análise Técnica` → `AC` (label do TabsTrigger, linha 1359)

**2. Adicionar campos no `formData` (linha ~176)**
- `pedidoEsclarecimento: ''`
- `recursoConcorrente: ''`
- `contrarrazoes: ''`
- Os campos `impugnacaoEdital` e `manifestacaoRecorrer` já existem

**3. Adicionar TabsTrigger + TabsContent para "AJ" (após AC, linha ~1360)**
```
[Dados Gerais] [AC] [AJ] [Histórico/Chat] [Documentos]
```

**4. Criar função `renderAnaliseJuridica()`** com 5 campos Textarea:
- **Pedido de Esclarecimento** → `formData.pedidoEsclarecimento`
- **Impugnação do Edital** → `formData.impugnacaoEdital` (já existe, editável aqui)
- **Razões para Recurso** → `formData.manifestacaoRecorrer` (já existe, editável aqui)
- **Recurso do Concorrente** → `formData.recursoConcorrente` (réplica da equipe de licitação, read-only ou editável pelo jurídico)
- **Contrarrazões** → `formData.contrarrazoes`

**5. Atualizar a aba "Dados Gerais" (`renderDadosGerais`)**

Adicionar campos **read-only** que espelham os valores escritos na AJ:
- **Pedido de Esclarecimento** (novo, read-only, após Resumo do Edital ~linha 747)
- **Impugnação do Edital** (já existe na linha 876 — tornar read-only com nota "editável na aba AJ")
- **Razões para Recurso** (já existe na linha 889 — tornar read-only com nota "editável na aba AJ")
- **Contrarrazões** (novo, read-only, após Razões para Recurso)

Os campos na Dados Gerais usam o mesmo `formData`, portanto a sincronização é automática — editar na AJ reflete instantaneamente na Dados Gerais.

### Resultado final das abas
```text
[Dados Gerais]  [AC]  [AJ]  [Histórico/Chat]  [Documentos]
```

