

## Plano: Mover botão "Solicitar Análise da Assessoria Científica" para após "Resumo do Edital"

### Alterações em `OportunidadeAvancadaForm.tsx`

**1. Após o campo "Resumo do Edital" (linha 812), inserir apenas o botão "Solicitar Análise da Assessoria Científica"** como um botão standalone (sem o Card wrapper de "Solicitações de Análise").

**2. Remover da seção "Solicitações de Análise" (linhas 814-870):**
- Remover o botão "Solicitar Análise da Assessoria Científica" (linhas 845-856) — já movido para cima.
- Manter os outros 3 botões (Esclarecimento, Impugnação, Gerencial) na seção de Solicitações de Análise.

**Correção**: Relendo a instrução — o pedido é **deixar SÓ o botão da Assessoria Científica e tirar os outros**. Ou seja:

**2 (revisado). Substituir toda a seção "Solicitações de Análise" (linhas 814-870)** por apenas o botão "Solicitar Análise da Assessoria Científica", posicionado logo após o campo Resumo do Edital, sem o Card/header de "Solicitações de Análise".

Os botões de Esclarecimento, Impugnação e Gerencial serão removidos deste local (eles já existem em outros contextos do formulário ou serão reposicionados separadamente se necessário).

### Resultado
Após "Resumo do Edital", aparece apenas o botão "Solicitar Análise da Assessoria Científica", limpo e direto.

