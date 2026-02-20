

## Plano: Bloquear Valor do Contrato e Criar Sistema de Aditivos com Historico

### 1. Bloquear o campo "Valor do Negocio"

O campo "Valor do Negocio" na aba "Dados do Projeto" da Contratacao sera tornado **somente leitura** (disabled), com estilo visual de campo bloqueado (fundo cinza). O valor vem da licitacao vinculada ou e definido na criacao e nao pode ser alterado diretamente.

Para alterar o valor, o usuario precisara criar um **aditivo de valor**.

### 2. Criar sistema de Aditivos Contratuais com historico

Sera adicionada uma secao "Aditivos Contratuais" abaixo do campo "Valor do Negocio" (ou na mesma area de Dados do Projeto), contendo:

**Botao "Novo Aditivo"** que abre um modal com os seguintes campos obrigatorios:
- **Tipo do Aditivo**: select com opcoes (Acrescimo de Valor, Supressao de Valor, Prorrogacao de Prazo, Outros)
- **Valor do Aditivo**: campo numerico (positivo para acrescimo, negativo para supressao)
- **Justificativa**: textarea com minimo de 50 caracteres
- **Selecao de Empresa**: dropdown obrigatorio quando houver mais de 1 empresa participante (lista Empresa 1 e Empresa 2 com nome e CNPJ)
- **Documento do Aditivo**: upload obrigatorio de arquivo PDF/DOC

**Historico de Aditivos**: lista/tabela abaixo do botao mostrando todos os aditivos ja registrados, com:
- Data do aditivo
- Tipo
- Valor
- Empresa vinculada (nome e CNPJ)
- Justificativa
- Nome do documento anexado
- Usuario que registrou

**Valor atualizado**: O valor total do contrato sera recalculado automaticamente somando o valor original + todos os aditivos de valor, exibido como "Valor Atualizado" ao lado do "Valor Original".

### Detalhes Tecnicos

**Arquivo a modificar:** `src/components/comercial/ContratacaoSimplesForm.tsx`

**Escopo:** Apenas a aba que contem "Dados do Projeto" (aba "geral") - nenhuma outra aba sera alterada.

**Mudancas especificas:**

1. Adicionar `disabled` e classes visuais de bloqueio ao Input de `valorNegocio` (linha ~785-791)
2. Criar interface `AditivoContrato` com campos: id, tipo, valor, justificativa, empresaId, empresaNome, empresaCNPJ, documentoNome, documentoUrl, criadoPor, criadoEm
3. Adicionar estado `aditivos: AditivoContrato[]` e `modalNovoAditivoOpen`
4. Criar modal "Novo Aditivo" com formulario completo incluindo:
   - Select de tipo
   - Input de valor
   - Textarea de justificativa (validacao min 50 chars)
   - Select de empresa (visivel apenas quando ha 2 empresas)
   - Upload de documento (obrigatorio)
5. Ao confirmar aditivo, adicionar ao array de historico e atualizar o documento na aba Documentos
6. Exibir historico de aditivos em uma mini-tabela com todas as informacoes
7. Mostrar "Valor Original" bloqueado + "Valor Atualizado" calculado (original + soma dos aditivos)
