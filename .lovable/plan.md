

## Plano: Adicionar tipo de OS "Treinamento de Usuário: Modelo ABL90 FLEX PLUS - Radiometer"

Seguindo o mesmo padrão do ABL9, com 5 categorias de checklist + 1 item extra (Limpeza).

### Alterações

**1. `src/types/assessoria-cientifica.ts`**
- Adicionar `'treinamento_usuario_abl90'` ao type `TipoOS`

**2. `src/data/assessoria-cientifica.ts`**
- Adicionar label `"Treinamento de Usuário: Modelo ABL90 FLEX PLUS - Radiometer"` e ícone `"🔬"`

**3. `src/components/comercial/assessoria/FormularioOS.tsx`**
- Adicionar opção no array `tiposOS`
- Incluir nas condições de `ehTreinamento` (participantes, assinaturas, certificado)
- Novo estado `checklistABL90` (Record<string, boolean>)
- Bloco condicional com cards de checkboxes:

**Card "Apresentação Geral":**
- Entrada de amostras
- Código de barras
- Impressora
- Cassete de eletrodos e pack de soluções
- Recursos para registro de dados externo e entradas USB
- Portabilidade e uso com bateria
- Ligar e desligar o analisador

**Card "Tela":**
- Apresentação do layout
- Interpretação do semáforo
- Interpretação de mensagens
- Uso do registro de dados
- Uso do tutorial

**Card "Trocas":**
- Cassete de eletrodos e pack de soluções
- Papel

**Card "Controle de Qualidade":**
- Utilização do controle de qualidade automático
- Medição de controle de qualidade não programável
- Uso de controle de qualidade externo

**Card "Processamento de Amostra":**
- Inserir amostra
- Preenchimento do cadastro
- Resultado e interpretação de mensagens

**Card "Limpeza":**
- Limpeza do dispositivo de entrada

### Arquivos alterados
- `src/types/assessoria-cientifica.ts`
- `src/data/assessoria-cientifica.ts`
- `src/components/comercial/assessoria/FormularioOS.tsx`

