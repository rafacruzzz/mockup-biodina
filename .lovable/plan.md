
## Plano: Mover Emissão do Financeiro para Filiais

### Objetivo
Adicionar uma nova aba "Emissão" no modal de cadastro/edição de filiais contendo as configurações de certificado digital e NF-e, e remover o submódulo "Emissão" do módulo Financeiro.

---

### Análise dos Campos

**Campos JA EXISTENTES no FilialModal (nao duplicar):**
| Campo | Localizado em |
|-------|---------------|
| Nome Fantasia | Aba "Informacoes" |
| Razao Social | Aba "Informacoes" |
| CNPJ | Aba "Informacoes" |
| Inscricao Estadual | Aba "Informacoes" |
| Inscricao Municipal | Aba "Informacoes" |
| Regime Tributario | Aba "Informacoes" |
| E-mail | Aba "Informacoes" |
| Telefone | Aba "Informacoes" |
| Discriminar impostos | Aba "Informacoes" |
| Endereco completo | Aba "Endereco" |

**Campos NOVOS para a aba Emissao:**
| Campo | Secao |
|-------|-------|
| Upload certificado (.pfx/.p12) | Certificado Digital |
| Ambiente de emissao (Homologacao/Producao) | Certificado Digital |
| Senha do certificado | Certificado Digital |
| Info certificado (Serial, IDCTX, validade) | Certificado Digital |
| Serie - Homologacao | Configuracao NF-e |
| Proximo Numero - Homologacao | Configuracao NF-e |
| Serie - Producao | Configuracao NF-e |
| Proximo Numero - Producao | Configuracao NF-e |

---

### Alteracoes de Arquivos

#### 1. Atualizar Tipo `Filial` (`src/types/super.ts`)

Adicionar campos de emissao:

```typescript
// Adicionar ao interface Filial
certificadoDigital?: {
  nomeArquivo: string;
  serialCertificado: string;
  idctx: string;
  inicio: string;
  expiracao: string;
  ambienteEmissao: 'homologacao' | 'producao';
};

nfeConfig?: {
  homologacao: {
    serie: number;
    proximoNumero: number;
  };
  producao: {
    serie: number;
    proximoNumero: number;
  };
};
```

#### 2. Modificar `FilialModal.tsx`

**Alteracoes:**
- Adicionar nova aba "Emissao" no TabsList (4 abas no total)
- Criar TabsContent para "emissao" com layout responsivo
- Adicionar estados para gerenciar certificado e configuracoes NF-e
- Importar icones necessarios (Lock, FileText, Upload)

**Estrutura da Nova Aba:**

```text
+---------------------------------------------------------------+
| Emissao                                                       |
+---------------------------------------------------------------+
|                                                               |
| CERTIFICADO DIGITAL                                           |
| +-----------------------------------------------------------+ |
| |  [Area de drag & drop para upload .pfx/.p12]              | |
| |                                                           | |
| |  Ambiente de Emissao:                                     | |
| |  [Homologacao]  [Producao]                                | |
| |                                                           | |
| |  Informacoes do Certificado (apos upload):               | |
| |  Serial: XXXX   IDCTX: XXXX   Validade: XX/XX/XXXX       | |
| +-----------------------------------------------------------+ |
|                                                               |
| CONFIGURACAO NF-e                                             |
| +-----------------------------------------------------------+ |
| |  AMBIENTE DE HOMOLOGACAO                                  | |
| |  Serie: [____]   Proximo Numero: [____]                  | |
| +-----------------------------------------------------------+ |
| +-----------------------------------------------------------+ |
| |  AMBIENTE DE PRODUCAO                                     | |
| |  Serie: [____]   Proximo Numero: [____]                  | |
| +-----------------------------------------------------------+ |
|                                                               |
+---------------------------------------------------------------+
```

#### 3. Remover Emissao do Financeiro (`src/pages/Financeiro.tsx`)

**Alteracoes:**
- Remover o objeto `{ id: 'emissao', ... }` do array `mainModules` (linhas 431-437)
- Remover o bloco `if (activeModule === 'emissao')` (linhas 567-591)

#### 4. Remover do menu de modulos (`src/data/sistemaModulosCompletos.ts`)

- Remover `{ key: 'emissao', name: 'Emissao' }` do array `subModulos` da Contabilidade (linha 105)

---

### Detalhes Tecnicos

**Imports adicionais no FilialModal:**
```typescript
import { Lock, FileText, Upload } from "lucide-react";
```

**Novos estados:**
```typescript
const [certificadoData, setCertificadoData] = useState<CertificadoData | null>(null);
const [nomeArquivo, setNomeArquivo] = useState<string>("");
const [isDragging, setIsDragging] = useState(false);
const [ambienteEmissao, setAmbienteEmissao] = useState<'homologacao' | 'producao'>('homologacao');
const [nfeConfig, setNfeConfig] = useState<NfeConfig>({
  homologacao: { serie: 1, proximoNumero: 1 },
  producao: { serie: 1, proximoNumero: 1 }
});
```

**Funcoes de upload (copiar do EmissaoConfig):**
- `handleFileUpload`
- `handleFileInputChange`
- `handleDrop`
- `handleDragOver`
- `handleDragLeave`
- `handleNfeConfigChange`

---

### Resultado Final

| Arquivo | Acao |
|---------|------|
| `src/types/super.ts` | Adicionar campos `certificadoDigital` e `nfeConfig` |
| `src/components/cadastro/FilialModal.tsx` | Adicionar 4a aba "Emissao" com todo o conteudo |
| `src/pages/Financeiro.tsx` | Remover modulo "Emissao" |
| `src/data/sistemaModulosCompletos.ts` | Remover "emissao" dos submodulos da Contabilidade |

**Comportamento:**
- Ao criar/editar filial, a aba "Emissao" permitira configurar certificado e NF-e
- O modal tera 4 abas: Informacoes, Endereco, Modulos, Emissao
- O modulo Financeiro nao tera mais o card "Emissao"
- Cada filial tera sua propria configuracao de emissao de notas fiscais
