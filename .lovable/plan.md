

## Plano: Reestruturar módulo Propostas — Substituir 3 abas por 2 (Propostas + Tabela)

### Resumo

Remover as 3 abas atuais (Licitação, Contratação, DT) e substituir por 2 abas: **"Propostas"** (formulário completo com dados do cliente, empresa, representante, área de texto livre "Word", condições comerciais e assinatura) e **"Tabela"** (tabela de produtos com colunas específicas, com possibilidade de inserir na área "Word" da aba Propostas).

### Detalhes Técnicos

#### 1. `src/pages/Comercial.tsx` — Reestruturar o layout de abas
- Alterar `propostasTab` de `'licitacao' | 'contratacao' | 'dt'` para `'propostas' | 'tabela'`
- Substituir as 3 `TabsTrigger` por 2: "Propostas" e "Tabela"
- Na aba "Propostas": botão "Nova Proposta" abre o modal redesenhado
- Na aba "Tabela": lista as tabelas de produtos criadas
- Manter os modais antigos (Contratação e DT) funcionando por enquanto, apenas removendo suas abas

#### 2. `src/components/comercial/PropostaLicitacaoModal.tsx` — Redesenhar o modal com 2 abas internas
O modal existente já tem muitos dos campos necessários. Será reestruturado internamente em 2 abas:

**Aba "Propostas" (dentro do modal):**
- **Dados do Cliente** (já existe, ajustar): Cliente, Endereço, CNPJ, Nº UASG, Nº Edital de pregão eletrônico, Nº Pregão Eletrônico, Nº Processo, Inscrição Estadual, Inscrição Municipal, Abertura, Dia, Horário (horário de Brasília), A/C (campo editável, NÃO auto-preenchido), Cotação Nº, Proposta Nº
- **Dados do Representante Legal para assinatura do contrato** (já existe, manter pré-preenchido pela empresa ativa): Representante legal, RG, CPF, Naturalidade, Nacionalidade, Endereço completo, E-mail, Cargo/Função
- **Dados da Empresa** (já existe, manter auto-preenchido): Razão Social, Endereço completo, CNPJ, Inscrição Estadual, Inscrição Municipal, Telefone, E-mail
- **Dados do Representante Legal para assinatura do contrato** (segunda seção, também pré-preenchida — manter conforme solicitado)
- **Seção "Word"**: Área de texto livre (rich text / textarea grande) onde o usuário pode escrever e anexar conteúdo livremente. Incluir botão para inserir a tabela da aba "Tabela" nesta área
- **Declaração**: "A empresa XXXX declara que:" + campo de texto
- **Prazo de validade da proposta**: campo de texto
- **Pagamento**: campo de texto
- **Prazo de entrega e/ou instalação**: campo de texto
- **Garantia**: campo de texto
- **Local de entrega**: campo de texto
- **Frete e Impostos**: campo de texto
- **Observações**: campo de texto
- **Local, data, assinatura**: Componente `AssinaturaRepresentante` existente (assinatura digital pelo certificado cadastrado)

**Aba "Tabela" (dentro do modal):**
- Tabela com colunas horizontais: Código, Item, Produto, Descrição, Marca, Modelo, Anvisa, Unidade, Quantidade, Valor com ICMS, Valor sem ICMS, Valor total com ICMS, Valor total sem ICMS, Valor mensal, Valor anual
- Campo horizontal separado: Observações
- Botão para "Inserir tabela na proposta" (copia/vincula a tabela na seção Word da aba Propostas)

**Regra para PDF:** Campos não preenchidos não devem exibir o título/label no PDF gerado. Isso se aplica também à Inscrição Estadual (manter campo no formulário, ocultar no PDF se vazio).

**Observações sobre PDF:**
- Gerar com logo da empresa (papel timbrado)
- Fontes especiais: Netmed (Arial Rounded MT Bold, 10), Setmed (Calibri, 11)
- A geração do PDF será preparada na estrutura, mas a implementação completa do PDF com logos pode ser um passo futuro

#### 3. Remover seções que não existem mais
- Remover cards de Composição de Exames, Especificação do Produto, Quantidade de Produtos, Composição do Valor Ofertado, Declaração de Código Alfandegário do modal (essas seções eram da proposta antiga de Licitação)
- Remover Dados Bancários (não mencionado nos novos requisitos)

### Arquivos alterados
- `src/pages/Comercial.tsx` — Reestruturar abas de Propostas
- `src/components/comercial/PropostaLicitacaoModal.tsx` — Redesenhar completamente com 2 abas internas (Propostas + Tabela)

