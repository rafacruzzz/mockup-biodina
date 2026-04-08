

## Plano: Remover tipos "Treinamento de Usuário" da lista principal de Tipo de OS

### Problema
Os 9 tipos "Treinamento de Usuário: Modelo X" aparecem como checkboxes na lista principal de "Tipo de OS". Eles devem ser removidos dali -- o modelo de treinamento já é selecionado dentro da seção "Registro de Treinamento" que aparece ao escolher "Treinamento Inicial" ou "Treinamento de Nova Equipe".

### Alteração

**Arquivo: `src/components/comercial/assessoria/FormularioOS.tsx` (linhas 176-184)**

Remover as 9 entradas `treinamento_usuario_*` do array `tiposOS`, mantendo apenas:
- Suporte Operacional
- Acompanhamento de Rotina
- Treinamento Inicial
- Treinamento de Nova Equipe

### Arquivo afetado
- `src/components/comercial/assessoria/FormularioOS.tsx`

