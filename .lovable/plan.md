

## Plano: Rebranding Visual Completo - Novas Cores e Logos iMuv

### Objetivo
Aplicar a nova identidade visual do cliente iMuv em todo o sistema, substituindo as cores antigas (biodina) pelas novas cores da marca, e posicionando os logos enviados nos locais estrategicos.

---

### Paleta de Cores Selecionada

Das 8 cores enviadas, selecionei as que melhor combinam com os logos e criam um visual moderno e profissional:

| Token | Cor | Uso |
|-------|-----|-----|
| `imuv-blue` | `#0000FE` | Cor primaria (menus ativos, titulos, botoes principais) |
| `imuv-cyan` | `#0BB8F6` | Destaque/accent (o ponto do logo, links, hover) |
| `imuv-navy` | `#1122A9` | Variacao escura (backgrounds de sidebar, gradientes) |
| `imuv-dark` | `#29324F` | Fundo escuro (tela de login, header) |
| `imuv-green` | `#00ED9F` | Sucesso/destaque secundario (badges, indicadores) |

Cores descartadas: `#000000` (ja e padrao), `#ae0de7` (roxo - muito chamativo como cor principal), `#01fe00` (verde neon - muito vibrante para UI corporativa).

---

### Logos e Onde Serao Usados

| Logo | Arquivo | Onde |
|------|---------|------|
| `azul.png` | Logo completa azul | Tela de login (dentro do card do formulario) |
| `branca.png` | Logo completa branca | Tela de login (canto superior, sobre fundo escuro) |
| `icone_imuv-03.png` | Icone "mu" azul | Sidebar quando colapsada |
| `preta.png` | Logo completa preta | Header principal (ao lado do nome) |

---

### Arquivos a Modificar

| Arquivo | Acao |
|---------|------|
| `tailwind.config.ts` | Substituir tokens `biodina` por `imuv` com as novas cores |
| `src/index.css` | Atualizar background da tela de login e scrollbar com novas cores |
| `src/pages/Login.tsx` | Redesign com novos logos e cores, visual moderno |
| `src/components/LoginForm.tsx` | Atualizar cores dos inputs, botoes, links |
| `src/components/SidebarLayout.tsx` | Adicionar logo no sidebar, atualizar cores |
| **~155 arquivos com `biodina`** | Substituir `biodina-blue` por `imuv-blue`, `biodina-gold` por `imuv-cyan`, `biodina-darkblue` por `imuv-dark` em todos os componentes |

---

### Detalhes da Implementacao

#### 1. Tailwind Config - Novas Cores

Substituir o bloco `biodina` por:

```typescript
imuv: {
  blue: '#0000FE',
  cyan: '#0BB8F6', 
  navy: '#1122A9',
  dark: '#29324F',
  green: '#00ED9F',
}
```

#### 2. Tela de Login - Redesign

- Fundo com gradiente de `imuv-dark` para `imuv-navy`
- Logo branca (`branca.png`) no canto superior esquerdo
- Logo azul (`azul.png`) dentro do card do formulario, acima do titulo
- Botao de login com gradiente `imuv-blue` para `imuv-navy`
- Link "Esqueci minha senha" em `imuv-cyan`
- Subtitulo "Sistemas Inteligentes" em `imuv-cyan`

#### 3. Sidebar - Logo e Cores

- Quando aberta: mostrar nome da empresa (como hoje) com cor `imuv-blue`
- Quando colapsada: mostrar icone `icone_imuv-03.png` no lugar do texto
- Menu ativo: gradiente de `imuv-blue` para `imuv-navy`
- Header: "iMuv Sistemas" com logo preta ao lado

#### 4. Substituicao Global de Cores

Mapeamento de substituicao em todos os 155 arquivos:

```text
biodina-blue    -->  imuv-blue
biodina-gold    -->  imuv-cyan
biodina-darkblue --> imuv-dark
```

Isso inclui classes como:
- `text-biodina-blue` --> `text-imuv-blue`
- `bg-biodina-gold` --> `bg-imuv-cyan`
- `border-biodina-blue` --> `border-imuv-blue`
- `from-biodina-darkblue` --> `from-imuv-dark`
- E todas as variacoes com opacity (`/10`, `/20`, `/80`, `/90`, etc.)

#### 5. Scrollbar e Detalhes CSS

Atualizar as cores do scrollbar customizado de roxo para `imuv-cyan`:
- Thumb: `#0BB8F6` (cyan)
- Thumb hover: `#0000FE` (blue)

---

### Resultado Esperado

- Visual moderno e profissional com a identidade iMuv
- Logos posicionados de forma elegante na login e no sidebar
- Paleta coesa de azul/cyan em todo o sistema
- Transicao suave sem quebrar nenhum componente existente

