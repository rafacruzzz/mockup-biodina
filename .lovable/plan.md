

## Plano: Adicionar campo "Quantidade" no quadro "Dados do Projeto"

### Alteração

**Arquivo: `src/components/comercial/ContratacaoSimplesForm.tsx`**

1. **Estado inicial (~linha 212)**: Adicionar `quantidade: 0` ao `formData`
2. **Layout (~linha 770, após o fechamento do `div` do "Valor Original do Contrato")**: Inserir um novo campo Input "Quantidade" logo abaixo, com placeholder explicativo ("Ex: quantidade de testes, coletores, etc.")

Apenas o campo de input será adicionado — sem alterações em outras abas ou seções.

