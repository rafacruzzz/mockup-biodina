
## Plano: Sincronizacao Bidirecional de Empresa Participante entre Contratacao e Licitacao

### Objetivo
Quando uma licitacao for vinculada a uma contratacao, exibir as empresas participantes selecionadas na licitacao original. Permitir que o usuario altere a empresa escolhida diretamente na contratacao, e essa alteracao deve atualizar automaticamente a licitacao vinculada (sincronizacao bidirecional).

---

### Fluxo Atual vs Proposto

```text
FLUXO ATUAL:
Licitacao                           Contratacao
+-----------------------+           +-----------------------+
| Empresa 1: ESS        |    -->    | Vincula Licitacao     |
| Empresa 2: (opcional) |           | (nao mostra empresa)  |
+-----------------------+           +-----------------------+

FLUXO PROPOSTO:
Licitacao                           Contratacao
+-----------------------+    <->    +-----------------------+
| Empresa 1: ESS        |           | Licitacao: PE-001     |
| Empresa 2: ABC        |           | Empresa: ESS          |
+-----------------------+           | [Alterar Empresa]     |
        ^                           +-----------------------+
        |                                    |
        +-------- Atualiza automaticamente --+
```

---

### Alteracoes Necessarias

#### 1. Atualizar Tipos de Dados

**Arquivo:** `src/data/licitacaoMockData.ts`

Adicionar campos de empresa participante ao tipo `licitacoesGanhasDetalhadas`:

| Campo Novo | Tipo | Descricao |
|------------|------|-----------|
| `empresaParticipanteId` | string | ID da empresa 1 |
| `empresaParticipanteNome` | string | Nome da empresa 1 |
| `empresaParticipanteCNPJ` | string | CNPJ da empresa 1 |
| `empresaParticipanteId2` | string | ID da empresa 2 (opcional) |
| `empresaParticipanteNome2` | string | Nome da empresa 2 (opcional) |
| `empresaParticipanteCNPJ2` | string | CNPJ da empresa 2 (opcional) |

---

#### 2. Criar Contexto de Licitacoes Ganhas

**Novo Arquivo:** `src/contexts/LicitacoesGanhasContext.tsx`

Criar contexto para gerenciar estado global das licitacoes ganhas, permitindo atualizacao bidirecional:

```typescript
// Funcoes do contexto:
- licitacoesGanhas: array com todas as licitacoes ganhas
- atualizarEmpresaLicitacao: atualiza empresa de uma licitacao especifica
- getLicitacaoById: busca licitacao por ID
```

---

#### 3. Modificar ContratacaoSimplesForm.tsx

**Secao:** Card "Vincular Licitacao Ganha"

**Alteracoes na Interface:**

Quando uma licitacao for vinculada, exibir:

```text
+---------------------------------------------------------------+
| Vincular Licitacao Ganha                                       |
+---------------------------------------------------------------+
| Selecionar Licitacao: [PE-2024-001 - Prefeitura SP ▼]         |
|                                                                |
| +-----------------------------------------------------------+ |
| | LICITACAO VINCULADA: PE-2024-001                          | |
| | Objeto: Aquisicao de equipamentos medicos                  | |
| |                                                            | |
| | EMPRESA PARTICIPANTE:                                      | |
| | +--------------------------------------------------------+ | |
| | | Empresa: iMuv Tecnologia LTDA                          | | |
| | | CNPJ: 12.345.678/0001-00                               | | |
| | | [Alterar Empresa ▼]                                     | | |
| | +--------------------------------------------------------+ | |
| |                                                            | |
| | (Se houver segunda empresa)                                | |
| | EMPRESA PARTICIPANTE 2:                                    | |
| | +--------------------------------------------------------+ | |
| | | Empresa: iMuv Filial SP                                | | |
| | | CNPJ: 12.345.678/0002-81                               | | |
| | | [Alterar Empresa ▼]                                     | | |
| | +--------------------------------------------------------+ | |
| +-----------------------------------------------------------+ |
+---------------------------------------------------------------+
```

**Novos Estados:**

```typescript
const [empresaContrato, setEmpresaContrato] = useState({
  empresaParticipanteId: '',
  empresaParticipanteNome: '',
  empresaParticipanteCNPJ: ''
});

const [empresaContrato2, setEmpresaContrato2] = useState({
  empresaParticipanteId: '',
  empresaParticipanteNome: '',
  empresaParticipanteCNPJ: ''
});
```

**Nova Funcao de Sincronizacao:**

```typescript
const handleAlterarEmpresaContrato = (novaEmpresa) => {
  setEmpresaContrato(novaEmpresa);
  
  // Atualizar licitacao original via contexto
  if (licitacaoVinculada) {
    atualizarEmpresaLicitacao(licitacaoVinculada, novaEmpresa);
    toast.success('Empresa atualizada na licitacao e contratacao!');
  }
};
```

---

#### 4. Atualizar handleVincularLicitacao

Ao vincular uma licitacao, carregar tambem os dados da empresa participante:

```typescript
const handleVincularLicitacao = (licitacaoId: string) => {
  const licitacao = licitacoesGanhas.find(l => l.id.toString() === licitacaoId);
  
  // ... codigo existente ...
  
  // NOVO: Carregar empresa participante da licitacao
  setEmpresaContrato({
    empresaParticipanteId: licitacao.empresaParticipanteId || '',
    empresaParticipanteNome: licitacao.empresaParticipanteNome || '',
    empresaParticipanteCNPJ: licitacao.empresaParticipanteCNPJ || ''
  });
  
  setEmpresaContrato2({
    empresaParticipanteId: licitacao.empresaParticipanteId2 || '',
    empresaParticipanteNome: licitacao.empresaParticipanteNome2 || '',
    empresaParticipanteCNPJ: licitacao.empresaParticipanteCNPJ2 || ''
  });
};
```

---

### Arquivos a Modificar/Criar

| Arquivo | Acao | Descricao |
|---------|------|-----------|
| `src/contexts/LicitacoesGanhasContext.tsx` | **CRIAR** | Contexto para gerenciar licitacoes ganhas com estado global |
| `src/data/licitacaoMockData.ts` | Modificar | Adicionar campos de empresa participante aos dados mock |
| `src/components/comercial/ContratacaoSimplesForm.tsx` | Modificar | Exibir empresa participante e permitir alteracao |
| `src/App.tsx` | Modificar | Envolver app com LicitacoesGanhasProvider |

---

### Detalhes Tecnicos

#### Contexto LicitacoesGanhasContext

```typescript
interface LicitacaoGanha {
  id: number;
  numeroPregao: string;
  // ... campos existentes ...
  empresaParticipanteId?: string;
  empresaParticipanteNome?: string;
  empresaParticipanteCNPJ?: string;
  empresaParticipanteId2?: string;
  empresaParticipanteNome2?: string;
  empresaParticipanteCNPJ2?: string;
}

interface LicitacoesGanhasContextType {
  licitacoesGanhas: LicitacaoGanha[];
  atualizarEmpresaLicitacao: (
    licitacaoId: string,
    empresa: { id: string; nome: string; cnpj: string },
    empresaNumero: 1 | 2
  ) => void;
}
```

#### Componente de Selecao de Empresa na Contratacao

Reutilizar o mesmo Select usado no EmpresaParticipanteSelect, mas simplificado:

```typescript
<Select value={empresaContrato.empresaParticipanteId} onValueChange={handleAlterarEmpresa}>
  <SelectTrigger>
    <SelectValue placeholder="Selecione a empresa" />
  </SelectTrigger>
  <SelectContent>
    {empresasDisponiveis.map((empresa) => (
      <SelectItem key={empresa.id} value={empresa.id}>
        {empresa.nome} - {empresa.cnpj}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
```

---

### Comportamento do Sistema

1. **Ao vincular licitacao**: Carrega automaticamente a(s) empresa(s) participante(s) definida(s) na licitacao
2. **Exibicao**: Mostra qual empresa foi escolhida para aquela licitacao
3. **Alteracao**: Usuario pode trocar a empresa selecionada
4. **Sincronizacao**: Ao salvar ou alterar, atualiza a licitacao original
5. **Feedback**: Toast informando que a alteracao foi sincronizada

---

### Validacoes

- A licitacao vinculada nao pode ser editada diretamente (esta "fechada")
- Mas atraves da contratacao, a empresa pode ser alterada
- A alteracao e registrada no historico da licitacao (opcional, para auditoria)
