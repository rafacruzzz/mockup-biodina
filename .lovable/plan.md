

## Plano: Corrigir Logos que Nao Carregam Dentro do Sistema

### Problema
Os logos aparecem na tela de login mas nao carregam no header e na aba do navegador (favicon). O favicon tambem aparece quebrado.

### Causa
Os logos estao referenciados como caminhos estaticos (`/logos/preta.png`) que podem falhar dependendo do cache do navegador ou da forma como o Vite resolve os assets. A abordagem mais confiavel e importar os logos como modulos ES6.

### Solucao

#### 1. Copiar logos para `src/assets/`
Mover os logos de `public/logos/` para `src/assets/logos/` para que o Vite os processe corretamente:
- `src/assets/logos/preta.png`
- `src/assets/logos/branca.png`
- `src/assets/logos/azul.png`
- `src/assets/logos/icone_imuv-03.png`

Manter tambem em `public/logos/` para o favicon e og:image.

#### 2. Atualizar `SidebarLayout.tsx`
Importar os logos como modulos ES6:
```typescript
import logoPreta from "@/assets/logos/preta.png";
import logoIcone from "@/assets/logos/icone_imuv-03.png";
```
E usar nas tags `<img src={logoPreta} />` em vez de `<img src="/logos/preta.png" />`.

#### 3. Atualizar `Login.tsx`
```typescript
import logoBranca from "@/assets/logos/branca.png";
import logoAzul from "@/assets/logos/azul.png";
```

#### 4. Atualizar `LoginForm.tsx`
```typescript
import logoAzul from "@/assets/logos/azul.png";
```

### Arquivos a Modificar
| Arquivo | Acao |
|---------|------|
| `src/assets/logos/` | Copiar 4 logos para esta pasta |
| `src/components/SidebarLayout.tsx` | Importar e usar logos como ES6 modules |
| `src/pages/Login.tsx` | Importar e usar logos como ES6 modules |
| `src/components/LoginForm.tsx` | Importar e usar logo como ES6 module |

### Resultado Esperado
- Logos carregam corretamente em todas as paginas do sistema
- Vite processa e otimiza os assets automaticamente
- Sem dependencia de cache do navegador para carregar as imagens

