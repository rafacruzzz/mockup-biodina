
## Plano: Permissões de Módulos Específicas por Empresa (Criar e Editar)

### Contexto e Problema Atual

Atualmente, o sistema configura as permissões de módulos de forma **global** para o usuário. Quando um usuário está vinculado a múltiplas empresas/filiais, ele tem o **mesmo** conjunto de permissões em todas elas.

A solicitação é permitir configurar permissões **diferentes por empresa**, por exemplo:
- Na **Empresa A**: acesso ao Financeiro
- Na **Empresa B**: acesso ao Financeiro e Contabilidade

Esta funcionalidade deve estar disponível tanto ao **criar novo usuário** quanto ao **editar usuário existente**.

---

### Nova Estrutura de Dados

#### Tipo Atual:
```typescript
interface EmpresaVinculada {
  id: string;
  tipo: 'principal' | 'filial';
  nome: string;
}

interface UserData {
  // ...campos
  moduleAccess: ModuloUsuario[];  // GLOBAL para todas empresas
  empresasVinculadas: EmpresaVinculada[];
}
```

#### Novo Tipo Proposto:
```typescript
interface EmpresaVinculada {
  id: string;
  tipo: 'principal' | 'filial';
  nome: string;
  moduleAccess: ModuloUsuario[];  // Permissões ESPECÍFICAS desta empresa
}

interface UserData {
  // ...campos
  // REMOVE: moduleAccess global
  empresasVinculadas: EmpresaVinculada[];
}
```

---

### Arquivos a Modificar

| Arquivo | Alteração |
|---------|-----------|
| `src/types/permissions.ts` | Adicionar `moduleAccess` ao tipo `EmpresaVinculada` |
| `src/components/cadastro/EmpresasDoUsuario.tsx` | Adicionar accordion para configurar módulos de cada empresa |
| `src/components/cadastro/UserModal.tsx` | Remover moduleAccess global, integrar permissões por empresa |
| `src/components/layout/EmpresaUsuarioSwitcher.tsx` | Atualizar filtro para usar `empresa.moduleAccess` |
| `src/hooks/useModulosUsuario.ts` | Atualizar para retornar módulos da empresa ativa |

---

### Nova Interface Visual

Quando uma empresa estiver vinculada (toggle ON), aparecerá um botão "Configurar Módulos" que expande a árvore de permissões específica daquela empresa:

```text
┌─────────────────────────────────────────────────────────────────────┐
│ 🏢 Empresas do Usuário                                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│ ┌──────────────────────────┐ ┌──────────────────────────┐          │
│ │ [⚫] iMuv Master         │ │ [⚫] iMuv - Filial SP     │          │
│ │     Principal            │ │     3 módulos            │          │
│ │ [▼ Configurar Módulos]   │ │ [▼ Configurar Módulos]   │          │
│ └──────────────────────────┘ └──────────────────────────┘          │
│                                                                     │
│ ▼ Configurar Módulos: iMuv - Filial SP                             │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │ [x] 📈 BI Geral                           2/3 submódulos    │   │
│   │     ├── [x] Dashboards      ○ Ver  ● Ver/Editar  ○ Excluir  │   │
│   │     ├── [x] Relatórios      ● Ver  ○ Ver/Editar  ○ Excluir  │   │
│   │     └── [ ] Indicadores                                      │   │
│   │                                                              │   │
│   │ [x] 💰 Financeiro                         3/5 submódulos    │   │
│   │ [ ] 🧮 Contabilidade                      0/5 submódulos    │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

### Implementação Detalhada

#### 1. Atualizar Tipo `EmpresaVinculada` (permissions.ts)

```typescript
export interface EmpresaVinculada {
  id: string;
  tipo: 'principal' | 'filial';
  nome: string;
  moduleAccess: ModuloUsuario[]; // NOVO: permissões específicas desta empresa
}
```

#### 2. Criar Componente `EmpresaModulosConfig`

Novo componente que encapsula o accordion com a árvore de módulos para cada empresa:

- Recebe: empresa vinculada, módulos habilitados da empresa/filial
- Reutiliza: `ModuleAccessTree` existente
- Callback: `onModuleChange(empresaId, modules)`

#### 3. Refatorar `EmpresasDoUsuario`

- Quando toggle ON → mostrar botão "Configurar Módulos"
- Ao clicar → expandir accordion com `ModuleAccessTree`
- Passar apenas os módulos disponíveis daquela empresa/filial
- Exibir contador "X módulos" ao lado do nome

#### 4. Refatorar `UserModal`

**Aba "Controle de Sistema":**
- Remover seção separada "Permissões Detalhadas"
- O `EmpresasDoUsuario` agora cuida de tudo
- Remover campo `moduleAccess` global do `formData`

**Funciona igual para:**
- `editMode = false` (criar usuário)
- `editMode = true` (editar usuário)

Ao editar, os dados de `userData.empresasVinculadas` já virão com `moduleAccess` preenchido.

#### 5. Atualizar `EmpresaUsuarioSwitcher`

```typescript
// Antes: verificava moduleAccess global
const temAcesso = temModuloHabilitado(moduleAccess);

// Depois: verifica moduleAccess dentro de cada empresa
const filtrarEmpresasComAcesso = (empresasVinculadas) => {
  return empresasVinculadas.filter(empresa => 
    empresa.moduleAccess?.some(m => 
      m.habilitado && m.subModulos?.some(s => s.habilitado)
    )
  );
};
```

#### 6. Atualizar `useModulosUsuario`

O hook deve retornar os módulos da empresa **atualmente selecionada** no contexto:

```typescript
// Buscar empresa ativa e retornar seu moduleAccess
const empresaAtiva = empresasVinculadas.find(e => e.id === empresaAtualId);
return empresaAtiva?.moduleAccess || [];
```

---

### Fluxo de Uso

**Criar Usuário:**
1. Abrir modal de novo usuário
2. Ir para aba "Controle de Sistema"
3. Ativar empresas desejadas (toggle ON)
4. Clicar "Configurar Módulos" em cada empresa
5. Selecionar módulos/submódulos e níveis de permissão
6. Salvar → cada empresa tem sua configuração independente

**Editar Usuário:**
1. Abrir modal de edição
2. Ir para aba "Controle de Sistema"
3. Ver empresas já vinculadas com seus módulos configurados
4. Expandir "Configurar Módulos" para ajustar permissões
5. Adicionar/remover empresas conforme necessário
6. Salvar alterações

---

### Validações

- Cada empresa vinculada deve ter pelo menos um submódulo habilitado
- Exibir aviso se empresa estiver vinculada mas sem módulos configurados
- Manter regra de pelo menos uma empresa vinculada

---

### Migração (Compatibilidade com Dados Existentes)

Para usuários existentes com `moduleAccess` global:
- Na primeira edição, copiar o `moduleAccess` para todas as empresas vinculadas
- O sistema detecta se `empresasVinculadas[].moduleAccess` está vazio e aplica fallback

---

### Resumo de Alterações

| Arquivo | Tipo | Descrição |
|---------|------|-----------|
| `src/types/permissions.ts` | Modificar | Adicionar `moduleAccess` em `EmpresaVinculada` |
| `src/components/cadastro/EmpresaModulosConfig.tsx` | **NOVO** | Accordion com árvore de módulos por empresa |
| `src/components/cadastro/EmpresasDoUsuario.tsx` | Modificar | Integrar `EmpresaModulosConfig` |
| `src/components/cadastro/UserModal.tsx` | Modificar | Remover moduleAccess global |
| `src/components/layout/EmpresaUsuarioSwitcher.tsx` | Modificar | Filtrar por `empresa.moduleAccess` |
| `src/hooks/useModulosUsuario.ts` | Modificar | Retornar módulos da empresa ativa |

---

### Resultado Esperado

Ao final da implementação:
- Cada empresa vinculada ao usuário terá sua própria configuração de módulos
- O mesmo usuário pode ter acesso ao Financeiro na Empresa A e ao Financeiro + Contabilidade na Empresa B
- Funciona identicamente para criar e editar usuário
- O switcher de empresas mostra apenas empresas com módulos configurados
- O sistema usa as permissões corretas baseado na empresa selecionada
