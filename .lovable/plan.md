

## Plano: Auto-preencher cliente e gerar números automáticos no modal Proposta DT

### Problema
O modal Proposta DT não gera automaticamente os números de Cotação e Proposta ao abrir, diferente do modal Contratação que já faz isso.

### Alterações

**1. `src/components/comercial/PropostaDTModal.tsx`:**
- Adicionar prop `totalPropostas?: number` na interface `PropostaDTModalProps`
- Adicionar `useEffect` que gera `COT-YYYY-XXX` e `PROP-YYYY-XXX` ao abrir o modal (mesmo padrão do Contratação)
- Tornar inputs de cotacaoNum e propostaNum readOnly com `bg-muted`
- Importar `useEffect` do React

**2. `src/pages/Comercial.tsx`:**
- Passar `totalPropostas={propostasDT.length}` como prop ao `PropostaDTModal`

### Detalhes
- O `handleClienteChange` já auto-preenche os campos do cliente (endereço, CNPJ, IE, IM) exceto A/C — isso já funciona
- Apenas os números automáticos e os inputs readOnly precisam ser adicionados

