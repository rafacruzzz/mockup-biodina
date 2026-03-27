

## Plano: Personalizar cadastro de Fornecedor — Mercadoria para Revenda

### Contexto
O tipo `fornecedores_revenda` já é detectado por `isFornecedor = tipoEntidade.startsWith('fornecedores_')`. Precisamos criar `const isFornecedorRevenda = tipoEntidade === 'fornecedores_revenda'` para customizações específicas.

### Alterações em `src/components/cadastro/EntidadeModal.tsx`

---

**1. Variável de controle (junto às existentes, ~linha 41):**
```tsx
const isFornecedorRevenda = tipoEntidade === 'fornecedores_revenda';
```

---

**2. Aba Dados Gerais — campos condicionais para `isFornecedorRevenda`:**
- Ocultar "Tipo de Cliente/Lead" quando `isFornecedorRevenda` (adicionar à condição existente `!isRepresentante`)
- Renomear "Nome do Cliente" → "Nome da Unidade Fabril" quando `isFornecedorRevenda`
- Renomear "Nome do Mantenedor" → "Nome do Fabricante Legal/Marca" quando `isFornecedorRevenda`
- Renomear "CNPJ do Mantenedor" → mantém (ou podemos renomear se necessário)
- Acrescentar campo "TIN (Tax Id Number)" após CNPJ, visível quando `isFornecedorRevenda`
- Adicionar `tin_tax_id: ""` no `formData` inicial

---

**3. Aba Endereços — 4 blocos específicos para `isFornecedorRevenda`:**
Quando `isFornecedorRevenda`, substituir toda a lógica de endereços por 4 blocos:
- "Endereço de Faturamento" (campos `fat_*` existentes)
- "Endereço da Unidade Fabril" (novos campos `fabril_*`)
- "Endereço do Fabricante Legal" (reusa campos `mant_fat_*`)
- "Endereço da Coleta da Mercadoria" (novos campos `coleta_*`)

Novos campos no `formData`: `fabril_cep`, `fabril_endereco`, `fabril_numero`, `fabril_complemento`, `fabril_cidade`, `fabril_estado`, `fabril_uf`, `fabril_pais` e `coleta_cep`, `coleta_endereco`, `coleta_numero`, `coleta_complemento`, `coleta_cidade`, `coleta_estado`, `coleta_uf`, `coleta_pais`

Adicionar suporte a CEP lookup para os novos prefixos `fabril` e `coleta`.

---

**4. Aba Dados Bancários — campos internacionais para `isFornecedorRevenda`:**
Expandir a interface `ContaBancaria` e o estado para incluir campos internacionais condicionais:
- Adicionar ao tipo: `bank`, `branch`, `account_number`, `iban`, `swift_code`, `beneficiary`, `moeda`, `pais_origem`, `cidade_banco`
- Quando `isFornecedorRevenda`, renderizar esses campos adicionais dentro de cada bloco de banco (inputs de livre escrita)
- Os campos nacionais existentes (Chave PIX, Agência, Conta) continuam aparecendo para outros tipos

---

**5. Ocultar aba "Crédito/Restrições" para `isFornecedorRevenda`:**
- Na `TabsList`: `{!isFornecedorRevenda && <TabsTrigger value="credito">...`
- O `TabsContent` de crédito já renderiza independentemente, mas pode ser envolvido com a mesma condição

---

**6. Nova aba "Linhas" (após Documentos, apenas `isFornecedorRevenda`):**
- `TabsTrigger` condicional
- Conteúdo: lista dinâmica de linhas (array `linhas: string[]` no estado)
- Botão "+ Adicionar Linha", cada linha é um input de texto com botão de remover
- Estado vazio: "Nenhuma linha cadastrada. Clique em 'Adicionar Linha' para começar." (conforme print)
- Botões "Cancelar" e "Salvar Marca" no layout (conforme print)

---

**7. Nova aba "ISO" (após Boas Práticas, apenas `isFornecedorRevenda`):**
- `TabsTrigger` condicional
- Estado: `isosVinculadas: Array<{ id, fabrica, vencimento, status, observacao, arquivoISO, arquivoTraducao }>`
- Layout em tabela com colunas: Fábrica | Vencimento das ISOs | Status | Observação | Anexar ISO | Anexar tradução juramentada
- Botão "+ Adicionar ISO"
- Status calculado automaticamente: "Válida", "Vencendo em 5 meses", "Vencida"
- Alerta visual (banner amarelo/vermelho) quando faltam 5 meses para vencimento, com mensagem para pedir renovação
- Alerta desaparece (para de avisar semanalmente) quando o arquivo ISO é anexado

---

**8. Ajuste na aba "Boas Práticas" — alertas de vencimento:**
- O sistema já tem `getAlertaVencimento`. Ajustar para incluir regra de 1 ano (aviso por 1 semana) e 6 meses (aviso por 1 semana) de antecedência
- Adicionar banner informativo na aba explicando que o certificado e validade vêm do Regulatório

---

**9. Ajustar `TabsList` grid:**
- Para `isFornecedorRevenda`, calcular o número correto de abas visíveis (Dados Gerais, Endereços, Fiscais, Bancários, Documentos, Linhas, Boas Práticas, ISO, Empresas, Observações = 10 abas)
- Usar `grid-cols-10` ou `flex flex-wrap` para acomodar

---

### Resumo das abas para Fornecedor Revenda
Dados Gerais | Endereços | Dados Fiscais | Dados Bancários | Documentos | Linhas | Boas Práticas | ISO | Empresas | Observações

(Sem "Crédito/Restrições")

