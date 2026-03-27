

## Plano: Personalizar cadastro de Representante Comercial

### Contexto
O `tipoEntidade === 'representantes'` já é reconhecido pelo modal (`getTipoLabel` retorna "Representante Comercial"). Porém, o formulário atual mostra todos os campos genéricos (Tipo de Cliente, Nome do Mantenedor, etc.) sem customização específica para representantes.

### Alterações em `src/components/cadastro/EntidadeModal.tsx`

**1. Variável de controle:**
```tsx
const isRepresentante = tipoEntidade === 'representantes';
```

**2. Aba Dados Gerais — ocultar/renomear campos para representantes:**
- Ocultar campo "Tipo de Cliente/Lead" quando `isRepresentante` (`{!isRepresentante && <div>...</div>}`)
- Alterar label "Nome do Cliente/Lead" para "Nome do Representante Comercial" quando `isRepresentante`
  - Ajustar a lógica: `isRepresentante ? "Representante Comercial" : entityLabel`
- Ocultar campos "Nome do Mantenedor" e "CNPJ do Mantenedor" quando `isRepresentante`

**3. Aba Endereços — simplificar para representantes:**
- Quando `isRepresentante`, mostrar apenas 1 bloco de endereço com header "Endereço" (sem "Faturamento/Entrega")
- Usar os campos `fat_*` como o endereço único
- Ocultar o bloco de Entrega e os blocos do Mantenedor

**4. Aba Dados Bancários — já suporta múltiplos bancos:**
- Nenhuma alteração necessária (o sistema de `contasBancarias[]` com botão "Adicionar Banco" já existe)

**5. Nova aba "Comissão" após "Crédito/Restrições":**
- Adicionar `TabsTrigger` condicional: `{isRepresentante && <TabsTrigger value="comissao">Comissão</TabsTrigger>}`
- Ajustar `grid-cols` na TabsList para acomodar a aba extra quando representante
- Conteúdo da aba:
  - Input "Percentual de Comissão Padrão (%)" (number, step 0.01)
  - Texto informativo: "Este percentual é o valor padrão e pode variar em cada venda."
  - Novo campo no `formData`: `percentual_comissao_padrao: 0`

### Resultado
- Representante Comercial terá formulário simplificado: sem Tipo de Cliente, sem Mantenedor, com nome "do Representante Comercial"
- Endereço único sem subdivisão Faturamento/Entrega
- Dados Bancários múltiplos (já funciona)
- Nova aba "Comissão" com percentual padrão editável

