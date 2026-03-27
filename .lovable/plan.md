

## Plano: Habilitar edição de Lead no Cadastro e no Comercial

### Problema
1. O `DataTable` dispara evento `editItem` ao clicar no botão editar, mas `handleEditItem` no `Cadastro.tsx` só trata `usuarios/colaboradores` — ignora `pessoas` (leads, clientes, etc.)
2. O `EntidadeModal` não aceita prop de dados existentes (`editData`) para pré-preencher os campos
3. No `Comercial.tsx`, o lead modal também não suporta edição
4. O botão "Converter em Cliente" deve aparecer apenas na edição, não ao criar novo lead

### Alterações

**1. `src/components/cadastro/EntidadeModal.tsx`**
- Adicionar prop `editData?: any` na interface
- No `useEffect`, se `editData` existir, pré-preencher `formData` com os dados do registro, incluindo `contasBancarias` se houver
- O botão "Converter em Cliente" só aparece quando `editData` está presente (modo edição)
- Alterar título do modal: "Editar [Lead/Cliente/...]" quando `editData` existe, "Novo [Lead/Cliente/...]" quando não

**2. `src/pages/Cadastro.tsx`**
- Adicionar estado `editingEntidadeData` (null ou objeto com dados do item)
- No `handleEditItem`, adicionar caso para `activeModule === 'pessoas'`: setar `editingEntidadeData` com o item, setar `currentEntidadeType` com o `activeSubModule`, e abrir o modal
- Passar `editData={editingEntidadeData}` ao `EntidadeModal`
- No `onClose`, limpar `editingEntidadeData`

**3. `src/pages/Comercial.tsx`**
- Na tabela de leads, ao clicar no botão editar de uma linha, setar estado `editingLeadData` com os dados do lead e abrir o modal
- Passar `editData={editingLeadData}` ao `EntidadeModal`
- No `onClose`, limpar `editingLeadData`

### Resultado
- Clicar no ícone de editar em qualquer lead (Cadastro ou Comercial) abre o `EntidadeModal` com os dados pré-preenchidos
- O botão "Converter em Cliente" aparece apenas no modo edição
- Criar novo lead continua funcionando normalmente (modal vazio)

