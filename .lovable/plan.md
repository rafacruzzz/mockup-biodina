

## Plano: Remover "Informações da Oportunidade" e adicionar campos de Valor

### Alterações em `src/components/comercial/SolicitarInterfaceamentoModal.tsx`

**1. Remover o card "Informações da Oportunidade" (linhas 214-250):**
- Remover o Card inteiro com Cliente, Oportunidade, Responsável, Status, Segmento
- Remover o `<Separator />` logo abaixo (linha 250)

**2. Adicionar campos "Valor da Instalação" e "Valor da Mensalidade":**
- Adicionar ao `formData`: `valorInstalacao: ''` e `valorMensalidade: ''`
- Inserir dois campos `MoneyInput` (já existe no projeto) na coluna esquerda do formulário, antes ou depois do "Prazo Desejado"
- Labels: "Valor da Instalação *" e "Valor da Mensalidade *"
- Atualizar os resets do form (`handleSave` e `handleClose`) para incluir os novos campos
- Adicionar validação obrigatória para ambos

### Arquivo alterado
- `src/components/comercial/SolicitarInterfaceamentoModal.tsx`

