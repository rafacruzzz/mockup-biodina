

## Plano: Adicionar tipo de OS "Treinamento de Usuário: Excelsior AS"

Seguindo o mesmo padrão dos demais treinamentos, mas com uma estrutura diferente: 14 itens de checklist em um layout de cards por categoria. Como os itens não se agrupam em categorias claras (são todos tópicos independentes do equipamento), serão organizados em um único card "Conteúdo Programático do Treinamento".

### Alterações

**1. `src/types/assessoria-cientifica.ts`**
- Adicionar `'treinamento_usuario_excelsior_as'` ao type `TipoOS`

**2. `src/data/assessoria-cientifica.ts`**
- Adicionar label `"Treinamento de Usuário: Excelsior AS"` e ícone `"🔬"`

**3. `src/components/comercial/assessoria/FormularioOS.tsx`**
- Adicionar opção no array `tiposOS`
- Incluir nas condições de `ehTreinamento` (participantes, assinaturas, certificado)
- Novo estado `checklistExcelsiorAS` (Record<string, boolean>)
- Bloco condicional com checklist de checkboxes (14 itens):

**Itens do Checklist:**
- Características/compartimentos físicos do equipamento
- Material de consumo
- Configurações do menu inicial
- Configuração de protocolos/programas
- Configurações de programas overnight
- Controle de qualidade
- Rotação de reagentes
- Inspeção de reagentes
- Substituição filtros
- Substituição dos reagentes de lavagem
- Instrução sobre a bateria backup
- Instruções limpeza da câmara de reação antes do programa de lavagem
- Instruções para limpeza em geral
- Testes

### Arquivos alterados
- `src/types/assessoria-cientifica.ts`
- `src/data/assessoria-cientifica.ts`
- `src/components/comercial/assessoria/FormularioOS.tsx`

