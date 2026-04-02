

## Plano: Remover campo "Análises Científicas" condicional

### Problema
Ao clicar em "Solicitar Análise da Assessoria Científica", aparece um bloco "Análises Científicas" (read-only) abaixo do botão. O campo "Análise Técnica" já está logo abaixo e cumpre esse papel, então o bloco condicional é desnecessário.

### Alteração em `src/components/comercial/OportunidadeAvancadaForm.tsx`

**Remover o bloco condicional das linhas 848-873** — todo o trecho `{solicitouAnaliseCientifica && (...)}` que exibe "Análises Científicas" com o histórico de cards. O botão continua funcionando normalmente (envia a solicitação e muda para "✓ Análise Científica Solicitada"), apenas não exibe mais esse campo extra.

### Arquivo alterado
- `src/components/comercial/OportunidadeAvancadaForm.tsx`

