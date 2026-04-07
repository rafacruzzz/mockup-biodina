

## Plano: Adicionar Telefones, E-mails e Redes Sociais ao Representante Comercial

### Problema
Toda a seção de telefones, e-mails, WhatsApp e redes sociais (linhas 774-938) está envolta em `{!isRepresentante && (...)}`, ocultando esses campos para o Representante Comercial.

### Solução
Reorganizar a aba "Dados Gerais" para que o Representante Comercial tenha seus próprios blocos de contato, sem os campos de "Mantenedor" (já que Representante não tem Mantenedor).

### Alterações em `src/components/cadastro/EntidadeModal.tsx`

#### 1. Adicionar bloco de contato exclusivo para Representante
Antes do fechamento da aba "Dados Gerais", adicionar um bloco condicional `{isRepresentante && (...)}` contendo:

- **Telefones**: Telefone 1 e 2 do Representante Comercial (campos `telefone1`, `telefone2`)
- **Telefones Fixos**: Telefone Fixo 1 e 2 do Representante Comercial (campos `telefone_fixo1`, `telefone_fixo2`)
- **WhatsApp**: Telefone WhatsApp do Representante Comercial (campo `telefone_whatsapp`)
- **E-mails**: E-mail 1 e 2 do Representante Comercial (campos `email1`, `email2`)
- **Web e Redes Sociais**: Website, Instagram, Facebook, LinkedIn, X (Twitter) (campos já existentes no formData)

Todos usam os mesmos campos do `formData` já existentes — apenas sem exibir os campos de Mantenedor.

#### Arquivo afetado
- `src/components/cadastro/EntidadeModal.tsx` (apenas aba "Dados Gerais")

