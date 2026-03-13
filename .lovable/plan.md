

## Plano: Integrar Análise Científica completa na aba "AC" da Licitação

### Contexto
Atualmente a aba "AC" tem apenas um campo de texto livre e uma tabela de concorrentes. O usuário quer replicar o quadro de **Análise Científica** (componente `AnaliseCientificaStep`) com as 6 questões predefinidas, cada uma com campo de resposta, status de validação e observações. Após salvar, os dados devem aparecer como **somente-leitura** na aba "Dados Gerais".

### Alterações em `src/components/comercial/OportunidadeAvancadaForm.tsx`

**1. Adicionar campo `analiseCientifica` no `formData`**
- `analiseCientifica: []` — array de objetos com `pergunta`, `resposta`, `statusValidacao`, `observacoes`
- `conclusaoAnaliseCientifica: ''`

**2. Atualizar `renderAnaliseTecnica()`**
- **Manter** o campo "Análise Técnica-Científica" (textarea existente) e a tabela de concorrentes
- **Adicionar** o componente `AnaliseCientificaStep` integrado diretamente (ou replicar a lógica) com as 6 questões:
  1. Identificação dos diferenciais técnicos do produto
  2. Levantamento de concorrentes diretos e indiretos
  3. Avaliação do nível de qualidade
  4. Avaliação do nível de modernidade
  5. Parecer pessoal do assessor científico
  6. Observações gerais
- Cada questão tem: Textarea de resposta, Select de status (Validado/Parcialmente Validado/Não Validado), Textarea de observações
- Resumo visual com contagem por status (círculos coloridos)
- Campo de Conclusão da Análise Científica

**3. Espelhar na aba "Dados Gerais" (somente-leitura)**
- Adicionar seção "Análise Científica (AC)" com cards read-only mostrando cada questão, resposta e status
- Campo de conclusão read-only
- Nota "Editável na aba AC"

### Resultado
A aba AC terá o formulário completo de análise científica editável. Na aba Dados Gerais, os mesmos dados aparecem como somente-leitura para consulta rápida.

