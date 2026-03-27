

## Plano: Desativar módulos "Solicitações" e "Personalizar Navegação" para todas as empresas

### Contexto
Os módulos `solicitacoes` e `personalizar_navegacao` devem ser removidos de todas as empresas e filiais. Eles não devem aparecer no cadastro de usuários (árvore de permissões). Somente o SUPER pode reativá-los via edição da empresa.

### Alterações

**1. `src/data/superModules.ts` — Remover dos `modulosHabilitados` de todas as empresas:**
- Empresa `biodina-001` (linha 113): remover `'solicitacoes'`
- Empresa `master-001` (linha 153): remover `'solicitacoes'`
- Empresa `trial-001` (linha 193): remover `'solicitacoes'`
- Perfil `perfil-master` (linha 266): remover `'solicitacoes'`
- Nenhuma empresa tem `personalizar_navegacao` nos dados mock, então não há remoção necessária

**2. `src/data/sistemaModulosCompletos.ts` — Manter os módulos na definição:**
- Os módulos `solicitacoes` e `personalizar_navegacao` continuam existindo na lista `modulosCompletosSistema` para que o SUPER possa reativá-los via edição de empresa. Nenhuma alteração aqui.

**3. `src/data/superModules.ts` — Manter na lista `modulosConfig`:**
- Os módulos `solicitacoes` continuam na lista de configuração de módulos disponíveis (linha 75) para que o SUPER possa ver e habilitar. Nenhuma alteração aqui.

### Resultado
- Nenhuma empresa terá `solicitacoes` ou `personalizar_navegacao` habilitado por padrão
- O módulo não aparecerá na sidebar, nas permissões de usuário, nem na navegação de nenhuma empresa
- O SUPER continua vendo esses módulos na tela de edição de empresa e pode reativá-los individualmente

