

## Plano: Personalizar cadastro de Transportadora

### Alterações em `src/components/cadastro/EntidadeModal.tsx`

**1. Nova variável de controle (~linha 73):**
```tsx
const isTransportadora = tipoEntidade === 'transportadoras';
```

**2. Atualizar `entityLabel` (linha 74):**
- Adicionar: `isTransportadora ? "Transportadora" : ...`

**3. Aba Dados Gerais:**
- Ocultar "Tipo de Cliente": adicionar `!isTransportadora` à condição existente
- Renomear "Nome do Cliente" → "Nome da Transportadora" quando `isTransportadora`
- Ocultar "Nome do Mantenedor" e "CNPJ do Mantenedor": adicionar `!isTransportadora` à condição

**4. Aba Endereços:**
- Quando `isTransportadora`, renderizar apenas 1 bloco: `renderAddressBlock("Endereço", "fat", "faturamento")` — mesmo padrão do Representante Comercial e Fornecedor Uso e Consumo/Serviços

**5. Aba Dados Bancários:**
- Já suporta múltiplos bancos. Sem alteração necessária.

**6. Substituir aba "Crédito/Restrições" por "Área atendida/Tabela de preços":**
- Na `TabsList` (linha 513): adicionar `!isTransportadora` à condição para ocultar "Crédito/Restrições"
- Adicionar nova `TabsTrigger` condicional: `{isTransportadora && <TabsTrigger value="area-atendida">Área atendida/Tabela de preços</TabsTrigger>}`
- Adicionar novo `TabsContent value="area-atendida"` com:
  - Campo "Área atendida" (Label + Textarea para livre escrita)

**7. Ajustar `getTabGridCols`:**
- Adicionar condição para `isTransportadora` retornando grid adequado (Dados Gerais, Endereços, Fiscais, Bancários, Área atendida, Documentos, Empresas, Observações = 8 abas → `grid-cols-8`)

### Resultado
Transportadora terá formulário simplificado: sem Tipo de Cliente, sem Mantenedor, nome "da Transportadora", endereço único, dados bancários múltiplos, aba "Área atendida/Tabela de preços" no lugar de "Crédito/Restrições".

