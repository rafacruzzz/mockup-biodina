

## Plano: Submódulo "Kits" no módulo de Produtos

### Contexto
Adicionar um submódulo "Kits" abaixo de "Uso e Consumo" no módulo Produtos. Inclui uma tabela listando kits cadastrados, botão "Novo Kit", e um modal/formulário de cadastro de kit com slots de componentes dinâmicos.

### Alterações

**1. `src/data/cadastroModules.ts` — Adicionar submódulo `kits` após `uso_consumo`:**
- Novo submódulo `kits` com `name: "Kits"` e `data: []` (array vazio inicial)

**2. Novo componente `src/components/cadastro/KitModal.tsx`:**
- Modal fullscreen (estilo consistente com outros modais do sistema)
- **Seção "Informações do Kit"**: Nome do Kit*, SKU do Kit*, Descrição (textarea), Preço Base R$ (MoneyInput, calculado pelos componentes)
- **Seção "Slots de Componentes"**: 
  - Botão "+ Adicionar Slot" no topo
  - Cada slot é um card numerado e reordenável com:
    - Nome do Slot* (Input), Qtd. Mínima (number), Qtd. Máxima (number)
    - Lista "Produtos disponíveis neste slot" com botão "+ Cadastrar produtos" que abre seletor de produtos existentes
    - Botão de remover slot (ícone lixeira) e expandir/colapsar
  - Produtos selecionados exibidos como chips removíveis dentro do slot
- **Rodapé com resumo**: "X slot(s) configurado(s)" e "Y produto(s) vinculado(s) no total"
- Botão "Criar Kit" / "Salvar Kit" (no modo edição)
- Estado: `{ nome, sku, descricao, precoBase, slots: [{ nome, qtdMinima, qtdMaxima, produtos: [] }] }`

**3. `src/pages/Cadastro.tsx`:**
- Importar `KitModal`
- Novo estado `isKitModalOpen`
- Em `handleNewRecord`: quando `activeModule === 'produtos' && activeSubModule === 'kits'` → abrir KitModal
- Em `getButtonText`: retornar "Novo Kit" para esse submódulo
- Renderizar `<KitModal>` no JSX

**4. Seletor de produtos dentro do slot:**
- Componente inline ou sub-modal simples que lista produtos cadastrados (do `cadastroModules.produtos.subModules.produtos.data`)
- Checkbox para selecionar múltiplos produtos
- Produtos selecionados aparecem como lista/chips no slot

### Resultado
O módulo Produtos terá 3 submódulos: Mercadoria para Revenda, Uso e Consumo, e Kits. O cadastro de Kit permite criar slots com múltiplos produtos cada, com resumo visual no rodapé.

