

## Plano: Adicionar Aba "DT" (Departamento Técnico) na Contratação

### Objetivo
Criar uma nova aba chamada "DT" no formulário de Contratação, com a mesma estrutura visual da aba "Análise Técnica", mas exibindo Ordens de Serviço provenientes do módulo de Departamento Técnico.

---

### Alterações

#### Arquivo: `src/components/comercial/ContratacaoSimplesForm.tsx`

**1. Adicionar dados mock de OSs do Departamento Técnico**

Novo array `osDepartamentoTecnico` com 2 OSs de exemplo (dados diferentes da Análise Técnica):

| Campo | OS 1 | OS 2 |
|-------|------|------|
| Número | OS-DT-2025-001 | OS-DT-2025-002 |
| Tipo | Manutenção Corretiva | Instalação de Equipamento |
| Status | CONCLUÍDA | EM_ANDAMENTO |
| Técnico | Eng. Rafael Lima | Téc. André Souza |
| Data | 2025-03-15 | 2025-06-01 |

**2. Adicionar estado para expansão da aba DT**

```typescript
const [osDtExpandida, setOsDtExpandida] = useState<string | null>(null);
```

**3. Adicionar TabsTrigger "DT" na TabsList**

Inserir a nova aba logo após "Análise Técnica", com ícone `Wrench`. Ajustar o grid-cols de 8/7 para 9/8.

**4. Adicionar TabsContent "dt"**

Mesmo layout da aba "Análise Técnica":
- Card com título "Ordens de Serviço - Departamento Técnico"
- Tabela com colunas: N. OS, Tipo, Status, Técnico, Data, Ação
- Botão "Ver Mais/Menos" com expansão da descrição
- Rodapé com total de OSs

---

### Resumo de Alterações

| Arquivo | Ação |
|---------|------|
| `src/components/comercial/ContratacaoSimplesForm.tsx` | Adicionar aba DT com tabela de OSs do Departamento Técnico |

### Resultado
- Nova aba "DT" visível ao lado de "Análise Técnica"
- Tabela com 2 OSs de exemplo do Departamento Técnico
- Mesma interação de expandir/recolher descrição

