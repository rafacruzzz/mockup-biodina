

## Plano: Busca por palavra nas seções + Mover "Especificações" para Qualidade

### Parte 1: Adicionar campo de busca nas seções Lista Mestra, Documentação e Treinamentos

**Em `src/components/administrativo/rt/DocumentacaoTab.tsx`:**
- Adicionar 3 estados de busca: `buscaListaMestra`, `buscaDocumentacao`, `buscaTreinamentos`
- Passar a prop `searchTerm` para `ListaMestraSection`, seção Documentação e `TreinamentosSection`

**Em `src/components/administrativo/rt/ListaMestraSection.tsx`:**
- Receber prop `searchTerm`
- Renderizar um `Input` com icone de `Search` acima do conteúdo, dentro do header "Lista Mestra"
- Filtrar os itens da lista mestra (por titulo) e as pastas (por nome/subtitulo) com base no termo

**Em `src/components/administrativo/rt/OrganizacaoDocumentos.tsx`:**
- Receber prop opcional `searchTerm`
- Quando presente, filtrar pastas cujo `nome`, `subtitulo` ou `codigo` contenham o termo (case-insensitive)
- Auto-expandir pastas que contenham resultados

**Em `src/components/administrativo/rt/TreinamentosSection.tsx`:**
- Receber prop `searchTerm`
- Renderizar `Input` de busca no header
- Filtrar treinamentos realizados e futuros por nome/responsável/tema

**Abordagem alternativa (mais simples):** Em vez de passar props para baixo, colocar o campo de busca diretamente em cada seção (`ListaMestraSection`, a div de Documentação, `TreinamentosSection`) com estado local. Isso é mais limpo e independente.

### Parte 2: Retirar "Especificações" do RT e garantir que está no módulo Qualidade

**Em `src/components/administrativo/rt/DocumentacaoTab.tsx`:**
- Remover o bloco de `OrganizacaoDocumentos` com titulo "Especificações" (linhas 71-76)
- Remover referência a `especDoc` (linha 48)

**No módulo Qualidade (`EstruturaEPadroesTab.tsx`):** a seção "Especificações" já existe -- nenhuma alteração necessária.

### Arquivos alterados
- `src/components/administrativo/rt/DocumentacaoTab.tsx`
- `src/components/administrativo/rt/ListaMestraSection.tsx`
- `src/components/administrativo/rt/OrganizacaoDocumentos.tsx`
- `src/components/administrativo/rt/TreinamentosSection.tsx`

