

## Plano: Seção de Recurso condicional ao status "Recursos"

### Objetivo
Quando `situacaoPregao === 'recursos'`, exibir uma seção especial com dois botões na aba Dados Gerais. Os campos read-only de "Razões para Recurso" e "Contrarrazões" (linhas 969-995) passam a aparecer apenas dentro dessa seção condicional.

### Alterações em `OportunidadeAvancadaForm.tsx`

**1. Novos estados (~linha 103)**
- `solicitouRecurso: boolean` (false)
- `solicitouRecursoConcorrente: boolean` (false)

**2. Substituir os blocos fixos de "Razões para Recurso" e "Contrarrazões" (linhas 969-995) por uma seção condicional:**

```
{formData.situacaoPregao === 'recursos' && (
  <Card>
    <CardHeader>Recursos</CardHeader>
    <CardContent>
      <!-- Botão A: "Recurso" -->
      Botão "Solicitar Análise Jurídica - Recurso"
        → setSolicitouRecurso(true) + toast
        → Se solicitouRecurso: exibe read-only "Razões para Recurso" (da aba AJ)

      <!-- Botão B: "Recurso do Concorrente" -->
      Botão "Recurso do Concorrente"
        → setSolicitouRecursoConcorrente(true)
        → Se solicitouRecursoConcorrente:
          1. Campo editável para colar o recurso do concorrente (formData.recursoConcorrente)
          2. Botão "Solicitar Análise Jurídica" (envia para jurídico + toast)
          3. Read-only "Contrarrazões" (da aba AJ)
    </CardContent>
  </Card>
)}
```

**3. Remover a exibição fixa** dos campos "Razões para Recurso" (linhas 969-981) e "Contrarrazões" (linhas 983-995) que hoje aparecem sempre — eles passam a existir apenas dentro da seção condicional de recursos.

### Resultado
Os campos de recurso só aparecem quando o pregão está na fase "Recursos", e cada sub-seção só é revelada após o respectivo botão ser clicado, seguindo o mesmo padrão dos demais botões de solicitação.

