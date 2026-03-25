

## Plano: Adicionar upload de timbrado e seleção de fonte no Perfil da Empresa

### Resumo
Na aba "Informações" do Perfil da Empresa, adicionar dois novos campos: upload de imagem do timbrado da empresa e seleção da fonte padrão para impressão de documentos. Cada empresa terá sua própria configuração.

### Alterações em `src/components/configuracao/PerfilEmpresaContent.tsx`

**1. Novos estados no formData (useEffect ~linha 31):**
- `timbradoUrl` (string) — preview da imagem do timbrado
- `timbradoFile` (File | null) — estado separado fora do formData
- `fonteDocumentos` (string) — fonte selecionada para impressão

**2. Nova seção no final do Card "Dados da Empresa" (após o Switch de discriminaImpostos, ~linha 284):**

- **Timbrado da Empresa:**
  - Área de upload com preview da imagem (drag & drop ou botão)
  - Aceita PNG, JPG, PDF
  - Exibe preview da imagem carregada com botão remover
  - Usa `useRef` + input file hidden (mesmo padrão do `LinkFileUpload`)

- **Fonte para Documentos:**
  - Select com opções de fontes comuns do Word: Arial, Arial Black, Calibri, Cambria, Comic Sans MS, Courier New, Georgia, Helvetica, Impact, Lucida Console, Palatino Linotype, Segoe UI, Tahoma, Times New Roman, Trebuchet MS, Verdana
  - Preview do texto com a fonte selecionada

**3. Atualizar tipos em `src/types/super.ts`:**
- Adicionar `timbradoUrl?: string` e `fonteDocumentos?: string` na interface `Empresa` e `Filial`

### Resultado
Cada empresa/filial poderá configurar seu timbrado (upload de imagem) e fonte padrão para impressão de documentos, tudo salvo junto com os demais dados do perfil.

