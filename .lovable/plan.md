

## Plano: Converter modal de Marcas Concorrentes para usar abas (Tabs)

### Problema
O modal de Marcas Concorrentes usa seções colapsáveis (Collapsible), enquanto todo o resto do sistema usa abas (Tabs). Precisa seguir o mesmo padrão.

### Alteração em `src/components/cadastro/MarcaConcorrenteModal.tsx`

Reescrever o modal para usar `Tabs/TabsList/TabsTrigger/TabsContent` no lugar de `Collapsible`, seguindo o padrão do `EntidadeModal.tsx`.

**8 abas:**
1. **Identificação** — Nome, Fabricante, País, Site, Status
2. **Classificação** — Categorias (multi-select + Outra), Segmentos (multi-select + Outro)
3. **Posicionamento** — Produto concorrente, Faixa de preço, Posicionamento, Condições comerciais
4. **Informações Técnicas** — Descrição, Características, Diferenciais, Pontos fracos, Compatibilidade, Registro ANVISA
5. **Mercado** — Clientes, Regiões, Participação, Histórico substituição
6. **Análise Competitiva** — Forças, Fraquezas, Ameaça, Concorrência, Observações estratégicas
7. **Contato** — Representante, Distribuidor
8. **Controle** — Documentos, Responsável, Datas

**Estrutura:** Layout flex com header fixo, TabsList horizontal com `grid-cols-8`, conteúdo com scroll independente (`flex-1 overflow-y-auto`), e rodapé fixo com botões Cancelar/Salvar — idêntico ao padrão do `EntidadeModal`.

### Arquivos alterados
- `src/components/cadastro/MarcaConcorrenteModal.tsx`

