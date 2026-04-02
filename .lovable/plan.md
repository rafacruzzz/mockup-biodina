

## Plano: Adicionar aba "Rastreabilidade" ao módulo RT

### Resumo
Inserir a aba "Rastreabilidade" no módulo RT, acima das abas existentes (primeira posição), reutilizando o mesmo componente `RastreabilidadeTab` já usado no módulo Qualidade.

### Alterações em `src/pages/Administrativo.tsx`

**1. Adicionar estado inicial do `rtTab` para "rastreabilidade"** (ou manter o atual e só adicionar a nova aba)

**2. Expandir o grid de tabs de `grid-cols-3` para `grid-cols-4`**

**3. Inserir novo `TabsTrigger` como primeiro item:**
```
<TabsTrigger value="rastreabilidade">RASTREABILIDADE</TabsTrigger>
```

**4. Inserir novo `TabsContent` antes dos existentes:**
```
<TabsContent value="rastreabilidade">
  <RastreabilidadeTab />  // mesmo componente de qualidade
</TabsContent>
```

**5. Importar `RastreabilidadeTab` de `@/components/administrativo/qualidade/RastreabilidadeTab`** (já existente, reutilizado)

### Arquivo alterado
- `src/pages/Administrativo.tsx`

