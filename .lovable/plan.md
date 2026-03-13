

## Plano: Reestruturar aba "Dados Gerais" da Contratação

### Situação atual
A aba Dados Gerais tem layout confuso com cards separados: Licitação, Dados do Cliente (editável, muitos campos), Dados do Projeto (misturado com Segmento do Lead), Organização (tags, fluxo, status), Análise da Concorrência, e Representação Comercial. Campos são editáveis quando deveriam ser read-only.

### Alterações em `src/components/comercial/ContratacaoSimplesForm.tsx`

**A - Selecionar Licitação** (manter como está, ok)

**B - Dados do Cliente** (linhas ~656-763)
- Transformar em bloco resumido **read-only** logo abaixo da licitação (sem card separado, sem separação visual forte)
- Campos exibidos como texto (não inputs): CNPJ, Nome Fantasia, Razão Social, Endereço/UF, Email, Telefone
- **Adicionar campo "Segmento do Cliente"** (read-only, vem do cadastro do cliente/lead)
- Remover checkbox "Cliente Ativo" e campo "Website"

**C - Dados do Projeto** (reorganizar completamente, abaixo dos dados do cliente)
Nova ordem dos campos dentro do card:
1. **Segmento** (select - não é "segmento do lead", é segmento do projeto)
2. **Contrato** (número/referência do contrato - novo campo)
3. **Aditivos Contratuais** + botão "+Novo Aditivo" (já existe, mover para cá)
4. **Valor Original do Contrato** (já existe como `valorNegocio`, manter disabled)
5. **Previsão de Consumo Mensal** (já existe)
6. **Contato Comercial do Cliente** - transformar em lista dinâmica com botão "+Adicionar Contato" (nome, cargo/função, telefone, email por contato)
7. **Representantes Vinculados** - mover de card separado para cá, como lista com nome do representante
8. **Percentuais de Comissão** - para cada representante, campo de % ao lado
9. **Colaboradores Responsáveis pela Gestão** - lista dinâmica com botão "+Adicionar Colaborador" (select de colaboradores)

**D - Remover card "Organização"** (linhas ~974-1055)
- Remover completamente: Tags, Fluxo de Trabalho, Status, Motivo Ganho/Perda, Descrição
- Esses campos serão tratados em aba futura de Lead

**E - Resumo Biodina Rep** (novo bloco)
- Adicionar card abaixo de Dados do Projeto com título "Resumo Biodina Rep"
- Conteúdo placeholder: mensagem "Dados disponíveis após aval da Gerência Comercial" com badge "Integração Pendente"
- Campo de link externo do representante (já existe em Representação Comercial, mover para cá)

**Remover também:**
- Card "Análise da Concorrência" (linhas ~1057-1175) - mover/manter em outra aba se necessário
- Card "Representação Comercial" separado (linhas ~1177-1306) - conteúdo migrado para Dados do Projeto

### Novos estados no formData
- `segmentoProjeto` (string)
- `numeroContrato` (string)  
- `contatosComerciais` (array de `{nome, cargo, telefone, email}`)
- `representantesVinculados` (array de `{nome, percentualComissao}`)
- `colaboradoresGestao` (array de strings - IDs de colaboradores)

### Resultado visual esperado
```text
┌─────────────────────────────────────────────┐
│ Vincular Licitação Ganha          [Select]  │
│ ✅ Vinculada à PE-001/2025                  │
├─────────────────────────────────────────────┤
│ Dados do Cliente (read-only, compacto)      │
│ CNPJ: 00.000/0001-00  Nome: Hospital X     │
│ Endereço: São Paulo-SP  Segmento: Hosp.Púb │
├─────────────────────────────────────────────┤
│ Dados do Projeto                            │
│ Segmento [select]    Contrato [input]       │
│ ┌ Aditivos Contratuais    [+Novo Aditivo] ┐│
│ │ tabela de aditivos                       ││
│ └──────────────────────────────────────────┘│
│ Valor Original: R$ 150.000   Consumo: 500  │
│ ┌ Contatos Comerciais     [+Add Contato]  ┐│
│ │ Nome | Cargo | Tel | Email               ││
│ └──────────────────────────────────────────┘│
│ ┌ Representantes          [+Add Rep]      ┐│
│ │ Nome | Comissão %                        ││
│ └──────────────────────────────────────────┘│
│ ┌ Colaboradores Gestão    [+Add Colab]    ┐│
│ │ Nome do colaborador                      ││
│ └──────────────────────────────────────────┘│
├─────────────────────────────────────────────┤
│ Resumo Biodina Rep                          │
│ ⚠ Integração Pendente - Aguardando aval   │
│ da Gerência Comercial                       │
└─────────────────────────────────────────────┘
```

