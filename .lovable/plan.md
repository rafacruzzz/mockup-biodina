

## Plano: Editor Rico (Rich Text) no Campo "Resumo do Edital"

### Objetivo
Substituir o campo Textarea simples do "Resumo do Edital" na Licitacao por um editor rico estilo Word, permitindo:
- Digitacao de texto com formatacao basica (negrito, italico, listas)
- Colar e inserir imagens diretamente no campo
- Redimensionar imagens coladas/inseridas
- Manter tudo inline, sem necessidade de storage externo (imagens ficam como base64 no conteudo HTML)

---

### Biblioteca Escolhida: TipTap

TipTap e um editor rico baseado em ProseMirror, leve, modular e com excelente integracao React. Pacotes necessarios:

- `@tiptap/react` - Integracao React
- `@tiptap/starter-kit` - Extensoes basicas (negrito, italico, listas, headings)
- `@tiptap/extension-image` - Suporte a imagens
- `tiptap-extension-resizable-image` - Redimensionamento de imagens

---

### Arquivos a Criar/Modificar

| Arquivo | Acao |
|---------|------|
| `src/components/ui/RichTextEditor.tsx` | **Novo** - Componente reutilizavel de editor rico |
| `src/components/comercial/OportunidadeAvancadaForm.tsx` | Substituir Textarea por RichTextEditor no campo resumoEdital |

---

### Detalhes da Implementacao

#### 1. Componente `RichTextEditor.tsx`

Componente reutilizavel que encapsula o TipTap com:

- **Barra de ferramentas** com botoes para:
  - Negrito, Italico
  - Lista com marcadores, Lista numerada
  - Inserir imagem (via botao de upload)
- **Area de edicao** com suporte a:
  - Colar imagens do clipboard (Ctrl+V de prints)
  - Arrastar e soltar imagens
  - Redimensionar imagens clicando e arrastando
- **Props**:
  - `content: string` (HTML)
  - `onChange: (html: string) => void`
  - `placeholder?: string`
  - `disabled?: boolean`

As imagens coladas serao convertidas para base64 e armazenadas inline no HTML. Isso e adequado para este caso de uso pois o conteudo e textual com imagens pontuais de prints/tabelas.

#### 2. Modificacao do `OportunidadeAvancadaForm.tsx`

Substituir apenas o bloco do campo "Resumo do Edital" (linhas 1089-1098):

**Antes:**
```typescript
<Textarea
  id="resumoEdital"
  value={formData.resumoEdital}
  onChange={(e) => setFormData({ ...formData, resumoEdital: e.target.value })}
  placeholder="Descreva o resumo do edital..."
  className="min-h-[120px] resize-y"
/>
```

**Depois:**
```typescript
<RichTextEditor
  content={formData.resumoEdital}
  onChange={(html) => setFormData({ ...formData, resumoEdital: html })}
  placeholder="Descreva o resumo do edital..."
  disabled={isReadOnlyMode()}
/>
```

O campo `resumoEdital` passara a armazenar HTML em vez de texto puro. Locais que exibem o resumo (como `AnaliseEditaisTab.tsx`) serao atualizados para renderizar HTML com `dangerouslySetInnerHTML`.

#### 3. Atualizacao da exibicao em `AnaliseEditaisTab.tsx`

Onde hoje mostra `<p>{selectedLicitacao.resumoEdital}</p>`, substituir por renderizacao HTML para exibir corretamente o conteudo formatado com imagens.

---

### Resultado Esperado

- Campo "Resumo do Edital" funciona como um mini editor de texto
- Usuario pode digitar texto, formatar (negrito, listas) e colar prints/imagens
- Imagens podem ser redimensionadas dentro do editor
- Componente reutilizavel para outros campos no futuro se necessario
