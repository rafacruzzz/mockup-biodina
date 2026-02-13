

## Plano: Substituir Textarea por Tabela de OSs na Aba "Análise Técnica" da Contratação

### Objetivo
Substituir o campo de texto (Textarea) da aba "Análise Técnica" na Contratação por uma tabela resumida das Ordens de Serviço vinculadas àquela contratação, com botão "Ver Mais" para expandir a descrição de cada OS.

---

### O que muda

A aba "Análise Técnica" deixa de ser um campo de digitação livre e passa a exibir uma tabela com as OSs geradas para aquela contratação no módulo de Assessoria Científica.

```text
ANTES:
┌─────────────────────────────────────┐
│ Análise Técnica-Científica          │
│ ┌─────────────────────────────────┐ │
│ │ [Textarea para digitação]       │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘

DEPOIS:
┌──────────────────────────────────────────────────────────────┐
│ Análise Técnica - Ordens de Serviço                          │
│                                                              │
│ N. OS      | Tipo            | Status      | Assessor | Ação │
│ OS-2025-001| Treinamento     | Concluída   | Carlos   | [+]  │
│   └─ Descrição expandida ao clicar "Ver Mais"...             │
│ OS-2025-003| Acomp. Rotina   | Em Andamento| Maria    | [+]  │
│                                                              │
│ Total: 2 ordens de serviço vinculadas                        │
└──────────────────────────────────────────────────────────────┘
```

---

### Arquivo a Modificar

| Arquivo | Acao |
|---------|------|
| `src/components/comercial/ContratacaoSimplesForm.tsx` | Substituir Textarea por tabela de OSs com dados mock e botão "Ver Mais" |

---

### Detalhes da Implementacao

#### 1. Adicionar dados mock de OSs vinculadas

Criar um array local com 2 OSs de exemplo vinculadas à contratação:

```typescript
const osVinculadas = [
  {
    id: 'os-cont-001',
    numero: 'OS-2025-010',
    tipo: 'Treinamento Inicial',
    status: 'CONCLUÍDA',
    assessor: 'Dr. Carlos Mendes',
    dataAgendada: '2025-04-10',
    descricao: 'Treinamento inicial da equipe do laboratório para operação do analisador bioquímico. Foram treinados 6 profissionais em 2 turnos, cobrindo operação básica, manutenção preventiva e interpretação de resultados.'
  },
  {
    id: 'os-cont-002',
    numero: 'OS-2025-015',
    tipo: 'Acompanhamento de Rotina',
    status: 'EM_ANDAMENTO',
    assessor: 'Dra. Maria Santos',
    dataAgendada: '2025-05-20',
    descricao: 'Visita de acompanhamento para verificação de performance do equipamento após 30 dias de uso. Avaliação de controle de qualidade interno e externo, revisão de procedimentos operacionais.'
  }
];
```

#### 2. Substituir conteúdo da aba (linhas 1331-1346)

Remover o Card com Textarea e substituir por:

- Card com titulo "Ordens de Serviço - Análise Técnica"
- Tabela com colunas: N. OS, Tipo, Status, Assessor, Data, Ação
- Cada linha com botão "Ver Mais" (ícone ChevronDown/ChevronUp)
- Ao clicar, expande uma linha abaixo com a descrição completa da OS
- Badge colorido para o status (verde=Concluída, amarelo=Em Andamento, etc.)
- Rodapé com total de OSs vinculadas

#### 3. Estado para controlar expansão

```typescript
const [osExpandida, setOsExpandida] = useState<string | null>(null);
```

Ao clicar em "Ver Mais", alterna a expansão daquela OS específica.

---

### Resultado Esperado

- Aba "Análise Técnica" mostra tabela resumida das OSs vinculadas à contratação
- Cada OS tem um botão para expandir e ver a descrição completa
- 2 OSs de exemplo para demonstração visual
- Sem campo de digitação - apenas visualização das OSs
