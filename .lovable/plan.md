

## Plano: Condicionar aba Empenho ao segmento "público" e adicionar cliente público para teste

### Resumo
A aba "Empenho" e seu TabsTrigger só serão renderizados se o `formData.segmentoProjeto` contiver a palavra "público" (case-insensitive). Além disso, será adicionado um cliente mock com segmento público para permitir testar a funcionalidade.

### Alterações em `src/components/comercial/ContratacaoSimplesForm.tsx`

**1. Adicionar cliente com segmento público ao array `clientesCadastrados` (~linha 303):**
- Exemplo: `{ id: 'cli-006', cpfCnpj: '99.888.777/0001-55', nomeFantasia: 'Hospital Municipal São José', razaoSocial: 'Prefeitura Municipal - Hospital São José', endereco: 'Av. Central, 500', uf: 'GO', email: 'hospital@saojose.gov.br', telefone: '(62) 3333-4444', segmento: 'PÚBLICO - HOSPITAL - MUNICIPAL' }`

**2. Criar variável derivada para controle de visibilidade:**
- `const isSegmentoPublico = formData.segmentoProjeto?.toLowerCase().includes('público') || formData.segmentoProjeto?.toLowerCase().includes('publico');`

**3. Condicionar TabsTrigger "Empenho" (~linha 622):**
- Envolver com `{isSegmentoPublico && (<TabsTrigger value="empenho">...</TabsTrigger>)}`

**4. Condicionar TabsContent "Empenho" (~linha 1274):**
- Envolver com `{isSegmentoPublico && (<TabsContent value="empenho">...</TabsContent>)}`

### Resultado
A aba Empenho só aparece quando o cliente selecionado tem segmento público. O cliente "Hospital Municipal São José" permite testar essa funcionalidade.

