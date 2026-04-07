

## Plano: Reestruturar seção "Registro de Treinamento" no formulário de OS

### Problema atual
Quando se seleciona "Treinamento de Usuário: Modelo X" como tipo de OS, os checklists técnicos aparecem diretamente na página. O usuário quer que esses checklists/conteúdos programáticos apareçam **apenas** quando o tipo é "Treinamento Inicial" ou "Treinamento de Nova Equipe", dentro de uma seção "Registro de Treinamento" onde o usuário seleciona o modelo desejado.

### O que muda

#### Arquivo: `src/components/comercial/assessoria/FormularioOS.tsx`

**1. Alterar a condição de exibição da seção de treinamento (linha 731)**
- A seção inteira (checklists + "Registro de Treinamento" + participantes + assinaturas) só aparece quando `treinamento_inicial` ou `treinamento_nova_equipe` está selecionado
- Remover da condição todos os tipos `treinamento_usuario_*`

**2. Remover exibição direta dos checklists por tipo de OS (linhas 733-1772)**
- Os checklists de MeterOmega, Set Medikal, ABL9, ABL90, ABL800, AQT90, DxH520, Excelsior AS e OsmoTech atualmente aparecem condicionados a `tiposSelecionados.includes("treinamento_usuario_xxx")`
- Mudar para que apareçam condicionados ao `selectedTemplate` (seleção feita pelo usuário na lista de "Registro de Treinamento")
- Ex: o checklist MeterOmega aparece quando `selectedTemplate === "meteromega"` em vez de `tiposSelecionados.includes("treinamento_usuario_meteromega")`

**3. Adicionar MeterOmega e Set Medikal ao `templatesDisponiveis` (linha 334)**
- Acrescentar: `{ id: "meteromega", nome: "MeterOmega", badge: "Coleta" }` e `{ id: "setmedikal", nome: "SET Medikal", badge: "Coleta" }`
- Lista final com 9 opções

**4. Reordenar o fluxo dentro da seção de treinamento**
Ordem desejada:
1. Card "Registro de Treinamento" com lista de seleção de modelos (já existe em linhas 1774-1803)
2. Checklist técnico do modelo selecionado (movido para após a seleção)
3. Template de registro (renderSelectedTemplate) — já incluso no card acima
4. Assinatura do instrutor
5. Participantes + assinaturas dos participantes

**5. Atualizar `ehTreinamento` (linha 271)**
- Simplificar para verificar apenas `treinamento_inicial` e `treinamento_nova_equipe`

### Resultado
- Ao selecionar "Treinamento Inicial" ou "Treinamento de Nova Equipe", surge a seção "Registro de Treinamento"
- O usuário escolhe o modelo (MeterOmega, Set Medikal, ABL9, ABL90, ABL800, AQT90 FLEX, DxH520, Excelsior, OsmoTECH)
- Aparece o checklist técnico + template de registro do modelo selecionado
- Assinatura do instrutor e dos participantes seguem abaixo
- Os tipos "Treinamento de Usuário: Modelo X" continuam disponíveis como tipo de OS, mas sem exibir checklists diretamente

### Arquivo afetado
- `src/components/comercial/assessoria/FormularioOS.tsx`

