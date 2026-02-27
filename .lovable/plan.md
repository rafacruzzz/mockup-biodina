

## Plano: Corrigir botão "Nova Conta Recorrente" sem onClick

### Problema
O botão "Nova Conta Recorrente" dentro do `PagamentosRecorrentesModal` (linha 62-65) não tem nenhum `onClick` handler. A prop `onNovaContaRecorrente` está definida na interface mas nunca é desestruturada nem usada.

### Arquivos a modificar

1. **`src/components/financeiro/PagamentosRecorrentesModal.tsx`**
   - Desestruturar `onNovaContaRecorrente` das props
   - Adicionar `onClick={onNovaContaRecorrente}` no botão "Nova Conta Recorrente"

2. **`src/components/financeiro/APagarPagosView.tsx`**
   - Passar `onNovaContaRecorrente` como prop ao `PagamentosRecorrentesModal`, abrindo o `NovaContaRecorrenteModal` (setShowNovaRecorrenteModal(true))

