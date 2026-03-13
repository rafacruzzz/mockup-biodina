

## Plano: Excluir campos da aba Dados Gerais

### Remoções em `OportunidadeAvancadaForm.tsx`

**1. Remover seção "Estratégia e Planejamento" inteira (linhas 1290-1317)**
- Inclui: Estratégia de Participação e Planejamento Comercial

**2. Na seção "Dados Técnicos" (linhas 1319-1437), remover:**
- Termômetro (linhas 1323-1352)
- Checkbox "Proposta em Negociação" (linhas 1428-1436)

**3. Renomear ou remover o header "Dados Técnicos"** (linhas 1320-1321) — a seção restante conterá apenas "Resultado da Licitação", motivos condicionais e "Observação Geral", que podem ficar sem header ou com um nome mais adequado como "Resultado e Observações".

Campos preservados: Resultado da Licitação, Motivo do Ganho/Perda/Fracasso, Observação Geral.

