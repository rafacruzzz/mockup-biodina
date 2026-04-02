

## Plano: Adicionar tipo de OS "Treinamento de Usuário: Modelo MeterOmega"

### O que será feito
Adicionar uma nova opção de tipo de OS chamada "Treinamento de Usuário: Modelo MeterOmega" que, quando selecionada, exibe um checklist específico com os itens de "Apresentação Geral" e "Utilização", além de permitir adicionar participantes (igual ao Treinamento de Nova Equipe).

### Alterações

**1. `src/types/assessoria-cientifica.ts`** — Adicionar `'treinamento_usuario_meteromega'` ao type `TipoOS`

**2. `src/data/assessoria-cientifica.ts`** — Adicionar label (`"Treinamento de Usuário: Modelo MeterOmega"`) e ícone nos helpers `getTipoOSLabel` e `getTipoOSIcon`

**3. `src/components/comercial/assessoria/FormularioOS.tsx`**:
- Adicionar a nova opção no array `tiposOS`
- Incluir `treinamento_usuario_meteromega` nas condições que exibem participantes, assinaturas e certificado (junto com `treinamento_inicial` e `treinamento_nova_equipe`)
- Adicionar um bloco condicional que, quando esse tipo for selecionado, exibe dois cards com checkboxes:

**Card "Apresentação Geral":**
- Heparina jateada
- Heparina balanceada para eletrólitos
- Tampa com pino interno para eliminação de ar
- Extremidade luer lock
  
**Card "Utilização":**
- Volume mínimo e máximo da coleta
- Expulsão de bolhas de ar batendo na seringa
- Eliminação do ar
- Colocação da tampa
- Homogeneização manual imediatamente
- Transporte e armazenamento
- Tempo até a execução da análise

Cada item será um checkbox para o assessor marcar conforme realiza o treinamento.

### Arquivos alterados
- `src/types/assessoria-cientifica.ts`
- `src/data/assessoria-cientifica.ts`
- `src/components/comercial/assessoria/FormularioOS.tsx`

