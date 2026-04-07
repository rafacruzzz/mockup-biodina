

## Plano: Ajustes no Cadastro de Transportadora

### Campos de Mantenedor
Os campos de Mantenedor (telefones, e-mails, redes sociais, contato comercial) já estão ocultos para Transportadora — a condição `!isTransportadora` na linha 738 já exclui todo o bloco. **Nenhuma alteração necessária.**

### Alteração necessária

**Arquivo: `src/components/cadastro/EntidadeModal.tsx`**

#### Renomear aba (linha 527)
- Trocar `Área atendida/Tabela de preços` por `Área atendida`

#### Atualizar placeholder (linha 1354)
- Trocar `"Descreva a área atendida pela transportadora e tabelas de preços..."` por `"Descreva a área atendida pela transportadora..."`

