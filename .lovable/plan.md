

## Plano: Adicionar botão "Solicitar Análise Gerencial" ao grupo de botões

### Alteração em `OportunidadeAvancadaForm.tsx`

**1. Na div de botões (linha 852, antes do `</div>`)**, adicionar o botão:
- "Solicitar Análise Gerencial" — ao clicar, seta `solicitouAnaliseGerencial = true` e exibe toast
- Mesmo padrão visual dos outros botões (variant outline/secondary, ícone, estado disabled após clique)
- Ícone: `Briefcase` do lucide-react

Os campos condicionais da AG (linha 1074) já existem e já estão vinculados ao estado `solicitouAnaliseGerencial`. Não é necessário mais nenhuma alteração.

### Resultado
Quatro botões de solicitação lado a lado: Assessoria Científica, Esclarecimento, Impugnação e Análise Gerencial.

