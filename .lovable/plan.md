

## Plano: Adicionar tipo de OS "Treinamento de Usuário: Modelo ABL9 - Radiometer"

Seguindo o mesmo padrão do MeterOmega e SET Medikal, mas com 5 categorias de checklist em vez de 2.

### Alterações

**1. `src/types/assessoria-cientifica.ts`**
- Adicionar `'treinamento_usuario_abl9'` ao type `TipoOS`

**2. `src/data/assessoria-cientifica.ts`**
- Adicionar label `"Treinamento de Usuário: Modelo ABL9 - Radiometer"` e ícone nos helpers

**3. `src/components/comercial/assessoria/FormularioOS.tsx`**
- Adicionar opção no array `tiposOS`
- Incluir nas condições de `ehTreinamento` (participantes, assinaturas, certificado)
- Novo estado `checklistABL9` (Record<string, boolean>)
- Bloco condicional com cards de checkboxes organizados em grid:

**Card "Apresentação Geral":**
- Entrada de amostras
- Código de barras
- Impressora
- Cassete de eletrodos e pack de soluções
- Recursos para registro de dados externo e entradas USB
- Ligar e desligar o analisador

**Card "Tela":**
- Apresentação do layout
- Interpretação de mensagens
- Uso do registro de dados
- Uso do tutorial

**Card "Trocas":**
- Cassete de eletrodos e pack de soluções
- Papel

**Card "Controle de Qualidade":**
- Utilização do controle de qualidade
- Cadastro de lote de ampolas
- Uso de controle de qualidade externo

**Card "Processamento de Amostra":**
- Inserir amostra
- Preenchimento do cadastro
- Resultado e interpretação de mensagens

### Arquivos alterados
- `src/types/assessoria-cientifica.ts`
- `src/data/assessoria-cientifica.ts`
- `src/components/comercial/assessoria/FormularioOS.tsx`

