

## Plano: Trocar Selects de Origem e Tipo por Inputs de texto livre

### Alterações

**1. `src/components/administrativo/qualidade/GestaoNCTab.tsx`**
- Linhas 260-275: Substituir o Select de "Origem" por um `<Input>` editável (sem `disabled`) tanto no modo novo quanto no modo edição
- Linhas 280-294: Substituir o Select de "Tipo" por um `<Input>` editável

**2. `src/components/administrativo/rt/GestaoNCTab.tsx`**
- Linhas 262-279: Substituir o Select de "Origem" por um `<Input>` editável
- Linhas 283-298: Substituir o Select de "Tipo" por um `<Input>` editável

**3. `src/types/qualidade.ts`**
- Linha 43-44: Mudar `OrigemNC` e `TipoNC` de union types para `string`

**4. `src/types/rt.ts`**
- Linhas 84-85: Mudar `OrigemNCRT` e `TipoNCRT` de union types para `string`

Os campos passam de Select com opções fixas para Input de escrita livre, mantendo placeholder orientativo.

