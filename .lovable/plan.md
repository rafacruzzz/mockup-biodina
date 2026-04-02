

## Plano: Adicionar tipo de OS "Treinamento de Usuário: Modelo SET Medikal"

Seguindo exatamente o mesmo padrão do MeterOmega já implementado.

### Alterações

**1. `src/types/assessoria-cientifica.ts`**
- Adicionar `'treinamento_usuario_setmedikal'` ao type `TipoOS`

**2. `src/data/assessoria-cientifica.ts`**
- Adicionar label `"Treinamento de Usuário: Modelo SET Medikal"` e ícone `"🧪"` nos helpers

**3. `src/components/comercial/assessoria/FormularioOS.tsx`**
- Adicionar opção no array `tiposOS`
- Incluir nas condições de `ehTreinamento` (participantes, assinaturas, certificado)
- Novo estado `checklistSetMedikal` (Record<string, boolean>)
- Bloco condicional com dois cards de checkboxes:

**Card "Apresentação Geral":**
- Disco de heparina
- Heparina balanceada para eletrólitos
- Tampa com pino interno para eliminação de ar
- Extremidade luer slip

**Card "Utilização":**
- Posição do êmbolo antes da coleta
- Volume mínimo e máximo da coleta
- Expulsão de bolhas de ar batendo na seringa
- Eliminação do ar
- Colocação da tampa
- Homogeneização manual imediatamente
- Transporte e armazenamento
- Tempo até a execução da análise

### Arquivos alterados
- `src/types/assessoria-cientifica.ts`
- `src/data/assessoria-cientifica.ts`
- `src/components/comercial/assessoria/FormularioOS.tsx`

