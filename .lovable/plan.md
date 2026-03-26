

## Plano: Adicionar assinatura eletrônica do Representante Legal nos modais de Proposta

### Problema
Atualmente a seção "Local, Data e Assinatura" mostra apenas texto estático com nome/cargo. A assinatura precisa ser eletrônica (canvas para desenhar) e feita pelo Representante Legal que está elaborando a proposta.

### Alterações nos 3 arquivos: `PropostaContratacaoModal.tsx`, `PropostaDTModal.tsx`, `PropostaLicitacaoModal.tsx`

**1. Novo estado para armazenar a assinatura:**
- `assinaturaRepresentante` (string base64, inicialmente vazio)
- `assinado` (boolean)

**2. Substituir a área estática de assinatura por:**
- Campo "Nome do Representante Legal" (input, pré-preenchido com `repNome`)
- Campo "Cargo" (input, pré-preenchido com `repCargo`)
- Nome da empresa (texto, vem do `dadosEmpresa.razaoSocial`)
- Canvas para assinatura eletrônica (desenho à mão) com botões "Limpar" e "Confirmar Assinatura"
- Após confirmar, exibir a imagem da assinatura salva com indicação visual de "Assinado"

**3. Lógica do canvas:**
- Reutilizar a mesma lógica de canvas já existente no `AssinaturaPad` / `AssinaturaDigital` (mousedown/move/up, touchstart/move/end)
- Ao clicar "Confirmar", salvar o `toDataURL()` no estado
- Mostrar preview da assinatura confirmada

### Resultado
A seção de assinatura terá um canvas onde o Representante Legal desenha sua assinatura eletronicamente, com nome, cargo e empresa exibidos abaixo, igual ao print de referência mas com a adição do pad eletrônico.

