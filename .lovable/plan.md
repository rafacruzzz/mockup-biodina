

## Plano: Botão "Gerar Link Externo" na seção Representação Comercial

### Arquivo a modificar

**`src/components/comercial/ContratacaoSimplesForm.tsx`**

1. Adicionar estado `linkExternoRepresentacao` (string, inicialmente vazio)
2. Na seção "Representação Comercial" (Card, linha ~1134), antes dos campos existentes, adicionar:
   - Botão **"Gerar Link Externo"** com ícone de link externo
   - Ao clicar, gera um link aleatório usando `window.location.origin + '/representacao/' + crypto.randomUUID().slice(0,8)` e salva no estado
   - Abaixo do botão, quando o link existir, exibir o link em texto com botão "Copiar" ao lado
   - Toast de sucesso ao copiar
3. Adicionar texto explicativo pequeno: "Envie este link para o representante preencher as informações"
4. Os campos existentes (Representante, Comissão, Histórico) permanecem inalterados

