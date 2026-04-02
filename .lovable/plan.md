

## Plano: Adicionar tipo de OS "Treinamento de Usuário: Osmômetro modelo OsmoTech"

Seguindo o mesmo padrão dos demais treinamentos, com um único card "Conteúdo Programático" contendo 10 itens de checklist (estrutura similar ao Excelsior AS).

### Alterações

**1. `src/types/assessoria-cientifica.ts`**
- Adicionar `'treinamento_usuario_osmotech'` ao type `TipoOS`

**2. `src/data/assessoria-cientifica.ts`**
- Adicionar label `"Treinamento de Usuário: Osmômetro modelo OsmoTech"` e ícone `"🔬"`

**3. `src/components/comercial/assessoria/FormularioOS.tsx`**
- Adicionar opção no array `tiposOS`
- Incluir nas condições de `ehTreinamento` (participantes, assinaturas, certificado)
- Novo estado `checklistOsmoTech` (Record<string, boolean>)
- Bloco condicional com card "Conteúdo Programático do Treinamento" contendo checkboxes:

**Itens do Checklist:**
- Características e funções externas do equipamento
- Insumos básicos para o perfeito funcionamento do equipamento (padrões de calibração, kit ponteira e controle diário)
- Características da interface/configuração
- Calibração do equipamento com 03 pontos
- Calibração e utilização da pipeta de 20 microlitros
- Cadastro de usuários
- Filtro de resultados
- Estatísticas dos resultados
- Exportação dos resultados via rede
- Testes com amostras

### Arquivos alterados
- `src/types/assessoria-cientifica.ts`
- `src/data/assessoria-cientifica.ts`
- `src/components/comercial/assessoria/FormularioOS.tsx`

