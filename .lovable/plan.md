

## Plano: Campo de Empenho no início do Pedido com alertas

### Resumo
Mover e reformular o card "Documento do Empenho" para o **topo** da aba Geral do PedidoModal, antes de "Informações do Pedido". Adicionar campo para informar o número do empenho, campo para anexar o documento, e alerta visual persistente quando não houver empenho vinculado.

### Alterações em `src/components/comercial/PedidoModal.tsx`

**1. Novos estados:**
- `numeroEmpenho: string` — número do empenho vinculado
- `documentoEmpenho: File | null` — arquivo anexado
- `nomeDocumentoEmpenho: string` — nome do arquivo

**2. Substituir o card atual de Empenho (linhas 487-508) por novo card no TOPO da aba Geral (antes de "Informações do Pedido", linha 368):**

- **Alerta** (Alert destructive): Se não houver empenho vinculado (`!numeroEmpenho`), exibir alerta vermelho permanente: "Este pedido não possui empenho vinculado. Solicite o empenho à administração pública."
- **Alerta secundário**: Se houver empenho mas sem documento anexado, alerta amarelo: "Documento do empenho não anexado."
- **Card "Empenho Vinculado"**:
  - Input para Nº do Empenho
  - Campo de upload para anexar documento do empenho (PDF/DOC)
  - Nota: "Este documento será replicado automaticamente na aba Empenho da contratação"
  - Se já houver documento (vindo da aba Empenho), exibir read-only com botão de download

**3. Remover o card antigo** (linhas 487-508) que ficava no final da aba Geral.

### Resultado
Ao abrir um pedido, o primeiro elemento visível é o campo de empenho com alerta vermelho caso não esteja preenchido, garantindo que o colaborador sempre veja e cobre o empenho.

