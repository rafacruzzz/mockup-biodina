

## Plano: Reestruturar Auditorias da Qualidade — Parte 1.1 (Auditoria Externa)

### Contexto
O formulário atual de Auditorias será dividido em duas partes. Esta alteração trata da **Auditoria da Qualidade Externa** com as seguintes mudanças no formulário de registro:

### Alterações em `src/components/administrativo/qualidade/AuditoriaQualidadeForm.tsx`

**1. Renomear título e estrutura geral:**
- Título principal: "Auditorias da Qualidade — Externa"
- Botão: "Nova Auditoria Externa"

**2. Reordenar campos do formulário (de cima para baixo):**
- a) Data da Auditoria + Auditor Responsável (mantém como está)
- b) Pontos Críticos — **sem** o Select de "Aprovado/Reaprovado"; apenas Input de texto + botão adicionar. A tabela mostra só descrição + botão remover (sem coluna Status)
- c) Oportunidades de Melhorias — campo Textarea para texto livre
- d) Anexar Arquivo — input type="file" para upload
- e) Resultado Geral — Select "Aprovado/Reprovado" movido para cá (era o item "a" original, agora fica no final)

**3. Atualizar estado do formulário:**
- Adicionar `oportunidadesMelhorias: string` e `arquivo: File | null` ao `formData`
- Remover `status` do `novoPonto` (pontos críticos agora são só texto)

**4. Atualizar tabela do Histórico:**
- Coluna "Pontos Críticos" sem badges de status — exibir apenas lista de descrições
- Adicionar coluna "Oportunidades de Melhorias" (texto resumido)

**5. Atualizar tipos em `src/types/qualidade.ts`:**
- `PontoCritico`: tornar `status` opcional (para manter compatibilidade)
- `AuditoriaQualidade`: adicionar `oportunidadesMelhorias?: string` e `arquivo?: string`

### Arquivos alterados
- `src/types/qualidade.ts`
- `src/components/administrativo/qualidade/AuditoriaQualidadeForm.tsx`

