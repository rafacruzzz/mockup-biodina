

## Plano: Adicionar assinatura digital na aba 6 do Formulário de Notificação de Ação de Campo

### O que será feito

Na aba "6. Observações e Assinatura" do formulário, adicionar um campo de assinatura digital usando o componente `AssinaturaPad` já existente no projeto. O usuário poderá desenhar sua assinatura após preencher Local, Data e Nome Legível.

### Arquivos a modificar

1. **`src/types/acaoCampo.ts`** — Adicionar campo opcional `assinaturaDigitalBase64?: string` na interface `NotificacaoAcaoCampoData`, após o campo `nomeLegivel`

2. **`src/components/administrativo/qualidade/NotificacaoAcaoCampoForm.tsx`**
   - Importar `AssinaturaPad` de `@/components/ui/assinatura-pad`
   - Na aba 6 (`TabsContent value="aba6"`), após os campos Local/Data/Nome Legível, adicionar:
     - Seção "Assinatura Digital" com o componente `AssinaturaPad`
     - Ao assinar, salva o base64 no estado `dados.assinaturaDigitalBase64`
     - Se já existir assinatura, exibir preview da imagem com botão para refazer
   - Atualizar `defaultData` incluindo `assinaturaDigitalBase64: ''`

