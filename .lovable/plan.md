
## Plano: Separar Documentos por Empresa na Aba Documentos da Contratacao

### Situacao Atual
A aba "Documentos" no modal de Contratacao (`ContratacaoSimplesForm.tsx`) exibe todos os documentos importados da licitacao em uma lista unica, sem distinção de qual empresa participante cada documento pertence.

### O Que Sera Feito
Quando a contratacao possuir **mais de uma empresa participante** (Empresa 1 e Empresa 2), a aba Documentos sera reorganizada para:

1. **Mostrar documentos separados por empresa** - Cada empresa tera sua propria secao/card com titulo indicando o nome da empresa e CNPJ
2. **Documentos compartilhados** - Documentos que nao sao especificos de uma empresa (ex: Edital) ficarao em uma secao "Documentos Gerais da Licitacao"
3. **Upload separado** - A area de upload de novos documentos tambem permitira selecionar a qual empresa o documento pertence
4. **Caso de empresa unica** - Se houver apenas 1 empresa participante, o layout permanece como esta hoje (sem separacao)

### Layout Proposto

```text
+------------------------------------------+
| Documentos Gerais da Licitacao           |
|  - Edital PP-2024-015.pdf               |
|  - Catalogo Produtos.pdf                |
+------------------------------------------+

+------------------------------------------+
| Empresa 1: iMuv Master (12.345.678/0001)|
|  - Proposta_Empresa1.pdf                |
|  - Aditivo de Mudanca de Empresa.pdf    |
+------------------------------------------+

+------------------------------------------+
| Empresa 2: iMuv Filial (12.345.678/0002)|
|  - Proposta_Empresa2.pdf                |
|  - Aditivo de Mudanca de Empresa.pdf    |
+------------------------------------------+

+------------------------------------------+
| Adicionar Novos Documentos              |
|  [Selecionar Empresa: dropdown]         |
|  [Arraste e solte arquivos aqui]        |
+------------------------------------------+
```

### Detalhes Tecnicos

**Arquivo a modificar:** `src/components/comercial/ContratacaoSimplesForm.tsx`

**Escopo:** Apenas a aba "Documentos" (TabsContent value="documentos") - nenhuma outra aba sera alterada.

**Logica de separacao:**
- Cada documento na lista `documentosLicitacao` recebera um campo `empresaId` indicando a qual empresa pertence (ou `null` para documentos gerais)
- Ao vincular licitacao, os documentos serao categorizados automaticamente com base no tipo (Edital = geral, Aditivo de Mudanca de Empresa = empresa especifica)
- A condicao `empresaContrato2.empresaParticipanteId` sera usada para verificar se existe uma segunda empresa e decidir se mostra o layout separado

**Mudancas:**
1. Adicionar campo `empresaId` aos documentos no estado `documentosLicitacao`
2. Na aba Documentos, filtrar e agrupar documentos por empresa quando houver 2 empresas
3. Exibir cards separados com header mostrando nome e CNPJ de cada empresa
4. No card "Adicionar Novos Documentos", incluir um Select para escolher a qual empresa vincular o novo documento (visivel apenas quando ha 2 empresas)
