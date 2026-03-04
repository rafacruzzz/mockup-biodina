

## Plano: Substituir campo único de notificações Notivisa por grid de 4 campos com botão "+"

### O que será feito

Na aba 4 (Problema), quando o usuário seleciona "Sim" em "Foram feitas notificações no Notivisa?", ao invés de um único campo de texto, serão exibidos **4 campos lado a lado** (em grid). Um botão "+" ao final permite adicionar mais 4 campos por vez (formando novas linhas de 4).

### Arquivos a modificar

1. **`src/types/acaoCampo.ts`**
   - Alterar `numerosNotificacoes: string` para `numerosNotificacoes: string[]` na interface `NotificacaoAcaoCampoData`

2. **`src/components/administrativo/qualidade/NotificacaoAcaoCampoForm.tsx`**
   - Alterar `defaultData` de `numerosNotificacoes: ''` para `numerosNotificacoes: ['', '', '', '']`
   - Substituir o bloco condicional `{dados.notificacoesNotivisa && ...}` (linhas 473-478):
     - Renderizar `dados.numerosNotificacoes` em grid `grid-cols-4` com inputs individuais
     - Botão "+" (`Plus` icon) ao final que faz `push` de 4 strings vazias ao array
     - Cada input atualiza sua posição no array via índice
   - Ao mudar para "Não", resetar o array para `['', '', '', '']`

3. **`src/components/administrativo/qualidade/utils/notificacaoAcaoCampoPDF.ts`**
   - Ajustar a linha que usa `dados.numerosNotificacoes` para fazer `.filter(Boolean).join(', ')` ao invés de usar string direta

