

## Plano: Adicionar seção "Especificações" abaixo de "Instruções de Trabalho" na aba Estrutura e Padrões (Qualidade)

### Contexto
A seção "Especificações" existia no módulo RT (com estrutura de pastas tipo `OrganizacaoDocumentos`) e precisa aparecer também na Qualidade, abaixo de "Instruções de Trabalho". Os dados são alimentados pela Assessoria Científica.

### Alteração em `src/components/administrativo/qualidade/EstruturaEPadroesTab.tsx`

**1. Adicionar dados iniciais para Especificações (no `estruturaInicial`):**
- Nova chave `especificacoes` com pasta inicial: "Especificações de Equipamentos" (subtítulo: "Especificações técnicas detalhadas") — mesma estrutura do RT

**2. Adicionar estado `especPastas`**

**3. Adicionar nova seção após "Instruções de Trabalho":**
- Componente `OrganizacaoDocumentos` com título "Especificações"
- Nota informativa abaixo do título: "As informações desta seção são alimentadas pela Assessoria Científica"

### Arquivo alterado
- `src/components/administrativo/qualidade/EstruturaEPadroesTab.tsx`

