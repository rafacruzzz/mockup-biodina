

## Plano: Criar modal "Nova Proposta DT" com todos os campos e tabela de proposta comercial

### Resumo
Criar um modal completo para cadastro de Propostas DT na aba "Propostas - DT" do módulo Propostas. O modal terá seções: Dados do Cliente, Dados da Empresa (preenchidos automaticamente), Dados Bancários (auto-preenchidos ao selecionar banco), Representante Legal (preenchido automaticamente), Proposta Comercial (tabela com itens + desconto opcional), e campos de texto livre para condições comerciais. A aba DT terá botão "Nova Proposta" e tabela listando propostas criadas.

### Novo componente: `src/components/comercial/PropostaDTModal.tsx`

**Seções do modal (scroll vertical):**

1. **Dados do Cliente:**
   - Cliente (input), Endereço, CNPJ, Inscrição Estadual, Inscrição Municipal, A/C, Cotação Nº, Proposta Nº

2. **Dados da Empresa** (preenchidos automaticamente — mock da empresa atual):
   - Razão Social, Endereço Completo, CNPJ, Inscrição Estadual, Inscrição Municipal, Telefone, E-mail
   - **Nome do Banco**: Select usando `bancosCadastrados` — ao selecionar, preenche automaticamente: Código do Banco, Agência, Conta Corrente
   - Campo adicional: Código de Operação (input)

3. **Dados do Representante Legal** (preenchidos automaticamente — mock):
   - Representante Legal, RG, CPF, Naturalidade, Nacionalidade, Endereço Completo, E-mail, Cargo/Função

4. **Objeto da Proposta:** Textarea

5. **Proposta Comercial** (tabela conforme imagem):
   - Colunas: Especificação/Descrição | Referência/Código | Marca/Fabricante | Qtd. | Valor Unitário | Valor Total (calculado)
   - Botão "Adicionar Item" e remover
   - Linha de **Valor Total** (soma)
   - Linha de **Desconto** — oculta por padrão, com toggle/checkbox "Aplicar desconto?" para mostrar o campo
   - Linha de **Valor Final** (total - desconto)

6. **Declaração:** "A empresa XXXXX declara que:" + Textarea

7. **Campos de texto livre:**
   - Prazo de Validade da Proposta, Pagamento, Prazo de Entrega e/ou Instalação, Garantia, Local de Entrega, Frete e Impostos, Observações

8. **Local, Data, Assinatura:** Campos para local e data (assinatura como texto)

### Alterações em `src/pages/Comercial.tsx`

**1. Substituir placeholder da aba DT (linhas 1443-1458):**
- Botão "Nova Proposta DT" no topo
- Tabela listando propostas criadas (Nº Proposta | Cliente | Data | Valor | Status)
- Estado `propostasDT` (array mock) e `propostaDTModalOpen`

**2. Importar e renderizar `PropostaDTModal`**

### Detalhes técnicos
- Banco: reutilizar `bancosCadastrados` de `src/data/bancosCadastrados.ts`
- Dados da empresa e representante legal: mock hardcoded (como se fosse a empresa logada)
- Desconto: campo com `useState` boolean para visibilidade, renderizado condicionalmente
- Valor Total por item = Qtd × Valor Unitário (calculado automaticamente)

### Resultado
Aba "Propostas - DT" funcional com listagem e modal completo para criação de propostas, incluindo tabela de itens com desconto opcional e todos os campos solicitados.

