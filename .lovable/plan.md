

## Plano: Reformular aba AG com fluxo de solicitação e resposta gerencial

### Resumo
Aplicar o mesmo padrão da aba AJ: substituir os campos estáticos (Parecer, Aprovação, Responsável, Data) por um fluxo de comunicação onde o colaborador escreve uma questão, envia para a Diretoria, e recebe a resposta em formato de histórico/thread.

### Alterações em `src/components/comercial/ContratacaoSimplesForm.tsx`

**1. Novos estados (~junto dos outros estados):**
- `solicitacoesGerenciais`: array de `{ id, questao, dataEnvio, resposta, dataResposta }`
- `questaoGerencialAtual`: string para o campo de escrita

**2. Substituir conteúdo da aba AG (linhas 1604-1655):**
- Card "Solicitação de Análise Gerencial":
  - Textarea para o colaborador escrever a questão
  - Botão "Enviar para Análise Gerencial" (ícone Send) — ao clicar, adiciona ao array, limpa o campo, exibe toast
- Histórico de solicitações (mais recente primeiro):
  - Cada item mostra: questão do colaborador (com data) e resposta da Diretoria (ou Badge "Aguardando Resposta")
  - Layout idêntico ao da aba AJ

**3. Campos antigos** (`parecerGerencial`, `aprovacaoGerencial`, `responsavelGerencial`, `dataAnaliseGerencial`) mantidos no formData para compatibilidade, mas não renderizados.

### Resultado
A aba AG funciona como canal de comunicação com a Diretoria, no mesmo padrão da aba AJ.

