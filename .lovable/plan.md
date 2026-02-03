
## Plano: Criar Módulo de Configuração com Perfil da Empresa

### Objetivo
Criar um novo módulo **Configuração** no menu lateral com submódulo **Perfil da Empresa**, permitindo que usuários autorizados editem os dados da empresa atual (principal ou filial selecionada no switcher).

---

### Análise

A empresa atualmente não possui todos os campos que as filiais possuem (endereço, emissão, etc.). Precisamos:
1. Atualizar o tipo `Empresa` para incluir os mesmos campos das filiais
2. Criar uma página de Configuração com o submódulo Perfil da Empresa
3. Adicionar ao menu lateral e à árvore de permissões

### Estrutura Proposta

```text
Menu Lateral:
├── BI
├── Cadastro
├── ...
├── Solicitações
├── Configuração          <-- NOVO
│   └── Perfil da Empresa
└── Personalizar Navegação
```

---

### Arquivos a Criar/Modificar

| Arquivo | Ação | Descrição |
|---------|------|-----------|
| `src/types/super.ts` | Modificar | Adicionar campos de endereço e emissão à interface `Empresa` |
| `src/pages/Configuracao.tsx` | **NOVO** | Página do módulo Configuração |
| `src/components/configuracao/PerfilEmpresaContent.tsx` | **NOVO** | Componente com abas Informações, Endereço, Emissão |
| `src/data/sistemaModulosCompletos.ts` | Modificar | Adicionar módulo "configuracao" com submódulo "perfil_empresa" |
| `src/components/SidebarLayout.tsx` | Modificar | Adicionar item "Configuração" ao menu |
| `src/App.tsx` | Modificar | Adicionar rota `/configuracao` |
| `src/data/superModules.ts` | Modificar | Adicionar "configuracao" ao `modulosDisponiveis` |

---

### Detalhes de Implementação

#### 1. Atualizar Tipo `Empresa` (src/types/super.ts)

Adicionar os mesmos campos que existem em `Filial`:

```typescript
export interface Empresa {
  // ... campos existentes ...
  
  // NOVOS CAMPOS
  endereco?: {
    cep: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    uf: string;
  };
  
  // Dados do Emitente
  inscricaoEstadual?: string;
  inscricaoMunicipal?: string;
  regimeTributario?: '1' | '2' | '3' | '4';
  email?: string;
  telefone?: string;
  discriminaImpostos?: boolean;
  
  // Certificado Digital e Configuração NF-e
  certificadoDigital?: { ... };
  nfeConfig?: { ... };
}
```

#### 2. Criar Página `Configuracao.tsx`

Página com sidebar similar às outras páginas do sistema:

```text
+------------------------------------------------------------------+
| CONFIGURAÇÃO                                                       |
+------------------------------------------------------------------+
|                                                                    |
| Sidebar:                  | Conteúdo:                             |
| ├── Perfil da Empresa     | [Tabs: Informações | Endereço | Emissão] |
|                           |                                        |
|                           | [Campos editáveis baseados no          |
|                           |  FilialModal, reutilizando EmissaoTab] |
+------------------------------------------------------------------+
```

#### 3. Criar `PerfilEmpresaContent.tsx`

Componente com 3 abas:
- **Informações**: Nome Fantasia, Razão Social, CNPJ, IE, IM, Regime Tributário, E-mail, Telefone
- **Endereço**: CEP com busca automática, Logradouro, Número, Complemento, Bairro, Cidade, UF
- **Emissão**: Reutilizar `EmissaoTab` existente

#### 4. Adicionar ao `sistemaModulosCompletos.ts`

```typescript
{
  key: 'configuracao',
  name: 'Configuração',
  icon: '⚙️',
  subModulos: [
    { key: 'perfil_empresa', name: 'Perfil da Empresa' }
  ]
}
```

Posição: após "Solicitações" e antes de "Personalizar Navegação"

#### 5. Adicionar ao Menu Lateral

```typescript
{ 
  name: "Configuração", 
  path: "/configuracao", 
  icon: <Settings size={20} />, 
  id: "configuracao" 
}
```

#### 6. Adicionar ao `superModules.ts`

```typescript
{
  id: 'configuracao',
  nome: 'Configuração',
  descricao: 'Configurações da empresa',
  icon: '⚙️',
  cor: 'slate'
}
```

---

### Comportamento do Sistema

1. **Empresa Principal selecionada**: Perfil da Empresa edita os dados da empresa principal
2. **Filial selecionada**: Perfil da Empresa edita os dados da filial (alternativa ao FilialModal)
3. **Permissões**: Apenas usuários com acesso ao módulo Configuração > Perfil da Empresa podem editar

---

### Interface Visual da Página

```text
┌─────────────────────────────────────────────────────────────────────┐
│  ⚙️ Configuração                                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Sidebar:          │  ┌───────────────────────────────────────────┐ │
│  ┌─────────────┐   │  │ Perfil da Empresa: iMuv Master            │ │
│  │ ● Perfil    │   │  │                                           │ │
│  │   da Empresa│   │  │ [Informações] [Endereço] [Emissão]       │ │
│  └─────────────┘   │  │                                           │ │
│                    │  │ ┌─────────────────────────────────────┐   │ │
│                    │  │ │ Nome Fantasia: [iMuv Master      ]  │   │ │
│                    │  │ │ Razão Social:  [iMuv Tecno...    ]  │   │ │
│                    │  │ │ CNPJ:          [12.345.678/0001-99] │   │ │
│                    │  │ │ ...                                 │   │ │
│                    │  │ └─────────────────────────────────────┘   │ │
│                    │  │                                           │ │
│                    │  │               [💾 Salvar Alterações]      │ │
│                    │  └───────────────────────────────────────────┘ │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

### Resumo das Alterações

| Arquivo | Tipo | Descrição |
|---------|------|-----------|
| `src/types/super.ts` | Modificar | Adicionar campos de endereço/emissão à `Empresa` |
| `src/pages/Configuracao.tsx` | **NOVO** | Página principal do módulo |
| `src/components/configuracao/PerfilEmpresaContent.tsx` | **NOVO** | Conteúdo do perfil com 3 abas |
| `src/components/configuracao/ConfiguracaoSidebar.tsx` | **NOVO** | Sidebar do módulo |
| `src/data/sistemaModulosCompletos.ts` | Modificar | Adicionar módulo "configuracao" |
| `src/data/superModules.ts` | Modificar | Adicionar ao array de módulos |
| `src/components/SidebarLayout.tsx` | Modificar | Adicionar item ao menu |
| `src/App.tsx` | Modificar | Adicionar rota /configuracao |

---

### Resultado Esperado

- Novo módulo **Configuração** visível no menu lateral
- Submódulo **Perfil da Empresa** permite editar dados completos
- Funciona tanto para empresa principal quanto para filiais
- Controle de acesso via permissões de usuário (módulos/submódulos)
- Dados salvos automaticamente via contexto `EmpresaContext`
