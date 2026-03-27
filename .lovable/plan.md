

## Plano: Substituir `window.confirm` por modal customizado na conversão de Lead

### Problema
O botão "Converter em Cliente" usa `window.confirm()` nativo do navegador, que é visualmente inconsistente com o sistema.

### Alterações em `src/components/cadastro/EntidadeModal.tsx`

**1. Adicionar estado para controlar o modal de confirmação:**
- `const [showConvertConfirm, setShowConvertConfirm] = useState(false)`

**2. Alterar o onClick do botão "Converter em Cliente":**
- Em vez de `window.confirm(...)`, chamar `setShowConvertConfirm(true)`

**3. Adicionar um Dialog de confirmação customizado dentro do componente:**
- Usar `Dialog/DialogContent/DialogHeader/DialogTitle/DialogFooter` do shadcn
- Ícone `AlertTriangle` amarelo + título "Confirmar Conversão"
- Mensagem: "Deseja converter este Lead em Cliente? O cadastro será movido para a lista de Clientes."
- Botão "Cancelar" (outline) e "Confirmar" (verde)
- No confirmar: chamar `onConvertToClient({ ...formData, contasBancarias })`, fechar modal de confirmação e fechar o EntidadeModal

### Resultado
A confirmação aparecerá como um modal elegante dentro do sistema, consistente com os outros modais de confirmação do projeto.

