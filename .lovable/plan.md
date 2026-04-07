

## Plano: Ajustes no Cadastro de Cliente

### Alterações no arquivo `src/components/cadastro/EntidadeModal.tsx`

#### 1. Campo "Segmento do Cliente" — sempre visível para Clientes
Atualmente o campo "Segmento do Cliente (originado do Lead)" só aparece se o cliente veio de um lead (`editData.segmento_lead` preenchido). Vamos torná-lo um campo editável para todos os clientes:
- Se o cliente veio de lead, o campo vem pré-preenchido com o segmento do lead (somente leitura)
- Se o cliente **não** veio de lead, exibir um Select editável com a mesma lista de segmentos, permitindo escolha manual
- Adicionar `segmento_cliente` ao `formData`

#### 2. Labels de Telefone Fixo
Os labels já foram corrigidos na última alteração. Verificar e confirmar que estão como:
- "Telefone Fixo do Cliente" (linha 805) ✅ já correto
- "Telefone Fixo do Mantenedor" (linha 814) ✅ já correto

**Nenhuma alteração necessária aqui.**

#### 3. Campo "Observações de análise de risco" na aba Observações
Adicionar um novo campo de texto livre na aba "Observações", abaixo de "Observações Gerais":
- Adicionar `observacoes_analise_risco` ao `formData` (inicializado como `""`)
- Renderizar um `Textarea` com label "Observações de Análise de Risco" visível apenas para Clientes (`isCliente`)
- Mesmo estilo do campo "Observações Gerais" (rows=10, placeholder descritivo)

### Detalhes técnicos
- **Arquivo**: `src/components/cadastro/EntidadeModal.tsx`
- Adicionar `segmento_cliente: ""` e `observacoes_analise_risco: ""` ao estado `formData`
- Na aba "Dados Gerais": substituir o bloco condicional atual (linhas 611-625) por lógica que sempre mostra o campo para clientes — editável quando não veio de lead, somente leitura quando veio
- Na aba "Observações": adicionar o novo Textarea após "Observações Gerais", condicional a `isCliente`

