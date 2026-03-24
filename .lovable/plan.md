

## Plano: Reformular aba AJ com fluxo de solicitação e resposta jurídica

### Resumo
Substituir o conteúdo atual da aba AJ (Parecer Jurídico, Status, Responsável, Data) por um fluxo de conversa: o colaborador escreve uma questão em campo livre, clica em "Enviar para Análise Jurídica", e a questão fica registrada. Quando o Jurídico responder, a resposta aparece logo abaixo da questão. Múltiplas solicitações podem ser feitas, gerando um histórico de perguntas e respostas.

### Alterações em `src/components/comercial/ContratacaoSimplesForm.tsx`

**1. Novo estado `solicitacoesJuridicas` (~junto dos outros estados):**
- Array de objetos: `{ id: string, questao: string, dataEnvio: string, resposta: string, dataResposta: string }`
- Novo estado `questaoJuridicaAtual: string` para o campo de escrita

**2. Substituir conteúdo da aba AJ (linhas 1521-1572):**
- Card "Solicitação de Análise Jurídica":
  - Textarea para o colaborador escrever a questão
  - Botão "Enviar para Análise Jurídica" (ícone Send) — ao clicar, adiciona ao array `solicitacoesJuridicas`, limpa o campo, exibe toast
- Abaixo, lista o histórico de solicitações (mais recente primeiro):
  - Cada item mostra: questão do colaborador (com data), e abaixo a resposta do jurídico (se houver) ou Badge "Aguardando Resposta"
  - Layout tipo thread/conversa com cards distintos para questão e resposta

**3. Remover campos antigos:**
- `parecerJuridico`, `statusJuridico`, `responsavelJuridico`, `dataAnaliseJuridica` do formData (ou mantê-los para compatibilidade mas não renderizá-los na aba)

### Resultado
A aba AJ funciona como um canal de comunicação: o colaborador envia questões jurídicas e recebe respostas do departamento jurídico, tudo registrado em histórico na mesma aba.

