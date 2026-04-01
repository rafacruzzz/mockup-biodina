

## Plano: Melhorias na aba Apresentação e tipo Produto do Repositório Técnico

### Resumo
Três blocos de alterações no Repositório Técnico de Produtos:
1. Dividir "Dimensões e Peso" em duas seções (Com Embalagem / Sem Embalagem)
2. Expandir "Apresentação Comercial" para mostrar os mesmos campos do cadastro (Primária, Secundária, Embarque, Referências)
3. Atualizar o tipo `Produto` para suportar os novos campos

### Alterações

**1. Tipo `Produto` — `src/types/produto.ts`**
- Adicionar campos de dimensões com/sem embalagem ao tipo `Produto`:
  - `pesoLiquidoComEmb`, `pesoBrutoComEmb`, `alturaComEmb`, `larguraComEmb`, `profundidadeComEmb`
  - `pesoLiquidoSemEmb`, `pesoBrutoSemEmb`, `alturaSemEmb`, `larguraSemEmb`, `profundidadeSemEmb`
- Adicionar campos de apresentação: `apresentacaoPrimaria`, `apresentacaoSecundaria`, `apresentacaoEmbarque`, `referenciasComercializadas` (string[])
- Manter os campos antigos (`pesoLiquido`, `pesoBruto`, `altura`, `largura`, `profundidade`) como deprecated

**2. Dados mock — `src/data/produtos.ts`**
- Preencher os novos campos de dimensões com/sem embalagem nos produtos existentes (DxH 520, etc.)
- Preencher `apresentacaoPrimaria`, `apresentacaoSecundaria`, `apresentacaoEmbarque`, `referenciasComercializadas`

**3. Aba Apresentação — `src/components/comercial/assessoria/repositorio/detalhe/ApresentacaoTab.tsx`**
- Expandir o card "Apresentação Comercial" para mostrar:
  - Grid com Apresentação Primária, Secundária e de Embarque (3 colunas)
  - Seção de Referências Comercializadas (badges)
  - Manter `apresentacaoComercial` como texto descritivo (se existir)
- Dividir "Dimensões e Peso" em dois cards:
  - **"Dimensões e Peso — Com Embalagem"**: campos `*ComEmb` + cálculos automatizados
  - **"Dimensões e Peso — Sem Embalagem"**: campos `*SemEmb` + cálculos automatizados

### Arquivos alterados
- `src/types/produto.ts`
- `src/data/produtos.ts`
- `src/components/comercial/assessoria/repositorio/detalhe/ApresentacaoTab.tsx`

