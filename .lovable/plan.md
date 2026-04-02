

## Plano: Adicionar scroll na tabela de produtos do Kit

### Problema
Após adicionar mais de 2 produtos ao kit, a tabela cresce sem limite e os produtos ficam invisíveis (não há scroll).

### Alteração

**Em `src/components/cadastro/KitModal.tsx` (linha 132):**
- Envolver a tabela de produtos em um container com `max-h-[300px] overflow-y-auto` para limitar a altura e permitir scroll vertical
- Manter o `TableHeader` visível com `sticky top-0 bg-background z-10`

### Arquivo alterado
- `src/components/cadastro/KitModal.tsx`

