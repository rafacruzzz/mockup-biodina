

## Plano: Adicionar botão "Solicitar Análise Gerencial" e campos espelhados da aba AG

### Requisitos
- Adicionar botão "Solicitar Análise Gerencial" **abaixo do campo Análise Técnica**, junto com os botões jurídicos
- Todos esses botões (Esclarecimento, Impugnação, Gerencial) só aparecem **após a análise científica ter sido solicitada** (`solicitouAnaliseCientifica === true`)
- Ao clicar, aparece um bloco read-only espelhando os campos da aba AG: Empresas (1 e 2), Estratégia Comercial, Valor de Entrada e Valor Limite

### Alterações em `src/components/comercial/OportunidadeAvancadaForm.tsx`

**1. Novo estado:**
- Adicionar `solicitouAnaliseGerencial` / `setSolicitouAnaliseGerencial` (useState false)

**2. Condicionar exibição dos botões jurídicos e gerencial:**
- Envolver os botões de Esclarecimento, Impugnação e o novo botão Gerencial dentro de `{solicitouAnaliseCientifica && (...)}`
- Os campos condicionais de cada um (Esclarecimento, Impugnação, Gerencial) também ficam dentro desse bloco

**3. Adicionar botão "Solicitar Análise Gerencial":**
- Ao lado dos botões jurídicos (mesma linha flex)
- Mesmo padrão visual (variant outline/secondary, ícone Briefcase)
- Ao clicar: `setSolicitouAnaliseGerencial(true)` + toast

**4. Bloco condicional read-only (quando `solicitouAnaliseGerencial`):**
- Card com campos read-only espelhando a aba AG:
  - Empresa 1 (nome + CNPJ) e Empresa 2 (se preenchida)
  - Estratégia Comercial (Textarea read-only, valor de `formData.estrategiaComercialAG`)
  - Valor de Entrada e Valor Limite (inputs read-only, `formData.valorEntradaAG` e `formData.valorLimiteAG`)

### Arquivo alterado
- `src/components/comercial/OportunidadeAvancadaForm.tsx`

