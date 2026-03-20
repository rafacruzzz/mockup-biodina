

## Plano: Ajustes em Dados do Projeto (segmento read-only, datas de contrato, renovação automática, encerramento)

### Resumo
1. Tornar o campo "Segmento" em Dados do Projeto **read-only**, reproduzindo o segmento que já vem do cadastro do cliente (preenchido ao selecionar cliente ou licitação).
2. Adicionar campos **Data de Início** e **Data de Fim do Contrato** (obrigatórios, exceto Data Fim quando renovação automática).
3. Adicionar toggle **Renovação Automática (Sim/Não)**, campo **Data da Renovação** (livre escrita) e campo calculado **Quantidade de Renovações Automáticas**.
4. Adicionar botão **Encerrar Projeto** com validação gerencial.

### Alterações em `src/components/comercial/ContratacaoSimplesForm.tsx`

**1. formData — novos campos (linhas ~240-268):**
- `dataInicioContrato: ''`, `dataFimContrato: ''`
- `renovacaoAutomatica: false`, `dataRenovacao: ''`, `quantidadeRenovacoes: 0`
- `projetoEncerrado: false`, `dataEncerramento: ''`, `encerramentoValidado: false`

**2. Segmento read-only (linhas 736-751):**
- Substituir o `Select` de segmento por um `Input` disabled que exibe `formData.segmentoProjeto` (já preenchido automaticamente ao selecionar cliente/licitação). Manter o Badge na seção Dados do Cliente.

**3. Novos campos em Dados do Projeto (após segmento/contrato, antes de Aditivos ~linha 762):**
- Grid com **Data de Início do Contrato** (DatePicker, obrigatório) e **Data de Fim do Contrato** (DatePicker, obrigatório apenas se renovação automática = Não)
- Toggle **Renovação Automática** (Switch Sim/Não)
- Se ativado: campo **Data da Renovação** (Input texto livre) e campo read-only **Qtd. de Renovações Automáticas** (contador incrementável via botão "Registrar Renovação", que incrementa o contador e registra a data)

**4. Botão "Encerrar Projeto" (no final da seção Dados do Projeto):**
- Botão vermelho "Encerrar Projeto"
- Ao clicar: toast informando que precisa de validação do gerente comercial, marca `projetoEncerrado: true` (pendente), registra `dataEncerramento`
- Exibe Badge de status "Encerramento Pendente de Validação" ou "Projeto Encerrado" conforme `encerramentoValidado`

### Resultado
Segmento vem do cadastro do cliente (read-only). Datas de contrato são obrigatórias. Renovação automática controla a obrigatoriedade da data fim e conta renovações. Encerramento requer validação gerencial.

