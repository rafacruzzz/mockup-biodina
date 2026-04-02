

## Plano: Adicionar tipo de OS "Treinamento de Usuário: DxH 520 – Beckman Coulter"

Seguindo o mesmo padrão dos demais treinamentos, com 7 categorias de checklist.

### Alterações

**1. `src/types/assessoria-cientifica.ts`**
- Adicionar `'treinamento_usuario_dxh520'` ao type `TipoOS`

**2. `src/data/assessoria-cientifica.ts`**
- Adicionar label `"Treinamento de Usuário: DxH 520 – Beckman Coulter"` e ícone `"🔬"`

**3. `src/components/comercial/assessoria/FormularioOS.tsx`**
- Adicionar opção no array `tiposOS`
- Incluir nas condições de `ehTreinamento` (participantes, assinaturas, certificado)
- Novo estado `checklistDxH520` (Record<string, boolean>)
- Bloco condicional com cards de checkboxes:

**Card "Apresentação Geral":**
- Entrada de amostras (modo aberto/fechado)
- Código de barras
- Impressora
- Entrada de reagentes
- Ligar e desligar o analisador

**Card "Trocas":**
- Reagentes com código de barras e sem código de barras

**Card "Controle de Qualidade":**
- Utilização do controle de qualidade
- Configuração do controle de qualidade
- Avaliação gráfico diário

**Card "Calibrações":**
- Configuração de um novo calibrador
- Realizar calibração
- Validar calibração

**Card "Processamento de Amostra":**
- Inserir amostra
- Resultado

**Card "Manutenções":**
- Verificações diárias (encerramento e contagem de fundo)
- Limpeza do filtro de WBC (mensal)
- Ciclo de cloro

**Card "Configurações":**
- Configuração de acessos

### Arquivos alterados
- `src/types/assessoria-cientifica.ts`
- `src/data/assessoria-cientifica.ts`
- `src/components/comercial/assessoria/FormularioOS.tsx`

