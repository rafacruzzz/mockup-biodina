

## Plano: Endereços Lead/Mantenedor, Dados Bancários múltiplos e botão Converter Lead em Cliente

### 1. Aba Endereços — Separar por Lead e Mantenedor

Atualmente existem 2 blocos: "Endereço de Faturamento" e "Endereço de Entrega". Quando `tipoEntidade === "leads"`, duplicar para 4 blocos:

- **Endereço de Faturamento do Lead** (campos atuais `fat_*`)
- **Endereço de Entrega do Lead** (campos atuais `ent_*`)
- **Endereço de Faturamento do Mantenedor** (novos campos `mant_fat_*`)
- **Endereço de Entrega do Mantenedor** (novos campos `mant_ent_*`)

Adicionar 16 novos campos ao `formData`: `mant_fat_endereco`, `mant_fat_numero`, `mant_fat_complemento`, `mant_fat_cidade`, `mant_fat_estado`, `mant_fat_cep`, `mant_fat_uf`, `mant_fat_pais`, e os mesmos com prefixo `mant_ent_*`. Cada bloco de CEP terá lookup via `handleCepLookup` com novos tipos.

Para entidades que não são leads, a aba permanece como está (2 blocos).

### 2. Aba Dados Bancários — Suporte a múltiplos bancos

Substituir os campos fixos por um array `contas_bancarias` no estado, com botão "Adicionar Banco". Cada conta terá: banco, codigo_banco, agencia, conta, chave_pix, nome_beneficiario. Interface:

- Lista de cards, cada um com os 6 campos + botão Remover
- Botão "+ Adicionar Banco" no final
- Mínimo 1 conta exibida por padrão

Remover os campos avulsos `banco`, `codigo_banco`, `agencia`, `conta`, `chave_pix`, `nome_beneficiario` do formData e usar `useState<ContaBancaria[]>` separado.

### 3. Botão "Transformar Lead em Cliente"

Adicionar no footer do modal (ao lado dos botões existentes), visível apenas quando `tipoEntidade === "leads"`:

- Botão com ícone e texto "Converter em Cliente"
- Ao clicar, exibe confirmação (toast ou dialog simples)
- Chama `onClose()` e dispara callback para mover o registro do submódulo "leads" para "clientes" no `modulesConfig`

Adicionar nova prop opcional `onConvertToClient?: (formData) => void` na interface do modal.

### Arquivos alterados

- `src/components/cadastro/EntidadeModal.tsx` — todas as 3 alterações acima

