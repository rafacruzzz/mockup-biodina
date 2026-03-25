

## Plano: Adicionar botões de ação em massa na árvore de permissões

### Resumo
Adicionar uma barra de ações rápidas no topo do `ModuleAccessTree` (dentro de cada empresa) com botões para: **Marcar Todos** os módulos, **Desmarcar Todos**, e aplicar um nível de permissão em massa (**Todos Ver**, **Todos Ver/Editar**, **Todos Excluir**). Isso evita que o usuário precise clicar módulo por módulo.

### Alterações

**Arquivo: `src/components/cadastro/ModuleAccessTree.tsx`**

1. **Adicionar barra de ações rápidas** no topo do componente (antes da lista de módulos, linha 196):
   - Botão "Marcar Todos" — habilita todos os módulos e submódulos com permissão "Ver"
   - Botão "Desmarcar Todos" — desabilita todos os módulos e submódulos
   - Separador visual
   - Botão "Todos Ver" — marca todos e aplica nível "Ver" em todos os submódulos
   - Botão "Todos Ver/Editar" — marca todos e aplica nível "Ver/Editar"
   - Botão "Todos Excluir" — marca todos e aplica nível "Excluir"

2. **Funções auxiliares:**
   - `handleMarcarTodos()` — itera sobre `modulosParaMostrar`, cria todos os `ModuloUsuario` habilitados com submódulos habilitados e permissão "Ver"
   - `handleDesmarcarTodos()` — limpa o array de modules (ou desabilita todos)
   - `handleAplicarNivelTodos(level: PermissionLevel)` — marca todos e aplica o nível de permissão escolhido em todos os submódulos

3. **Layout:** barra com flex-wrap, botões pequenos (`size="sm"`, `variant="outline"`), com ícones Eye/Edit/Trash para os níveis de permissão.

### Resultado
Cada empresa/filial terá no topo da árvore de módulos os botões de ação em massa, permitindo configurar permissões para todos os módulos em um único clique.

