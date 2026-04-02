

## Plano: Corrigir exibição dos checklists Excelsior AS e OsmoTech

### Problema
Na linha 731 do `FormularioOS.tsx`, a condição que controla a exibição do bloco de treinamento não inclui `treinamento_usuario_excelsior_as` nem `treinamento_usuario_osmotech`. Por isso, quando esses tipos são selecionados, os checklists (que estão dentro desse bloco) não aparecem.

### Solução
Adicionar `|| t === "treinamento_usuario_excelsior_as" || t === "treinamento_usuario_osmotech"` à condição da linha 731.

### Arquivo alterado
- `src/components/comercial/assessoria/FormularioOS.tsx` — linha 731

