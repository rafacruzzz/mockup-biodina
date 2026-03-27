

## Plano: Renomear labels de contato e duplicar seções Web/Redes Sociais e Contato Comercial para Lead e Mantenedor

### Resumo
Na aba "Dados Gerais" do cadastro de Leads (EntidadeModal.tsx) e do Comercial (ComercialTabs.tsx), renomear labels de telefones, e-mails e campos conforme solicitado, excluir "Telefone Fixo 3", duplicar WhatsApp/Web/Redes Sociais/Contato Comercial em blocos separados para Lead e Mantenedor.

### Alterações em `src/components/cadastro/EntidadeModal.tsx` (aba Dados Gerais)

**1. Renomear labels:**
- "Tipo do Cliente" → "Tipo de Lead" (linha 347)
- "Nome do Cliente" → "Nome do Lead" (linha 360)
- "Telefone 1" → "Telefone 1 do Lead" (linha 458)
- "Telefone 2" → "Telefone 2 do Lead" (linha 467)
- "Telefone 3" → "Telefone 1 do Mantenedor" (linha 476)
- "Telefone 4" → "Telefone 2 do Mantenedor" (linha 485)
- "Telefone Fixo 1" → "Telefone Fixo 1 do Lead" (linha 500)
- "Telefone Fixo 2" → "Telefone Fixo 2 do Mantenedor" (linha 509)
- Excluir "Telefone Fixo 3" (linhas 517-525) e remover `telefone_fixo3` do formData
- "E-mail 1" → "E-mail 1 do Lead" (linha 548)
- "E-mail 2" → "E-mail 2 do Lead" (linha 558)
- "E-mail 3" → "E-mail 1 do Mantenedor" (linha 569)
- "E-mail 4" → "E-mail 2 do Mantenedor" (linha 579)

**2. WhatsApp — dividir em 2 campos:**
- Renomear "Telefone WhatsApp" → "Telefone WhatsApp do Lead"
- Adicionar novo campo "Telefone WhatsApp do Mantenedor" (`telefone_whatsapp_mantenedor` no formData)

**3. Web e Redes Sociais — duplicar seção:**
- Renomear seção atual para "Web e Redes Sociais do Lead"
- Adicionar nova seção "Web e Redes Sociais do Mantenedor" com campos: `website_mantenedor`, `instagram_mantenedor`, `facebook_mantenedor`, `linkedin_mantenedor`, `x_twitter_mantenedor`

**4. Contato Comercial — duplicar seção:**
- Renomear seção atual para "Contato Comercial do Lead"
- Adicionar nova seção "Contato Comercial do Mantenedor" com campos: `contato_nome_mantenedor`, `contato_cargo_mantenedor`, `contato_telefone_mantenedor`, `contato_email_mantenedor`

**5. Adicionar novos campos ao `formData` inicial:**
- `telefone_whatsapp_mantenedor`, `website_mantenedor`, `instagram_mantenedor`, `facebook_mantenedor`, `linkedin_mantenedor`, `x_twitter_mantenedor`, `contato_nome_mantenedor`, `contato_cargo_mantenedor`, `contato_telefone_mantenedor`, `contato_email_mantenedor`
- Remover `telefone_fixo3`

### Alterações em `src/components/comercial/components/ComercialTabs.tsx` (aba Dados Gerais)

O ComercialTabs tem uma estrutura mais simples (apenas 1 e-mail, 1 telefone, 1 website). Aplicar as mesmas renomeações nos labels equivalentes que existirem nesse arquivo, mantendo consistência com o cadastro.

### Resultado
Todos os campos de contato ficam claramente identificados como pertencentes ao Lead ou ao Mantenedor, com seções separadas para Web/Redes Sociais e Contato Comercial de cada um.

