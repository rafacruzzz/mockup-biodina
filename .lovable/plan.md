

## Plano: Personalizar cadastro de Fornecedor — Uso e Consumo

### Alterações em `src/components/cadastro/EntidadeModal.tsx`

**1. Nova variável de controle (~linha 68):**
```tsx
const isFornecedorUsoConsumo = tipoEntidade === 'fornecedores_uso_consumo';
```

**2. Aba Dados Gerais:**
- Ocultar "Tipo de Cliente": adicionar `!isFornecedorUsoConsumo` à condição existente (linha 616)
- Renomear "Nome do Cliente" → "Nome do Fornecedor – Uso e Consumo" quando `isFornecedorUsoConsumo`
- Ocultar "Nome do Mantenedor" e "CNPJ do Mantenedor": adicionar `!isFornecedorUsoConsumo` à condição (linha 707)
- Ocultar TIN (já condicionado a `isFornecedorRevenda`, sem alteração)

**3. Aba Endereços:**
- Quando `isFornecedorUsoConsumo`, renderizar apenas 1 bloco: `renderAddressBlock("Endereço", "fat", "faturamento")` — mesmo padrão do Representante Comercial

**4. Aba Dados Bancários:**
- Já suporta múltiplos bancos (sistema `contasBancarias[]`). Sem alteração necessária.

**5. Ocultar aba "Crédito/Restrições":**
- Alterar condição de `!isFornecedorRevenda` para `!isFornecedorRevenda && !isFornecedorUsoConsumo` (linha 510)

**6. Ocultar aba "Boas Práticas":**
- Alterar condição de `isFornecedor` para `isFornecedor && !isFornecedorUsoConsumo` (linha 520)

**7. Ajustar entityLabel:**
- Atualizar a linha 72 para incluir: `isFornecedorUsoConsumo ? "Fornecedor – Uso e Consumo" : ...`

**8. Ajustar grid de tabs:**
- Adicionar condição para `isFornecedorUsoConsumo` retornando grid adequado (menos abas: Dados Gerais, Endereços, Fiscais, Bancários, Documentos, Empresas, Observações = 7 abas)

### Resultado
Fornecedor Uso e Consumo terá formulário simplificado: sem Tipo de Cliente, sem Mantenedor, nome "do Fornecedor – Uso e Consumo", endereço único, sem Crédito/Restrições, sem Boas Práticas, com dados bancários múltiplos.

