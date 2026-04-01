

## Plano: Adicionar seção "Alertas para Análise" abaixo dos "Alertas do Sistema"

### Problema
O usuário quer duas seções separadas na aba Análise de Editais:
1. **Alertas do Sistema** (já existe, manter como está)
2. **Alertas para Análise** (nova seção logo abaixo)

### Alteração em `src/components/comercial/assessoria/AnaliseEditaisTab.tsx`

Adicionar entre o `PainelAlertas` (linha 122) e o Card de "Licitações em Andamento" (linha 126) uma nova seção `Card` com:
- Título: "Alertas para Análise" com ícone `FileText`
- Listar as mesmas licitações com `solicitouAnaliseCientifica === true` e status != `finalizada`
- Cada item mostra: número do pregão, instituição, objeto, data de solicitação, e badge de status
- Visual diferente do PainelAlertas (card branco com borda, sem fundo amarelo) para distinguir visualmente

O "Alertas do Sistema" permanece intacto no topo.

### Arquivo alterado
- `src/components/comercial/assessoria/AnaliseEditaisTab.tsx`

