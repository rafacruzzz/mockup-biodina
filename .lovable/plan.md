

## Plano: Ficha Técnica, UDI nos Códigos Fiscais e Dimensões com/sem embalagem

### 1. Nova aba "Ficha Técnica" no cadastro de Produto

**`src/types/product.ts`** — Adicionar campos:
```tsx
// Aba Ficha Técnica
fichaTecnica: {
  parametrosChave: string;
  compatibilidades: string;
  requisitosInfraestrutura: string;
  condicoesAmbientais: string;
  conformidadesNormas: string;
};
```

**Novo arquivo `src/components/product/FichaTecnicaTab.tsx`:**
- Card com 5 campos Textarea, cada um com ícone e label:
  - Parâmetros/Chaves (ícone Settings)
  - Compatibilidades (ícone Box)
  - Requisitos de Infraestrutura (ícone Building2)
  - Condições Ambientais (ícone Thermometer)
  - Conformidades/Normas (ícone Shield)
- Layout idêntico ao da `FichaTecnicaTab` do Repositório de Produtos (imagem de referência), com placeholders explicativos

**`src/components/product/ProductRegistrationForm.tsx`:**
- Importar `FichaTecnicaTab`
- Adicionar `TabsTrigger value="ficha-tecnica"` após "Regulamentação ANVISA"
- Adicionar `TabsContent` correspondente
- Inicializar `fichaTecnica` no `formData`

### 2. Aba Códigos Fiscais — Substituir "Código EAN (GTIN)" por "UDI"

**`src/components/product/CodigosFiscaisTab.tsx`:**
- Linha 41: `"Código EAN (GTIN) - Cx Primária"` → `"UDI - Cx Primária"`
- Linha 52: `"Código EAN (GTIN) - Cx Secundária"` → `"UDI - Cx Secundária"`
- Linha 63: `"Código EAN (GTIN) - Cx Embarque"` → `"UDI - Cx Embarque"`

### 3. Aba Dimensões e Peso — Separar em "Com embalagem" e "Sem embalagem"

**`src/types/product.ts`:**
- Substituir os 5 campos atuais por:
```tsx
// Dimensões e Peso - Com embalagem
pesoLiquidoComEmb: number;
pesoBrutoComEmb: number;
alturaComEmb: number;
larguraComEmb: number;
profundidadeComEmb: number;
// Dimensões e Peso - Sem embalagem
pesoLiquidoSemEmb: number;
pesoBrutoSemEmb: number;
alturaSemEmb: number;
larguraSemEmb: number;
profundidadeSemEmb: number;
```

**`src/components/product/DimensoesPesoTab.tsx`:**
- Dois blocos Card (ou seções dentro de um Card):
  - "Dimensões e Peso — Com Embalagem" com 5 campos + volume/peso cubado calculados
  - "Dimensões e Peso — Sem Embalagem" com os mesmos 5 campos + cálculos
- Atualizar `ProductRegistrationForm.tsx` para inicializar os novos campos com 0

### 4. Alimentar Repositório de Produtos

Os dados da aba "Ficha Técnica" do cadastro de produto já existem no tipo `Produto` (`parametrosChave`, `compatibilidades`, etc.) usado pela `FichaTecnicaTab` do Repositório. Quando houver backend, esses campos serão a mesma fonte de dados. Sem alteração de código necessária agora — a estrutura já é compatível.

### Arquivos alterados
- `src/types/product.ts`
- `src/components/product/FichaTecnicaTab.tsx` (novo)
- `src/components/product/ProductRegistrationForm.tsx`
- `src/components/product/CodigosFiscaisTab.tsx`
- `src/components/product/DimensoesPesoTab.tsx`

