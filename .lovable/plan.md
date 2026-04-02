

## Plano: Permitir criação de múltiplas pastas principais

### Problema
Quando você clica em uma pasta para selecioná-la, o estado `pastaSelecionada` fica definido. Ao clicar em "Nova Pasta", ela é automaticamente criada como subpasta da pasta selecionada. Não existe forma de desselecionar a pasta e criar uma nova pasta na raiz.

### Solução
Adicionar ao modal "Nova Pasta" um checkbox/toggle para escolher se a nova pasta será criada **na raiz** ou **dentro da pasta selecionada**. Também permitir desselecionar uma pasta clicando nela novamente.

### Alterações em `src/components/administrativo/rt/OrganizacaoDocumentos.tsx`

**1. Toggle de desseleção**: ao clicar numa pasta já selecionada, desselecionar (`setPastaSelecionada(null)`).

**2. Opção no modal "Nova Pasta"**: quando há pasta selecionada, mostrar um checkbox "Criar dentro de: [nome da pasta]" (marcado por padrão). Se o usuário desmarcar, a pasta será criada na raiz.

**3. Atualizar `criarNovaPasta`**: usar o valor do checkbox (e não apenas `pastaSelecionada`) para decidir se cria na raiz ou como subpasta.

### Arquivo alterado
- `src/components/administrativo/rt/OrganizacaoDocumentos.tsx`

