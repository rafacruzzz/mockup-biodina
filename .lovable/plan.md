

## Plano: Ajustes em Labels de Segmento, Telefone e Botão de Conversão

### Resumo
Corrigir labels de segmento do lead, renomear campos de telefone fixo e confirmar que o botão "Converter para Cliente" já funciona em ambos os módulos (Cadastro e Comercial).

### Alterações

#### 1. `src/hooks/useSegmentoLeadManager.ts`
- Linha 26: trocar `PÚBLICO - HOSPITAL - SECRETARIA DA SAÚDE` por `PÚBLICO - HOSPITAL - SECRETARIA DE SAÚDE`
- Linha 36: trocar `PÚBLICO - LABORATÓRIO - SECRETARIA DA SAÚDE` por `PÚBLICO - LABORATÓRIO - SECRETARIA DE SAÚDE`

#### 2. `src/components/cadastro/EntidadeModal.tsx`
- Linha 805: trocar `Telefone Fixo 1 do {entityLabel}` por `Telefone Fixo do {entityLabel}`
- Linha 814: trocar `Telefone Fixo 2 do Mantenedor` por `Telefone Fixo do Mantenedor`

### Sem alteração necessária
- O botão **"Converter para Cliente"** já existe no rodapé do `EntidadeModal` quando o tipo é Lead e está em modo edição. Como ambos os módulos (Cadastro e Comercial) usam o mesmo `EntidadeModal`, a funcionalidade já está presente nos dois lugares.

### Arquivos afetados
- `src/hooks/useSegmentoLeadManager.ts`
- `src/components/cadastro/EntidadeModal.tsx`

