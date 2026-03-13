

## Plano: Adicionar Análise da Concorrência ao Resumo Biodina Rep

### Objetivo
Dentro do card "Resumo Biodina Rep" na aba Dados Gerais, adicionar uma seção **read-only** de "Análise da Concorrência" baseada no layout da imagem de referência — mostrando concorrentes com nome, marca, modelo, quantidade e quantidade de exames/mês. Os dados serão apenas para visualização (virão futuramente do BiodinaRep).

### Alterações em `src/components/comercial/ContratacaoSimplesForm.tsx`

**Dentro do card "Resumo Biodina Rep" (após linha ~934, antes do link externo):**

1. Adicionar subtítulo "Análise da Concorrência pelo Comercial Local"
2. Exibir dados mock de 2 concorrentes em blocos read-only seguindo o layout da imagem:
   - Cada concorrente em um bloco com borda, contendo:
     - Título "Concorrente N"
     - Nome do Concorrente (read-only input)
     - Marca do Concorrente | Modelo do Concorrente (2 colunas, read-only)
     - Quantidade | Quantidade de exames/mês (2 colunas, read-only)
3. Todos os campos com `readOnly` e visual `bg-muted/50 cursor-not-allowed`
4. Texto informativo: "Resumo da análise completa disponível no BiodinaRep"

### Dados mock
```ts
const concorrentesMock = [
  { nome: '', marca: '', modelo: '', quantidade: 0, examesMes: 0 },
  { nome: '', marca: '', modelo: '', quantidade: 0, examesMes: 0 }
];
```

Sem novos estados — é apenas visualização de dados que virão da integração futura.

