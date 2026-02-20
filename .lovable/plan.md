

## Plano: Substituicao Global de Cores biodina para imuv em TODO o Sistema

### Problema
Apenas ~20 arquivos foram atualizados na ultima alteracao. Restam **113 arquivos com 1838 ocorrencias** de cores `biodina-*` que precisam ser substituidas. Isso inclui sidebars de modulos, modais, formularios, tabs, botoes, badges, e o chat flutuante — tudo aparecendo com cores em branco/transparente porque os tokens `biodina-*` nao existem mais no Tailwind config.

### Mapeamento de Substituicao

| De | Para | Uso |
|----|------|-----|
| `biodina-blue` | `imuv-blue` | Cor primaria (titulos, menus, icones, avatares) |
| `biodina-gold` | `imuv-cyan` | Accent (botoes de acao, badges, submenus ativos) |
| `biodina-darkblue` | `imuv-dark` | Fundo escuro (gradientes, headers) |

Todas as variacoes com opacidade serao mantidas (ex: `biodina-blue/10` vira `imuv-blue/10`, `biodina-gold/90` vira `imuv-cyan/90`).

### Arquivos Afetados (113 arquivos)

Incluem todos os modulos do sistema:

**Sidebars de Modulos:**
- `EstoqueSidebar.tsx`, `ComprasSidebar.tsx`, `FinanceiroSidebar.tsx`, `ContabilidadeSidebar.tsx`, `RHSidebar.tsx`, `TISidebar.tsx`, `ComercialSidebar.tsx`, `AdministrativoSidebar.tsx`, `SolicitacoesSidebar.tsx`, `ConfiguracaoSidebar.tsx`

**Chat Flutuante:**
- `FloatingChat.tsx`, `ChatWindow.tsx`

**Modulos Principais (paginas):**
- `Administrativo.tsx`, `Estoque.tsx`, `Comercial.tsx`, `RH.tsx`, `TI.tsx`, `Financeiro.tsx`, `Contabilidade.tsx`, `Compras.tsx`, `Solicitacoes.tsx`, `Configuracao.tsx`

**Componentes de cada modulo:**
- Todos os formularios, modais, tabs, tabelas, templates de treinamento, views de importacao, dashboards, etc.

**Componentes globais:**
- `UserProfileMenu.tsx` (avatar fallback)

### Abordagem

Substituicao direta em todos os 113 arquivos:
1. `biodina-blue` → `imuv-blue` (todas as ocorrencias)
2. `biodina-gold` → `imuv-cyan` (todas as ocorrencias)
3. `biodina-darkblue` → `imuv-dark` (todas as ocorrencias)

Nao serao alterados textos de mock data que mencionam "Biodina" como nome de empresa (ex: "BIODINA LTDA" em dados ficticios) — apenas as classes CSS de cor.

### Resultado Esperado
- Sistema inteiro com visual coeso nas cores imuv
- Todos os botoes, titulos, menus, sidebars, modais, badges com as cores corretas
- Chat flutuante com cor azul imuv
- Nenhum elemento em branco/transparente por falta de token de cor
