

## Plano: Auto-preencher dados do cliente ao selecionar e gerar números automáticos de Cotação/Proposta

### Problema atual
- Os campos de Dados do Cliente já são preenchidos ao selecionar o cliente (linhas 84-94), mas `cotacaoNum` e `propostaNum` ficam vazios e são manuais.
- O campo A/C (Aos Cuidados de) deve permanecer editável manualmente.

### Alterações em `src/components/comercial/PropostaContratacaoModal.tsx`

**1. Gerar números automáticos ao abrir o modal:**
- Ao montar o componente (ou quando `open` muda para `true`), gerar automaticamente:
  - `cotacaoNum`: formato `COT-YYYY-XXX` (ex: `COT-2026-001`) usando timestamp ou contador incremental baseado no tamanho do array de propostas existentes
  - `propostaNum`: formato `PROP-YYYY-XXX` (ex: `PROP-2026-001`) similar
- Usar `useEffect` observando `open` para gerar os números quando o modal abre
- Gerar IDs únicos com `Date.now()` para simular auto-incremento

**2. Tornar campos Cotação Nº e Proposta Nº somente leitura:**
- Adicionar `readOnly` e estilo visual de campo desabilitado (`bg-muted`) nos inputs de `cotacaoNum` e `propostaNum`

**3. Passar contagem de propostas existentes para o modal:**
- Adicionar prop `totalPropostas: number` ao modal para calcular o próximo número sequencial
- No `Comercial.tsx`, passar `propostasContratacao.length` como prop

### Resultado
Ao abrir o modal, Cotação Nº e Proposta Nº já vêm preenchidos automaticamente (sequenciais). Ao selecionar o cliente, todos os campos são preenchidos exceto A/C. Os números simulam um ID de banco de dados.

