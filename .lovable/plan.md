

## Plano: Criar aba "Documentos" no módulo Responsabilidade Técnica

### Resumo
Adicionar uma 5ª aba "DOCUMENTOS" ao módulo RT com três seções (Cards) e funcionalidade de criação de pastas e upload de arquivos, reutilizando o componente `OrganizacaoDocumentos` já existente.

### Alterações

#### 1. Novo componente: `src/components/administrativo/rt/DocumentosRTTab.tsx`
- Três seções (Cards) com títulos:
  - "Documentos do Responsável Legal"
  - "Documentos do Responsável Técnico de Produtos e Empresas"
  - "Documentos do Responsável Técnico de Obras e Serviços"
- Cada seção usa o componente `OrganizacaoDocumentos` existente para gerenciar pastas e arquivos (criar pastas, nomear, anexar arquivos)
- Estado local com `PastaRT[]` para cada seção

#### 2. Alteração: `src/components/administrativo/rt/` → `Administrativo.tsx` (linhas 188-211)
- Mudar `grid-cols-4` para `grid-cols-5` na `TabsList`
- Adicionar `<TabsTrigger value="documentos-rt">DOCUMENTOS</TabsTrigger>`
- Adicionar `<TabsContent value="documentos-rt">` com o novo `DocumentosRTTab`
- Importar o novo componente

### Arquivo afetado
- `src/pages/Administrativo.tsx` (adicionar aba)
- `src/components/administrativo/rt/DocumentosRTTab.tsx` (novo componente)

