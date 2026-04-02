

## Plano: Adicionar tipo de OS "Treinamento de Usuário: Modelo ABL800 - Radiometer"

Seguindo o mesmo padrão do ABL9 e ABL90, com 5 categorias de checklist + 1 item extra.

### Alterações

**1. `src/types/assessoria-cientifica.ts`**
- Já existe `'treinamento_usuario_abl90'` — adicionar `'treinamento_usuario_abl800'` ao type `TipoOS`

**2. `src/data/assessoria-cientifica.ts`**
- Adicionar label `"Treinamento de Usuário: Modelo ABL800 - Radiometer"` e ícone `"🔬"`

**3. `src/components/comercial/assessoria/FormularioOS.tsx`**
- Adicionar opção no array `tiposOS`
- Incluir nas condições de `ehTreinamento`
- Novo estado `checklistABL800` (Record<string, boolean>)
- Bloco condicional com cards:

**Card "Apresentação Geral":**
- Entrada de amostras
- Código de barras
- Impressora
- Frascos, soluções e cilindros de gás
- Recursos para registro de dados externo, utilizando CD e/ou entradas USB
- Eletrodos e membranas
- Co-oxímetro
- Ligar e desligar o analisador

**Card "Tela":**
- Apresentação do layout
- Interpretação do semáforo
- Interpretação de mensagens
- Uso do registro de dados
- Uso do tutorial

**Card "Trocas":**
- Frascos e gás
- Papel
- Membranas
- Ampolas de controle de qualidade
- Dispositivo de entrada

**Card "Controle de Qualidade":**
- Utilização do controle de qualidade
- Medição de controle de qualidade não programado
- Cadastro de lote de ampola
- Uso de controle de qualidade externo

**Card "Processamento de Amostra":**
- Inserir amostra
- Preenchimento do cadastro
- Resultado e interpretação de mensagens

**Card "Solução Desproteinizante":**
- Utilização da Solução desproteinizante

### Arquivos alterados
- `src/types/assessoria-cientifica.ts`
- `src/data/assessoria-cientifica.ts`
- `src/components/comercial/assessoria/FormularioOS.tsx`

