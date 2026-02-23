
## Plano: Sistema de Anexos com Respostas na Queixa Tecnica

### O Que Sera Feito

Adicionar uma nova secao **"Anexos e Respostas"** ao final da tela de Queixa Tecnica (apos a secao 8), onde o usuario podera registrar as respostas da empresa a ANVISA e outros documentos vinculados a queixa.

### Como Vai Funcionar

1. **Botao "Adicionar Anexo"** no topo da secao
2. Ao clicar, abre um formulario inline (ou modal) pedindo:
   - **Tipo do Anexo** (select): Resposta a ANVISA, Laudo Tecnico, Relatorio de Investigacao, Evidencia Fotografica, Outros
   - **Titulo/Descricao** do anexo (campo texto)
   - **Data** (preenchida automaticamente, editavel)
   - **Observacoes** (textarea opcional)
   - **Arquivo** (upload obrigatorio - PDF, DOC, imagem)
3. Ao salvar, o anexo aparece na lista como um **card minimizado** (colapsado), mostrando apenas:
   - Icone do tipo + Titulo + Tipo do Anexo (badge) + Data
   - Seta para expandir/colapsar
4. Ao clicar na seta ou no card, ele **expande** e mostra todos os campos preenchidos (tipo, titulo, descricao, observacoes, arquivo anexado com opcao de visualizar/baixar)
5. Os anexos ficam **empilhados verticalmente**, um embaixo do outro, todos minimizados por padrao

### Layout Visual

```text
+--------------------------------------------------+
| 9 - Anexos e Respostas          [+ Adicionar Anexo]|
+--------------------------------------------------+

  > Resposta a ANVISA - Carta resposta ref...  | 05/04/2024
  
  > Laudo Tecnico - Analise do sensor cas...   | 06/04/2024

  v Relatorio de Investigacao - Invest...      | 07/04/2024
  +----------------------------------------------+
  | Tipo: Relatorio de Investigacao              |
  | Titulo: Investigacao causa raiz sensor       |
  | Data: 07/04/2024                             |
  | Observacoes: Investigacao concluida...       |
  | Arquivo: [relatorio_inv.pdf] [Visualizar]    |
  +----------------------------------------------+
```

### Detalhes Tecnicos

**Arquivo a modificar:** `src/components/administrativo/qualidade/QueixaTecnicaTab.tsx`

**Mudancas especificas:**

1. Criar interface `AnexoQueixa` com campos: id, tipo (enum com as opcoes acima), titulo, data, observacoes, arquivo (File | null), nomeArquivo, tamanhoArquivo
2. Adicionar estados: `anexos: AnexoQueixa[]`, `formNovoAnexo` (dados do formulario), `mostrarFormAnexo: boolean`, `anexosExpandidos: string[]` (IDs dos anexos abertos)
3. Adicionar nova secao "9 - Anexos e Respostas" apos a secao 8, usando o componente `Collapsible` do Radix UI para o comportamento de expandir/colapsar cada anexo
4. Formulario de novo anexo com Select para tipo, Input para titulo, Input date para data, Textarea para observacoes, e area de upload de arquivo
5. Validacao: tipo e titulo obrigatorios, arquivo obrigatorio
6. Ao salvar, adiciona ao array `anexos` e fecha o formulario
7. Cada anexo renderizado como card colapsavel com `ChevronDown`/`ChevronUp` para indicar estado
