

## Plano: Adicionar tipo de OS "Treinamento de Usuário: Modelo AQT90 FLEX - Radiometer"

Seguindo o mesmo padrão dos demais treinamentos (ABL9, ABL90, ABL800), com checklist específico.

### Alterações

**1. `src/types/assessoria-cientifica.ts`**
- Adicionar `'treinamento_usuario_aqt90'` ao type `TipoOS`

**2. `src/data/assessoria-cientifica.ts`**
- Adicionar label `"Treinamento de Usuário: Modelo AQT90 FLEX - Radiometer"` e ícone `"🔬"`

**3. `src/components/comercial/assessoria/FormularioOS.tsx`**
- Adicionar opção no array `tiposOS`
- Incluir nas condições de `ehTreinamento` (participantes, assinaturas, certificado)
- Novo estado `checklistAQT90` (Record<string, boolean>)
- Bloco condicional com cards de checkboxes:

**Card "Apresentação Geral":**
- Entrada de amostras
- Código de barras
- Impressora
- Cartucho teste
- Cartucho de reagente
- Ligar e desligar o analisador

**Card "Tela":**
- Apresentação do layout
- Interpretação do semáforo
- Interpretação de mensagens
- Uso do registro de dados
- Uso do tutorial

**Card "Análise de Amostra":**
- Análise de amostra

**Card "Trocas":**
- Cartucho de soluções
- Cartucho de testes
- Papel da impressora

**Card "Calibração":**
- Calibração de um novo lote de testes

**Card "Limpeza":**
- Uso do tubo e cartucho limpeza

**Card "Controle de Qualidade":**
- Cadastro de novo lote
- Uso do controle de qualidade

### Arquivos alterados
- `src/types/assessoria-cientifica.ts`
- `src/data/assessoria-cientifica.ts`
- `src/components/comercial/assessoria/FormularioOS.tsx`

