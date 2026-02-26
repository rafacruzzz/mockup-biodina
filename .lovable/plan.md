

## Plano: Corrigir campos do formulário Field Action Effectiveness Data Sheet

### Arquivos a modificar

1. **`src/types/acaoCampo.ts`** — Substituir `FieldActionEffectivenessData` pelos campos corretos:
   - `product: string` (Texto livre)
   - `accountNumberOrName: string` (Texto livre)
   - `submissionDate: string` (Data)
   - `reminder1SentDate: string` (Data)
   - `reminder2SentDate: string` (Data)
   - `recallResponseFormReceived: boolean`
   - `newOsVersionInstalled: boolean`
   - `stateVersion: string` (Texto livre)
   - `remarks: string` (Texto livre)
   - Manter `pdfGerado?` e `dataPdfGerado?`

2. **`src/components/administrativo/qualidade/FieldActionEffectivenessForm.tsx`** — Reescrever o formulário com 4 seções visuais:
   - **Seção 1: Subsidiary/Distributor Entry** — campos Product e Account number or name
     - **Subseção: Advisory Letter to Customer** — campos Submission Date, Reminder 1 Sent Date, Reminder 2 Sent Date (inputs tipo date)
   - **Seção 2: Customer Response** — checkboxes para Recall Response Form received e New OS version installed, campo condicional State version (aparece se "New OS version" = Sim)
   - **Seção 4: Remarks** — textarea para Remarks
   - Botões Cancelar / Salvar

3. Atualizar validação: Product obrigatório

